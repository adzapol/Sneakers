import Card from '../components/Card';

function Home({
  sneakers,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onFavorite,
  onClearInput,
  onAddToCart,
}) {
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

      <div className="d-flex flex-wrap">
        {sneakers
          .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj) => (
            <Card
              key={obj.id}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClickFavorite={(sneakersObj) => onFavorite(sneakersObj)}
              onClickPlus={(sneakersObj) => onAddToCart(sneakersObj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
