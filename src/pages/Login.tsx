import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LockKeyhole, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { auth } from "@/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ALLOWED_DOMAINS = ["gmail.com", "ds.study.iitm.ac.in"];

const isAllowedEmail = (email: string) => {
  const domain = email.split("@")[1];
  return ALLOWED_DOMAINS.includes(domain);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ||
    new URLSearchParams(location.search).get("redirect") ||
    "/feed";
  const signupHref =
    redirectPath && redirectPath !== "/feed"
      ? `/signup?redirect=${encodeURIComponent(redirectPath)}`
      : "/signup";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isAllowedEmail(email)) {
      toast({
        variant: "destructive",
        title: "Email domain not allowed",
        description:
          "Only Gmail and IITM student emails are allowed. Please use Gmail or @ds.study.iitm.ac.in.",
      });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      navigate(redirectPath);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="page-hero">
            <div className="section-eyebrow">Secure access</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              Sign in once for
              <span className="text-gradient-premium"> AI Assistant and StudyMatch.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              All standard IITM Scholar Hub tools remain public. Login is only needed for AI and
              the community features inside StudyMatch.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="feature-tile">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Redirect-aware login takes you back to the feature you opened.
                </p>
              </div>
              <div className="feature-tile">
                <LockKeyhole className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Gmail and IITM student email access keeps the gated area cleaner and safer.
                </p>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Card className="page-panel border-border/80 p-2">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-[-0.04em]">Welcome back</CardTitle>
                <CardDescription>
                  {redirectPath === "/ai-assistant"
                    ? "Sign in to unlock the AI Assistant."
                    : "Sign in to continue with StudyMatch and AI tools."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="ios-input h-12"
                    />
                    <p className="text-xs text-muted-foreground">
                      Login is restricted to Gmail accounts and IITM student emails.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="ios-input h-12"
                    />
                  </div>

                  <Button type="submit" className="h-12 w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to={signupHref} className="font-medium text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
