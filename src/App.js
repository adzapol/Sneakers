import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';

const sneakers = [
  {
    id: 0,
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    imageUrl: '/img/sneakers/1.jpg',
  },
  {
    id: 1,
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 15600,
    imageUrl: '/img/sneakers/2.jpg',
  },
  {
    id: 2,
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    imageUrl: '/img/sneakers/3.jpg',
  },
  {
    id: 3,
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imageUrl: '/img/sneakers/4.jpg',
  },
  {
    id: 4,
    title: 'Мужские Кроссовки Under Armour Curry 8',
    price: 15199,
    imageUrl: '/img/sneakers/5.jpg',
  },
  {
    id: 5,
    title: 'Мужские Кроссовки Nike Kyrie 7',
    price: 11299,
    imageUrl: '/img/sneakers/6.jpg',
  },
  {
    id: 6,
    title: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 10799,
    imageUrl: '/img/sneakers/7.jpg',
  },
  {
    id: 7,
    title: 'Мужские Кроссовки Nike LeBron XVIII',
    price: 16499,
    imageUrl: '/img/sneakers/8.jpg',
  },
  {
    id: 8,
    title: 'Мужские Кроссовки Nike Lebron XVIII Low',
    price: 13999,
    imageUrl: '/img/sneakers/9.jpg',
  },
  {
    id: 9,
    title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
    price: 11299,
    imageUrl: '/img/sneakers/10.jpg',
  },
];

function App() {
  const onClickButton = (title) => {
    alert(title);
  };

  return (
    <div className="wrapper clear">
      <Drawer />

      <Header />

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
              onClickButton={() => onClickButton(obj.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
