import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

import evansImg from "@/assets/uploads/Evans kai.jpg";
import tamalaImg from "@/assets/uploads/Tamala nguzu.webp";
import yuniaImg from "@/assets/uploads/Yunia faraja.jpg";
import happyImg from "@/assets/uploads/happy.jpg";

const testimonials = [
    {
        name: "Evans Kai",
        roleKey: "test.role3",
        contentKey: "test.content1",
        image: evansImg,
        initials: "EK"
    },
    {
        name: "Tamala Nguzu",
        roleKey: "test.role2",
        contentKey: "test.content2",
        image: tamalaImg,
        initials: "TN"
    },
    {
        name: "Yunia Faraja",
        roleKey: "test.role3",
        contentKey: "test.content3",
        image: yuniaImg,
        initials: "YF"
    },
    {
        name: "Happy",
        roleKey: "test.role1",
        contentKey: "test.content4",
        image: happyImg,
        initials: "H"
    }
];

export function TestimonialsSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 dark:border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        {t("test.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t("test.desc")}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="h-full p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <Quote className="w-8 h-8 text-primary/20 mb-6" />
                                        <p className="text-foreground/80 leading-relaxed mb-6 min-h-[100px]">
                                            &ldquo;{t(testimonial.contentKey)}&rdquo;
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10 border border-border">
                                                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                <AvatarFallback className="bg-secondary/10 text-secondary">{testimonial.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
                                                <p className="text-xs text-muted-foreground">{t(testimonial.roleKey)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-12 border-primary text-primary hover:bg-primary hover:text-white" />
                            <CarouselNext className="-right-12 border-primary text-primary hover:bg-primary hover:text-white" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
