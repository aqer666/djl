import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import crypto from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = __dirname;
const generatedDir = join(rootDir, "generated");
const port = Number(process.env.PORT || 8765);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp"
};

const stylePrompts = {
  anime_cyber: "anime-style original character portrait, cyberpunk neon mood, detailed eyes",
  soft_school: "soft school anime illustration, bright clean lighting, gentle color palette",
  fantasy_badge: "fantasy character illustration, collectible badge composition, ornate but clean",
  guofeng: "modern guofeng anime character portrait, elegant clothing, refined linework",
  chibi: "cute chibi anime avatar, clean silhouette, expressive face"
};

const posePrompts = {
  portrait: "close-up avatar portrait, centered composition",
  half_body: "half-body character design sheet, clear outfit details",
  full_body: "full-body character reference sheet, neutral pose",
  merch_mockup: "merchandise mockup style, suitable for sticker and acrylic stand preview"
};

function jsonResponse(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("请求体过大"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON 格式不正确"));
      }
    });
    req.on("error", reject);
  });
}

function ensureSafePrompt(text) {
  const blocked = [
    "未成年色情",
    "儿童色情",
    "知名ip复刻",
    "仿画师",
    "nsfw",
    "loli",
    "real person nude"
  ];
  const normalizedText = String(text || "").toLowerCase();
  return !blocked.some((word) => normalizedText.includes(word));
}

function buildPrompt(input) {
  const style = stylePrompts[input.style] || stylePrompts.anime_cyber;
  const pose = posePrompts[input.pose] || posePrompts.portrait;
  return [
    style,
    pose,
    "original character only, no famous copyrighted character, no artist imitation",
    "clean face, coherent anatomy, high quality anime illustration",
    input.title ? `character name: ${input.title}` : "",
    input.description ? `character concept: ${input.description}` : "",
    input.profile ? `character profile: ${input.profile}` : "",
    input.prompt ? `user prompt: ${input.prompt}` : "",
    "avoid watermark, logo, readable text, extra fingers, distorted face, low quality"
  ]
    .filter(Boolean)
    .join(". ");
}

function costFor(input) {
  const base = input.size === "1024x1024" ? 8 : 14;
  return base * Math.max(1, Math.min(4, Number(input.count || 1)));
}

function safeCount(input) {
  return Math.max(1, Math.min(4, Number(input.count || 1)));
}

function safeSize(input) {
  const allowed = new Set(["1024x1024", "1024x1536", "1536x1024"]);
  return allowed.has(input.size) ? input.size : "1024x1024";
}

async function writeMockSvg(input, prompt, index) {
  await mkdir(generatedDir, { recursive: true });
  const id = crypto.randomUUID();
  const fileName = `${id}.svg`;
  const title = escapeXml(input.title || "原创 OC");
  const style = escapeXml(input.style || "anime_cyber");
  const promptPreview = escapeXml(String(input.prompt || prompt).slice(0, 120));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#f6f4ee" offset="0"/>
      <stop stop-color="#16a6a6" offset="0.52"/>
      <stop stop-color="#e35545" offset="1"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#272421" flood-opacity=".24"/></filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <g opacity=".18" stroke="#fffdfa" stroke-width="2">
    <path d="M0 160H1024M0 320H1024M0 480H1024M0 640H1024M0 800H1024"/>
    <path d="M160 0V1024M320 0V1024M480 0V1024M640 0V1024M800 0V1024"/>
  </g>
  <g filter="url(#shadow)">
    <rect x="166" y="118" width="692" height="788" rx="34" fill="#fffdfa" opacity=".94"/>
    <circle cx="512" cy="360" r="154" fill="#272421"/>
    <circle cx="512" cy="334" r="122" fill="#f6d8c8"/>
    <path d="M368 328c42-132 242-152 300 0 20-90-34-174-152-188-114 10-176 86-148 188Z" fill="#dce8e6"/>
    <circle cx="468" cy="334" r="15" fill="#272421"/>
    <circle cx="556" cy="334" r="15" fill="#16a6a6"/>
    <path d="M460 404c32 24 74 24 106 0" fill="none" stroke="#272421" stroke-width="10" stroke-linecap="round"/>
    <path d="M332 640c44-126 316-126 360 0v118H332Z" fill="#272421"/>
    <path d="M390 676h244" stroke="#e0b44b" stroke-width="18" stroke-linecap="round"/>
  </g>
  <rect x="220" y="778" width="584" height="72" rx="18" fill="#272421"/>
  <text x="512" y="823" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#fffdfa">${title}</text>
  <text x="76" y="84" font-family="Consolas, monospace" font-size="28" font-weight="700" fill="#fffdfa">MOCK AI IMAGE ${index + 1}</text>
  <text x="76" y="940" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#272421">${style}</text>
  <text x="76" y="976" font-family="Arial, sans-serif" font-size="18" fill="#272421">${promptPreview}</text>
</svg>`;
  await writeFile(join(generatedDir, fileName), svg, "utf-8");
  return { id, url: `/generated/${fileName}` };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function saveRemoteFile(url, fallbackExt = ".png") {
  await mkdir(generatedDir, { recursive: true });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`下载生成图片失败：${response.status}`);
  }
  const contentType = response.headers.get("content-type") || "";
  const ext = contentType.includes("webp")
    ? ".webp"
    : contentType.includes("jpeg")
      ? ".jpg"
      : contentType.includes("svg")
        ? ".svg"
        : fallbackExt;
  const id = crypto.randomUUID();
  const buffer = Buffer.from(await response.arrayBuffer());
  const fileName = `${id}${ext}`;
  await writeFile(join(generatedDir, fileName), buffer);
  return { id, url: `/generated/${fileName}` };
}

async function saveBase64Image(base64, ext = ".png") {
  await mkdir(generatedDir, { recursive: true });
  const id = crypto.randomUUID();
  const fileName = `${id}${ext}`;
  await writeFile(join(generatedDir, fileName), Buffer.from(base64, "base64"));
  return { id, url: `/generated/${fileName}` };
}

async function generateWithOpenAI(input, prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const images = [];
  const count = safeCount(input);
  for (let index = 0; index < count; index += 1) {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
        prompt,
        size: safeSize(input),
        n: 1
      })
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error?.message || "OpenAI 图片生成失败");
    }
    const item = json.data?.[0];
    if (item?.b64_json) {
      images.push(await saveBase64Image(item.b64_json));
    } else if (item?.url) {
      images.push(await saveRemoteFile(item.url));
    } else {
      throw new Error("OpenAI 未返回可用图片");
    }
  }
  return images;
}

async function generateWithReplicate(input, prompt) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return null;

  const model = process.env.REPLICATE_MODEL || "black-forest-labs/flux-schnell";
  const [owner, name] = model.split("/");
  if (!owner || !name) {
    throw new Error("REPLICATE_MODEL 应为 owner/model 格式");
  }

  const response = await fetch(`https://api.replicate.com/v1/models/${owner}/${name}/predictions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "wait=60"
    },
    body: JSON.stringify({
      input: {
        prompt,
        aspect_ratio: input.size === "1024x1536" ? "2:3" : input.size === "1536x1024" ? "3:2" : "1:1",
        num_outputs: safeCount(input),
        output_format: "png"
      }
    })
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.detail || json.error || "Replicate 图片生成失败");
  }

  const outputs = Array.isArray(json.output) ? json.output : json.output ? [json.output] : [];
  if (!outputs.length && json.urls?.get) {
    throw new Error("任务仍在运行，请改用异步轮询或 webhooks");
  }
  return Promise.all(outputs.slice(0, safeCount(input)).map((url) => saveRemoteFile(url)));
}

async function handleGenerate(req, res) {
  try {
    const input = await readJsonBody(req);
    const prompt = buildPrompt(input);
    if (!ensureSafePrompt(`${prompt} ${input.prompt || ""}`)) {
      return jsonResponse(res, 400, { error: "提示词触发了基础安全规则，请修改后再试。" });
    }

    let images = await generateWithOpenAI(input, prompt);
    let providerLabel = "OpenAI Images";
    let modeLabel = "真实 API";

    if (!images) {
      images = await generateWithReplicate(input, prompt);
      providerLabel = "Replicate";
    }

    if (!images) {
      const count = safeCount(input);
      images = await Promise.all(Array.from({ length: count }, (_, index) => writeMockSvg(input, prompt, index)));
      providerLabel = "Local Mock";
      modeLabel = "本地模拟";
    }

    return jsonResponse(res, 200, {
      jobId: crypto.randomUUID(),
      status: "completed",
      providerLabel,
      modeLabel,
      costPoints: costFor(input),
      prompt,
      images
    });
  } catch (error) {
    return jsonResponse(res, 500, { error: error.message || "生成失败" });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const rawPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const requestedPath = normalize(join(rootDir, rawPath));

  if (!requestedPath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    await readFile(requestedPath);
    res.writeHead(200, { "Content-Type": mimeTypes[extname(requestedPath)] || "application/octet-stream" });
    createReadStream(requestedPath).pipe(res);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/images/generate") {
    await handleGenerate(req, res);
    return;
  }
  await serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`OC Forge server running at http://127.0.0.1:${port}/`);
  console.log("Image provider: OPENAI_API_KEY -> OpenAI, REPLICATE_API_TOKEN -> Replicate, otherwise Local Mock.");
});
