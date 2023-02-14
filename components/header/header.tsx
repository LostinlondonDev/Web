import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SelectLenguage from "../selectLenguaje/SelectLenguage";

export default function Header() {
 
  return (
    <header>
      <nav className={styles.nav}>
        <span>LOGO</span>
        <div className={styles.icons}>
          <SelectLenguage/>
          <Image
            src="/imagenes/person.svg"
            alt="person Icon"
            width={30}
            height={30}
            className={styles.icon}
          />
          <Image
            src="/imagenes/shop.svg"
            alt="shop Icon"
            width={30}
            height={30}
            className={styles.icon}
          />
      
        </div>
      </nav>
    </header>
  );
}
