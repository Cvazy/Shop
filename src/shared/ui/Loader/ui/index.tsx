import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={"fixed z-[999] inset-0 bg-foreground w-full h-full"}>
      <div className={"flex items-center justify-center w-full h-full"}>
        <div className={"loader"}>
          <div data-glitch="Loading..." className={styles.glitch}>
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};
