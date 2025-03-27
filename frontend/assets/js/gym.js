document.addEventListener("DOMContentLoaded", function () {
    const gyms = {
        "1": {
            name: "Фитнес Центр X",
            address: "Алматы, ул. Абая 50",
            category: "Фитнес",
            image: "../assets/images/fitnessPic1.jpg",
            schedule: ["Пн: 08:00–22:00", "Ср: 10:00–21:00", "Пт: 09:00–20:00"]
        },
        "2": {
            name: "Спортзал Y",
            address: "Астана, пр. Назарбаева 10",
            category: "Тренажерный зал",
            image: "../assets/images/gymPic1.jpg",
            schedule: ["Вт: 07:00–20:00", "Чт: 08:00–21:00", "Сб: 09:00–19:00"]
        },
        "3": {
            name: "Йога-центр Lotus",
            address: "Шымкент, ул. Байтурсынова 20",
            category: "Йога",
            image: "../assets/images/yogaPic1.jpg",
            schedule: ["Пн-Сб: 10:00–18:00"]
        },
        "4": {
            name: "Тренажерный зал Z",
            address: "Шымкент, ул. Абая 40",
            category: "Тренажерный зал",
            image: "../assets/images/gymPic2.jpg",
            schedule: ["Пн/Ср/Пт: 10:00–18:00"]
        },
        "5": {
            name: "Бассейн Aqua",
            address: "Алматы, ул. Гоголя 40",
            category: "Плавание",
            image: "../assets/images/swimmingPic1.jpg",
            schedule: ["ВТ/Чт/Сб: 10:00–18:00"]
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const gymId = urlParams.get("id");
    const gym = gyms[gymId];

    if (gym) {
        document.getElementById("gym-name").textContent = gym.name;
        document.getElementById("gym-address").textContent = `Адрес: ${gym.address}`;
        document.getElementById("gym-category").textContent = `Категория: ${gym.category}`;
        document.getElementById("gym-image").src = gym.image;

        const scheduleList = document.getElementById("gym-schedule");
        gym.schedule.forEach(time => {
            const li = document.createElement("li");
            li.textContent = time;
            scheduleList.appendChild(li);
        });
    } else {
        document.getElementById("gym-details").innerHTML = "<p>Зал не найден.</p>";
    }

    //Form
    /*document.getElementById("openModalBtn").onclick = () => {
        document.getElementById("bookingModal").style.display = "block";
    };
    document.getElementById("closeModalBtn").onclick = () => {
        document.getElementById("bookingModal").style.display = "none";
    };
    window.onclick = (e) => {
        if (e.target == document.getElementById("bookingModal")) {
            document.getElementById("bookingModal").style.display = "none";
        }
    }*/
    
    // Обработка формы
   


    //Checking a time in schedule
    const savedSchedule = localStorage.getItem("scheduleSlots");
    let scheduleSlots = savedSchedule
    ? JSON.parse(savedSchedule)
    : {
        "Пн": [
            { time: "08:00", spots: 3 },
            { time: "10:00", spots: 2 }
        ],
        "Ср": [
            { time: "09:00", spots: 1 },
            { time: "11:00", spots: 0 }
        ],
        "Пт": [
            { time: "08:30", spots: 2 },
            { time: "12:00", spots: 0 }
        ]
    };

    let selectedDay = null;
    let selectedTime = null;

    const dayButtonsContainer = document.getElementById("dayButtons");
    const timeButtonsContainer = document.getElementById("timeButtons");

    // 1. Рендер дней
    function renderDays() {
        dayButtonsContainer.innerHTML = "";
        for (let day in scheduleSlots) {
            const btn = document.createElement("button");
            btn.textContent = day;
            btn.className = "day-btn";
            btn.onclick = (e) => {
                e.preventDefault();
                selectedDay = day;
                selectedTime = null;
                document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                renderTimes(day);
            };
            dayButtonsContainer.appendChild(btn);
        }
    }

    // 2. Рендер времён
    function renderTimes(day) {
        timeButtonsContainer.innerHTML = "";
        scheduleSlots[day].forEach((slot, index) => {
            const btn = document.createElement("button");
            btn.textContent = `${slot.time} (${slot.spots > 0 ? slot.spots + " мест" : "мест нет"})`;
            btn.className = "time-btn";
            btn.classList.add(slot.spots > 0 ? "available" : "unavailable");
            btn.disabled = slot.spots === 0;
            btn.onclick = (e) => {
                e.preventDefault();
                document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedTime = slot.time;
            };
            timeButtonsContainer.appendChild(btn);
        });
    }

    renderDays();

    document.getElementById("bookingForm").onsubmit = function (e) {
        e.preventDefault();
    
        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
    
        if (!selectedDay || !selectedTime) {
            alert("Пожалуйста, выберите день и время.");
            return;
        }
    
        if (!name || !email) {
            alert("Заполните все поля.");
            return;
        }
    
        // Найти слот и обновить
        scheduleSlots[selectedDay] = scheduleSlots[selectedDay].map(slot => {
            if (slot.time === selectedTime && slot.spots > 0) {
                slot.spots--;
            }
            return slot;
        });
    
        // Сохранение
        localStorage.setItem("scheduleSlots", JSON.stringify(scheduleSlots));
    
        document.getElementById("successMessage").style.display = "block";
        this.reset();
        renderTimes(selectedDay);
    
        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
        }, 2500);
    };
    

    
    

});


