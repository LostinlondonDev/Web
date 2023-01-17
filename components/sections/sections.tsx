import styles from "./sections.module.css";

interface Props {
  sections: string[];
}

export default function Sections({ sections }: Props) {
  return (
    <section className={styles.sections}>
      {sections.map((section, index) => (
        <span key={index}>{section}</span>
      ))}
    </section>
  );
}
