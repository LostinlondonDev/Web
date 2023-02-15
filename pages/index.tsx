import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layaout";
import { traslate } from "../i18";
import { Env } from "../class/env.class";
import { Category } from "../interfaces/category.interface";
import { GetStaticPropsResult } from "next";
import { Service } from "../interfaces/services.interface";
import Tittle from "../components/home/title/title";
import Sections from "../components/home/sections/sections";
import SubTittle from "../components/home/subtittle/subtitle";
import Swiper from "../components/home/swiper/swiper";
import Deals from "../components/home/deals/deals";
import Search from "../components/home/search/search";
import CategoryCard from "../components/home/category/category";


interface Props {
  categories: Category[];
  services: Service[];
  deals: Service[];
}

export default function Home({ categories, services, deals }: Props) {
  const sections = [
    "UPCOMING_FOOTBALL",
    "TOP_ATTRACTIONS",
    "GREAT_DESTINATIONS",
    "MOST_POPULAR_SHOWS",
  ].map((section) => traslate(section));
  return (
    <Layout>
      <Head>
        <title>LostInLondon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.banner}>
        <div className={styles.singAgent}>
          <Image
            src="/imagenes/login-agent.png"
            alt="login-agent"
            height={20}
            width={20}
          />
          <span>Agent Login</span>
        </div>
        <div className={styles.title}>
          <span>{traslate("titleInit")}</span>
          <span>{traslate("titleEnd")}</span>
          <Search />
        </div>
      </section>
      <section className={styles.categories}>
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </section>
      <section className={styles.products}>
        <div className={styles.dealsTittle}>
          <Tittle title={traslate("DEALS_OFFERS")} />
          <Sections sections={sections} />
        </div>
        <div className={styles.swiperWhite}>
          <SubTittle subtitle={traslate("UPCOMING_FOOTBALL")} />
          <section className={styles.services}>
            <Swiper services={services} backGroundColorCard="#f1f1f1" />
          </section>
        </div>
        <div className={styles.swiperGray}>
          <SubTittle subtitle={traslate("TOP_ATTRACTIONS")} />
          <section className={styles.services}>
            <Swiper services={services} />
          </section>
        </div>
        <div className={styles.swiperWhite}>
          <SubTittle subtitle={traslate("GREAT_DESTINATIONS")} />
          <section className={styles.services}>
            <Swiper services={services} backGroundColorCard="#f1f1f1" />
          </section>
        </div>
        <div className={styles.swiperGray}>
          <SubTittle subtitle={traslate("MOST_POPULAR_SHOWS")} />
          <section className={styles.services}>
            <Swiper services={services} />
          </section>
        </div>
        <div className={styles.swiperWhite}>
          <SubTittle subtitle={traslate("DEALS_AND_OFFERS")} />
          <Deals deals={deals}/>
        </div>
        <div className={styles.moreDeal}>
          <span>{traslate("SEE_MORE_DEALS")}</span>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const responses = await Promise.all([
    fetch(`${Env.apiUrl}/categories`),
    fetch("http://localhost:4500/services"),
    fetch("http://localhost:4500/deals"),
  ]);
  const [categories, services,deals] = await Promise.all(
    responses.map((response) => response.json())
  );
  return {
    props: { categories, services, deals },
  };
}
