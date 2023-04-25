import styles from "./input.module.css"

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label:string
}

const Input = ({label,...props}:inputProps) => {
  return (
    <div className={styles.box}>
        <input {...props} required type={props.type ? props.type : "text"}/>
        <span >{label}</span>
    </div>
  )
}

export default Input