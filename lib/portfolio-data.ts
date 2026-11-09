export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  detail: string;
  stack: string[];
  kind: "builder" | "chat" | "music" | "commerce" | "food" | "community";
  accent: string;
  availableLinks?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "banao",
    number: "01",
    name: "Banão",
    category: "Generative AI · Developer tools",
    summary: "From a natural-language prompt to a running React experience, with an isolated sandbox for each iteration.",
    problem: "Turning an idea into a working page can require frontend code, environment setup, and repeated manual previews.",
    solution: "Generates React code from natural-language prompts and runs iterative updates in isolated Kubernetes pods with a live preview.",
    detail: "An AI-powered website builder that turns natural-language prompts into React code with a live preview. Generated projects run in isolated Kubernetes pods so code can be iterated and previewed securely. Its microservices cover authentication, AI orchestration, notifications, and sandbox execution.",
    stack: ["React.js", "Node.js", "Express.js", "LLMs", "Docker", "Kubernetes", "Skaffold"],
    kind: "builder",
    accent: "#88f0dc",
  },
  {
    id: "veritasai",
    number: "02",
    name: "VeritasAI",
    category: "Generative AI · Real-time chat",
    summary: "Source-grounded answers with web search, persistent conversations, and secure real-time messaging.",
    problem: "AI chat needs current, traceable context, and conversations should remain available between sessions.",
    solution: "Combines web search with source-grounded answers, real-time messages, saved chat history, and verified authentication.",
    detail: "A full-stack AI chat application that uses LangChain, Mistral AI, and Tavily Search to ground answers in current web sources. Socket.IO powers real-time messaging; MongoDB stores chat history; JWT authentication includes email verification and password reset.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Socket.IO", "LangChain", "Mistral AI", "Tavily"],
    kind: "chat",
    accent: "#97a5ff",
  },
  {
    id: "moodify",
    number: "03",
    name: "Moodify",
    category: "Applied AI · Music",
    summary: "Real-time facial-expression detection shapes a personal, mood-based music recommendation feed.",
    problem: "Music discovery can miss what a listener feels like in the moment.",
    solution: "Uses real-time facial-expression detection to curate mood-based recommendations, with authenticated personal preferences.",
    detail: "An emotion-based music recommendation platform using Google MediaPipe Face Landmarker for real-time facial-expression detection. A mood recommendation engine uses REST APIs and MongoDB, with JWT authentication to personalize recommendations and protect user data.",
    stack: ["React.js", "Node.js", "MongoDB", "Google MediaPipe", "JWT", "REST APIs"],
    kind: "music",
    accent: "#ffaf8a",
  },
  {
    id: "snitch",
    number: "04",
    name: "Snitch",
    category: "Full-stack · Commerce",
    summary: "A multi-vendor marketplace for the connected workflows between independent sellers and buyers.",
    problem: "A marketplace with many independent sellers and buyers has to support complex, multi-party transaction workflows.",
    solution: "A multi-vendor e-commerce website designed around those seller and buyer transactions and workflows.",
    detail: "A multi-vendor e-commerce website built around the more involved transactions and workflows that arise when multiple independent sellers and buyers share a marketplace.",
    stack: ["Stack details to confirm"],
    kind: "commerce",
    accent: "#f7d46f",
  },
  {
    id: "recipes",
    number: "05",
    name: "Food Recipe App",
    category: "Frontend · Product experience",
    summary: "A friendly recipe discovery experience for creating, fetching, searching, and filtering recipes.",
    problem: "Finding and organizing a recipe among many options calls for clear discovery and filtering tools.",
    solution: "An interactive frontend where users can create, fetch, search, and filter a diverse recipe collection.",
    detail: "An interactive, frontend-focused recipe application. Its core experience helps people create, fetch, search, and filter a diverse range of recipes, with a strong emphasis on a smooth interface.",
    stack: ["Stack details to confirm"],
    kind: "food",
    accent: "#a5d986",
  },
  {
    id: "alumni",
    number: "06",
    name: "University Alumni Website",
    category: "Product design · Full-stack",
    summary: "A college-alumni networking portal, from Figma prototypes through full-stack development.",
    problem: "College alumni need a dedicated place to stay connected and network with their university community.",
    solution: "A networking portal whose UI/UX design and full-stack development were both led by Deepanshu.",
    detail: "A dedicated networking portal for college alumni. Deepanshu led the UI/UX design, prototyping in Figma, and the full-stack development of the community platform.",
    stack: ["Stack details to confirm"],
    kind: "community",
    accent: "#d5a5ff",
  },
];

export const skillGroups = [
  {
    index: "01",
    title: "Full-stack engineering",
    description: "Building product flows from the interface through APIs, data, and real-time systems.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express", "REST APIs", "Socket.IO", "Redis", "MongoDB", "MySQL"],
    className: "wide",
  },
  {
    index: "02",
    title: "Generative AI",
    description: "Connecting language models to useful, grounded product experiences.",
    skills: ["LLM integration", "RAG", "AI agents", "LangChain", "LangGraph", "Mistral AI", "Prompt engineering"],
    className: "tall",
  },
  {
    index: "03",
    title: "Cloud & delivery",
    description: "Containerized services and the fundamentals to ship them reliably.",
    skills: ["AWS · ECS / ECR / S3", "Docker", "Docker Compose", "Kubernetes", "Skaffold", "CI/CD"],
    className: "standard",
  },
  {
    index: "04",
    title: "Design & foundations",
    description: "Thoughtful interfaces backed by strong computer science fundamentals.",
    skills: ["Figma", "Wireframing", "Prototyping", "Tailwind CSS", "Sass", "DSA", "OOP", "System design basics"],
    className: "standard",
  },
];

export const links = {
  linkedin: "https://www.linkedin.com/in/deepanshu-sharma-661572323/",
  github: "https://github.com/deepanshu855/",
  leetcode: "https://leetcode.com/u/Deepanshu040/",
  email: "mailto:deepanshusharma040@gmail.com",
};

export const resumeFacts = [
  "Deepanshu Sharma is a final-year B.Tech Computer Science and Engineering student at SRM University, Sonipat (2023–2027), with a 9.25/10 CGPA.",
  "He is a Full Stack Developer and UI/UX Designer seeking Full Stack and Generative AI internship and placement roles. His recent SGPAs are 9.68 and 9.72, and he was semester topper in each of those two semesters.",
  "His work includes Banão, an AI website builder using isolated Kubernetes sandbox pods; VeritasAI, a source-grounded AI chat application; and Moodify, an emotion-based music recommendation app.",
  "He has also built Snitch, a multi-vendor e-commerce website; a recipe app for creating, fetching, searching, and filtering recipes; and a university alumni networking portal where he led Figma UI/UX and full-stack development.",
  "His skills include React, Next.js, TypeScript, Node.js, Express, MongoDB, MySQL, LangChain, LangGraph, Mistral AI, RAG, AI agents, Docker, Kubernetes, AWS, and Figma.",
  "He was semester topper in the last two semesters, with SGPAs of 9.68 and 9.72. His Class XII score was 91.6% and Class X score was 91.2%.",
].join(" ");
