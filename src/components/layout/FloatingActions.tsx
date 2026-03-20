import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, FileText, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function FloatingActions() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-3"
                    >
                        <Button
                            className="bg-primary text-primary-foreground shadow-lg rounded-full h-12 px-6 flex items-center gap-2 hover:scale-105 transition-transform"
                            onClick={() => window.location.href = '/admissions'}
                        >
                            <FileText className="w-4 h-4" />
                            {t("common.apply")}
                        </Button>
                        <Button
                            className="bg-green-600 text-white shadow-lg rounded-full h-12 px-6 flex items-center gap-2 hover:bg-green-700 hover:scale-105 transition-transform"
                            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                        >
                            <MessageCircle className="w-4 h-4" />
                            {t("common.chatWhatsApp")}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-110 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </Button>
        </div>
    );
}
