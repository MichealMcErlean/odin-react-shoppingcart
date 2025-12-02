import { useOutletContext } from "react-router"
import styles from './ListItem.module.css'
import { useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import RemoveFromCartButton from "./RemoveFromCartButton";


export default function ListItem(props) {
  const localName = props.name;
  const quant = props.quantity;
  const [cart, setCart] = useOutletContext();
  const [quantity, setQuantity] = useState(quant);
  

  function updateCart(nameToUpdate, newQuantity) {
    let cartcopy = [...cart];
    let updated = cartcopy.map(item => {
      console.log(localName);
      console.log(item.name);
      console.log(newQuantity)
      const nameInCart = String(item.name).trim();
      const nameToMatch = String(nameToUpdate).trim();
      if (nameInCart == nameToMatch){
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    console.log(updated)
    setCart(updated);
  }

  function handleIncrement() {
    setQuantity(prev => prev + 1);
    updateCart(localName, quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      updateCart(localName, quantity - 1);
    }
  }

  function handleChange(e) {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue) && newValue > 0) {
      setQuantity(newValue);
    } else {
      setQuantity(0);
    }
    updateCart(localName, newValue);
  }

  function handleRemoveFromCart() {
    let confirmed = confirm('This will remove the item from your cart. Continue?');
    if (confirmed) {
      let newCart = cart.filter(item => {
        return String(item.name).trim() != String(localName).trim();
      });
      setCart(prev => newCart);
    }
  }

  return(
    <div className={styles.itemframe}>
      <p>{localName}</p>
      <Button 
        text='-' 
        onClick={handleDecrement} 
      />
      <TextField 
        name='quantityField'
        quantity={quantity}
        onChange={handleChange}
      />
      <Button 
        text='+' 
        onClick={handleIncrement}
      />
      <RemoveFromCartButton 
        text='Remove'
        onClick={handleRemoveFromCart}
      />
    </div>
  )
}