import React from 'react';

import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartSneakers, setCartSneakers] = React.useState([]);
  const [cartOpened, setCartOpenet] = React.useState(false);

  React.useEffect(() => {
    fetch('https://60df75c5abbdd9001722d3dc.mockapi.io/sneakers')
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data);
      });
  }, []);

  const onAddToCart = (sneakersObj) => {
    setCartSneakers((prev) => [...prev, sneakersObj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer sneakers={cartSneakers} onClose={() => setCartOpenet(false)} />}

      <Header onClickCart={() => setCartOpenet(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {sneakers.map((obj) => (
            <Card
              key={obj.id}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClickFavorite={() => console.log('Нажали на избранное')}
              onClickPlus={(sneakersObj) => onAddToCart(sneakersObj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
