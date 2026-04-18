import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Users, Video } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    title: "Find Study Partners",
    description: "Match with students from your college, level, and subjects for focused collaboration.",
    icon: Users,
  },
  {
    title: "Run Study Sessions",
    description: "Create Google Meet based sessions, manage requests, and keep study groups moving.",
    icon: BookOpen,
  },
  {
    title: "Share Study Reels",
    description: "Use short educational clips, peer ratings, and leaderboard features to stay engaged.",
    icon: Video,
  },
];

const StudyMatchIndex = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-shell py-16">
        <div className="page-panel flex min-h-[320px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Loading StudyMatch...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-8 pb-16 pt-6 sm:pt-8">
      <section className="page-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(52,168,83,0.12),transparent_26%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="section-eyebrow">Student collaboration</div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-6xl"
            >
              StudyMatch makes
              <span className="text-gradient-premium"> IITM learning social and structured.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
            >
              Meet peers, create study sessions, explore educational reels, and build consistency
              with the same polished visual language as the rest of IITM Scholar Hub.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              {user ? (
                <>
                  <Link to="/feed">
                    <Button size="lg" className="min-w-[210px]">
                      Go to Feed
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button size="lg" variant="outline" className="min-w-[210px]">
                      View Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="min-w-[210px]">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="min-w-[210px]">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid gap-4"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="feature-tile flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="page-panel p-6 sm:p-8">
        <div className="mb-8">
          <div className="section-eyebrow">Why it fits here</div>
          <h2 className="section-title mt-5">StudyMatch now lives inside the same Scholar Hub experience</h2>
          <p className="section-copy mt-4 max-w-3xl">
            Calculators, formula tools, resources, AI, and community workflows now belong to one app.
            Core academic tools remain public, while AI and StudyMatch continue to use login-based access.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="feature-tile">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">Peer Discovery</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Match with the right students through profile, subject, and college-aware flows.
            </p>
          </div>

          <div className="feature-tile">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">Session Workflow</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Create sessions, manage requests, join chats, and keep study time accountable.
            </p>
          </div>

          <div className="feature-tile">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">Motivation Layer</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Reels, badges, rankings, and ratings keep the learning loop active without changing the core UI.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyMatchIndex;
