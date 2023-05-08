import { useRouter } from "next/router";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { traslateNs } from "../../i18";
import styles from "./../../styles/signup.module.css";
import { Category } from "../../interfaces/category.interface";
import { GetStaticPropsResult } from "next";
import { Env } from "../../class/env.class";
import Layout from "../../components/layaout";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { SingUpForm } from "../../components/singup/singupForm/singupForm";
import { Country } from "../../interfaces/country.interface";
interface Props {
  categories: Category[];
  countries: Country[];
}

export default function SignUp({ categories, countries }: Props) {
  const { locale: lenguaje } = useRouter();
  const traslate = (value: string) => traslateNs(value, "singUp");


  return (
    <Layout categories={categories}>
      <div className={styles.container}>
        <div className={styles.headerInfo}>
          <div className={styles.breadcrumbs}>
            <Breadcrumb
              links={[
                { href: `/${lenguaje}/home`, label: "home" },
                {
                  href: `/${lenguaje}/signup`,
                  label: "create an account",
                },
              ]}
            />
          </div>
          <h1>{traslate("TITLE")}</h1>
          <hr />
           <SingUpForm countries={countries}/>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const responses = await Promise.all([
    fetch(`${Env.apiUrl}/categories`),
    fetch(`${Env.apiUrl}/countries`),
  
  ]);
  const [categories,countries] = await Promise.all(
    responses.map((response) => response.json())
  );
  return {
    props: { categories, countries },
  };
}
