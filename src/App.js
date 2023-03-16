import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./components/Collection";

function App() {

  const categories = [
      { "name": "Все" },
      { "name": "Море" },
      { "name": "Горы" },
      { "name": "Архитектура" },
      { "name": "Города" }
  ];

  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
      setIsLoading(true);

      const category = categoryId ? `category=${categoryId}` : '';

      fetch(`https://6412df6a3b71064737581a13.mockapi.io/collections/v1/collections?page=${page}&limit=3&${category}`)
          .then((data) => data.json())
          .then((json) => {
                  setCollections(json);
                  console.log(json)
          })
          .catch((err) => console.warn(err))
          .finally(() => setIsLoading(false))
  },[categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {
                categories.map((obj, index) => (
                    <li onClick={() => setCategoryId(index)}
                        className={categoryId === index ? 'active' : ''}
                        key={index}
                    >{obj.name}</li>
                ))
            }
        </ul>
        <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="search-input"
            placeholder="Поиск по названию" />
      </div>
      <div className="content">

          {
              isLoading ?
                  (<h1>Идет загрузка...</h1>)
                  : (
                      collections
                          .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                          .map((obj, index) => (
                              <Collection
                                  key={index}
                                  name={obj.name}
                                  images={obj.photos}
                              />))
                  )
          }
      </div>
      <ul className="pagination">
          {
              [...Array(5)].map((_, index) =>
                  <li className={page === index + 1 ? 'active' : ''}
                      onClick={() => setPage(index + 1)}
                      key={index}>{index + 1}</li>)
          }
      </ul>
    </div>
  );
}

export default App;
