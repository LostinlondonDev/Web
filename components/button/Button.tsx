
import { Spiner } from "../spinner/spinner";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  loading?: boolean;
};

const Button = ({ size = "medium",loading = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        props.className ? `${styles.button} ${props.className}` : styles.button
      }
    >
      {loading && <Spiner size={20}/>}
      {props.children}
    </button>
  );
};

export default Button;
