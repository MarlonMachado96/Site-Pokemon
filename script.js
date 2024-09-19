const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878'
  };
  
  const renderPokemonDetails = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
  
    if (data) {
      const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);
      const mainType = pokemonTypes[0]; 
  
      modalName.textContent = `Nome: ${data.name}`;
      modalId.textContent = `ID: ${data.id}`;
      modalType.textContent = `Tipo: ${pokemonTypes.join(", ")}`;
      modalWeight.textContent = `Peso: ${data.weight / 10} kg`;
      modalHeight.textContent = `Altura: ${data.height / 10} m`;
      modalImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
  
      const backgroundColor = typeColors[mainType] || '#fff'; 
      document.querySelector('.modal-content').style.backgroundColor = backgroundColor;
  
      modal.style.display = "block";
    }
  };
  
  const pokemonImage = document.querySelector('.pokemon__image');
  const pokemonNumber = document.querySelector('.pokemon__number');
  const pokemonName = document.querySelector('.pokemon__name');
  const form = document.querySelector('.form');
  const inputSearch = document.querySelector('.input__search');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const btnDetails = document.querySelector('.btn-details');
  
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");
  const modalName = document.querySelector(".modal__name");
  const modalId = document.querySelector(".modal__id");
  const modalType = document.querySelector(".modal__type");
  const modalWeight = document.querySelector(".modal__weight");
  const modalHeight = document.querySelector(".modal__height");
  const modalImage = document.querySelector(".modal__image");
  
  let currentPokemonId = 1;
  
  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
    return null;
  };
  
  const renderPokemon = async (pokemon) => {
    pokemonName.textContent = 'Carregando...';
    pokemonNumber.textContent = '';
  
    const data = await fetchPokemon(pokemon);
  
    if (data) {
      pokemonImage.style.display = 'block';
      pokemonName.textContent = data.name;
      pokemonNumber.textContent = data.id;
      pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
      currentPokemonId = data.id;
    } else {
      pokemonImage.style.display = 'none';
      pokemonName.textContent = 'Não encontrado';
      pokemonNumber.textContent = '';
    }
  };
  
  btnPrev.addEventListener('click', () => {
    if (currentPokemonId > 1) {
      currentPokemonId -= 1;
      renderPokemon(currentPokemonId);
    }
  });
  
  btnNext.addEventListener('click', () => {
    currentPokemonId += 1;
    renderPokemon(currentPokemonId);
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemon = inputSearch.value.toLowerCase();
    renderPokemon(pokemon);
    inputSearch.value = '';
  });
  
  btnDetails.addEventListener('click', () => {
    renderPokemonDetails(currentPokemonId);
  });
  
  closeModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
  
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  renderPokemon(currentPokemonId);
  

  const pokeball = document.getElementById('pokeball');

pokeball.addEventListener('click', () => {
    pokeball.classList.toggle('captured');
});


