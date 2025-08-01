type ArchetypesType = {
  [key: string]: {
    emoji: string;
    title: string;
    belief: string;
    signs: string[];
    shift: string;
    affirmation: string;
  };
};

type QuestionsType = {
  id: number;
  question: string;
  options: {
    text: string;
    points: { [key: string]: number };
  }[];
};

export const ARCHETYPES: ArchetypesType = {
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

export const QUESTIONS: QuestionsType[] = [
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
