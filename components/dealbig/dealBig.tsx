import styles from "./dealBig.module.css";
import Image from "next/image";
import { Service } from "../../../../../../interfaces/services.interface";

interface Props {
  deal: Service;
}

export default function DealBig({ deal }: Props) {
  return (
    <div className={styles.bigDeal}>
      <Image
        src={deal.banner_image}
        alt="banner"
        width={400}
        height={400}
        className={styles.image}
      />
      <div className={styles.description}>
        <span>{deal.name}</span>
        <div dangerouslySetInnerHTML={{ __html: deal.description }}></div>
      </div>
      <div className={styles.infoPrice}>
        <div className={styles.discount}>
          {deal.discount_percentage}% DISCOUNT
        </div>
        <div className={styles.price}>
          <div>FROM</div>
          <span>{`£${deal.initPrice}`}</span>
        </div>
      </div>
    </div>
  );
}
