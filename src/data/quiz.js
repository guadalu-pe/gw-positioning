// a = Translator, b = Connector, c = Innovator, d = Systems Thinker
export const quizQuestions = [
  {
    id: 1,
    question: "What drives you most in your work?",
    options: [
      { key: 'a', text: "Bridging knowledge across disciplines so people from different fields can understand each other" },
      { key: 'b', text: "Building meaningful relationships and facilitating collaborations across industries" },
      { key: 'c', text: "Creating change, challenging the status quo and pushing into new territory" },
      { key: 'd', text: "Mastering complex systems and understanding how all the pieces interconnect" },
    ]
  },
  {
    id: 2,
    question: "When you join a new team, you're most likely to…",
    options: [
      { key: 'a', text: "Help people from different backgrounds understand each other's language and frameworks" },
      { key: 'b', text: "Quickly build rapport and introduce people who should know each other" },
      { key: 'c', text: "Challenge existing processes and suggest bold new approaches" },
      { key: 'd', text: "Map out how team dynamics and workflows connect before diving in" },
    ]
  },
  {
    id: 3,
    question: "Which type of project energizes you most?",
    options: [
      { key: 'a', text: "Making complex or niche information accessible to a broad audience" },
      { key: 'b', text: "Bringing together stakeholders from different worlds to collaborate on something new" },
      { key: 'c', text: "Designing something from scratch that disrupts the way things have always been done" },
      { key: 'd', text: "Analyzing an interconnected system and finding levers to optimize it" },
    ]
  },
  {
    id: 4,
    question: "Your colleagues would most likely describe you as…",
    options: [
      { key: 'a', text: "The person who can explain anything to anyone, no matter the background" },
      { key: 'b', text: "The person who always knows someone who can help" },
      { key: 'c', text: "The person who always asks 'why do we do it this way?'" },
      { key: 'd', text: "The person who sees patterns and connections nobody else notices" },
    ]
  },
  {
    id: 5,
    question: "When you face a big challenge, you typically…",
    options: [
      { key: 'a', text: "Research extensively across different domains before forming an opinion" },
      { key: 'b', text: "Reach out to your network to get diverse perspectives before deciding" },
      { key: 'c', text: "Brainstorm radically different solutions and experiment quickly" },
      { key: 'd', text: "Map out all the variables, dependencies and second-order effects" },
    ]
  },
  {
    id: 6,
    question: "What frustrates you most at work?",
    options: [
      { key: 'a', text: "Experts who can't communicate their knowledge effectively to others" },
      { key: 'b', text: "Teams that operate in silos without cross-pollinating ideas" },
      { key: 'c', text: "Organizations that move too slowly and resist necessary change" },
      { key: 'd', text: "Decisions that ignore the full systemic impact downstream" },
    ]
  },
  {
    id: 7,
    question: "The role you'd find most fulfilling involves…",
    options: [
      { key: 'a', text: "Science communication, knowledge brokering, or interdisciplinary research" },
      { key: 'b', text: "Strategic partnerships, community building, or business development" },
      { key: 'c', text: "Entrepreneurship, innovation consulting, or product design" },
      { key: 'd', text: "Strategy, sustainability consulting, or systems analysis" },
    ]
  },
  {
    id: 8,
    question: "When you learn about a new topic, you're most excited by…",
    options: [
      { key: 'a', text: "How it connects to and illuminates other fields you already know" },
      { key: 'b', text: "The people in this field and how they relate to people you already know" },
      { key: 'c', text: "The possibility of applying this knowledge in entirely new, unexpected ways" },
      { key: 'd', text: "The underlying patterns and structural dynamics that govern this domain" },
    ]
  },
];

export const archetypes = {
  a: {
    key: 'translator',
    name: 'The Translator',
    emoji: '🌐',
    tagline: 'You bridge worlds and make the complex clear.',
    color: '#7C3AED',
    description: `You are a gifted Translator — a unique type of generalist who excels at bridging gaps between different disciplines and fields of knowledge. Your ability to understand, synthesize, and communicate complex ideas across various domains makes you an invaluable asset in our increasingly specialized world.

As a Translator, you possess a remarkable talent for grasping concepts from diverse fields and making them accessible to others. You effortlessly move between disciplines — whether science and art, technology and humanities, or business and social sciences — facilitating understanding and collaboration between experts who might otherwise struggle to communicate.

Your strength is rooted in your sense of purpose: the drive to contribute meaningfully by breaking down silos of knowledge.`,
    strengths: ['Interdisciplinary thinking', 'Knowledge synthesis', 'Clear communication', 'Bridging expertise gaps'],
    growth: [
      'Develop a system to organize and synthesize the diverse knowledge you accumulate',
      'Hone your communication skills to convey complex ideas to different audiences',
      'Seek out roles at the intersection of established disciplines',
    ],
    roles: ['Research Coordinator', 'Science Communicator', 'Policy Advisor', 'Knowledge Broker'],
  },
  b: {
    key: 'connector',
    name: 'The Connector',
    emoji: '🔗',
    tagline: 'You build bridges between people and make collaboration happen.',
    color: '#059669',
    description: `You are a natural Connector — a rare and valuable type of generalist who thrives on building bridges between different industries and people. Your innate ability to forge meaningful relationships across diverse fields sets you apart in our increasingly interconnected world.

As a Connector, you possess an extraordinary talent for understanding and relating to people from various professional backgrounds. You effortlessly navigate different industry cultures, translating concepts and facilitating communication between specialists who might otherwise struggle to find common ground.

Your strength lies in your deep-seated need for relatedness: the desire to form and maintain meaningful connections with others.`,
    strengths: ['Relationship building', 'Cross-industry navigation', 'Networking', 'Identifying synergies'],
    growth: [
      'Develop a system to manage and nurture your extensive network effectively',
      'Hone your skills in conflict resolution and negotiation',
      'Explore formal roles in cross-industry initiatives',
    ],
    roles: ['Business Development', 'Strategic Partnerships', 'Community Builder', 'Innovation Catalyst'],
  },
  c: {
    key: 'innovator',
    name: 'The Innovator',
    emoji: '💡',
    tagline: 'You challenge the status quo and create the future.',
    color: '#D97706',
    description: `You are a dynamic Innovator — a rare and visionary type of generalist who thrives on creating change and pushing boundaries. Your innate ability to generate novel ideas and drive innovation sets you apart in our rapidly evolving world.

As an Innovator, you possess an extraordinary talent for identifying opportunities for improvement and envisioning new possibilities. You effortlessly navigate complex problems, drawing inspiration from diverse sources to create groundbreaking solutions.

Your strength lies in your deep-seated need for autonomy: the desire for self-direction and the freedom to pursue your ideas. You find fulfillment in exploring uncharted territories.`,
    strengths: ['Creative problem-solving', 'Challenging conventions', 'Visionary thinking', 'Rapid experimentation'],
    growth: [
      'Develop skills in project management and execution to bring your ideas to fruition',
      'Hone your ability to collaborate with others — even brilliant innovations need a team',
      'Seek environments that provide autonomy while offering resources to realize your ideas',
    ],
    roles: ['Entrepreneur', 'Innovation Consultant', 'Product Designer', 'R&D Lead'],
  },
  d: {
    key: 'systems-thinker',
    name: 'The Systems Thinker',
    emoji: '🧩',
    tagline: 'You see the whole picture and navigate complexity with ease.',
    color: '#DC2626',
    description: `You are a masterful Systems Thinker — a rare and invaluable type of generalist who excels at understanding and navigating complex systems. Your ability to see the big picture while grasping intricate details sets you apart in our increasingly interconnected world.

As a Systems Thinker, you possess an extraordinary talent for identifying patterns, connections, and interdependencies that others might overlook. You effortlessly navigate through various domains — business processes, ecological systems, social structures — always seeking to understand how elements interact and influence each other.

Your strength lies in your deep-seated need for competence: the drive to master skills and understand how things work.`,
    strengths: ['Pattern recognition', 'Holistic problem-solving', 'Complexity navigation', 'Root cause analysis'],
    growth: [
      'Develop skills in data visualization and modeling to help others grasp complex systems',
      'Hone your ability to simplify complex ideas without losing their essence',
      'Seek out opportunities to apply systems thinking to emerging global challenges',
    ],
    roles: ['Strategic Planner', 'Sustainability Consultant', 'Systems Analyst', 'Operations Lead'],
  },
};

export function computeArchetype(answers) {
  const counts = { a: 0, b: 0, c: 0, d: 0 };
  Object.values(answers).forEach(key => {
    if (counts[key] !== undefined) counts[key]++;
  });
  const topKey = Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0];
  return archetypes[topKey];
}
