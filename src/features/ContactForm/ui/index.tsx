import styles from "./ContactForm.module.css";
import Image from "next/image";

export const ContactForm = () => {
  return (
    <div className={styles.containerChat}>
      <div className={styles.containerChatOptions}>
        <div className={styles.chatWrapper}>
          <div className={styles.chat}>
            <textarea
              name="chat_bot"
              placeholder="Imagine Something...✦˚"
            ></textarea>
          </div>

          <div className={styles.options}>
            <div className={styles.btnsContainer}>
              <button>
                <Image
                  width={20}
                  height={20}
                  className={styles.icon}
                  src={"/icons/contacts/icon1.svg"}
                  alt={"Icon 1"}
                  loading={"lazy"}
                  draggable={false}
                />
              </button>

              <button>
                <Image
                  width={20}
                  height={20}
                  className={styles.icon}
                  src={"/icons/contacts/icon2.svg"}
                  alt={"Icon 2"}
                  loading={"lazy"}
                  draggable={false}
                />
              </button>

              <button>
                <Image
                  width={20}
                  height={20}
                  className={styles.icon}
                  src={"/icons/contacts/icon3.svg"}
                  alt={"Icon 3"}
                  loading={"lazy"}
                  draggable={false}
                />
              </button>
            </div>

            <button className={styles.btnSubmit}>
              <i>
                <Image
                  width={20}
                  height={20}
                  className={styles.icon}
                  src={"/icons/contacts/icon4.svg"}
                  alt={"Icon 4"}
                  loading={"lazy"}
                  draggable={false}
                />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
