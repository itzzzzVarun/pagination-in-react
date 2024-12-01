import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const res =  await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
    const data = await res.json();
    console.log(data.products)
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && 
        selectedPage <= totalPages && 
        selectedPage !== page) {
          setPage(selectedPage);
      }
  }
  useEffect(() => {
    fetchProducts();
  },[page])

  return (
    <div>
      {
        products.length>0 && (
          <div className='products'>
            {products.map((prop) => {
              return <div key={prop.id} className='products__single'>
                <img src={prop.thumbnail} alt={prop.title} />
                <p>{prop.title}</p>
              </div>
            })}
          </div>
        )}
        {
          products.length > 0 && (
            <div className='pagination'>
              <span 
                  className={page > 1? "":"disabled"}
                  onClick={() => {selectPageHandler(page-1)}}>
                    👈
                </span>
              {
                [...Array(products.length)].map((_,i) => {return <span 
                      className={page  === i + 1 ? "pagination__selected":""}
                      onClick={() => {selectPageHandler(i+1)}} key={i}> {i + 1} 
                  </span>
                })}
              <span 
                  className={page < totalPages ? "":"disabled"}
                  onClick={() => {selectPageHandler(page+1)}}>
                  👉
               </span>
            </div>
          )
        }
    </div>
  )
}

export default App
