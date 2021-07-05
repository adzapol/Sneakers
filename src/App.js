import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

import AppContext from './context';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartSneakers, setCartSneakers] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpenet] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://60df75c5abbdd9001722d3dc.mockapi.io/cart');
      const favoritesResponse = await axios.get(
        'https://60df75c5abbdd9001722d3dc.mockapi.io/favorites',
      );
      const sneakersResponse = await axios.get(
        'https://60df75c5abbdd9001722d3dc.mockapi.io/sneakers',
      );

      setIsLoading(false);
      setCartSneakers(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setSneakers(sneakersResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (sneakersObj) => {
    try {
      if (cartSneakers.find((item) => Number(item.id) === Number(sneakersObj.id))) {
        axios.delete(`https://60df75c5abbdd9001722d3dc.mockapi.io/cart/${sneakersObj.id}`);
        setCartSneakers((prev) =>
          prev.filter((item) => Number(item.id) !== Number(sneakersObj.id)),
        );
      } else {
        axios.post('https://60df75c5abbdd9001722d3dc.mockapi.io/cart', sneakersObj);
        setCartSneakers((prev) => [...prev, sneakersObj]);
      }
    } catch (error) {
      alert('');
    }
  };

  const onRemoveCart = (id) => {
    axios.delete(`https://60df75c5abbdd9001722d3dc.mockapi.io/cart/${id}`);
    setCartSneakers((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavorite = async (sneakersObj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(sneakersObj.id))) {
        axios.delete(`https://60df75c5abbdd9001722d3dc.mockapi.io/favorites/${sneakersObj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(sneakersObj.id)));
      } else {
        const { data } = await axios.post(
          'https://60df75c5abbdd9001722d3dc.mockapi.io/favorites',
          sneakersObj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearInput = () => {
    setSearchValue('');
  };

  const isItemAdded = (id) => {
    return cartSneakers.some((item) => Number(item.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cartSneakers,
        favorites,
        isItemAdded,
        onFavorite,
        setCartOpenet,
        setCartSneakers,
      }}>
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
            cartSneakers={cartSneakers}
            sneakers={sneakers}
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            onFavorite={onFavorite}
            onClearInput={onClearInput}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
