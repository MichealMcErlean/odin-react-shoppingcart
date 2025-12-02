import styles from './ShopPage.module.css'
import Card from '../components/Card'
import { useOutletContext } from 'react-router'
import {useState, useEffect} from 'react'

export default function ShopPage() {

  const [cart, setCart] = useOutletContext();
  const [saleItems, setSaleItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const itemUrl = 'https://fakeapi.net/products?page=1&limit=12&category=electronics&price={"min":100,"max":1000}';
    const fetchItems = async() => {
      try {
        const itemsRaw = await fetch(itemUrl);
        if (!itemsRaw.ok){
          throw new Error(`HTTP error! Status: ${itemsRaw.status}`)
        }
        const items = await itemsRaw.json();
        console.log(items);
        let itemPairs = [];
        items.data.forEach(datum => {
          let newPair = {
            name: datum.title,
            image: datum.image
          }
          itemPairs.push(newPair);
        });
        setSaleItems(itemPairs)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  function makeCards(saleItems) {
    let cards = saleItems.map(item => {
      return (
        <Card 
          key={item.name}
          name={item.name}
          image={item.image}
        />
      )
    });
    return cards;
  }

  if (isLoading) {
    return (
      <div id="shopframe" className={styles.shopframe}>
        <h1>Loading Data...</h1>
      </div>
    )
  }
  if (error) {
    return (
      <div id="shopframe" className={styles.shopframe}>
        <h1>Error: {error.message}</h1>
      </div>
    )
  }
  return (
    <div id="shopframe" className={styles.shopframe}>
      {makeCards(saleItems)}
    </div>
  )
}