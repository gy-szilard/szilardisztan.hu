function renderStaticSections() {
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
        const response = await fetch('./vizsgak.json'); // Relatív útvonal a saját mappájában

        if (!response.ok) {
            throw new Error("Nem sikerült elérni a JSON-t.");
        }

        const exams = await response.json();

        if (intermediateContainer) intermediateContainer.innerHTML = "";
        if (advancedContainer) advancedContainer.innerHTML = "";

        exams.forEach(exam => {
            const html = `
                <div class="exam">
                    <a href="./${exam.szint}/${exam.file}" download>
                        <i class="fa-brands fa-python"></i>
                        <span>${exam.ev}. ${exam.honap}</span>
                    </a>
                </div>
            `;

            if (exam.szint === "kozep" && intermediateContainer) {
                intermediateContainer.innerHTML += html;
            } else if (advancedContainer) {
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
});