document.addEventListener("DOMContentLoaded", function () {
    const gyms = [
        { name: "Фитнес Центр X", city: "Алматы", category: "Фитнес" },
        { name: "Спортзал Y", city: "Астана", category: "Тренажерный зал" },
        { name: "Тренажерный зал Z", city: "Шымкент", category: "Кроссфит" },
        { name: "Йога-центр Lotus", city: "Алматы", category: "Йога" },
        { name: "Бассейн Aqua", city: "Астана", category: "Плавание" }
    ];

    const gymList = document.querySelector(".gym-list");
    const filterSelect = document.createElement("select");
    filterSelect.innerHTML = `
        <option value="all">Все</option>
        <option value="Фитнес">Фитнес</option>
        <option value="Тренажерный зал">Тренажерный зал</option>
        <option value="Кроссфит">Кроссфит</option>
        <option value="Йога">Йога</option>
        <option value="Плавание">Плавание</option>
    `;
    document.querySelector("#catalog .container").insertBefore(filterSelect, gymList);

    function renderGyms(filter = "all") {
        gymList.innerHTML = "";
        gyms.forEach(gym => {
            if (filter === "all" || gym.category === filter) {
                const gymCard = document.createElement("div");
                gymCard.classList.add("gym");
                gymCard.innerHTML = `
                    <h3>${gym.name}</h3>
                    <p>${gym.city}</p>
                    <p>Категория: ${gym.category}</p>
                    <a href="gym.html" class="btn">Подробнее</a>
                `;
                gymList.appendChild(gymCard);
            }
        });
    }

    filterSelect.addEventListener("change", function () {
        renderGyms(this.value);
    });

    renderGyms();
});
