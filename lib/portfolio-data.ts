export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  image: string;
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
    category: "Full-stack · Generative AI",
    image: "/projects/banao.png",
    summary: "From a natural-language prompt to a running React experience, with an isolated sandbox for each iteration.",
    problem: "Turning an idea into a working page can require frontend code, environment setup, and repeated manual previews.",
    solution: "Generates React code from natural-language prompts and runs iterative updates in isolated Kubernetes pods with a live preview.",
    detail: "An AI-powered website builder that turns natural-language prompts into React code with a live preview. Generated projects run in isolated Kubernetes pods so code can be iterated and previewed securely. Its microservices cover authentication, AI orchestration, notifications, and sandbox execution.",
    stack: ["React.js", "Node.js", "Express.js", "LLMs", "Docker", "Kubernetes", "Skaffold"],
    availableLinks: [{ label: "GitHub", href: "https://github.com/deepanshu855/banao" }],
    kind: "builder",
    accent: "#88f0dc",
  },
  {
    id: "veritasai",
    number: "02",
    name: "VeritasAI",
    category: "Full-stack · Generative AI",
    image: "/projects/veritasai.png",
    summary: "Source-grounded answers with web search, persistent conversations, and secure real-time messaging.",
    problem: "AI chat needs current, traceable context, and conversations should remain available between sessions.",
    solution: "Combines web search with source-grounded answers, real-time messages, saved chat history, and verified authentication.",
    detail: "A full-stack AI chat application that uses LangChain, Mistral AI, and Tavily Search to ground answers in current web sources. Socket.IO powers real-time messaging; MongoDB stores chat history; JWT authentication includes email verification and password reset.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Socket.IO", "LangChain", "Mistral AI", "Tavily"],
    availableLinks: [
      { label: "GitHub", href: "https://github.com/deepanshu855/VeritasAI" },
      { label: "Live", href: "https://veritasai-v214.onrender.com/" },
    ],
    kind: "chat",
    accent: "#97a5ff",
  },
  {
    id: "moodify",
    number: "03",
    name: "Moodify",
    category: "Full-stack · AI & Music",
    image: "/projects/moodify.png",
    summary: "Real-time facial-expression detection shapes a personal, mood-based music recommendation feed.",
    problem: "Music discovery can miss what a listener feels like in the moment.",
    solution: "Uses real-time facial-expression detection to curate mood-based recommendations, with authenticated personal preferences.",
    detail: "An emotion-based music recommendation platform using Google MediaPipe Face Landmarker for real-time facial-expression detection. A mood recommendation engine uses REST APIs and MongoDB, with JWT authentication to personalize recommendations and protect user data.",
    stack: ["React.js", "Node.js", "MongoDB", "Google MediaPipe", "JWT", "REST APIs"],
    availableLinks: [
      { label: "GitHub", href: "https://github.com/deepanshu855/moodify" },
      { label: "Live", href: "https://moodify-etat.onrender.com/" },
    ],
    kind: "music",
    accent: "#ffaf8a",
  },
  {
    id: "snitch",
    number: "04",
    name: "Snitch",
    category: "Full-stack · E-commerce",
    image: "/projects/snitch.png",
    summary: "A multi-seller marketplace with a cart, product variants, and Razorpay checkout.",
    problem: "Sellers need to list products with selectable variants, while buyers need a straightforward cart and payment flow.",
    solution: "Supports products from multiple sellers, variant selection, cart management, and payments through Razorpay.",
    detail: "A multi-vendor e-commerce platform where multiple sellers can list products and add product variants. Buyers can choose a variant, add products to their cart, and complete checkout through the Razorpay payment gateway.",
    stack: ["Node.js", "Express.js", "JWT", "Google OAuth", "React.js", "Redux", "Tailwind CSS", "Razorpay"],
    availableLinks: [{ label: "GitHub", href: "https://github.com/deepanshu855/Snitch" }],
    kind: "commerce",
    accent: "#f7d46f",
  },
  {
    id: "alumni",
    number: "05",
    name: "University Alumni Website",
    category: "Full-stack · UI/UX",
    image: "/projects/alumni.png",
    summary: "A college-alumni networking portal, from Figma prototypes through full-stack development.",
    problem: "College alumni need a dedicated place to stay connected and network with their university community.",
    solution: "A networking portal whose UI/UX design and full-stack development were both led by Deepanshu.",
    detail: "A dedicated networking portal for college alumni. Deepanshu led the UI/UX design, prototyping in Figma, and the full-stack development of the community platform.",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Figma", "UI/UX"],
    availableLinks: [{ label: "Live", href: "https://frontend-alumni.vercel.app/" }],
    kind: "community",
    accent: "#d5a5ff",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Java", "JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Redux Toolkit", "Context API", "Tailwind CSS", "Sass"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "Socket.IO (WebSockets)", "Redis", "Microservices"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "AI / GenAI",
    skills: ["Generative AI", "LLM Integration", "LangChain", "LangGraph", "Mistral AI", "AI Agents", "RAG", "Prompt Engineering"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["AWS (ECS, ECR, S3)", "Docker", "Docker Compose", "Kubernetes", "Skaffold", "CI/CD"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Postman", "Figma", "Warp"],
  },
  {
    title: "Core Concepts",
    skills: ["Data Structures and Algorithms", "OOP", "System Design Basics", "Microservices Architecture"],
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
  "He has also built Snitch, a multi-vendor e-commerce website, and a university alumni networking portal where he led Figma UI/UX and full-stack development.",
  "His skills include React, Next.js, TypeScript, Node.js, Express, MongoDB, MySQL, LangChain, LangGraph, Mistral AI, RAG, AI agents, Docker, Kubernetes, AWS, and Figma.",
  "He was semester topper in the last two semesters, with SGPAs of 9.68 and 9.72. His Class XII score was 91.6% and Class X score was 91.2%.",
].join(" ");
