const cards = document.querySelectorAll(".tour-card");
const previewImg = document.getElementById("previewImg");
const previewTitle = document.getElementById("previewTitle");
const previewPrice = document.getElementById("previewPrice");
const previewText = document.getElementById("previewText");

function renderPreview(card) {
  if (!card) return;
  const key = card.dataset.key;

  previewImg.src = card.dataset.img;
  previewTitle.setAttribute("data-i18n", `tour-${key}-title`);
  previewPrice.setAttribute("data-i18n", `tour-${key}-price`);
  previewText.setAttribute("data-i18n", `tour-${key}-text`);

  if (typeof applyLanguage === "function") {
    applyLanguage(getLanguage());
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    renderPreview(card);
  });
});

document.addEventListener("languagechange", () => {
  const activeCard = document.querySelector(".tour-card.active");
  renderPreview(activeCard);
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultActive = document.querySelector(".tour-card.active");
  if (defaultActive) {
    renderPreview(defaultActive);
  }
});
