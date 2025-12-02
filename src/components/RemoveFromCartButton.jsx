import styles from './RemoveFromCartButton.module.css'

export default function RemoveFromCartButton({text, onClick}) {

  return (
    <button className={styles.button}
      type='button'
      onClick={onClick}
    >
      {text}
    </button>
  )
}