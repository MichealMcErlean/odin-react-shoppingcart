import styles from './AddToCartButton.module.css'

export default function CartButton(props) {
  const {text, onClick} = props;

  return (
    <button className={styles.cartButton}
      type='button'
      onClick={onClick} 
    >
      {text}
    </button>

  )

}