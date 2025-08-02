import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
  currentQuestion: number;
  questionLength: number;
};

const ProgressBar = ({ currentQuestion, questionLength }: ProgressBarProps) => {
  const progressPercentage = ((currentQuestion + 1) / questionLength) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <span>
          Question {currentQuestion + 1} of {questionLength}
        </span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
