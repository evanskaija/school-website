import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">(
        () => (localStorage.getItem("theme") as "light" | "dark") || "light"
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <motion.button
            className="flex items-center justify-center p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-all border border-border/50 shadow-sm"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            <div className="relative w-5 h-5">
                <motion.div
                    animate={{
                        scale: theme === "light" ? 1 : 0,
                        rotate: theme === "light" ? 0 : 90,
                        opacity: theme === "light" ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                </motion.div>

                <motion.div
                    animate={{
                        scale: theme === "dark" ? 1 : 0,
                        rotate: theme === "dark" ? 0 : -90,
                        opacity: theme === "dark" ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400/10" />
                </motion.div>
            </div>
        </motion.button>
    );
}
