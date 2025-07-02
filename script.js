document.addEventListener("DOMContentLoaded", () => {
  const copyTextElements = document.querySelectorAll(".copy-text");

  copyTextElements.forEach((element) => {
    element.addEventListener("click", () => {
      const textToCopy = element.getAttribute("data-copy");
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert(`Copied to clipboard | 已复制到剪贴板`);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    });
  });

  const wechatDonateButtons = document.querySelectorAll(
    "#wechat-donate-btn, #wechat-donate-btn-2"
  );

  wechatDonateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("wechat-qr-overlay").style.display = "flex";
    });
  });

  document
    .getElementById("wechat-qr-overlay")
    .addEventListener("click", function () {
      document.getElementById("wechat-qr-overlay").style.display = "none";
    });

  // 修复微信二维码浮层样式为全屏居中浮动
  const wechatOverlay = document.getElementById("wechat-qr-overlay");
  if (wechatOverlay) {
    wechatOverlay.style.position = "fixed";
    wechatOverlay.style.left = "0";
    wechatOverlay.style.top = "0";
    wechatOverlay.style.width = "100vw";
    wechatOverlay.style.height = "100vh";
    wechatOverlay.style.background = "rgba(0,0,0,0.5)";
    wechatOverlay.style.display = "none";
    wechatOverlay.style.justifyContent = "center";
    wechatOverlay.style.alignItems = "center";
    wechatOverlay.style.zIndex = "9999";
    // 内容居中
    const qrContent = wechatOverlay.querySelector(".qr-content");
    if (qrContent) {
      qrContent.style.background = "#fff";
      qrContent.style.padding = "24px";
      qrContent.style.borderRadius = "12px";
      qrContent.style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
      qrContent.style.display = "flex";
      qrContent.style.flexDirection = "column";
      qrContent.style.alignItems = "center";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const regions = [
    { name: "na", url: "https://au-us.niko233.me/api/counts" },
    { name: "as", url: "https://au-as.niko233.me/api/counts" },
    { name: "eu", url: "https://au-eu.niko233.me/api/counts" },
    { name: "cn", url: "https://au-cn.niko233.me/api/counts" },
  ];

  regions.forEach((region) => {
    fetch(region.url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(`${region.name}-games`).textContent =
          data.games;
        document.getElementById(`${region.name}-players`).textContent =
          data.players;
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
});
