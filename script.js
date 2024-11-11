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

document.addEventListener("DOMContentLoaded", function() {
  const regions = [
      { name: "na", url: "https://au-us.niko233.me/api/counts" },
      { name: "eu", url: "https://au-eu.niko233.me/api/counts" },
      { name: "as", url: "https://au-as.niko233.me/api/counts" }
  ];

  regions.forEach(region => {
      fetch(region.url)
          .then(response => response.json())
          .then(data => {
              document.getElementById(`${region.name}-games`).textContent = data.games;
              document.getElementById(`${region.name}-players`).textContent = data.players;
          })
          .catch(error => console.error('Error fetching data:', error));
  });
});
