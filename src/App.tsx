import React from "react";
import { ChevronRight, RefreshCw } from "lucide-react";
import styles from "./App.module.scss";
import { ARCHETYPES, QUESTIONS } from "./global/constants";
import ProgressBar from "./components/ProgressBar";

type ResultTypes = {
  archetype: string;
  score: number;
  scores: Record<string, number>;
};

const MoneyBlockQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult] = React.useState<ResultTypes | null>(null);
  const [email, setEmail] = React.useState("");
  const [showEmailForm, setShowEmailForm] = React.useState(true);
  const [emailError, setEmailError] = React.useState("");

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    const scores: Record<string, number> = {};

    // Initialize scores
    Object.keys(ARCHETYPES).forEach((archetype) => {
      scores[archetype] = 0;
    });

    // Calculate scores
    Object.entries(finalAnswers).forEach(([questionIndex, answerIndex]) => {
      const question = QUESTIONS[parseInt(questionIndex)];
      const selectedOption = question.options[answerIndex];

      Object.entries(selectedOption.points).forEach(([archetype, points]) => {
        scores[archetype] += points;
      });
    });

    // Find highest score(s)
    const maxScore = Math.max(...Object.values(scores));
    const topArchetypes = Object.entries(scores)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, score]) => score === maxScore)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([archetype, _]) => archetype);

    // If tie, favor the one with more high-intensity responses (3-point answers)
    if (topArchetypes.length > 1) {
      let bestArchetype = topArchetypes[0];
      let maxIntenseResponses = 0;

      topArchetypes.forEach((archetype) => {
        let intenseResponses = 0;
        Object.entries(finalAnswers).forEach(([questionIndex, answerIndex]) => {
          const question = QUESTIONS[parseInt(questionIndex)];
          const selectedOption = question.options[answerIndex];
          if (selectedOption.points[archetype] === 3) {
            intenseResponses++;
          }
        });

        if (intenseResponses > maxIntenseResponses) {
          maxIntenseResponses = intenseResponses;
          bestArchetype = archetype;
        }
      });

      setResult({ archetype: bestArchetype, score: maxScore, scores });
    } else {
      setResult({ archetype: topArchetypes[0], score: maxScore, scores });
    }

    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setEmail("");
    setShowEmailForm(true);
    setEmailError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setShowEmailForm(false);
  };

  if (showEmailForm) {
    return (
      <div className={styles.container}>
        <div className={styles.quizCard}>
          <div className={styles.emailContainer}>
            <h1 className={styles.emailTitle}>Money Block Decoder Quiz</h1>
            <h2 className={styles.emailSubtitle}>
              Discover what's blocking your financial flow.
              <br />
              Enter your email to get started and receive your personalized
              results.
            </h2>

            <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className={styles.emailInput}
                onFocus={(e) => {
                  Object.assign(e.target.style, styles.emailInputFocus);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }}
              />
              {emailError && (
                <div className={styles.emailError}>{emailError}</div>
              )}

              <button
                type="submit"
                className={styles.startButton}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.transform =
                    "translateY(0)";
                }}
              >
                Start Quiz
              </button>
            </form>

            <p className={styles.privacyNote}>
              We respect your privacy. Your email will only be used to send you
              your quiz results and communications from The Wealth Shift.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    const archetypeData = ARCHETYPES[result.archetype];

    return (
      <div className={styles.container}>
        <div className={styles.quizCard}>
          <div className={styles.resultContainer}>
            <h1 className={styles.resultArchetype}>
              Your Money Block Archetype
            </h1>
            <h2 className={styles.resultTitle}>{archetypeData.title}</h2>
            <div className={styles.resultEmoji}>{archetypeData.emoji}</div>
          </div>

          <div className={styles.resultSections}>
            <div className={styles.resultSection}>
              <h3 className={styles.sectionTitle}>🌟 Core Belief</h3>
              <p className={styles.beliefText}>{archetypeData.belief}</p>
            </div>

            <div className={styles.resultSection}>
              <h3 className={styles.sectionTitle}>
                🚩 Signs You Carry This Block
              </h3>
              <ul className={styles.signsList}>
                {archetypeData.signs.map((sign, index) => (
                  <li key={index} className={styles.signsItem}>
                    <span className={styles.bullet}>•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.resultSection}>
              <h3 className={styles.sectionTitle}>🔄 Key Shift</h3>
              <p className={styles.beliefText}>{archetypeData.shift}</p>
            </div>

            <div
              className={`${styles.resultSection} ${styles.affirmationSection}`}
            >
              <h3 className={styles.sectionTitle}>🔮 Your Affirmation</h3>
              <p className={styles.affirmationText}>
                "{archetypeData.affirmation}"
              </p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className={styles.resetButton}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            <RefreshCw size={20} />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizCard}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Money Block Archetypes Quiz</h1>
          <p className={styles.subtitle}>
            Discover what's blocking your financial flow
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentQuestion={currentQuestion}
          questionLength={QUESTIONS.length}
        />

        {/* Question */}
        <div className={styles.questionContainer}>
          <h2 className={styles.question}>
            {QUESTIONS[currentQuestion].question}
          </h2>

          <div className={styles.optionsContainer}>
            {QUESTIONS[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={styles.optionButton}
                onMouseEnter={(e) => {
                  Object.assign(
                    (e.target as HTMLButtonElement).style,
                    styles.optionButtonHover
                  );
                  const icon = (e.target as HTMLButtonElement).querySelector(
                    "svg"
                  );
                  if (icon) {
                    icon.style.opacity = "1";
                    icon.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background =
                    "rgba(255, 255, 255, 0.05)";
                  (e.target as HTMLButtonElement).style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                  (e.target as HTMLButtonElement).style.boxShadow = "none";
                  const icon = (e.target as HTMLButtonElement).querySelector(
                    "svg"
                  );
                  if (icon) {
                    icon.style.opacity = "0";
                    icon.style.transform = "translateX(0)";
                  }
                }}
              >
                <span>{option.text}</span>
                <ChevronRight
                  size={20}
                  style={{
                    opacity: "0",
                    transition: "all 0.3s ease",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation hint */}
        <div className={styles.navigationHint}>
          <p>Choose the answer that resonates most with you</p>
        </div>
      </div>
    </div>
  );
};

export default MoneyBlockQuiz;
