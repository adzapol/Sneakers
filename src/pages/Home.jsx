import React from 'react';
import Card from '../components/Card';

function Home({
  sneakers,
  searchValue,
  onChangeSearchInput,
  onFavorite,
  onClearInput,
  onAddToCart,
  cartSneakers,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = sneakers.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [...Array(12)] : filtredItems).map((obj, index) => (
      <Card
        key={index}
        onClickFavorite={(sneakersObj) => onFavorite(sneakersObj)}
        onClickPlus={(sneakersObj) => onAddToCart(sneakersObj)}
        loading={isLoading}
        {...obj}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={onClearInput}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
