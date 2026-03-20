import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
    {
        questionKey: "faq.q1",
        answerKey: "faq.a1"
    },
    {
        questionKey: "faq.q2",
        answerKey: "faq.a2"
    },
    {
        questionKey: "faq.q3",
        answerKey: "faq.a3"
    },
    {
        questionKey: "faq.q4",
        answerKey: "faq.a4"
    },
    {
        questionKey: "faq.q5",
        answerKey: "faq.a5"
    }
];

export function FAQSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{t("faq.title")}</h2>
                    <p className="text-muted-foreground text-lg">
                        {t("faq.desc")}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted">
                                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-primary transition-colors">
                                    {t(faq.questionKey)}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                                    {t(faq.answerKey)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
