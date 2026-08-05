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

projektek();