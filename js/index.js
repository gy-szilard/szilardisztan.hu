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

function renderStaticSections() {
    const aboutBox = document.getElementById("about");
    if (aboutBox) {
        aboutBox.innerHTML = `
            <h2>Rólam</h2>
            <p>Szia, Szilárd vagyok. <br>Jelenleg a Szegedi Tudományegyetemen tanulok Programtervező Informatikusnak.</p>
            <p>Ezt az oldalt azért hoztam létre, hogy a Digitális Kultúra érettségi előtt állókat segítsem, főként a programozós feladatokban.</p>
            <p>Bármi kérdésed van vagy esetleges hibát/hiányosságot találsz a megoldásokban, akkor a Discord szerveren ezt jelezheted.</p>
        `;
    }

    const socialsContainer = document.getElementById("socials-container");
    if (socialsContainer) {
        socialsContainer.innerHTML = `
            <div class="social discord"><i class="fab fa-discord"></i></div>
            <div class="social instagram"><i class="fab fa-instagram"></i></div>
            <div class="social github"><i class="fab fa-github"></i></div>
        `;
    }
}

async function renderEducation() {
    const container = document.getElementById("education-container");
    if (!container) return;

    try {
        const response = await fetch("./education.json");
        if (!response.ok) {
            throw new Error(`HTTP hiba: ${response.status}`);
        }
        const educationData = await response.json();

        const itemsHtml = educationData.map(item => {
            const endYearDisplay = item.endYear 
                ? `<span class="end-year-red">${item.endYear}</span>` 
                : `<span class="end-year-red">Jelenleg</span>`;

            return `
                <div class="education-item">
                    <span class="school-name">${item.school}</span>
                    <span class="years-badge">${item.startYear} – ${endYearDisplay}</span>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <h2>Tanulmányok</h2>
            <div class="education-list">
                ${itemsHtml}
            </div>
        `;
    } catch (error) {
        console.error("Hiba a tanulmányok betöltésekor:", error);
        container.innerHTML = `
            <h2>Tanulmányok</h2>
            <div style="color: #ff5555; text-align: center;">Nem sikerült betölteni a tanulmányokat.</div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderStaticSections();
    renderEducation();

    if (typeof renderExams === "function") {
        renderExams();
    }

    document.querySelectorAll(".social").forEach(item => {
        const type = item.classList[1];

        if (isPC()) {
            item.addEventListener("mouseenter", () => addTooltip(socials[type], type));
            item.addEventListener("mouseleave", () => removeTooltip(type));
        }
        item.addEventListener("click", () => window.open(socials[type], "_blank"));
    });
});