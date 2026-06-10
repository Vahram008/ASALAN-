const cards = document.querySelectorAll(".tour-card");
const previewImg = document.getElementById("previewImg");
const previewTitle = document.getElementById("previewTitle");
const previewPrice = document.getElementById("previewPrice");
const previewText = document.getElementById("previewText");
cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(item =>
            item.classList.remove("active")
        );
        card.classList.add("active");
        previewImg.src = card.dataset.img;
        previewTitle.textContent = card.dataset.title;
        previewPrice.textContent = card.dataset.price;
        previewText.textContent = card.dataset.text;
    });
});