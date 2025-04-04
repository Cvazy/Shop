import styles from "./Button.module.css";

export const Button = ({ text }: { text: string }) => {
  return (
    <div role={"button"} className={styles.boxButton}>
      <div className={styles.button}>
        <p className={"text-foreground"}>{text}</p>
      </div>
    </div>
  );
};
