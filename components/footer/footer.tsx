import Image from "next/image";
import { traslate } from "../../i18";
import { Category } from "../../interfaces/category.interface";
import styles from "./footer.module.css";

interface Props {
  categories: Category[]
}



export default  function Footer({ categories }: Props) {

  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Logo</span>
      <div className={styles.about}>
        <div className={styles.title}>
          <span> {traslate("ABOUT_US")}</span>
          <span> {traslate("SERVICES")}</span>
        </div>
        <div className={styles.categories}>
          {categories.map((category) => (
            <span key={category._id}>{category.name.toUpperCase()}</span>
          ))}
        </div>
      </div>
      <div className={styles.contacts}>
        <span>{traslate("CONTACT_US")}</span>
        <div className={styles.dataContact}>
          <div>Tel: + 44 203 026 0378</div>
          <div>www.lostinlondon.com</div>
        </div>
        <div className={styles.footerIcons}>
          <Image
            src="/imagenes/twiter.png"
            alt="twiter"
            width={40}
            height={40}
          />
          <Image
            src="/imagenes/facebook.png"
            alt="twiter"
            width={40}
            height={40}
          />
          <Image
            src="/imagenes/instagram.png"
            alt="twiter"
            width={40}
            height={40}
          />
        </div>
        <div className={styles.helpTittle}>{traslate("HELP_AND_SUPPORT")}</div>
      </div>
      <div className={styles.payment}>
        <div>{traslate("PAYMENT_METHOD")}</div>
        <div className={styles.footerIcons}>
          <Image
            src="/imagenes/american.png"
            alt="twiter"
            width={50}
            height={30}
          />
          <Image
            src="/imagenes/master.png"
            alt="twiter"
            width={50}
            height={30}
          />
          <Image src="/imagenes/visa.png" alt="twiter" width={50} height={30} />
        </div>
        <span className={styles.terms}>{traslate("TERMS_AND_CONDITIONS")}</span>
      </div>
    </footer>
  );
}
