import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import changePageHandler from "../../helpers/changePageHandler";
import ImageMasonry from "../PokemonList/PokemonListMasony";
import PokemonInformation from '../PokemonInformation/PokemonInfo';
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./PokemonHome.css";

const initialState = {
  limit: 20,
  offset: 0,
  currentPage: 1,
};

// also try and stash the information that are already fetched.

const PokemonHome = () => {
  // states
  const [pokemonData, setPokemonData] = useState([]);
  const [totalPokemonData, setTotalPokemonData] = useState("");
  const [paginationState, dispatch] = useReducer(
    changePageHandler,
    initialState
  );
  const [pokedexVersion] = useState("1.0.0");
  const [displaySelectedPokemon, setDisplaySelectedPokemon] = useState(null);

  useEffect(() => {
    const getPokemUrl = `https://pokeapi.co/api/v2/pokemon?limit=${paginationState.limit}&offset=${paginationState.offset}`;

    axios.get(getPokemUrl).then(({ data }) => {
      try {
        const { count, results } = data;
        console.log("result", count, results);
        setTotalPokemonData(count);
        setPokemonData(results);
      } catch (e) {
        throw new Error(e);
      }
    });
  }, [paginationState]);

  useEffect(() => {
    setDisplaySelectedPokemon(null);
  }, []);

  // handle Pagination
  const LeftSwitch = () => {
    dispatch({ type: "previous" });
  };

  const RightSwitch = () => {
    dispatch({ type: "next" });
  };

  const resetButton = () => {
    dispatch({ type: "reset" });
  };

  const getPaginationHandler = () => {
    return (
      <div className="nav">
        <div className="pageArrows">
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
        </div>
        <div className="resetButton" onClick={() => resetButton()}>
          RESET
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="pokedex">
      <p className="pokedexTitle">POKEDEX V1.0</p>
      <p className="totalpokemon">KNOWN POKEMONS: {totalPokemonData}</p>
      <ImageMasonry
        pokemonData={pokemonData}
        setDisplaySelectedPokemon={setDisplaySelectedPokemon}
      />
      <p className="version">Version: {pokedexVersion}</p>
      <div className="pagination">{getPaginationHandler()}</div>
    </div>
    {
        displaySelectedPokemon && (
          <PokemonInformation selectedPokemonData={displaySelectedPokemon}/>
        )
    }
    </>
  );
};

export default PokemonHome;
