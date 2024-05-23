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

    const pokeTypes = (types) => {
        return types.map((tipo)=> {
            return `<span class="${tipo.type.name} poke_type">${tipo.type.name}</span>`;
        })
        .join("");
    }
    
    const templatePokemon = pokemon => {
        const {name, sprites, weight, height, types, abilities} = pokemon; 
        contenedor.innerHTML = '';

        const pokemonHTML = `
        <div class="pokeCard">
        <img src="${sprites.front_default}" alt="${name}"/>
        <div class="types">
            ${pokeTypes(types)}
        </div>
        <ul class="infoList"> 
        <li>Nombre: ${name}</li>
        
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
            <img width="200" height="200" src="https://i.gifer.com/WBv.gif"> 
            </div>
        `;
        contenedor.innerHTML += pokemonHTML; 
        }
    }
    renderPokemon();
})

