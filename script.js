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
});
