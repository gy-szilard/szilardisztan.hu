async function renderExams() {
    const intermediateContainer = document.getElementById("intermediate-list");
    const advancedContainer = document.getElementById("advanced-list");

    try {
        const response = await fetch('./erettsegi/vizsgak.json');

        if (!response.ok) {
            throw new Error("Nem sikerült elérni a JSON-t.");
        }

        const exams = await response.json();

        intermediateContainer.innerHTML = "";
        advancedContainer.innerHTML = "";

        exams.forEach(exam => {
            const html = `
                <div class="exam">
                    <a href="./erettsegi/${exam.szint}/${exam.file}" download>
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