let contenedor = document.querySelector(".contenedor");
let pkBtn = document.querySelector("#pkBtn");
let pkNumber = document.querySelector("#pkNumber");

pkBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    localStorage.setItem("pkNumber", JSON.stringify(pkNumber.value));

    let pk = JSON.parse(localStorage.getItem("pkNumber"));
    
    const obtenerPoke = async () => {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pk}`);
            const data = await respuesta.json();
            console.log(`${data.name} es de tipo ${data.types[0].type.name} `)
            return data;
    
        } catch (error) { 
            console.error(error);
        }
    };
    
    obtenerPoke();
    
    const templatePokemon = pokemon => {
        const {name, sprites, weight, height, types, abilities} = pokemon; 
        contenedor.innerHTML = '';

        const pokemonHTML = `
        <div class="pokeCard">
        <img src="${sprites.front_default}" alt="${name}"/>
        <ul class="infoList"> 
        <li>Nombre: ${name}</li>
        <li>Tipo: ${types[0].type.name}</li>
        <li>Habilidad: ${abilities[0].ability.name}</li>
        <li>Peso: ${weight/10} kg</li>
        <li>Altura: ${height/10} m</li>
        </ul>   
        </div>
        `;

        contenedor.innerHTML += pokemonHTML;   
    };
    
    const renderPokemon = async () => {
        try {
            const pokemon = await obtenerPoke();
            templatePokemon(pokemon);
        } catch (error) {
            contenedor.innerHTML = '';
            const pokemonHTML = `
            <div class="pokeError">
            <h3>¡Lo siento! Pero ese Pokemón no existe.<h3>  
            <img src="https://c3.klipartz.com/pngpicture/273/798/sticker-png-pikachu-i-choose-you-sad-icon-thumbnail.png" alt="Ash.png"> 
            </div>
        `;
        contenedor.innerHTML += pokemonHTML; 
        }
    }
    
    renderPokemon();

})

