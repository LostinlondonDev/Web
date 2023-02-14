import styles from "./selectLenguage.module.css";

import { useState } from "react";
import { useRouter } from "next/router";
export default function SelectLenguage() {
  const { pathname, locales, push, asPath, replace, query } = useRouter();

  const [lenguage, setLenguage] = useState("en");

  const onChangeSelect = (value: string) => {
    setLenguage(value);
    push(
      {
        pathname,
        query,
      },
      asPath,
      {locale: value}
    );
  };

  return (
    <>
      <select
        name="lenguages"
        className={styles.select}
        value={lenguage}
        onChange={(e) => onChangeSelect(e.target.value)}
      >
        {locales?.map((locale, index) => {
          return (
            <option value={locale} key={index}>
              {locale.toUpperCase()}
            </option>
          );
        })}
      </select>
    </>
  );
}
