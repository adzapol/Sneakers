import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartSneakers, setCartSneakers] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpenet] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://60df75c5abbdd9001722d3dc.mockapi.io/sneakers')
      .then((res) => setSneakers(res.data));
    axios
      .get('https://60df75c5abbdd9001722d3dc.mockapi.io/cart')
      .then((res) => setCartSneakers(res.data));
    axios
      .get('https://60df75c5abbdd9001722d3dc.mockapi.io/favorites')
      .then((res) => setFavorites(res.data));
  }, []);

  const onAddToCart = (sneakersObj) => {
    axios.post('https://60df75c5abbdd9001722d3dc.mockapi.io/cart', sneakersObj);
    setCartSneakers((prev) => [...prev, sneakersObj]);
  };

  const onRemoveCart = (id) => {
    axios.delete(`https://60df75c5abbdd9001722d3dc.mockapi.io/cart/${id}`);
    setCartSneakers((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavorite = (sneakersObj) => {
    if (favorites.find((obj) => obj.id === sneakersObj.id)) {
      axios.delete(`https://60df75c5abbdd9001722d3dc.mockapi.io/favorites/${sneakersObj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== sneakersObj.id));
    } else {
      axios.post('https://60df75c5abbdd9001722d3dc.mockapi.io/favorites', sneakersObj);
      setFavorites((prev) => [...prev, sneakersObj]);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearInput = () => {
    setSearchValue('');
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          sneakers={cartSneakers}
          onClose={() => setCartOpenet(false)}
          onRemove={onRemoveCart}
        />
      )}

      <Header onClickCart={() => setCartOpenet(true)} />

      <Route path="/" exact>
        <Home
          sneakers={sneakers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onFavorite={onFavorite}
          onClearInput={onClearInput}
          onAddToCart={onAddToCart}
        />
      </Route>
      <Route path="/favorites" exact>
        <Favorites items={favorites} onFavorite={onFavorite} />
      </Route>
    </div>
  );
}

export default App;

// React.useEffect(() => {
//   fetch('https://60df75c5abbdd9001722d3dc.mockapi.io/sneakers')
//     .then((response) => response.json())
//     .then((data) => {
//       setSneakers(data);
//     });
// }, []);
