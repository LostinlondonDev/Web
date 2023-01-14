import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { changeLanguage } from "../../i18";

export default function Header() {
  const { pathname, locales ,query ,asPath} = useRouter();
  return (
    <header>
      <nav className={styles.nav}>
        <span>LOGO</span>
        <div className={styles.icons}>
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
          {locales?.map((locale) => (
            <Link href={{pathname,query}} as={asPath} locale={locale} key={"loc-" + locale}>
              {locale}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
