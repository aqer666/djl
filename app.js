const seed = {
  users: [
    { id: "u-buyer", name: "夏洛", role: "普通用户", email: "buyer@ocforge.demo" },
    { id: "u-artist", name: "画师后台", role: "画师", email: "artist@ocforge.demo" },
    { id: "u-admin", name: "运营管理员", role: "管理员", email: "admin@ocforge.demo" }
  ],
  artists: [
    {
      id: "a-01",
      name: "Mika 星轨",
      avatar: "星",
      status: "开放接单",
      rating: 4.9,
      orders: 168,
      minPrice: 299,
      maxPrice: 1200,
      delivery: 9,
      languages: ["中文", "English"],
      styles: ["赛博", "头像", "Live2D"],
      intro: "擅长赛博、霓虹、半机械 OC。需求拆解细，适合需要完整角色设定的委托。",
      portfolio: ["雨夜义眼少女", "电子神社看板娘", "梦境档案管理员"]
    },
    {
      id: "a-02",
      name: "阿雀 Qiao",
      avatar: "雀",
      status: "排队 3 单",
      rating: 4.8,
      orders: 94,
      minPrice: 180,
      maxPrice: 760,
      delivery: 6,
      languages: ["中文"],
      styles: ["Q版", "表情包", "校园"],
      intro: "表情包和 Q 版头像交付稳定，适合社群头像、周边贴纸和轻量 OC 展示。",
      portfolio: ["奶油色校园头像", "魔法社团表情包", "摊位贴纸套组"]
    },
    {
      id: "a-03",
      name: "澄川 Ito",
      avatar: "澄",
      status: "开放接单",
      rating: 5.0,
      orders: 52,
      minPrice: 520,
      maxPrice: 2600,
      delivery: 18,
      languages: ["中文", "日本語"],
      styles: ["立绘", "国风", "商用"],
      intro: "偏精修立绘和商用授权，适合企划主视觉、看板娘、角色卡封面。",
      portfolio: ["青瓷机关师", "海边巡礼者", "墨色狐面武者"]
    }
  ],
  services: [
    { id: "s-01", artistId: "a-01", title: "赛博 OC 半身立绘", category: "半身立绘", price: 399, days: 10, revisions: 2, commercial: true, source: true },
    { id: "s-02", artistId: "a-01", title: "Live2D 角色拆分图", category: "Live2D", price: 980, days: 18, revisions: 3, commercial: true, source: true },
    { id: "s-03", artistId: "a-02", title: "Q 版头像套组", category: "头像", price: 180, days: 5, revisions: 1, commercial: false, source: false },
    { id: "s-04", artistId: "a-02", title: "OC 表情包 8 枚", category: "表情包", price: 360, days: 7, revisions: 2, commercial: false, source: false },
    { id: "s-05", artistId: "a-03", title: "商用角色主视觉", category: "商用立绘", price: 1600, days: 20, revisions: 3, commercial: true, source: true }
  ],
  characters: [
    { id: "c-01", name: "绫濑零音", visibility: "公开", completeness: 86, tags: ["赛博", "半机械", "旧书店"], description: "经营旧书店的半机械少女，能读取书页中残留的梦境数据。", coverUrl: "", generatedImages: [] },
    { id: "c-02", name: "白川未央", visibility: "私密", completeness: 62, tags: ["校园", "治愈", "社团"], description: "雨天会替大家保管伞的摄影社少女，随身携带老式胶片机。", coverUrl: "", generatedImages: [] }
  ],
  orders: [
    { id: "o-1008", title: "绫濑零音半身立绘", buyer: "夏洛", artistId: "a-01", serviceId: "s-01", characterId: "c-01", budget: 399, finalPrice: 420, status: "in_progress", updated: "今天 14:20", messages: 5 },
    { id: "o-1007", title: "白川未央 Q 版头像", buyer: "夏洛", artistId: "a-02", serviceId: "s-03", characterId: "c-02", budget: 180, finalPrice: 180, status: "delivered", updated: "昨天 21:10", messages: 8 }
  ],
  posts: [
    { id: "p-01", title: "梦境档案管理员交付展示", author: "夏洛", artistId: "a-01", characterId: "c-01", likes: 328, comments: 24, tags: ["赛博", "OC展示"] },
    { id: "p-02", title: "表情包上线，群友已经开始刷屏", author: "阿雀 Qiao", artistId: "a-02", characterId: "c-02", likes: 146, comments: 19, tags: ["表情包", "Q版"] }
  ],
  reports: [
    { id: "r-01", type: "画师入驻", target: "澄川 Ito", status: "待审核" },
    { id: "r-02", type: "作品举报", target: "疑似未授权参考图", status: "处理中" },
    { id: "r-03", type: "订单纠纷", target: "o-1006 交付延期", status: "待跟进" }
  ],
  orderReviews: [
    { id: "or-01", orderId: "o-1008", fromStatus: "in_progress", toStatus: "delivered", requestedBy: "Mika 星轨", status: "pending", note: "初稿和成品文件已上传，请管理员审核交付状态。", createdAt: "今天 15:10" }
  ]
};

const statusMap = {
  draft: "草稿",
  pending_artist: "等待画师确认",
  quoted: "画师已报价",
  awaiting_payment: "等待付款",
  paid: "已付款",
  in_progress: "创作中",
  revision: "修改中",
  delivered: "已交付",
  completed: "已完成",
  canceled: "已取消",
  disputed: "纠纷中"
};

const storeKey = "oc-forge-mvp-state";
const state = loadState();
const app = document.querySelector("#app");
const pageTitle = document.querySelector("#pageTitle");
const pageKicker = document.querySelector("#pageKicker");
const orderModal = document.querySelector("#orderModal");
const characterModal = document.querySelector("#characterModal");
const imageModal = document.querySelector("#imageModal");
const imageForm = document.querySelector("#imageForm");
const imageStatus = document.querySelector("#imageStatus");
const imageMeta = document.querySelector("#imageMeta");
const imageResults = document.querySelector("#imageResults");
const generateButton = document.querySelector("#generateButton");

function loadState() {
  const saved = localStorage.getItem(storeKey);
  if (!saved) return structuredClone(seed);
  const parsed = JSON.parse(saved);
  return normalizeState({ ...structuredClone(seed), ...parsed, orderReviews: parsed.orderReviews || structuredClone(seed.orderReviews) });
}

function normalizeState(nextState) {
  nextState.characters = nextState.characters.map((character) => ({
    ...character,
    coverUrl: character.coverUrl || "",
    generatedImages: Array.isArray(character.generatedImages) ? character.generatedImages : []
  }));
  return nextState;
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify({
    users: state.users,
    characters: state.characters,
    orders: state.orders,
    orderReviews: state.orderReviews,
    reports: state.reports,
    posts: state.posts,
    activeUserId: state.activeUserId
  }));
}

state.activeUserId ||= "u-buyer";

function getActiveUser() {
  return state.users.find((user) => user.id === state.activeUserId) || state.users[0];
}

function artistName(id) {
  return state.artists.find((artist) => artist.id === id)?.name || "未指定画师";
}

function serviceName(id) {
  return state.services.find((service) => service.id === id)?.title || "未选择服务";
}

function characterName(id) {
  return state.characters.find((character) => character.id === id)?.name || "未关联 OC";
}

function characterById(id) {
  return state.characters.find((character) => character.id === id);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nextOrderStatus(status) {
  const steps = ["pending_artist", "awaiting_payment", "paid", "in_progress", "delivered", "completed"];
  return steps[Math.min(steps.indexOf(status) + 1, steps.length - 1)];
}

function pendingReviewFor(orderId) {
  return state.orderReviews.find((item) => item.orderId === orderId && item.status === "pending");
}

function setHeader(title, kicker = "OC Forge") {
  pageTitle.textContent = title;
  pageKicker.textContent = kicker;
}

function updateNav() {
  const route = getRoute();
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", route === link.dataset.route || (route.startsWith(link.dataset.route) && link.dataset.route !== "/"));
  });
}

function renderUserCard() {
  const user = getActiveUser();
  document.querySelector("#userCard").innerHTML = `
    <p>当前身份</p>
    <strong>${user.name}</strong>
    <span>${user.role} · ${user.email}</span>
    <div class="role-switch">
      ${state.users.map((item) => `<button class="${item.id === user.id ? "selected" : ""}" data-user="${item.id}">${item.role}</button>`).join("")}
    </div>
  `;
}

function getRoute() {
  return location.hash.replace("#", "") || "/";
}

function heroTemplate() {
  const openArtists = state.artists.filter((artist) => artist.status.includes("开放")).length;
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="ticket-label">Commission loop</span>
        <h2>让用户创建 OC、找到画师、下单约稿并展示作品。</h2>
        <p>第一版聚焦交易闭环：画师主页、服务套餐、OC 档案、约稿订单、站内通知和后台审核都已经可以在前端跑通。</p>
        <div class="hero-actions">
          <button class="button button-dark" data-route-button="/artists">浏览画师</button>
          <button class="button button-light" data-action="new-character">创建 OC</button>
        </div>
      </div>
      <div class="hero-board">
        <img src="./hero-oc-platform.png" alt="OC Forge 创作和约稿工作台预览" />
      </div>
    </section>
    <section class="summary-strip">
      <div><span>入驻画师</span><strong>${state.artists.length}</strong><small>${openArtists} 位开放接单</small></div>
      <div><span>服务套餐</span><strong>${state.services.length}</strong><small>头像、立绘、Live2D、表情包</small></div>
      <div><span>进行中订单</span><strong>${state.orders.length}</strong><small>支持报价、模拟支付、交付</small></div>
      <div><span>OC 档案</span><strong>${state.characters.length}</strong><small>可一键带入约稿需求</small></div>
    </section>
  `;
}

function renderHome() {
  setHeader("从 OC 档案到约稿交付的一站式社区", "Commission workspace");
  app.innerHTML = `
    ${heroTemplate()}
    <section class="content-grid">
      <article class="panel span-2">
        <div class="section-title">
          <span class="kicker">Recommended artists</span>
          <h2>推荐画师</h2>
        </div>
        <div class="card-grid">${state.artists.map(artistCard).join("")}</div>
      </article>
      <article class="panel">
        <div class="section-title">
          <span class="kicker">Order flow</span>
          <h2>订单闭环</h2>
        </div>
        ${flowTemplate()}
      </article>
    </section>
    <section class="panel">
      <div class="section-title">
        <span class="kicker">Community</span>
        <h2>最新晒图</h2>
      </div>
      <div class="post-grid">${state.posts.map(postCard).join("")}</div>
    </section>
  `;
}

function artistCard(artist) {
  const service = state.services.find((item) => item.artistId === artist.id);
  return `
    <article class="artist-card">
      <div class="avatar">${artist.avatar}</div>
      <div>
        <div class="card-head">
          <h3>${artist.name}</h3>
          <span class="status">${artist.status}</span>
        </div>
        <p>${artist.intro}</p>
        <div class="meta-row">
          <span>★ ${artist.rating}</span>
          <span>${artist.orders} 单</span>
          <span>¥${artist.minPrice}-${artist.maxPrice}</span>
          <span>${artist.delivery} 天均交付</span>
        </div>
        <div class="tag-row">${artist.styles.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="card-actions">
          <button class="button button-light" data-route-button="/artists/${artist.id}">查看主页</button>
          <button class="button button-dark" data-order-artist="${artist.id}" data-order-service="${service?.id || ""}">立即约稿</button>
        </div>
      </div>
    </article>
  `;
}

function serviceCard(service) {
  return `
    <article class="service-card">
      <span class="kicker">${service.category}</span>
      <h3>${service.title}</h3>
      <p>${artistName(service.artistId)} · ${service.days} 天交付 · ${service.revisions} 次修改</p>
      <div class="price">¥${service.price} 起</div>
      <div class="tag-row">
        <span>${service.commercial ? "可商用" : "非商用"}</span>
        <span>${service.source ? "含源文件" : "不含源文件"}</span>
      </div>
      <button class="button button-dark wide-button" data-order-artist="${service.artistId}" data-order-service="${service.id}">选择套餐</button>
    </article>
  `;
}

function postCard(post) {
  return `
    <article class="post-card">
      <div class="post-cover">${post.tags[0]}</div>
      <h3>${post.title}</h3>
      <p>${post.author} 发布 · 画师 ${artistName(post.artistId)} · OC ${characterName(post.characterId)}</p>
      <div class="meta-row"><span>${post.likes} 点赞</span><span>${post.comments} 评论</span></div>
    </article>
  `;
}

function flowTemplate() {
  const steps = ["选择服务", "填写需求", "画师确认", "模拟付款", "创作交付", "评价晒图"];
  return `<ol class="flow-list">${steps.map((step, index) => `<li><span>${index + 1}</span>${step}</li>`).join("")}</ol>`;
}

function renderArtists() {
  setHeader("发现适合你 OC 的画师", "Artist marketplace");
  app.innerHTML = `
    <section class="panel">
      <div class="toolbar">
        <input id="artistSearch" type="search" placeholder="搜索画师、风格、服务类型" />
        <select id="styleFilter">
          <option value="">全部风格</option>
          <option>赛博</option>
          <option>头像</option>
          <option>Live2D</option>
          <option>Q版</option>
          <option>国风</option>
          <option>商用</option>
        </select>
        <select id="sortFilter">
          <option value="hot">最热门</option>
          <option value="price">价格从低到高</option>
          <option value="delivery">交付最快</option>
        </select>
      </div>
      <div class="card-grid" id="artistList"></div>
    </section>
  `;
  bindArtistFilters();
}

function bindArtistFilters() {
  const search = document.querySelector("#artistSearch");
  const style = document.querySelector("#styleFilter");
  const sort = document.querySelector("#sortFilter");
  const list = document.querySelector("#artistList");
  const draw = () => {
    const keyword = search.value.trim().toLowerCase();
    let artists = state.artists.filter((artist) => {
      const text = `${artist.name} ${artist.intro} ${artist.styles.join(" ")}`.toLowerCase();
      return (!keyword || text.includes(keyword)) && (!style.value || artist.styles.includes(style.value));
    });
    if (sort.value === "price") artists.sort((a, b) => a.minPrice - b.minPrice);
    if (sort.value === "delivery") artists.sort((a, b) => a.delivery - b.delivery);
    if (sort.value === "hot") artists.sort((a, b) => b.orders - a.orders);
    list.innerHTML = artists.map(artistCard).join("") || `<p class="empty">没有匹配的画师。</p>`;
  };
  [search, style, sort].forEach((node) => node.addEventListener("input", draw));
  draw();
}

function renderArtistDetail(id) {
  const artist = state.artists.find((item) => item.id === id) || state.artists[0];
  const services = state.services.filter((item) => item.artistId === artist.id);
  setHeader(`${artist.name} 的画师主页`, "Artist profile");
  app.innerHTML = `
    <section class="profile-hero panel">
      <div class="avatar large">${artist.avatar}</div>
      <div>
        <div class="card-head">
          <h2>${artist.name}</h2>
          <span class="status">${artist.status}</span>
        </div>
        <p>${artist.intro}</p>
        <div class="meta-row">
          <span>评分 ${artist.rating}</span>
          <span>完成 ${artist.orders} 单</span>
          <span>¥${artist.minPrice}-${artist.maxPrice}</span>
          <span>平均 ${artist.delivery} 天</span>
        </div>
        <div class="tag-row">${artist.styles.concat(artist.languages).map((tag) => `<span>${tag}</span>`).join("")}</div>
      </div>
    </section>
    <section class="content-grid">
      <article class="panel span-2">
        <div class="section-title"><span class="kicker">Services</span><h2>服务套餐</h2></div>
        <div class="service-grid">${services.map(serviceCard).join("")}</div>
      </article>
      <article class="panel">
        <div class="section-title"><span class="kicker">Portfolio</span><h2>作品集</h2></div>
        <div class="portfolio-list">${artist.portfolio.map((item) => `<div>${item}</div>`).join("")}</div>
      </article>
    </section>
  `;
}

function renderCharacters() {
  setHeader("管理你的 OC 角色档案", "Character archive");
  app.innerHTML = `
    <section class="panel">
      <div class="section-row">
        <div class="section-title"><span class="kicker">OC assets</span><h2>我的角色</h2></div>
        <button class="button button-dark" data-action="new-character">新建 OC</button>
      </div>
      <div class="character-grid">
        ${state.characters.map((item) => `
          <article class="character-card">
            <div class="character-cover ${item.coverUrl ? "has-image" : ""}">
              ${item.coverUrl ? `<img src="${item.coverUrl}" alt="${item.name} 的 AI 头像" />` : item.name.slice(0, 1)}
            </div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="progress-line"><span style="width:${item.completeness}%"></span></div>
            <div class="meta-row"><span>完整度 ${item.completeness}%</span><span>${item.visibility}</span><span>${item.generatedImages.length} 张 AI 图</span></div>
            <div class="tag-row">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="card-actions">
              <button class="button button-dark" data-action="generate-image" data-character="${item.id}">生成头像</button>
              <button class="button button-light" data-action="open-order" data-character="${item.id}">用这个 OC 约稿</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderOrders() {
  const user = getActiveUser();
  setHeader("追踪约稿进度和交付", "Order center");
  app.innerHTML = `
    <section class="panel">
      <div class="section-row">
        <div class="section-title">
          <span class="kicker">Orders</span>
          <h2>订单列表</h2>
          <p class="hint">当前身份：${user.role}。画师只能提交状态推进申请，管理员审核通过后订单状态才会变更。</p>
        </div>
        <button class="button button-dark" data-action="open-order">创建订单</button>
      </div>
      <div class="order-list">
        ${state.orders.map(orderTemplate).join("")}
      </div>
    </section>
  `;
}

function orderTemplate(order) {
  const user = getActiveUser();
  const review = pendingReviewFor(order.id);
  const next = nextOrderStatus(order.status);
  const canArtistSubmit = user.role === "画师" && !review && next !== order.status;
  const canPublish = order.status === "completed";
  return `
    <article class="order-card">
      <div>
        <div class="card-head">
          <h3>${order.title}</h3>
          <span class="status">${statusMap[order.status] || order.status}</span>
        </div>
        <p>${artistName(order.artistId)} · ${serviceName(order.serviceId)} · OC ${characterName(order.characterId)}</p>
        <div class="meta-row">
          <span>预算 ¥${order.budget}</span>
          <span>最终价 ¥${order.finalPrice || order.budget}</span>
          <span>${order.updated}</span>
          <span>${order.messages} 条沟通</span>
        </div>
        ${orderTimeline(order.status)}
        ${review ? `<div class="review-note">等待管理员审核：${statusMap[review.fromStatus]} → ${statusMap[review.toStatus]}。备注：${review.note}</div>` : ""}
      </div>
      <div class="order-actions">
        ${canArtistSubmit ? `<button class="button button-light" data-submit-review="${order.id}">提交推进申请</button>` : ""}
        ${user.role === "管理员" && review ? `<button class="button button-light" data-approve-review="${review.id}">审核通过</button><button class="button button-light danger" data-reject-review="${review.id}">驳回</button>` : ""}
        ${!canArtistSubmit && !(user.role === "管理员" && review) ? `<span class="action-hint">${review ? "审核中" : user.role === "画师" ? "暂无可推进状态" : "仅画师可提交推进"}</span>` : ""}
        <button class="button button-dark" ${canPublish ? `data-publish-post="${order.id}"` : "disabled"}>完成后晒图</button>
      </div>
    </article>
  `;
}

function orderTimeline(status) {
  const steps = ["pending_artist", "awaiting_payment", "paid", "in_progress", "delivered", "completed"];
  const current = Math.max(0, steps.indexOf(status));
  return `<div class="timeline">${steps.map((step, index) => `<span class="${index <= current ? "done" : ""}">${statusMap[step]}</span>`).join("")}</div>`;
}

function renderCommunity() {
  setHeader("让交付作品变成社区内容", "Community feed");
  app.innerHTML = `
    <section class="panel">
      <div class="section-title"><span class="kicker">Posts</span><h2>作品动态</h2></div>
      <div class="post-grid">${state.posts.map(postCard).join("")}</div>
    </section>
  `;
}

function renderDashboard() {
  const user = getActiveUser();
  const pendingReviews = state.orderReviews.filter((item) => item.status === "pending");
  setHeader(`${user.role}工作台`, "Dashboard");
  app.innerHTML = `
    <section class="content-grid">
      <article class="panel span-2">
        <div class="section-title"><span class="kicker">Operations</span><h2>待处理事项</h2></div>
        <div class="metric-grid">
          <div><span>待确认订单</span><strong>${state.orders.filter((item) => item.status === "pending_artist").length}</strong></div>
          <div><span>创作中</span><strong>${state.orders.filter((item) => item.status === "in_progress").length}</strong></div>
          <div><span>状态审核</span><strong>${pendingReviews.length}</strong></div>
          <div><span>平台服务</span><strong>${state.services.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        <div class="section-title"><span class="kicker">Admin</span><h2>状态审核队列</h2></div>
        ${pendingReviews.length ? pendingReviews.map(reviewCard).join("") : `<p class="empty">暂无待审核的订单状态申请。</p>`}
      </article>
    </section>
    <section class="panel">
      <div class="section-title"><span class="kicker">Content safety</span><h2>其他审核</h2></div>
      <ul class="audit-list">${state.reports.map((item) => `<li>${item.type}：${item.target}<span>${item.status}</span></li>`).join("")}</ul>
    </section>
    <section class="panel">
      <div class="section-title"><span class="kicker">Data model</span><h2>下一步接数据库时的核心表</h2></div>
      <div class="schema-grid">${["users", "profiles", "artists", "services", "characters", "orders", "order_status_reviews", "order_status_logs", "order_messages", "order_files", "payments", "reviews", "posts", "reports"].map((item) => `<span>${item}</span>`).join("")}</div>
    </section>
  `;
}

function reviewCard(review) {
  const order = state.orders.find((item) => item.id === review.orderId);
  return `
    <article class="review-card">
      <div>
        <h3>${order?.title || review.orderId}</h3>
        <p>${review.requestedBy} 申请：${statusMap[review.fromStatus]} → ${statusMap[review.toStatus]}</p>
        <span>${review.createdAt} · ${review.note}</span>
      </div>
      <div class="card-actions">
        <button class="button button-light" data-approve-review="${review.id}">通过</button>
        <button class="button button-light danger" data-reject-review="${review.id}">驳回</button>
      </div>
    </article>
  `;
}

function openOrderModal(defaults = {}) {
  fillOrderOptions(defaults);
  orderModal.showModal();
}

function fillOrderOptions(defaults = {}) {
  const artistSelect = document.querySelector("#orderArtist");
  const serviceSelect = document.querySelector("#orderService");
  const characterSelect = document.querySelector("#orderCharacter");
  artistSelect.innerHTML = state.artists.map((artist) => `<option value="${artist.id}">${artist.name}</option>`).join("");
  characterSelect.innerHTML = state.characters.map((character) => `<option value="${character.id}">${character.name}</option>`).join("");

  const drawServices = () => {
    const items = state.services.filter((service) => service.artistId === artistSelect.value);
    serviceSelect.innerHTML = items.map((service) => `<option value="${service.id}">${service.title} · ¥${service.price}</option>`).join("");
    if (defaults.serviceId) serviceSelect.value = defaults.serviceId;
  };

  artistSelect.value = defaults.artistId || artistSelect.value;
  characterSelect.value = defaults.characterId || characterSelect.value;
  artistSelect.onchange = drawServices;
  drawServices();
}

function submitOrder(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const id = `o-${Math.floor(1000 + Math.random() * 9000)}`;
  state.orders.unshift({
    id,
    title: data.get("title"),
    buyer: getActiveUser().name,
    artistId: data.get("artistId"),
    serviceId: data.get("serviceId"),
    characterId: data.get("characterId"),
    budget: Number(data.get("budget")),
    finalPrice: Number(data.get("budget")),
    status: "pending_artist",
    updated: "刚刚",
    messages: 1,
    requirement: data.get("requirement")
  });
  saveState();
  orderModal.close();
  location.hash = "#/orders";
  render();
}

function submitCharacter(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.characters.unshift({
    id: `c-${Math.floor(1000 + Math.random() * 9000)}`,
    name: data.get("name"),
    visibility: data.get("visibility"),
    completeness: 58,
    tags: data.get("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
    description: data.get("description"),
    coverUrl: "",
    generatedImages: []
  });
  saveState();
  characterModal.close();
  location.hash = "#/characters";
  render();
}

function openImageModal(defaults = {}) {
  fillImageOptions(defaults);
  imageStatus.textContent = "";
  imageStatus.className = "generator-status";
  imageMeta.innerHTML = "";
  imageResults.innerHTML = "";
  imageModal.showModal();
}

function fillImageOptions(defaults = {}) {
  const characterSelect = document.querySelector("#imageCharacter");
  characterSelect.innerHTML = state.characters.map((character) => `<option value="${character.id}">${character.name}</option>`).join("");
  if (defaults.characterId) characterSelect.value = defaults.characterId;
}

function renderGeneratedResults(character, result) {
  imageStatus.textContent = `生成完成：${result.images.length} 张图片已保存到 ${character.name} 的资产记录。`;
  imageStatus.className = "generator-status success";
  imageMeta.innerHTML = `
    <span>${result.providerLabel}</span>
    <span>${result.modeLabel}</span>
    <span>${result.costPoints} 点</span>
    <span>任务 ${result.jobId.slice(0, 8)}</span>
  `;
  imageResults.innerHTML = `
    <div class="prompt-preview">
      <strong>实际 Prompt</strong>
      <p>${escapeHtml(result.prompt)}</p>
    </div>
    ${result.images.map((image) => `
      <article class="generated-card">
        <img src="${image.url}" alt="${character.name} 的生成头像" />
        <button class="button button-light wide-button" type="button" data-set-cover="${character.id}" data-image-url="${image.url}">设为角色封面</button>
      </article>
    `).join("")}
  `;
}

async function submitImage(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const character = characterById(data.get("characterId"));
  if (!character) return;

  const payload = {
    title: character.name,
    description: character.description,
    profile: character.tags.join(", "),
    style: data.get("style"),
    pose: data.get("pose"),
    size: data.get("size"),
    count: Number(data.get("count")),
    prompt: data.get("prompt")
  };

  generateButton.disabled = true;
  imageStatus.textContent = "正在生成头像，本地 mock 通常几秒内完成；真实 API 可能需要更久。";
  imageStatus.className = "generator-status loading";
  imageMeta.innerHTML = "";
  imageResults.innerHTML = "";

  try {
    const response = await fetch("/api/images/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "生成失败，请稍后再试。");
    }
    if (!Array.isArray(result.images) || !result.images.length) {
      throw new Error("生成服务未返回可用图片。");
    }

    const generatedAt = new Date().toISOString();
    character.generatedImages = [
      ...result.images.map((image) => ({
        ...image,
        generatedAt,
        providerLabel: result.providerLabel,
        modeLabel: result.modeLabel,
        prompt: result.prompt,
        size: payload.size
      })),
      ...character.generatedImages
    ];
    character.coverUrl ||= result.images[0]?.url || "";
    character.completeness = Math.min(100, Math.max(character.completeness, 74));
    saveState();
    renderGeneratedResults(character, result);
    renderUserCard();
  } catch (error) {
    imageStatus.textContent = error.message || "生成失败，请检查服务是否启动。";
    imageStatus.className = "generator-status error";
  } finally {
    generateButton.disabled = false;
  }
}

function setCharacterCover(characterId, imageUrl) {
  const character = characterById(characterId);
  if (!character) return;
  character.coverUrl = imageUrl;
  saveState();
  imageStatus.textContent = `已将图片设为 ${character.name} 的角色封面。`;
  imageStatus.className = "generator-status success";
  render();
}

function submitStatusReview(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order || pendingReviewFor(id)) return;
  const next = nextOrderStatus(order.status);
  if (next === order.status) return;
  state.orderReviews.unshift({
    id: `or-${Math.floor(1000 + Math.random() * 9000)}`,
    orderId: order.id,
    fromStatus: order.status,
    toStatus: next,
    requestedBy: artistName(order.artistId),
    status: "pending",
    note: `画师申请将订单推进到“${statusMap[next]}”。`,
    createdAt: "刚刚"
  });
  order.updated = "刚刚";
  order.messages += 1;
  saveState();
  render();
}

function approveStatusReview(id) {
  const review = state.orderReviews.find((item) => item.id === id);
  if (!review || review.status !== "pending") return;
  const order = state.orders.find((item) => item.id === review.orderId);
  review.status = "approved";
  review.reviewedBy = getActiveUser().name;
  review.reviewedAt = "刚刚";
  if (order) {
    order.status = review.toStatus;
    order.updated = "刚刚";
    order.messages += 1;
  }
  saveState();
  render();
}

function rejectStatusReview(id) {
  const review = state.orderReviews.find((item) => item.id === id);
  if (!review || review.status !== "pending") return;
  const order = state.orders.find((item) => item.id === review.orderId);
  review.status = "rejected";
  review.reviewedBy = getActiveUser().name;
  review.reviewedAt = "刚刚";
  if (order) {
    order.updated = "刚刚";
    order.messages += 1;
  }
  saveState();
  render();
}

function publishPost(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  state.posts.unshift({
    id: `p-${Math.floor(1000 + Math.random() * 9000)}`,
    title: `${characterName(order.characterId)} 交付展示`,
    author: order.buyer,
    artistId: order.artistId,
    characterId: order.characterId,
    likes: 0,
    comments: 0,
    tags: ["约稿交付", "OC展示"]
  });
  order.status = "completed";
  saveState();
  location.hash = "#/community";
  render();
}

function render() {
  updateNav();
  renderUserCard();
  const route = getRoute();
  if (route === "/" || route === "") return renderHome();
  if (route === "/artists") return renderArtists();
  if (route.startsWith("/artists/")) return renderArtistDetail(route.split("/")[2]);
  if (route === "/characters") return renderCharacters();
  if (route === "/orders") return renderOrders();
  if (route === "/community") return renderCommunity();
  if (route === "/dashboard") return renderDashboard();
  location.hash = "#/";
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route-button]");
  if (routeButton) location.hash = `#${routeButton.dataset.routeButton}`;

  const userButton = event.target.closest("[data-user]");
  if (userButton) {
    state.activeUserId = userButton.dataset.user;
    saveState();
    render();
  }

  if (event.target.closest('[data-action="login"]')) {
    const index = state.users.findIndex((user) => user.id === state.activeUserId);
    state.activeUserId = state.users[(index + 1) % state.users.length].id;
    saveState();
    render();
  }

  if (event.target.closest('[data-action="new-character"]')) characterModal.showModal();
  if (event.target.closest('[data-action="generate-image"]')) {
    const trigger = event.target.closest("[data-character]");
    openImageModal({ characterId: trigger?.dataset.character });
  }
  if (event.target.closest('[data-action="open-order"]')) {
    const trigger = event.target.closest("[data-character]");
    openOrderModal({ characterId: trigger?.dataset.character });
  }

  const orderButton = event.target.closest("[data-order-artist]");
  if (orderButton) openOrderModal({ artistId: orderButton.dataset.orderArtist, serviceId: orderButton.dataset.orderService });

  const statusReview = event.target.closest("[data-submit-review]");
  if (statusReview) submitStatusReview(statusReview.dataset.submitReview);

  const approveReview = event.target.closest("[data-approve-review]");
  if (approveReview) approveStatusReview(approveReview.dataset.approveReview);

  const rejectReview = event.target.closest("[data-reject-review]");
  if (rejectReview) rejectStatusReview(rejectReview.dataset.rejectReview);

  const publish = event.target.closest("[data-publish-post]");
  if (publish) publishPost(publish.dataset.publishPost);

  const coverButton = event.target.closest("[data-set-cover]");
  if (coverButton) setCharacterCover(coverButton.dataset.setCover, coverButton.dataset.imageUrl);
});

document.querySelector("#orderForm").addEventListener("submit", submitOrder);
document.querySelector("#characterForm").addEventListener("submit", submitCharacter);
imageForm.addEventListener("submit", submitImage);
window.addEventListener("hashchange", render);
render();
