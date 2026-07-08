const storeKey = "oc-forge-mvp-state";

const demoUsers = [
  { id: "u-buyer", name: "夏洛", role: "普通用户", email: "buyer@ocforge.demo" },
  { id: "u-artist", name: "Mika 星轨", role: "画师", email: "artist@ocforge.demo", artistId: "a-01" },
  { id: "u-admin", name: "运营管理员", role: "管理员", email: "admin@ocforge.demo" }
];

const loginRoles = [
  {
    userId: "u-buyer",
    label: "普通用户",
    mark: "创",
    title: "OC 创作者入口",
    description: "从灵感开始整理人设，保存角色档案，继续生成头像、角色卡和约稿需求。",
    points: ["创建 OC 档案", "管理角色资产", "发起约稿需求"],
    route: "/characters",
    action: "以普通用户进入"
  },
  {
    userId: "u-artist",
    label: "画师",
    mark: "接",
    title: "画师接单入口",
    description: "查看公开稿单，判断风格与排期，接单后推进沟通、报价和交付状态。",
    points: ["查看公共稿单", "确认或婉拒需求", "推进交付节点"],
    route: "/artists",
    action: "以画师进入"
  },
  {
    userId: "u-admin",
    label: "管理者",
    mark: "审",
    title: "运营审核入口",
    description: "处理订单状态、内容安全、入驻审核和高风险操作，保持平台演示流程可控。",
    points: ["审核订单状态", "跟进举报事项", "查看运营概览"],
    route: "/dashboard",
    action: "进入管理后台"
  }
];

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storeKey)) || {};
  } catch {
    return {};
  }
}

function saveLogin(userId) {
  const state = loadState();
  localStorage.setItem(storeKey, JSON.stringify({
    ...state,
    users: state.users || demoUsers,
    activeUserId: userId
  }));
}

function loginRoleCard(role, activeUserId) {
  const user = demoUsers.find((item) => item.id === role.userId);
  const selected = activeUserId === role.userId;
  return `
    <article class="login-role-card ${selected ? "selected" : ""}">
      <div class="login-role-head">
        <span class="login-role-mark">${role.mark}</span>
        <div>
          <span class="kicker">${role.label}</span>
          <h3>${role.title}</h3>
        </div>
      </div>
      <p>${role.description}</p>
      <div class="login-point-list">
        ${role.points.map((point) => `<span>${point}</span>`).join("")}
      </div>
      <div class="login-account">
        <small>演示账号</small>
        <strong>${user.name}</strong>
        <span>${user.email}</span>
      </div>
      <button class="button ${selected ? "button-light" : "button-dark"} wide-button" data-login-user="${role.userId}">${role.action}</button>
    </article>
  `;
}

const state = loadState();
const activeUserId = state.activeUserId || "u-buyer";
document.querySelector("#loginRoleGrid").innerHTML = loginRoles.map((role) => loginRoleCard(role, activeUserId)).join("");

document.addEventListener("click", (event) => {
  const loginButton = event.target.closest("[data-login-user]");
  if (!loginButton) return;
  const role = loginRoles.find((item) => item.userId === loginButton.dataset.loginUser);
  if (!role) return;
  saveLogin(role.userId);
  window.location.href = `./index.html#${role.route}`;
});
