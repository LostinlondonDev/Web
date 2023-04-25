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

interface Login {
  email: string;
  password: string;
}

interface Props {
  categories: Category[];
}

export default function LoginPage({ categories }: Props) {
  const traslate = (value: string) => traslateNs(value, "login");
  const newHere = `${traslate("HAS_ACOOUNT").split(",")[0]} ? `;
  const createAccount = traslate("HAS_ACOOUNT").split(",")[1]?.toUpperCase();
  const forgotPassword = `${traslate("FORGOT_PASSWORD")} ?`;

  const { handleChange, handleSubmit } = useForm<Login>({
    email: "",
    password: "",
  });

  // const { register, handleSubmit } = useForm>()

  return (
    <Layout categories={categories}>
      <div className={styles.container}>
        <div className={styles.bgImage}>
          <Image src={banner} alt="banner_login" />
        </div>
        <div className={styles.loginForm}>
          <h2>{traslate("TITLE_PAGE")}</h2>
          <p>{traslate("MESSAGE_TIP")}</p>
          <form
            className={styles.form}
            onSubmit={(e) =>
              handleSubmit(e, (values, valid) => {
                console.log(values, valid);
                if (valid) {
                  alert("login");
                } else {
                  alert("error");
                }
              })
            }
          >
            <div className={styles.input}>
              <Input
                label={`${traslate("EMAIL")}`}
                onChange={handleChange}
                name="email"
                type="email"
                required
              />
              <span>{traslate("FIELD_IS_REQUIRED")}</span>
            </div>
            <div className={styles.input}>
              <Input
                label={`${traslate("PASSWORD")}`}
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
              <span>{traslate("FIELD_IS_REQUIRED")}</span>
            </div>
            <div>
              <Button className={styles.button}>Login</Button>
            </div>
          </form>
          <div className={styles.cteCount}>
            <Link href="/forgotpassword" className={styles.link}>
              {forgotPassword}
            </Link>
            <span>
              {newHere}
              <Link href={`/signup`}>{createAccount}</Link>
            </span>
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
