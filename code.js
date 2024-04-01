/* obtener pjs */

const charactersEl = document.getElementById("characters");
const nameFilterEl = document.getElementById("name-filter");
const statusFilterEl = document.getElementById("status-filter");

/* funcion que llama a la API */

async function getCharacters(name, status){
    let url = "https://rickandmortyapi.com/api/character/";

    if(name || status){
        url += "?";
        if(name){
            url += `name=${name}&`;
        }
        if(status){
            url += `status=${status}`;
        }
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

/* funcion que renderiza los elementos dentro del DOM */

async function displayCharacters(name, status){

    /* obtener pjs filtrados */
    const characters = await getCharacters(name, status);

    /* eliminar los elementos */
    charactersEl.innerHTML = "";

    /* renderizar pjs */
    for(let character of characters){
        const card = document.createElement("div");
        card.classList.add("character-card");

        card.innerHTML = `
            <img src="${character.image}" />
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Especie: ${character.species}</p>
        `;

        /* insertar los elementos al div characters */
        charactersEl.appendChild(card);
    }
}

displayCharacters();

/* busqueda */
nameFilterEl.addEventListener("input", ()=>{
    displayCharacters(nameFilterEl.value, statusFilterEl.value)
});

/* status */

statusFilterEl.addEventListener("change", ()=>{
    displayCharacters(nameFilterEl.value, statusFilterEl.value)
});