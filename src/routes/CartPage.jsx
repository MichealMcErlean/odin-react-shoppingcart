import styles from './CartPage.module.css'
import { useOutletContext } from 'react-router'
import {useState, useEffect} from 'react'
import ListItem from '../components/ListItem.jsx'

export default function CartPage() {

  const [cart, setCart] = useOutletContext();

  let listItems = cart.map(item => {
      return <ListItem
                key={item.name}
                name = {item.name}
                quantity = {item.quantity}
              />;
    })

  if (listItems.length < 1 ) {
    listItems = <h1>Your cart is empty. Why you holding out on Mukguk?</h1>
  }

  return (
    <div id="cartframe" className={styles.cartframe}>
      <h1 className={styles.cartframeh1}>Your Shopping Cart</h1>
      {listItems}
    </div>
  )
}