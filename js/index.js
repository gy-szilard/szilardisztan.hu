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

    const intermediateBox = document.getElementById("intermediate-box");
    if (intermediateBox) {
        intermediateBox.innerHTML = `
            <h2>Középszint</h2>
            <p>Itt található a középszintű Digitális Kultúra érettségik programozós feladatai (Python-ban).</p>
            <div id="intermediate-list" class="exam-container"></div>
        `;
    }

    const advancedBox = document.getElementById("advanced-box");
    if (advancedBox) {
        advancedBox.innerHTML = `
            <h2>Emelt szint</h2>
            <p>Itt található az emelt szintű Digitális Kultúra érettségik programozós feladatai (Python-ban).</p>
            <div id="advanced-list" class="exam-container"></div>
        `;
    }
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
        if (intermediateContainer) intermediateContainer.innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
        if (advancedContainer) advancedContainer.innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderStaticSections();
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