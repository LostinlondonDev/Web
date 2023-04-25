import Link from "next/link";
import styles from "./breadcrumbs.module.css"

interface links {
  href:string,
  label:string
}


interface IProps {
  links:links[]
}
const Breadcrumb = ({ links }: IProps) => {

  return <ul className={styles.breadcrumbs}>
    {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className={index === links.length - 1 ? styles.active : ""}>{link.label}</Link>
          {index < links.length - 1 && <span> &gt; </span>}
        </li>
      ))}
  </ul>
};

export default Breadcrumb;
