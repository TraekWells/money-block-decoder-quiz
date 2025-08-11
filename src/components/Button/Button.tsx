import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className={styles.button}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
};

export default Button;
