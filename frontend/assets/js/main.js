document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll(".buy-btn");
    
    buyButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const plan = this.dataset.plan;
            alert(`Вы выбрали подписку: ${plan}`);
        });
    });
});
