import axios from "axios";
import { useEffect, useState } from "react";
import { Collapse } from "antd";
import SpinnerLoader from '../shared/loadingSpinner'

const PokemonInformation = ({ selectedPokemonData }) => {

  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const capitalizeName = (stringData) => {
    return stringData.charAt(0).toUpperCase() + stringData.slice(1)
  }

  const getPokemonMoves = async (pokemon) => {
    return pokemon.moves.map(({ move }) => capitalizeName(move.name))
  };
  
  const getPokemonAbilities = async (pokemon) => {
    return pokemon.abilities.map(({ ability }) => capitalizeName(ability.name))
  }
  
  useEffect(() => {
    setLoading(true);

    const processPokemonInformation =  async (pokemonData) => {
      // add a default data for this.
      const data= [];
      
      const getMoves = await getPokemonMoves(pokemonData);
      const getAbilities = await getPokemonAbilities(pokemonData);
      data.push({
        key: 1,
        label: 'Basic Information',
        children: <>
          Name: {capitalizeName(pokemonData.name)} <br />
          Height: {pokemonData.height} meters <br />
          Weight: {pokemonData.weight} kilograms <br />
        </>
      }, {
        key: 2,
        label: 'Moves',
        children: getMoves.slice(0, 10).join(", "),
      }, {
        key: 3,
        label: 'Abilities',
        children: getAbilities.join(", "),
      });
  
      return data;
    };

    axios.get(selectedPokemonData.url).then(async ({ data }) => {
      try {
        // add a loding functionality here as well
        setName(data.name);
        const processedData = await processPokemonInformation(data);
        setPokemonInfo(processedData);
      } catch (e) {
        throw new Error(e);
      } finally {
        setLoading(false)
      }
    });
  }, [selectedPokemonData]);

  const getItemsToDisplay = () => {
    if(loading) {
      <SpinnerLoader />
    } else {
      return (
        <>
        <h2 style={{ alignItems:'center', }}>{capitalizeName(name)}</h2>
        <Collapse items={pokemonInfo} style={{ background: 'white', opacity: '80%'}}/>
        </>
      )
    }
  };

  return (<>
    {getItemsToDisplay()}
  </>);
};

export default PokemonInformation;
