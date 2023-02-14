import styles from "./dealSmall.module.css";
import Image from "next/image";
import { Service } from "../../../../../../interfaces/services.interface";

interface Props {
  deal: Service;
}

export default function DealSmall({ deal }: Props) {
  return (
    <div className={styles.dealSmall}>
      <Image
        src={deal.banner_image}
        alt="banner"
        width={300}
        height={300}
        className={styles.image}
      />

      <div className={styles.infoPrice}>
        <div className={styles.discount}>
          {deal.discount_percentage}% DISCOUNT
        </div>
        <span>{deal.name}</span>
        <div className={styles.price}>
          <div>FROM</div>
          <span>{`£${deal.initPrice}`}</span>
        </div>
      </div>
    </div>
  );
}
