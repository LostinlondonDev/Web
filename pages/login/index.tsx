import Link from "next/link";
import styles from "../../styles/login.module.css";
import Image from "next/image";
import { traslateNs } from "../../i18";
import { banner } from "../../assets";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Layout from "../../components/layaout";
import { GetStaticPropsResult } from "next";
import { Category } from "../../interfaces/category.interface";
import { Env } from "../../class/env.class";
import { useForm } from "../../hooks/userForm";
import { LoginForm } from "../../components/login/login";

interface Props {
  categories: Category[];
}

export default function LoginPage({ categories }: Props) {

  return (
    <Layout categories={categories}>
      <div className={styles.container}>
        <div className={styles.bgImage}>
          <Image src={banner} alt="banner_login" />
        </div>
         <LoginForm/>
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
