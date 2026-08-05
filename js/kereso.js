function keresoInicializalasa(opciok = {}) {
    const keresoKontenerId = opciok.keresoKontenerId || "kereso-kontener";
    const listaKontenerId = opciok.listaKontenerId || "projekt-lista";
    const elemKlassz = opciok.elemKlassz || ".doboz";
    const placeholder = opciok.placeholder || "Keresés...";

    const keresoKontener = document.getElementById(keresoKontenerId);
    const listaKontener = document.getElementById(listaKontenerId);

    if (!keresoKontener || !listaKontener) return;

    keresoKontener.innerHTML = `
        <div class="kereso-doboz" id="kereso-doboz-elem">
            <button class="kereso-gomb" id="kereso-gomb-elem" aria-label="Keresés">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <input type="text" id="egyetemes-kereso-input" placeholder="${placeholder}" class="kereso-mező">
        </div>
    `;

    const keresoDoboz = document.getElementById("kereso-doboz-elem");
    const keresoGomb = document.getElementById("kereso-gomb-elem");
    const keresoInput = document.getElementById("egyetemes-kereso-input");

    keresoGomb.addEventListener("click", (e) => {
        e.stopPropagation();
        keresoDoboz.classList.toggle("nyitva");
        if (keresoDoboz.classList.contains("nyitva")) {
            keresoInput.focus();
        }
    });

    keresoInput.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
        if (!keresoDoboz.contains(e.target) && keresoInput.value.trim() === "") {
            keresoDoboz.classList.remove("nyitva");
        }
    });

    keresoInput.addEventListener("input", (e) => {
        const kifejezes = e.target.value.toLowerCase().trim();
        const elemek = listaKontener.querySelectorAll(elemKlassz);

        elemek.forEach(elem => {
            const szoveg = elem.textContent.toLowerCase();
            if (szoveg.includes(kifejezes)) {
                elem.style.display = "";
            } else {
                elem.style.display = "none";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    keresoInicializalasa({
        placeholder: "Keresés..."
    });
});