"use client";

import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";
import styles from "./Input.module.css";

interface IInputProps
  extends Partial<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ error, label, type = "text", ...props }, ref) => {
    const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>("password");

    const handleChangeInputType = () => {
      setInputType(inputType === "password" ? "text" : "password");
    };

    return (
      <div className={styles.inputContainer}>
        {error && error?.length > 0 && (
          <p className={styles.errorMessage}>{error}</p>
        )}

        <input
          className={`${styles.input} ${error && error?.length > 0 ? styles.error : ""} ${type === "password" ? "pr-12" : "pr-3"}`}
          type={type === "password" ? inputType : type}
          ref={ref}
          placeholder={`${label}...`}
          {...props}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />

        {type === "password" && (
          <button
            type={"button"}
            onClick={handleChangeInputType}
            className={styles.toggleButton}
          >
            {inputType === "password" ? (
              <svg
                id="Layer_1"
                enableBackground="new 0 0 512 512"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fill={isInputFocus ? "#fff" : "#171717"}
                  d="m255.992 417.286c-110.011 0-205.095-60.114-255.992-161.289 50.897-101.17 145.98-161.283 255.992-161.283 110.006 0 205.094 60.114 256.008 161.283-50.914 101.175-146.002 161.289-256.008 161.289zm0-277.528c-64.103 0-116.239 52.142-116.239 116.239 0 64.103 52.137 116.245 116.239 116.245 64.097 0 116.239-52.142 116.239-116.245 0-64.097-52.142-116.239-116.239-116.239zm0 195.617c43.767 0 79.373-35.611 79.373-79.378 0-43.762-35.605-79.373-79.373-79.373s-79.373 35.61-79.373 79.373c0 43.768 35.606 79.378 79.373 79.378z"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                id="Glyph"
                enableBackground="new 0 0 32 32"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="XMLID_323_"
                  fill={isInputFocus ? "#fff" : "#171717"}
                  d="m20.722 24.964c.096.096.057.264-.073.306-7.7 2.466-16.032-1.503-18.594-8.942-.072-.21-.072-.444 0-.655.743-2.157 1.99-4.047 3.588-5.573.061-.058.158-.056.217.003l4.302 4.302c.03.03.041.072.031.113-1.116 4.345 2.948 8.395 7.276 7.294.049-.013.095-.004.131.032.358.357 2.445 2.443 3.122 3.12z"
                />
                <path
                  id="XMLID_325_"
                  fill={isInputFocus ? "#fff" : "#171717"}
                  d="m24.68 23.266c2.406-1.692 4.281-4.079 5.266-6.941.072-.21.072-.44 0-.65-1.992-5.787-7.596-9.675-13.946-9.675-2.479 0-4.841.597-6.921 1.665l-5.372-5.372c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l26 26c.391.391 1.023.391 1.414 0s.391-1.023 0-1.414zm-8.68-13.266c3.309 0 6 2.691 6 6 0 1.294-.416 2.49-1.115 3.471l-8.356-8.356c.981-.699 2.177-1.115 3.471-1.115z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  },
);
