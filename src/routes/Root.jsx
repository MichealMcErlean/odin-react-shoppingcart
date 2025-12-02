import styles from './Root.module.css'
import { Outlet, Link } from 'react-router'
import {useState, useEffect} from 'react';

export default function Root() {

  const [cart, setCart] = useState([]);
  const [saleItems, setSaleItems] = useState(null)

  const getCartTotal = () => {
    if (cart.length < 1) {
      return 0;
    } else {
      return cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0)
    }
  }

  

  return (
    <div id='body' className={styles.body}>
      <div id="sidebar" className={styles.sidebar}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to='/shop' className={styles.link}>Shop</Link>
        <Link to='/cart' className={styles.link}>
          Cart <span className={styles.cartTotal}>{getCartTotal()}</span>
        </Link>
      </div>
      <div id="child" className={styles.child}>
        <Outlet context = {[cart, setCart]}/>
      </div>
    </div>
  )
}