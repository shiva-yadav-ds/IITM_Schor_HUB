import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import {
  Book,
  BookOpen,
  Calculator,
  ChevronDown,
  Code2,
  FileText,
  Home,
  LogIn,
  Menu,
  MessageSquare,
  UserCircle2,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/firebaseConfig";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  {
    name: "Tools",
    icon: Calculator,
    dropdown: true,
    items: [
      { name: "Grade Calculator", path: "/grade-calculator", icon: Calculator },
      { name: "CGPA Calculator", path: "/cgpa-calculator", icon: Calculator },
      { name: "Marks Predictor", path: "/endterm-marks-predictor", icon: Calculator },
      { name: "Resume Generator", path: "/resume-generator", icon: FileText },
    ],
  },
  {
    name: "Resources",
    icon: BookOpen,
    dropdown: true,
    items: [
      { name: "Learning Roadmaps", path: "/roadmaps", icon: Book },
      { name: "Python Cheatsheet", path: "/python-cheatsheet", icon: Code2 },
    ],
  },
  { name: "StudyMatch", path: "/study-match", icon: Users },
  { name: "AI Assistant", path: "/ai-assistant", icon: MessageSquare },
];

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [profileName, setProfileName] = useState<string>("");
  const userDisplayName =
    profileName || user?.displayName?.trim() || user?.email?.split("@")[0] || "Profile";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const loadProfileName = async () => {
      if (!user?.uid) {
        setProfileName("");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as { name?: string };
          setProfileName(data.name?.trim() || "");
        } else {
          setProfileName("");
        }
      } catch {
        setProfileName("");
      }
    };

    loadProfileName();
  }, [user?.uid]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div
        className={cn(
          "page-shell rounded-[1.75rem] border border-white/70 bg-white/82 shadow-[var(--shadow-sm)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-card/82",
          scrolled && "shadow-[var(--shadow)]",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1a73e8_0%,#4285f4_55%,#34a853_100%)] text-white shadow-[var(--shadow-sm)]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary/70">
                IIT Madras
              </div>
              <div className="text-base font-semibold tracking-[-0.03em] text-foreground sm:text-lg">
                Scholar Hub
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !item.dropdown && location.pathname === item.path;
              const isDropdownActive =
                item.dropdown && item.items?.some((subItem) => location.pathname === subItem.path);

              if (item.dropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.name ? null : item.name)
                      }
                      className={cn(
                        "focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                        isDropdownActive && "bg-secondary text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 top-full mt-3 w-60 rounded-[1.5rem] border border-border/80 bg-popover/98 p-2 shadow-[var(--shadow-md)] backdrop-blur-xl"
                        >
                          {item.items?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = location.pathname === subItem.path;

                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className={cn(
                                  "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-colors",
                                  isSubActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                                )}
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
                                  <SubIcon className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{subItem.name}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    isActive && "bg-secondary text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/profile" className="hidden sm:block">
                <Button variant="outline" size="sm" className="rounded-full">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  <span className="max-w-[10rem] truncate">{userDisplayName}</span>
                </Button>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button size="sm" className="rounded-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/70 pb-4 md:hidden"
            >
              <div className="space-y-2 pt-4">
                <Link
                  to={user ? "/profile" : "/login"}
                  className={cn(
                    "flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium",
                    "text-muted-foreground",
                  )}
                >
                  {user ? <UserCircle2 className="h-4 w-4 text-primary" /> : <LogIn className="h-4 w-4 text-primary" />}
                  {user ? userDisplayName : "Login"}
                </Link>
                {navItems.map((item) => {
                  const Icon = item.icon;

                  if (item.dropdown) {
                    const open = activeDropdown === item.name;

                    return (
                      <div key={item.name} className="rounded-[1.5rem] bg-secondary/55 p-1">
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(open ? null : item.name)}
                          className="flex w-full items-center justify-between rounded-[1.25rem] px-4 py-3 text-left text-sm font-medium text-foreground"
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-primary" />
                            {item.name}
                          </span>
                          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-1 overflow-hidden px-1 pb-1"
                            >
                              {item.items?.map((subItem) => {
                                const SubIcon = subItem.icon;
                                const isSubActive = location.pathname === subItem.path;

                                return (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.path}
                                    className={cn(
                                      "flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm",
                                      isSubActive
                                        ? "bg-white text-foreground shadow-[var(--shadow-sm)] dark:bg-card"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    <SubIcon className="h-4 w-4 text-primary" />
                                    {subItem.name}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium",
                        isActive
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
