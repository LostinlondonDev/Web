import styles from "./category.module.css";

import Image from "next/image";
import { Category } from "../../interfaces/category.interface";
interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {


  return (
    <div className={`${styles.category} ${styles[category.route]}`}>
      <Image
        src={`/imagenes/${category.icon}`}
        height={40}
        width={40}
        alt={category.icon}
      />
      <span>{category.name}</span>
    </div>
  );
}
