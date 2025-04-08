import styles from "./InputWithLabel.module.css";

export const InputWithLabel = () => {
  return (
    <div className={styles.inputContainer}>
      <input type={"text"} className={styles.input} placeholder={""} />

      <label htmlFor="input" className={styles.label}>
        Searching...
      </label>

      <div className={styles.underline}></div>
    </div>
  );
};
