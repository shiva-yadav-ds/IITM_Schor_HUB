import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Sparkles, UserPlus2 } from "lucide-react";
import { motion } from "framer-motion";

import { auth, db } from "@/firebaseConfig";
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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ||
    new URLSearchParams(location.search).get("redirect");
  const loginHref = redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : "/login";

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
      });
      return;
    }

    if (!isAllowedEmail(formData.email)) {
      toast({
        variant: "destructive",
        title: "Email domain not allowed",
        description:
          "Only Gmail and IITM student emails are allowed. Please use Gmail or @ds.study.iitm.ac.in.",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        profileComplete: false,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Account created!",
        description: redirectPath
          ? "Your account is ready. Continue to the feature you opened."
          : "Your account is ready. Complete your profile whenever you want to use StudyMatch.",
      });

      navigate(redirectPath || "/profile-setup");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="page-hero">
            <div className="section-eyebrow">Create account</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              One login connects
              <span className="text-gradient-premium"> AI support and StudyMatch.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Sign up once, then use the gated parts of IITM Scholar Hub with the same clean interface
              as the rest of the site.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="feature-tile">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Public tools remain instantly available without extra friction.
                </p>
              </div>
              <div className="feature-tile">
                <UserPlus2 className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  After signup, profile setup prepares StudyMatch for college, level, and subject-aware matching.
                </p>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Card className="page-panel border-border/80 p-2">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-[-0.04em]">Create your account</CardTitle>
                <CardDescription>One account works for AI Assistant and StudyMatch features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      className="ios-input h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      className="ios-input h-12"
                    />
                    <p className="text-xs text-muted-foreground">
                      Only Gmail accounts and IITM student emails are allowed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                      className="ios-input h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      required
                      className="ios-input h-12"
                    />
                  </div>

                  <Button type="submit" className="h-12 w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to={loginHref} className="font-medium text-primary hover:underline">
                    Sign in
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

export default Signup;
