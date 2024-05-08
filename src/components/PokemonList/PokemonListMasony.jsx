import { List } from "antd";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import "./PokemonList.css";

const ImageMasonry = ({ pokemonData, setDisplaySelectedPokemon }) => {
  useEffect(() => {
    setDisplayData(pokemonData);
  }, [pokemonData]);

  const [displayData, setDisplayData] = useState([]); // add the display data to scroll and work properly

  console.log("pokemonData", pokemonData);
  return (
    <List
      className="demo-loadmore-list"
      // loading={initLoading}
      itemLayout="horizontal"
      bordered={true}
      grid={{ gutter: displayData.length / 4, column: 4 }}
      size="medium"
      split={true}
      dataSource={displayData}
      renderItem={(item) => (
        <List.Item className="listItem">
          <List.Item.Meta
            onClick={() => setDisplaySelectedPokemon(item)}
            className="listItemMeta"
            title={<a className="pokemonName">{item.name.toUpperCase()}</a>}
          />
        </List.Item>
      )}
    />
  );
};

ImageMasonry.propTypes = {
  pokemonData: PropTypes.array,
  setDisplaySelectedPokemon: PropTypes.func,
};

export default ImageMasonry;
