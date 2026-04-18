import { Code, Globe, Server, Database, Brackets, Workflow, MonitorSmartphone, Cloud, ShieldCheck, Layers, Settings, ArrowLeftRight, Cpu } from 'lucide-react';

export const fullstackRoadmap = {
  title: "Complete Roadmap to Become a Full Stack Developer",
  description: "This comprehensive learning path will guide you through everything you need to know to become a proficient full stack developer, from frontend to backend, databases, and more.",
  sections: [
    {
      id: "frontend",
      title: "Frontend Development",
      description: "Master the fundamentals of frontend web development including HTML, CSS, JavaScript and modern frameworks.",
      color: "blue",
      icon: MonitorSmartphone,
      modules: [
        {
          id: "frontend-module1",
          title: "Module 1: HTML & CSS Fundamentals",
          icon: Brackets,
          lectures: [
            "Introduction to HTML5",
            "Semantic HTML Elements",
            "Forms and Input Validation",
            "CSS Fundamentals",
            "CSS Box Model",
            "Flexbox Layout",
            "CSS Grid Layout",
            "Responsive Web Design",
            "CSS Variables and Custom Properties",
            "CSS Animations and Transitions",
            "CSS Preprocessors (SASS/SCSS)"
          ]
        },
        {
          id: "frontend-module2",
          title: "Module 2: JavaScript Essentials",
          icon: Code,
          lectures: [
            "JavaScript Fundamentals",
            "Working with DOM",
            "Events and Event Handling",
            "Asynchronous JavaScript",
            "Promises and Async/Await",
            "Error Handling",
            "Fetch API and AJAX",
            "ES6+ Features",
            "JavaScript Modules",
            "Local Storage and Session Storage",
            "Browser Developer Tools"
          ]
        },
        {
          id: "frontend-module3",
          title: "Module 3: Modern JavaScript Frameworks",
          icon: Layers,
          lectures: [
            "Introduction to React.js",
            "Components and Props",
            "State and Lifecycle",
            "Event Handling in React",
            "Conditional Rendering",
            "Lists and Keys",
            "Forms in React",
            "React Hooks",
            "Context API",
            "React Router",
            "State Management with Redux",
            "Introduction to Vue.js and Angular (Optional)"
          ]
        },
        {
          id: "frontend-module4",
          title: "Module 4: Advanced Frontend Topics",
          icon: Workflow,
          lectures: [
            "TypeScript Basics",
            "TypeScript with React",
            "CSS-in-JS Solutions",
            "Styled Components",
            "Progressive Web Apps (PWAs)",
            "Web Components",
            "Testing with Jest and React Testing Library",
            "Performance Optimization",
            "Accessibility (a11y)",
            "Internationalization and Localization",
            "Frontend Build Tools (Webpack, Vite, etc.)"
          ]
        }
      ]
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Learn server-side programming, APIs, and how to build robust backend systems.",
      color: "green",
      icon: Server,
      modules: [
        {
          id: "backend-module1",
          title: "Module 1: Backend Fundamentals",
          icon: Server,
          lectures: [
            "Introduction to Backend Development",
            "Server-Side vs Client-Side",
            "HTTP Protocol",
            "RESTful API Design",
            "GraphQL Introduction",
            "JSON and Data Formats",
            "Middleware Concept",
            "Authentication vs Authorization",
            "Session Management",
            "Cookies and Tokens",
            "Environment Variables and Configuration"
          ]
        },
        {
          id: "backend-module2",
          title: "Module 2: Node.js & Express",
          icon: Code,
          lectures: [
            "Node.js Fundamentals",
            "Node.js Runtime and Architecture",
            "NPM and Package Management",
            "Express.js Framework",
            "Routing in Express",
            "Middleware in Express",
            "Template Engines",
            "Error Handling",
            "Building RESTful APIs with Express",
            "Input Validation",
            "File Uploads and Downloads"
          ]
        },
        {
          id: "backend-module3",
          title: "Module 3: Databases",
          icon: Database,
          lectures: [
            "Introduction to Databases",
            "SQL vs NoSQL",
            "MongoDB Fundamentals",
            "MongoDB with Mongoose ODM",
            "MySQL/PostgreSQL Basics",
            "SQL Query Fundamentals",
            "Database Design Principles",
            "Data Modeling",
            "Indexing and Performance",
            "Migrations and Schema Changes",
            "Database Transactions"
          ]
        },
        {
          id: "backend-module4",
          title: "Module 4: Authentication & Security",
          icon: ShieldCheck,
          lectures: [
            "User Authentication Strategies",
            "JWT Authentication",
            "OAuth and Social Login",
            "Password Hashing and Security",
            "CORS Configuration",
            "XSS and CSRF Prevention",
            "Input Sanitization",
            "Rate Limiting",
            "Security Headers",
            "HTTPS Implementation",
            "Security Best Practices"
          ]
        }
      ]
    },
    {
      id: "fullstack",
      title: "Full Stack Integration",
      description: "Connect the frontend and backend, and learn to build complete web applications.",
      color: "purple",
      icon: ArrowLeftRight,
      modules: [
        {
          id: "fullstack-module1",
          title: "Module 1: Full Stack Architecture",
          icon: Layers,
          lectures: [
            "Full Stack Application Architecture",
            "Client-Server Communication",
            "API Integration in Frontend",
            "State Management Across Stack",
            "Error Handling and Reporting",
            "Logging and Monitoring",
            "Performance Optimization",
            "Caching Strategies",
            "Content Delivery Networks (CDNs)",
            "Microservices vs Monolith",
            "Serverless Architecture"
          ]
        },
        {
          id: "fullstack-module2",
          title: "Module 2: Full Stack Projects",
          icon: Workflow,
          lectures: [
            "Project Setup and Structure",
            "Building a CRUD Application",
            "Real-time Features with WebSockets",
            "Authentication Implementation",
            "File Uploads and Storage",
            "Search Functionality",
            "Pagination and Filtering",
            "Admin Dashboards",
            "User Management Systems",
            "Payment Integration",
            "Analytics and Reporting"
          ]
        },
        {
          id: "fullstack-module3",
          title: "Module 3: Testing & Deployment",
          icon: Settings,
          lectures: [
            "Testing Strategies",
            "Unit Testing",
            "Integration Testing",
            "End-to-End Testing",
            "Continuous Integration (CI)",
            "Continuous Deployment (CD)",
            "Deployment Options",
            "Docker Basics",
            "Container Orchestration",
            "Cloud Hosting",
            "Monitoring and Logging in Production"
          ]
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      description: "Explore advanced concepts and emerging technologies in web development.",
      color: "rose",
      icon: Cpu,
      modules: [
        {
          id: "advanced-module1",
          title: "Module 1: Modern Web Technologies",
          icon: Globe,
          lectures: [
            "Web Assembly",
            "Server-Side Rendering (SSR)",
            "Static Site Generation (SSG)",
            "JAMstack Architecture",
            "Headless CMS",
            "GraphQL Advanced Topics",
            "Web Workers",
            "Service Workers",
            "WebRTC",
            "WebSockets and Socket.io",
            "Web3 and Blockchain Basics"
          ]
        },
        {
          id: "advanced-module2",
          title: "Module 2: DevOps & Cloud",
          icon: Cloud,
          lectures: [
            "Introduction to DevOps",
            "CI/CD Pipelines",
            "Docker Advanced",
            "Kubernetes Introduction",
            "AWS/Azure/GCP Basics",
            "Serverless Functions",
            "Cloud Databases",
            "Monitoring and Logging",
            "Infrastructure as Code",
            "Scaling Applications",
            "Cost Optimization"
          ]
        },
        {
          id: "advanced-module3",
          title: "Module 3: Performance & Optimization",
          icon: Settings,
          lectures: [
            "Web Performance Metrics",
            "Lighthouse and Performance Testing",
            "Critical Rendering Path",
            "Lazy Loading",
            "Code Splitting",
            "Image Optimization",
            "Caching Strategies",
            "Memory Leaks and Debugging",
            "Database Query Optimization",
            "Backend Performance Tuning",
            "Scalability Considerations"
          ]
        },
        {
          id: "advanced-module4",
          title: "Module 4: Mobile & Cross-Platform",
          icon: MonitorSmartphone,
          lectures: [
            "Progressive Web Apps Deep Dive",
            "React Native Fundamentals",
            "Hybrid App Development",
            "Mobile-First Design Strategies",
            "Offline-First Applications",
            "Push Notifications",
            "Cross-Browser Compatibility",
            "Responsive Design Advanced",
            "Touch and Gesture Interfaces",
            "Mobile Performance Optimization",
            "App Store Deployment"
          ]
        }
      ]
    },
    {
      id: "career",
      title: "Professional Development",
      description: "Build your career as a full stack developer through practical skills and industry knowledge.",
      color: "amber",
      icon: Workflow,
      modules: [
        {
          id: "career-module1",
          title: "Module 1: Project & Code Quality",
          icon: Code,
          lectures: [
            "Version Control with Git",
            "GitHub/GitLab Workflow",
            "Code Reviews",
            "Clean Code Principles",
            "Design Patterns",
            "SOLID Principles",
            "Code Documentation",
            "Linting and Formatting",
            "Technical Debt Management",
            "Refactoring Strategies",
            "Code Analysis Tools"
          ]
        },
        {
          id: "career-module2",
          title: "Module 2: Soft Skills & Team Work",
          icon: Globe,
          lectures: [
            "Agile Development",
            "Scrum and Kanban",
            "Technical Communication",
            "Estimation and Planning",
            "Problem-Solving Techniques",
            "Team Collaboration",
            "Remote Work Strategies",
            "Time Management",
            "Presenting Technical Topics",
            "Technical Writing",
            "Client Communication"
          ]
        },
        {
          id: "career-module3",
          title: "Module 3: Career Development",
          icon: Settings,
          lectures: [
            "Building a Developer Portfolio",
            "GitHub Profile Optimization",
            "Resume for Developers",
            "LinkedIn for Developers",
            "Technical Interview Preparation",
            "Coding Challenges",
            "System Design Interviews",
            "Freelancing Fundamentals",
            "Finding Remote Opportunities",
            "Negotiating Job Offers",
            "Continued Learning Strategies"
          ]
        }
      ]
    }
  ]
}; 