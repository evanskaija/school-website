import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Shield, GraduationCap, BookUser, Users, KeyRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import sacredLogo from "@/assets/sacred-logo.png";
import { z } from "zod";

type UserRole = "admin" | "teacher" | "student" | "parent";
type AuthMode = "login" | "signup" | "forgot" | "reset";

const roleOptions: { value: UserRole; label: string; icon: React.ElementType; color: string }[] = [
  { value: "admin", label: "Admin", icon: Shield, color: "text-primary" },
  { value: "teacher", label: "Teacher", icon: GraduationCap, color: "text-secondary-foreground" },
  { value: "student", label: "Student", icon: BookUser, color: "text-accent" },
  { value: "parent", label: "Parent", icon: Users, color: "text-primary" },
];

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; confirm?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is a password reset callback
    const type = searchParams.get("type");
    if (type === "recovery") {
      setMode("reset");
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && mode !== "reset") {
      navigate("/");
    }
  }, [user, navigate, mode]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string; confirm?: string } = {};

    if (mode !== "reset") {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        newErrors.email = emailResult.error.errors[0].message;
      }
    }

    if (mode === "login" || mode === "signup" || mode === "reset") {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
    }

    if (mode === "reset" && password !== confirmPassword) {
      newErrors.confirm = "Passwords do not match";
    }

    if (mode === "signup") {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) {
        newErrors.name = nameResult.error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.errors[0].message });
      return;
    }

    setIsSubmitting(true);
    const redirectUrl = `${window.location.origin}/auth?type=recovery`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link. Please check your inbox.",
      });
      setMode("login");
    }
    setIsSubmitting(false);
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password updated",
        description: "Your password has been successfully reset. You can now log in.",
      });
      setMode("login");
      setPassword("");
      setConfirmPassword("");
    }
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "forgot") {
      await handleForgotPassword();
      return;
    }

    if (mode === "reset") {
      await handleResetPassword();
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (!error) {
        navigate("/");
      }
    } else if (mode === "signup") {
      const { error } = await signUp(email, password, fullName, role);
      if (!error) {
        setMode("login");
        setEmail("");
        setPassword("");
        setFullName("");
      }
    }

    setIsSubmitting(false);
  };

  const getTitle = () => {
    switch (mode) {
      case "login": return t("auth.welcomeBack");
      case "signup": return t("auth.createAccount");
      case "forgot": return t("auth.forgotPassword");
      case "reset": return t("auth.resetPassword");
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login": return t("auth.loginSubtitle");
      case "signup": return t("auth.signupSubtitle");
      case "forgot": return t("auth.forgotSubtitle");
      case "reset": return t("auth.resetSubtitle");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-primary-foreground">
          <motion.img
            src={sacredLogo}
            alt="Sacred Heart Secondary School"
            className="w-40 h-40 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1
            className="font-display text-4xl font-bold text-center mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sacred Heart Secondary School
          </motion.h1>
          <motion.p
            className="text-xl text-center text-primary-foreground/80 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("hero.tagline")}
          </motion.p>
          <motion.div
            className="grid grid-cols-2 gap-6 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {roleOptions.map((r) => (
              <div key={r.value} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
                  <r.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{r.label} {t("auth.portalLabel")}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <LanguageToggle />
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img src={sacredLogo} alt="Sacred Heart" className="w-20 h-20 mb-4" />
            <h2 className="font-display text-xl font-bold text-foreground">Sacred Heart</h2>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              {getTitle()}
            </h2>
            <p className="text-muted-foreground">
              {getSubtitle()}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">{t("auth.fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
            )}

            {(mode === "login" || mode === "signup" || mode === "forgot") && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            )}

            {(mode === "login" || mode === "signup" || mode === "reset") && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  {mode === "reset" ? t("auth.newPassword") : t("auth.password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
            )}

            {mode === "reset" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">{t("auth.confirmNewPassword")}</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirm && <p className="text-sm text-destructive">{errors.confirm}</p>}
              </div>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-sm text-primary hover:underline"
                >
                  {t("auth.forgotPasswordQ")}
                </button>
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-2">
                <Label className="text-foreground">{t("auth.selectRole")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${role === r.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                        }`}
                    >
                      <r.icon className={`w-5 h-5 ${r.color}`} />
                      <span className="font-medium text-foreground">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("auth.processing") :
                mode === "login" ? t("auth.login") :
                  mode === "signup" ? t("auth.signup") :
                    mode === "forgot" ? t("auth.sendResetLink") :
                      t("auth.resetPassword")
              }
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          {/* Toggle Login/Signup */}
          {(mode === "login" || mode === "signup") && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {mode === "login" ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setErrors({});
                  }}
                  className="text-primary font-medium hover:underline"
                >
                  {mode === "login" ? t("auth.signup") : t("auth.login")}
                </button>
              </p>
            </div>
          )}

          {/* Back to Login from Forgot */}
          {mode === "forgot" && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> {t("auth.backToLogin")}
              </button>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("auth.backToHome")}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}