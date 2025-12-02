import styles from './Button.module.css'

export default function Button(props) {
  const {text, onClick} = props;

  return (
    <button className={styles.smallButton}
      type='button'
      onClick={onClick} 
    >
      {text}
    </button>

  )

}