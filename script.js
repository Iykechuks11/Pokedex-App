const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
  fire: '#fddfdf',
  grass: '#defde0',
  electric: '#fcf7de',
  water: '#def3fd',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#f5f5f5',
};

// I WANT TO MAKE THE NAMES OF THE COLORS VALUES IN AN OBJECT
const main_types = Object.keys(colors);
// console.log(main_types);

const fetchPokemons = async () => {
  for (let i = 1; i <= 24; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await axios(url);
  const data = res.data;
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  //   GETS THE POKEMON IMAGE
  const img = pokemon.sprites.front_default;
  //   GETS THE POKEMON NAME AND CAPITALIZES THE FIRST LETTER
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  //   GETS THE POKEMON ID AND PADS IT WITH DOUBLE ZERO'S USING padStart() METHOD
  const id = pokemon.id.toString().padStart(3, '0');
  //   GETS THE POKEMON TYPE
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  console.log(type);
  console.log(colors[type]);

  pokemonEl.classList.add('pokemon');

  const pokemonInnerHTML = `
        <img src="${img}" class="img-container" />
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  pokemonEl.style.background = colors[type];
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
