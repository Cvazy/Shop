import styles from "./Switcher.module.css";

interface ISwitcherProps {
  initialValue: boolean;
  onChange: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export const Switcher = ({ initialValue, onChange }: ISwitcherProps) => {
  return (
    <label className={styles.switch}>
      <input
        className={styles.toggle}
        type={"checkbox"}
        checked={initialValue}
        onChange={() => onChange((v) => !v)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};
