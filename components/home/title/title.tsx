import Image from "next/image";
import styles from "./title.module.css";

interface Props {
    title: string
}

export default function Tittle({title}: Props) {
  return (
    <div className={styles.titleProducts}>
          <Image
            src="/imagenes/arrow_right.png"
            alt="arrow"
            width={30}
            height={30}
          />
          <span>{title}</span>
          <Image
            src="/imagenes/arrow_left.png"
            alt="arrow"
            width={30}
            height={30}
          />
        </div>
  );
}