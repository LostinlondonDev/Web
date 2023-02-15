import styles from "./search.module.css";

export default function Search() {
  return (
    <section className={styles.search}>
       <input type="search" name="search"  />
       <button>SEARCH</button>
    </section>
  );
}