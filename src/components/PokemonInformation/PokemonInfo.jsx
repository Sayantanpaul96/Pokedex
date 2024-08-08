import axios from "axios";
import { useEffect, useState } from "react";
import { Collapse } from "antd";
import SpinnerLoader from '../shared/loadingSpinner'
import "./PokemonInfo.css";

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
        children: (
          <ul style={{ paddingInlineStart: '20px' }}>
            {getMoves.slice(0, 5).map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        ),
      }, {
        key: 3,
        label: 'Abilities',
        children: (
          <ul style={{ paddingInlineStart: '20px' }}>
            {getAbilities.map((ability, index) => (
              <li key={index}>{ability}</li>
            ))}
          </ul>
        ),
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
      return <SpinnerLoader className={"spinner"} />
    } else {
      return (
        <div className="container" style={{ height: "min-content" }}>
          <div className="header">
          <div className="pokemonImage">
            <img src="../../../assets/pokeball.png" alt="Pokemon Image" />
          </div>
          <h2 className="nameContainer">{capitalizeName(name)}</h2>
          </div>
          <Collapse items={pokemonInfo} className="collapse"/>
        </div>
      )
    }
  };

  return (<>
    {getItemsToDisplay()}
  </>);
};

export default PokemonInformation;