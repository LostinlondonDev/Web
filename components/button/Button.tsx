import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

const Button = ({ size = "medium", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        props.className ? `${styles.button} ${props.className}` : styles.button
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
