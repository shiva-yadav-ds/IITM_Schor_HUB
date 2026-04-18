import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-border/80 bg-white/75 py-10 backdrop-blur-xl dark:bg-card/55">
      <div className="page-shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-3 text-lg font-semibold tracking-[-0.03em] text-foreground">IITM Scholar Hub</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              A comprehensive tool for IITM BS/BSc students to predict marks
              and calculate CGPA.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold tracking-[-0.03em] text-foreground">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/endterm-marks-predictor" className="text-muted-foreground transition-colors hover:text-primary">
                  End Term Marks Predictor
                </Link>
              </li>
              <li>
                <Link to="/grade-calculator" className="text-muted-foreground transition-colors hover:text-primary">
                  Grade Calculator
                </Link>
              </li>
              <li>
                <Link to="/cgpa-calculator" className="text-muted-foreground transition-colors hover:text-primary">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/resume-generator" className="text-muted-foreground transition-colors hover:text-primary">
                  Resume Generator
                </Link>
              </li>
              <li>
                <Link to="/roadmaps" className="text-muted-foreground transition-colors hover:text-primary">
                  Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/python-cheatsheet" className="text-muted-foreground transition-colors hover:text-primary">
                  Python Cheatsheet
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-muted-foreground transition-colors hover:text-primary">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold tracking-[-0.03em] text-foreground">Connect</h2>
            <div className="flex space-x-4">
              <a
                href="https://github.com/shiva-yadav-ds"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-secondary/75 text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/shiva-yadav-4043912b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-secondary/75 text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:yaduvanshishubha678@gmail.com"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-secondary/75 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/80 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} IITM Scholar Hub. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="block md:inline">Disclaimer: This is an unofficial tool.</span>
            <span className="block md:inline md:ml-1">Not affiliated with IIT Madras.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
