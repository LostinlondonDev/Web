import styles from "./swiper.module.css";
import { Swiper as SwiperComponet, SwiperRef, SwiperSlide } from "swiper/react";
import CardService from "../cardService/card";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper";
import { Service } from "../../interfaces/services.interface";



interface Props {
  services: Service[];
  backGroundColorCard?: string;
}

export default function Swiper({ services, backGroundColorCard }: Props) {
  const swiperRef = useRef<SwiperRef>(null);
  const next = () => {
    swiperRef.current?.swiper.slideNext();
  };
  const back = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <>
      <SwiperComponet
        style={{
          height: "100%",
          boxSizing: "border-box",
        }}
        ref={swiperRef}
        spaceBetween={20}
        modules={[Autoplay,Navigation]}
        navigation={true}
        autoplay={{delay: 50000}}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service._id} className={styles.slideItem}>
            <CardService
              service={service}
              backGroundColorCard={backGroundColorCard}
            />
          </SwiperSlide>
        ))}
      </SwiperComponet>
      <button onClick={next} className={styles.buttonNext}>
        {">"}
      </button>
      <button onClick={back} className={styles.buttonBack}>
        {"<"}
      </button>
    </>
  );
}
