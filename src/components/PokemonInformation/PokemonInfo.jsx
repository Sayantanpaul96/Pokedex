import axios from "axios";
import { useEffect } from "react"

const PokemonInformation = ({ selectedPokemonData }) => {
    useEffect(() => {
        axios.get(selectedPokemonData.url).then(({ data }) => {
          try {
            console.log(data)
          } catch (e) {
            throw new Error(e);
          }
        }); 
    }, [selectedPokemonData])
}

export default PokemonInformation