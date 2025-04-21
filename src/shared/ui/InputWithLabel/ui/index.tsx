"use client";

import styles from "./InputWithLabel.module.css";
import { ChangeEvent, useState } from "react";

interface IInputWithLabelProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel = ({ value, onChange }: IInputWithLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const shouldAnimateLabel = isFocused || value.length > 0;

  return (
    <div className={styles.inputContainer}>
      <input
        id="input"
        className={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor="input"
        className={`${styles.label} ${shouldAnimateLabel ? styles.activeInput : ""}`}
      >
        Searching...
      </label>
      <div className={styles.underline}></div>
    </div>
  );
};
