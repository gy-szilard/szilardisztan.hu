async function projektek() {
    const kontener = document.getElementById("projekt-lista");

    try {
        const valasz = await fetch('./projektek.json');

        if (!valasz.ok) {
            throw new Error("Nem sikerült elérni a JSON-t.");
        }

        const projektLista = await valasz.json();
        const megforditottProjektek = [...projektLista].reverse();

        kontener.innerHTML = "";

        megforditottProjektek.forEach(v => {
            const vanLink = v.link && v.link.trim() !== "";
            const vanForras = v.forras && v.forras.trim() !== "";

            if (!vanLink && !vanForras) {
                return;
            }

            const linkGomb = vanLink 
                ? `<a href="${v.link}" class="gomb" target="_blank">Csekkold le!</a>` 
                : "";

            const forrasGomb = vanForras 
                ? `<a href="${v.forras}" class="gomb gomb-masodlagos" target="_blank">Forrás</a>` 
                : "";

            const keszitoFejlec = v.sajatE 
                ? `<h3>Saját projekt</h3>` 
                : `<h3>Készítő: ${v.keszito}</h3>`;

            const html = `
                <div class="doboz">
                    <h2>${v['projekt-nev']}</h2>
                    ${keszitoFejlec}
                    <p>${v.leiras}</p>
                    <div class="gomb-kontener">
                        ${linkGomb}
                        ${forrasGomb}
                    </div>
                </div>
            `;

            kontener.innerHTML += html;
        });

    } catch (err) {
        console.error("Hiba:", err);
        if (kontener) {
            kontener.innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
        }
    }
}

function infoInicializalasa() {
    const infoKontener = document.getElementById("info-kontener");
    if (!infoKontener) return;

    const fontosSzoveg = `Felkerülhet a weboldalra egy általad készített projekt is. Ehhez a Discord szerveremen tudod jelezni szándékodat a "projekt-ajánlás" csatornán, a kitűzött üzenetek közt megtalálod a szempontokat.`;

    infoKontener.innerHTML = `
        <button class="info-gomb" id="info-gomb-elem" aria-label="Információ">
            <i class="fa-solid fa-circle-info"></i>
        </button>
        <div class="info-tartalom-doboz" id="info-tartalom-elem">
            <div class="info-cim">Fontos információ!</div>
            <p>${fontosSzoveg}</p>
        </div>
    `;

    const infoGomb = document.getElementById("info-gomb-elem");
    const infoTartalom = document.getElementById("info-tartalom-elem");

    infoGomb.addEventListener("click", (e) => {
        e.stopPropagation();
        const keresoDoboz = document.getElementById("kereso-doboz-elem");
        if (keresoDoboz) {
            keresoDoboz.classList.remove("nyitva");
        }
        infoTartalom.classList.toggle("nyitva");
    });

    document.addEventListener("click", (e) => {
        if (!infoKontener.contains(e.target)) {
            infoTartalom.classList.remove("nyitva");
        }
    });
}

projektek();
infoInicializalasa();