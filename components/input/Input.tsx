import { LegacyRef } from "react";
import styles from "./input.module.css";

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
  ref?: LegacyRef<HTMLInputElement> | undefined
};

const Input = ({ label,ref,invalid = false,...props }: inputProps) => {
  const classInput = invalid ? styles.invalid : "";
  const classLabel = invalid ? styles.labelInvalid : "";

  return (
    <div className={styles.box}>
      <input
        ref={ref}
        {...props}
        type={props.type ? props.type : "text"}
        className={classInput}
      />
      <span className={classLabel}>{label}</span>
    </div>
  );
};

export default Input;
