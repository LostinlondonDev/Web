"use client";
import styles from "./spinner.module.css";

interface Props {
  size?: number;
}

export const Spiner = ({ size }: Props) => {
  return (
    <div
      className={styles.spiner}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderLeftColor: "white",
      }}
    ></div>
  );
};
