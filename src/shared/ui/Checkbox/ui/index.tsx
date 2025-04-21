import Image from "next/image";
import styles from "./Checkbox.module.css";
import { ChangeEvent } from "react";

export const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input type={"checkbox"} checked={checked} onChange={onChange} />

      <div className={styles.checkmark}>
        <Image
          src={"/icons/checkbox.svg"}
          alt={"Checkbox"}
          width={14}
          height={14}
          loading={"lazy"}
          draggable={false}
        />
      </div>

      <span className={styles.label}>{label}</span>
    </label>
  );
};
