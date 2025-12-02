import styles from './TextField.module.css';

export default function TextField(props) {

  const { name, quantity, onChange} =  props;

  return (
    <input 
      type="number" 
      name={name} 
      className={styles.textfield} 
      onChange={onChange}
      value={quantity}
    />
  )
}