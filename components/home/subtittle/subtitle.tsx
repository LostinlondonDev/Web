import styles from "./subtittle.module.css";
import Image from "next/image";

interface Props {
    subtitle: string
}

export default function SubTittle({subtitle}: Props) {
    return (
      <div className={styles.subTitleProducts}>
            <Image
              src="/imagenes/arrow_right.png"
              alt="arrow"
              width={30}
              height={30}
            />
            <span>{subtitle}</span>
          </div>
    );
  }