import styles from './Card.module.css'
import Button from './Button.jsx'
import AddToCartButton from './AddToCartButton.jsx'
import TextField from './TextField.jsx';
import {useState} from 'react';
import { useOutletContext } from 'react-router';

export default function Card(props) {
  const {name, image} = props;
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useOutletContext();

  function handleIncrement() {
    setQuantity(prevQ => parseInt(prevQ, 10) + 1);
  }

  function handleDecrement() {
    if (quantity > 0) {
      setQuantity(prevQ => parseInt(prevQ, 10) - 1)
    }
  }

  function handleQuantChange(e) {
    // setQuantity(e.target.value);
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue)) {
      setQuantity(newValue);
    } else {
      setQuantity(0);
    }
  }

  function handleCartChange(e) {
    if (quantity < 1) {
      alert('Cannot purchase 0 of an item.')
    } else {
      const name = e.target.parentElement.firstChild.textContent;

      let isDuplicate = false;
      let workingcart = [...cart];
      let newCart = workingcart.map(item => {
        if (item.name == name) {
          isDuplicate = true;
          return {
            ...item,
            quantity: item.quantity + quantity
          }
        }
        return item;
      })
      if (isDuplicate) {
        setCart(newCart);
      } else {
        let newCartItem = {
          name: name,
          quantity: quantity
        };
        setCart(prev => [...prev, newCartItem]);
      } 
      setQuantity(prev => 0);
    }
  }

  return (
    <div className={styles.cardframe}>
      <div className={styles.image}>
        <img src={image} alt="" />
      </div>
      <div className={styles.label}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <Button 
          text='-' 
          onClick={handleDecrement} 
        />
        <TextField 
          name='quantityField'
          quantity={quantity}
          onChange={handleQuantChange}
        />
        <Button 
          text='+' 
          onClick={handleIncrement}
        />
        <AddToCartButton 
          text='Add To Cart' 
          onClick={handleCartChange}
        />
      </div>

    </div>
  )
}