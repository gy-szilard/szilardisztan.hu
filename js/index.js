const socials = {
    discord: "https://discord.gg/qU7FUzweKP",
    instagram: "https://www.instagram.com/gy.szilard/",
    github: "https://github.com/gy-szilard"
};

function addTooltip(text, id) {
    const element = document.querySelector(`.${id}`);
    
    if (!element) {
        return;
    }

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip-container");
    tooltip.id = id + "-tip";
    tooltip.innerHTML = `<div class="tooltip" style="color:white">${text}</div>`;
    element.appendChild(tooltip);
}

function removeTooltip(id) {
    const tooltip = document.getElementById(id + "-tip");
    if (tooltip) {
        tooltip.remove();
    }
}

function isPC() {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

async function renderExams() {
    const intermediateContainer = document.getElementById("intermediate-list");
    const advancedContainer = document.getElementById("advanced-list");

    try {
        const response = await fetch('./vizsgak.json');

        if (!response.ok) {
            throw new Error("Nem sikerült elérni a JSON-t.");
        }

        const exams = await response.json();

        intermediateContainer.innerHTML = "";
        advancedContainer.innerHTML = "";

        exams.forEach(exam => {
            const html = `
                <div class="exam">
                    <a href="./erettsegik/${exam.szint}/${exam.file}" download>
                        <i class="fa-brands fa-python"></i>
                        <span>${exam.ev}. ${exam.honap}</span>
                    </a>
                </div>
            `;

            if (exam.szint === "kozep") {
                intermediateContainer.innerHTML += html;
            } else {
                advancedContainer.innerHTML += html;
            }
        });

    } catch (err) {
        console.error("Hiba:", err);
        intermediateContainer.innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
        advancedContainer.innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderExams();

    document.querySelectorAll(".social").forEach(item => {
        const type = item.classList[1];

        if (isPC()) {
            item.addEventListener("mouseenter", () => addTooltip(socials[type], type));
            item.addEventListener("mouseleave", () => removeTooltip(type));
        }
        item.addEventListener("click", () => window.open(socials[type], "_blank"));
    });
});