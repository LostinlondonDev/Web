import Image from "next/image";
import { useEffect, useState } from "react";
import { Service } from "../../interfaces/services.interface";

import styles from "./card.module.css";

interface Props {
  service: Service;
  backGroundColorCard?: string;
}

export default function CardService({ service, backGroundColorCard }: Props) {
  const [price, setPrice] = useState<{ pounts: string; peniques: string }>({
    pounts: "",
    peniques: "",
  });

  const getPrice = (initPrice: number) => {
    const [pounts, peniques] = initPrice.toString().split(".");
    return { pounts: `£${pounts}`, peniques: peniques ?? "00" };
  };

  useEffect(() => {
    const price = getPrice(service.initPrice);
    setPrice(price);
  }, [service]);

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: backGroundColorCard ?? "white" }}
    >
      <div className={styles.favorite}>
        {service.favorite ? (
          <Image
            src="/imagenes/favorite.png"
            width={25}
            height={25}
            alt="favorite"
          />
        ) : (
          <Image
            src="/imagenes/not_favorite.png"
            width={25}
            height={25}
            alt="not_favorite"
          />
        )}
      </div>
      <div>
        <Image
          src={service.card_image}
          alt="card-image"
          className={styles.image}
          width={500}
          height={500}
        />
      </div> 
      <div className={styles.description}>{service.name}</div>
      {service.not_avatible ? (
        <div className={styles.notAvatible}>
          <span>NOT AVAILABLE</span>
        </div>
      ) : (
        <div className={styles.price}>
          <span>{price.pounts}</span>
          <sup>{price.peniques}</sup>
        </div>
      )}
    </div>
  );
}
