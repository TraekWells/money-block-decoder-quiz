import React from "react";
import { ChevronRight, RefreshCw, Trophy } from "lucide-react";

const MoneyBlockQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const archetypes = {
    "Invisible Earner": {
      emoji: "🕵️‍♀️",
      title: "The Invisible Earner",
      belief: "\"If I'm seen with money, I'll be judged or rejected.\"",
      signs: [
        "You downplay your offers, skills, or income",
        "You underprice or hesitate to promote yourself",
        "You stay quiet online or avoid celebrating wins",
      ],
      shift:
        "Visibility isn't unsafe — it's a path to connection and leadership.",
      affirmation: "It's safe to be seen and successful.",
    },
    Prover: {
      emoji: "💪",
      title: "The Prover",
      belief: '"I must work twice as hard to deserve success."',
      signs: [
        "You hustle constantly but still feel behind",
        "You tie your worth to output or productivity",
        'You fear receiving money without "earning it" through struggle',
      ],
      shift: "Your value isn't tied to how much effort you give.",
      affirmation: "I receive with ease because I am already worthy.",
    },
    "Worthiness Wobbler": {
      emoji: "😬",
      title: "The Worthiness Wobbler",
      belief: '"I\'m not good enough to charge that much or be wealthy."',
      signs: [
        "You undercharge or overdeliver",
        "You question your value or qualifications",
        'You delay launching out of fear of not being "ready"',
      ],
      shift: 'You don\'t need to "do more" to be enough.',
      affirmation: "My worth is not up for negotiation.",
    },
    "Ancestral Loyalist": {
      emoji: "🧬",
      title: "The Ancestral Loyalist",
      belief: '"If I grow too much, I\'ll leave others behind."',
      signs: [
        "You feel guilt about out-earning family or friends",
        "You self-sabotage when things start working",
        'You avoid growing past what\'s "normal" in your community',
      ],
      shift: "Your rise can elevate others — you're not betraying them.",
      affirmation: "I honor my past by building a new future.",
    },
    "Scarcity Keeper": {
      emoji: "🪙",
      title: "The Scarcity Keeper",
      belief: '"Money is unstable — it won\'t stick around."',
      signs: [
        'You fear spending or hoard "just in case"',
        "You live in feast-or-famine income cycles",
        "You feel anxious unless you're saving aggressively",
      ],
      shift: "Money is a relationship — it responds to trust and structure.",
      affirmation: "I am a safe home for money.",
    },
    "Martyr Manifestor": {
      emoji: "🧎‍♀️",
      title: "The Martyr Manifestor",
      belief: "\"If it's not hard, I don't deserve it.\"",
      signs: [
        "You overgive and undercharge",
        "You resist receiving or delegating",
        "You believe ease = laziness or entitlement",
      ],
      shift: "Receiving doesn't require struggle — it requires self-worth.",
      affirmation: "I allow money to flow without burnout.",
    },
    "Avoidant Dreamer": {
      emoji: "☁️",
      title: "The Avoidant Dreamer",
      belief: '"Money distracts from what really matters."',
      signs: [
        "You avoid tracking or planning",
        "You feel overwhelmed by financial details",
        "You associate money focus with materialism",
      ],
      shift: "Clarity with money deepens your freedom and purpose.",
      affirmation: "I can be spiritual and financially empowered.",
    },
    "Control Keeper": {
      emoji: "🧠",
      title: "The Control Keeper",
      belief: "\"If I'm not in control, I'm not safe.\"",
      signs: [
        "You micromanage your finances to avoid uncertainty",
        "You overanalyze spending or client decisions",
        "You fear loosening your grip or taking intuitive risks",
      ],
      shift: "Control is a trauma response — trust creates overflow.",
      affirmation: "I can trust the process and still feel secure.",
    },
  };

  const questions = [
    {
      id: 1,
      question: "When people compliment your success or income, you...",
      options: [
        { text: "I love it—bring on the spotlight!", points: {} },
        {
          text: "I say thanks, but quickly change the subject.",
          points: { "Invisible Earner": 1 },
        },
        {
          text: "I downplay or deflect it completely.",
          points: { "Invisible Earner": 2 },
        },
        {
          text: "I feel uncomfortable and wish they hadn't brought it up.",
          points: { "Invisible Earner": 3 },
        },
      ],
    },
    {
      id: 2,
      question: "You believe money is earned through…",
      options: [
        { text: "Alignment and ease", points: {} },
        { text: "Strategy and smart moves", points: { Prover: 1 } },
        { text: "Consistent hard work", points: { Prover: 2 } },
        { text: "Tireless effort and sacrifice", points: { Prover: 3 } },
      ],
    },
    {
      id: 3,
      question: "When you think about charging higher rates, you feel…",
      options: [
        { text: "Excited and ready to expand", points: {} },
        {
          text: "A little nervous, but open to it",
          points: { "Worthiness Wobbler": 1 },
        },
        {
          text: "Worried people will think I'm not worth it",
          points: { "Worthiness Wobbler": 2 },
        },
        {
          text: "Like an imposter—I'd need to be *way* more qualified",
          points: { "Worthiness Wobbler": 3 },
        },
      ],
    },
    {
      id: 4,
      question:
        "If you started earning significantly more than your loved ones, you'd…",
      options: [
        { text: "Feel proud and inspired to lead by example", points: {} },
        {
          text: "Wonder how they'll react, but do it anyway",
          points: { "Ancestral Loyalist": 1 },
        },
        {
          text: "Feel guilty and unsure how to navigate the shift",
          points: { "Ancestral Loyalist": 2 },
        },
        {
          text: "Probably sabotage or downplay it to stay connected",
          points: { "Ancestral Loyalist": 3 },
        },
      ],
    },
    {
      id: 5,
      question: "When money does come in, your next thought is…",
      options: [
        {
          text: "Amazing! Let's use it wisely and trust more is coming",
          points: {},
        },
        {
          text: "Let me plan before I touch it",
          points: { "Scarcity Keeper": 1 },
        },
        {
          text: "I need to save it fast—who knows what's next",
          points: { "Scarcity Keeper": 2 },
        },
        {
          text: "What if this is the last time? I better hoard or panic-spend",
          points: { "Scarcity Keeper": 3 },
        },
      ],
    },
    {
      id: 6,
      question: "Your relationship with receiving support or ease looks like…",
      options: [
        { text: "I love being supported—it helps me thrive", points: {} },
        {
          text: "I accept help if I really need it",
          points: { "Martyr Manifestor": 1 },
        },
        {
          text: "I resist help because I don't want to be a burden",
          points: { "Martyr Manifestor": 2 },
        },
        {
          text: 'I feel I must do everything myself or it\'s not "earned"',
          points: { "Martyr Manifestor": 3 },
        },
      ],
    },
    {
      id: 7,
      question: "When it comes to planning or managing money, you…",
      options: [
        { text: "Have a clear, empowering system", points: {} },
        {
          text: "Try, but get overwhelmed sometimes",
          points: { "Avoidant Dreamer": 1 },
        },
        {
          text: "Avoid it until it becomes a problem",
          points: { "Avoidant Dreamer": 2 },
        },
        {
          text: "Feel anxious or disconnected from numbers completely",
          points: { "Avoidant Dreamer": 3 },
        },
      ],
    },
    {
      id: 8,
      question: "What helps you feel safe with money?",
      options: [
        { text: "Trust in flow and mindset alignment", points: {} },
        {
          text: "Some structure and planning",
          points: { "Control Keeper": 1 },
        },
        {
          text: "Knowing I can control every variable",
          points: { "Control Keeper": 2 },
        },
        {
          text: "Obsessively tracking, forecasting, and micromanaging it all",
          points: { "Control Keeper": 3 },
        },
      ],
    },
    // Tie-breaker questions
    {
      id: 9,
      question: "Your biggest fear around wealth is…",
      options: [
        {
          text: "People thinking I'm full of myself",
          points: { "Invisible Earner": 2 },
        },
        {
          text: "Losing it as fast as it came",
          points: { "Scarcity Keeper": 2 },
        },
        {
          text: "Not knowing how to manage it",
          points: { "Avoidant Dreamer": 2 },
        },
        {
          text: "That I'll change or betray who I used to be",
          points: { "Ancestral Loyalist": 2 },
        },
      ],
    },
    {
      id: 10,
      question: "When you're feeling stuck financially, you tend to…",
      options: [
        { text: "Work harder and push through", points: { Prover: 2 } },
        {
          text: "Overdeliver for others while neglecting yourself",
          points: { "Martyr Manifestor": 2 },
        },
        {
          text: "Spiral into self-doubt or perfectionism",
          points: { "Worthiness Wobbler": 2 },
        },
        {
          text: "Try to gain control by over-tracking or budgeting obsessively",
          points: { "Control Keeper": 2 },
        },
      ],
    },
    {
      id: 11,
      question:
        "What's your relationship to money routines (tracking, checking income, etc.)?",
      options: [
        { text: "Love them! They make me feel grounded", points: {} },
        {
          text: "I avoid them unless I have to",
          points: { "Avoidant Dreamer": 2 },
        },
        {
          text: "I obsess over them because they make me feel in control",
          points: { "Control Keeper": 2 },
        },
        {
          text: "I do them while silently panicking it won't be enough",
          points: { "Scarcity Keeper": 2 },
        },
      ],
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const scores = {};

    // Initialize scores
    Object.keys(archetypes).forEach((archetype) => {
      scores[archetype] = 0;
    });

    // Calculate scores
    Object.entries(finalAnswers).forEach(([questionIndex, answerIndex]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options[answerIndex];

      Object.entries(selectedOption.points).forEach(([archetype, points]) => {
        scores[archetype] += points;
      });
    });

    // Find highest score(s)
    const maxScore = Math.max(...Object.values(scores));
    const topArchetypes = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([archetype, _]) => archetype);

    // If tie, favor the one with more high-intensity responses (3-point answers)
    if (topArchetypes.length > 1) {
      let bestArchetype = topArchetypes[0];
      let maxIntenseResponses = 0;

      topArchetypes.forEach((archetype) => {
        let intenseResponses = 0;
        Object.entries(finalAnswers).forEach(([questionIndex, answerIndex]) => {
          const question = questions[parseInt(questionIndex)];
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
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  const styles: Record<string, React.CSSProperties> = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #045C46 0%, #023125 50%, #045C46 100%)",
      padding: "20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    quizCard: {
      maxWidth: "700px",
      margin: "0 auto",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "white",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#ffffff",
      fontSize: "16px",
    },
    progressContainer: {
      marginBottom: "40px",
    },
    progressInfo: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#ffffff",
      marginBottom: "10px",
    },
    progressBarTrack: {
      width: "100%",
      height: "12px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "6px",
      overflow: "hidden",
    },
    progressBarFill: {
      height: "100%",
      background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
      borderRadius: "6px",
      transition: "width 0.5s ease-out",
    },
    questionContainer: {
      marginBottom: "40px",
    },
    question: {
      fontSize: "20px",
      fontWeight: "600",
      color: "white",
      marginBottom: "30px",
      lineHeight: "1.5",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    optionButton: {
      width: "100%",
      textAlign: "left",
      padding: "20px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    optionButtonHover: {
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.5)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    },
    navigationHint: {
      textAlign: "center",
      color: "#ffffff",
      fontSize: "14px",
    },
    resultContainer: {
      textAlign: "center",
    },
    resultEmoji: {
      fontSize: "60px",
      marginBottom: "20px",
    },
    resultTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "white",
      marginBottom: "10px",
    },
    resultArchetype: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "30px",
    },
    resultSections: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      color: "white",
      textAlign: "left",
    },
    resultSection: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#ffffff",
    },
    beliefText: {
      fontStyle: "italic",
      color: "#e0e7ff",
    },
    signsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    signsItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
      color: "#e0e7ff",
    },
    bullet: {
      color: "#a855f7",
      marginRight: "8px",
      fontSize: "18px",
    },
    affirmationSection: {
      background:
        "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))",
      border: "1px solid rgba(139, 92, 246, 0.3)",
    },
    affirmationText: {
      fontSize: "18px",
      fontWeight: "500",
      fontStyle: "italic",
      color: "white",
    },
    resetButton: {
      width: "100%",
      marginTop: "32px",
      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      color: "white",
      padding: "16px 24px",
      borderRadius: "16px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    },
    trophyIcon: {
      marginBottom: "16px",
      color: "#fbbf24",
    },
  };

  if (showResult && result) {
    const archetypeData = archetypes[result.archetype];

    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          <div style={styles.resultContainer}>
            <div style={styles.resultEmoji}>{archetypeData.emoji}</div>
            <div style={styles.trophyIcon}>
              <Trophy size={32} />
            </div>
            <h1 style={styles.resultTitle}>Your Money Block Archetype</h1>
            <h2 style={styles.resultArchetype}>{archetypeData.title}</h2>
          </div>

          <div style={styles.resultSections}>
            <div style={styles.resultSection}>
              <h3 style={styles.sectionTitle}>🌟 Core Belief</h3>
              <p style={styles.beliefText}>{archetypeData.belief}</p>
            </div>

            <div style={styles.resultSection}>
              <h3 style={styles.sectionTitle}>🚩 Signs You Carry This Block</h3>
              <ul style={styles.signsList}>
                {archetypeData.signs.map((sign, index) => (
                  <li key={index} style={styles.signsItem}>
                    <span style={styles.bullet}>•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.resultSection}>
              <h3 style={styles.sectionTitle}>🔄 Key Shift</h3>
              <p style={styles.beliefText}>{archetypeData.shift}</p>
            </div>

            <div
              style={{ ...styles.resultSection, ...styles.affirmationSection }}
            >
              <h3 style={styles.sectionTitle}>🔮 Your Affirmation</h3>
              <p style={styles.affirmationText}>
                "{archetypeData.affirmation}"
              </p>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            style={styles.resetButton}
            // onMouseEnter={(e) => {
            //   e.target.style.background =
            //     "linear-gradient(135deg, #7c3aed, #db2777)";
            //   e.target.style.transform = "translateY(-2px)";
            // }}
            // onMouseLeave={(e) => {
            //   e.target.style.background =
            //     "linear-gradient(135deg, #8b5cf6, #ec4899)";
            //   e.target.style.transform = "translateY(0)";
            // }}
          >
            <RefreshCw size={20} />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.quizCard}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Money Block Archetypes Quiz</h1>
          <p style={styles.subtitle}>
            Discover what's blocking your financial flow
          </p>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressInfo}>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div style={styles.progressBarTrack}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div style={styles.questionContainer}>
          <h2 style={styles.question}>{questions[currentQuestion].question}</h2>

          <div style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={styles.optionButton}
                // onMouseEnter={(e) => {
                //   Object.assign(e.target.style, styles.optionButtonHover);
                //   const icon = e.target.querySelector("svg");
                //   if (icon) {
                //     icon.style.opacity = "1";
                //     icon.style.transform = "translateX(4px)";
                //   }
                // }}
                // onMouseLeave={(e) => {
                //   e.target.style.background = "rgba(255, 255, 255, 0.05)";
                //   e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                //   e.target.style.boxShadow = "none";
                //   const icon = e.target.querySelector("svg");
                //   if (icon) {
                //     icon.style.opacity = "0";
                //     icon.style.transform = "translateX(0)";
                //   }
                // }}
              >
                <span>{option.text}</span>
                <ChevronRight
                  size={20}
                  style={{
                    color: "#a855f7",
                    opacity: "0",
                    transition: "all 0.3s ease",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation hint */}
        <div style={styles.navigationHint}>
          <p>Choose the answer that resonates most with you</p>
        </div>
      </div>
    </div>
  );
};

export default MoneyBlockQuiz;
