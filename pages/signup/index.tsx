import { useRouter } from "next/router";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { traslateNs } from "../../i18";
import styles from "./../../styles/signup.module.css";
import Input from "../../components/input/Input";
import Link from "next/link";
import Button from "../../components/button/Button";
import { Category } from "../../interfaces/category.interface";
import { GetStaticPropsResult } from "next";
import { Env } from "../../class/env.class";
import Layout from "../../components/layaout";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  categories: Category[];
}

export default function SignUp({ categories }: Props) {
  const { locale: lenguaje } = useRouter();
  const [date, setDate] = useState<Date | null>(new Date());
  const traslate = (value: string) => traslateNs(value, "singUp");
  const [
    firstName,
    lastName,
    dialCode,
    phone,
    country,
    birthDate,
    email,
    password,
    confirmPassword,
  ] = traslate("FIELDS").split(",");

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
          <div className={styles.details}>
            <div className={styles.form}>
              <h3>{traslate("DETAILS")}</h3>
              <form action="" className={styles.formLabel}>
                <div className={styles.input}>
                  <Input label={`${firstName}*`} />
                </div>
                <div className={styles.input}>
                  <Input label={`${lastName}*`} />
                </div>
                <div className={styles.input}>
                  <Input label={`${dialCode}*`} />
                </div>
                <div className={styles.input}>
                  <Input label={`${phone}*`} />
                </div>
                <div className={styles.input}>
                  <Input label={`${country}*`} />
                </div>
                <div className={styles.input}>
                  <DatePicker
                    startDate={date}
                    showIcon
                    dateFormat="yyyy/MM/dd"
                    onChange={(date) => setDate(date)}
                  />
                </div>
                <div className={styles.email}>
                  <Input label={`${email}*`} />
                </div>
                <div className={styles.email}>
                  <Input label={`${password}*`} />
                </div>
                <div className={styles.email}>
                  <Input label={`${confirmPassword}*`} />
                </div>
              </form>
            </div>
            <div className={styles.conditions}>
              <h2>{traslate("TERMS")}</h2>
              <p>{traslate("TERMS_DESCRIPTION")}</p>
              <div>
                <input type="checkbox" className={styles.checkbox} />
                <label>{traslate("ACCEPT_TERMS")}</label>
              </div>
              <p>{traslate("SECOND_TERMS")}</p>
              {traslate("OPTION_TERMS")
                .split(".")
                .map((el) => (
                  <div key={el}>
                    <input type="checkbox" className={styles.checkbox} />
                    <label>{el}</label>
                  </div>
                ))}
              <p>
                {traslate("MESSAGE_TERMS")
                  .split(";")
                  .map((el) =>
                    !el.includes("policy") ? (
                      el
                    ) : (
                      <Link key={el} href="/" style={{ color: "red" }}>
                        {el}
                      </Link>
                    )
                  )}
              </p>
              <div className={styles.save}>
                <Button>{traslate("BUTTON")}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const responses = await fetch(`${Env.apiUrl}/categories`);
  const categories = (await responses.json()) as Category[];
  return {
    props: { categories },
  };
}
