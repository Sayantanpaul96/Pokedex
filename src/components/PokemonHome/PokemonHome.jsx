import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import SpinnerLoader from '../shared/loadingSpinner';
import changePageHandler from "../../helpers/changePageHandler";
import ImageMasonry from "../PokemonList/PokemonListMasony";
import PokemonInformation from "../PokemonInformation/PokemonInfo";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./PokemonHome.css";
import packageJson from "../../../package.json";

const initialState = {
  limit: 20,
  offset: 0,
  currentPage: 1,
};

// also try and stash the information that are already fetched.
// add a loding infromation to the get information handler.

const PokemonHome = () => {
  // constants
  const pokedexVersion = packageJson.version;

  // states
  const [pokemonData, setPokemonData] = useState([]);
  const [totalPokemonData, setTotalPokemonData] = useState("");
  const [loadingPokemon, setLoadingPokemon] = useState(true);
  const [paginationState, dispatch] = useReducer(
    changePageHandler,
    initialState,
  );
  const [displaySelectedPokemon, setDisplaySelectedPokemon] = useState(null);

  useEffect(() => {
    setLoadingPokemon(true);

    const getPokemUrl = `https://pokeapi.co/api/v2/pokemon?limit=${paginationState.limit}&offset=${paginationState.offset}`;

    axios.get(getPokemUrl).then(({ data }) => {
      try {
        const { count, results } = data;
        setTotalPokemonData(count);
        setPokemonData(results);
      } catch (e) {
        throw new Error(e);
      } finally {
        setLoadingPokemon(false);
      }
    });
  }, [paginationState]);

  useEffect(() => {
    setDisplaySelectedPokemon(null);
  }, []);

  // handle Pagination
  const LeftSwitch = () => {
    setDisplaySelectedPokemon(null);
    dispatch({ type: "previous" });
  };

  const RightSwitch = () => {
    setDisplaySelectedPokemon(null);
    dispatch({ type: "next" });
  };

  const resetButton = () => {
    setDisplaySelectedPokemon(null);
    dispatch({ type: "reset" });
  };

  const getPaginationHandler = () => {
    return (
      <div className="nav">
        {/* only show page navigation in the case of main table */}
        {displaySelectedPokemon ? null : <div className="pageArrows"> 
          {paginationState.currentPage !== 1 && (
            <DoubleLeftOutlined
              className="arrows"
              onClick={() => LeftSwitch()}
            />
          )}{" "}
          {paginationState.currentPage}{" "}
          {paginationState.currentPage <= totalPokemonData && (
            <DoubleRightOutlined
              className="arrows"
              onClick={() => RightSwitch()}
            />
          )}
        </div>}
        <div className="resetButton" onClick={() => resetButton()}>
          RESET
        </div>
      </div>
    );
  };

  const displayPokemonList = () => {
    if (loadingPokemon) {
      return(<SpinnerLoader />)
    } else {
      if (pokemonData.length === 0) {
        return <div>No pokemon to display</div>;
      }
      return (
        <ImageMasonry
          pokemonData={pokemonData}
          setDisplaySelectedPokemon={setDisplaySelectedPokemon}
        />
      );
    }
  };

  const toggleDisplay = () => {
    return displaySelectedPokemon ? <PokemonInformation selectedPokemonData={displaySelectedPokemon} /> : displayPokemonList()
  }

  return (
    <>
      <div className="pokedex">
        <p className="pokedexTitle">POKEDEX V1.0</p>
        <p className="totalpokemon">KNOWN POKEMONS: {totalPokemonData}</p>
          {toggleDisplay()}
        <p className="version">Version: {pokedexVersion}</p>
        <div className="pagination">{getPaginationHandler()}</div>
      </div>
    </>
  );
};

export default PokemonHome;
