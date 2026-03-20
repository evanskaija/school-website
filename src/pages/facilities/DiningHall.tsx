import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { UtensilsCrossed, Clock, Users, Salad, Coffee, Heart, ChefHat, Leaf } from "lucide-react";
import heroImage from "@/assets/dining.jpg";

const features = [
  { icon: Users, title: "500+ Capacity", description: "Spacious dining area accommodating all students" },
  { icon: ChefHat, title: "Professional Kitchen", description: "Modern kitchen with trained culinary staff" },
  { icon: Salad, title: "Balanced Meals", description: "Nutritionally planned menus by certified dietitians" },
  { icon: Leaf, title: "Fresh Ingredients", description: "Locally sourced fresh produce and quality ingredients" },
  { icon: Heart, title: "Hygienic Standards", description: "Strict food safety and hygiene protocols" },
  { icon: Coffee, title: "Snack Counter", description: "Healthy snacks and beverages available" },
];

const weeklyMenu = [
  { day: "Monday", breakfast: "Uji, Chapati, Eggs", lunch: "Rice, Beans, Vegetables", dinner: "Ugali, Fish, Sukuma" },
  { day: "Tuesday", breakfast: "Tea, Bread, Fruits", lunch: "Pilau, Kachumbari", dinner: "Rice, Chicken Stew" },
  { day: "Wednesday", breakfast: "Porridge, Mandazi", lunch: "Ugali, Beef, Spinach", dinner: "Chapati, Beans" },
  { day: "Thursday", breakfast: "Tea, Eggs, Toast", lunch: "Wali, Samaki", dinner: "Rice, Vegetable Curry" },
  { day: "Friday", breakfast: "Uji, Vitumbua", lunch: "Biryani, Salad", dinner: "Ugali, Chicken" },
];

const mealTimes = [
  { meal: "Breakfast", time: "6:30 AM - 7:30 AM" },
  { meal: "Tea Break", time: "10:00 AM - 10:30 AM" },
  { meal: "Lunch", time: "12:30 PM - 1:30 PM" },
  { meal: "Tea Break", time: "4:00 PM - 4:30 PM" },
  { meal: "Dinner", time: "6:30 PM - 7:30 PM" },
];

export default function DiningHall() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        title="Dining Hall"
        subtitle="Nourishing bodies and minds with wholesome, balanced meals prepared with care"
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: "Facilities", href: "/facilities/library" },
          { label: "Dining Hall" }
        ]}
      />

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Dining Features
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Quality Meals, Every Day
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedCard key={feature.title} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Times */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Meal Schedule */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Meal Schedule
                </h2>
              </div>
              <div className="bg-foreground rounded-2xl p-6">
                {mealTimes.map((schedule, index) => (
                  <motion.div
                    key={schedule.meal}
                    className="flex items-center justify-between py-4 border-b border-muted/20 last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-primary-foreground">{schedule.meal}</span>
                    <span className="text-secondary font-semibold">{schedule.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Menu Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="w-8 h-8 text-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Sample Weekly Menu
                </h2>
              </div>
              <div className="space-y-3">
                {weeklyMenu.slice(0, 3).map((day, index) => (
                  <motion.div
                    key={day.day}
                    className="p-4 bg-card rounded-xl border-l-4 border-l-secondary"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h4 className="font-semibold text-foreground mb-2">{day.day}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><span className="text-secondary">Breakfast:</span> {day.breakfast}</p>
                      <p><span className="text-secondary">Lunch:</span> {day.lunch}</p>
                      <p><span className="text-secondary">Dinner:</span> {day.dinner}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dietary Options */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Heart className="w-8 h-8 text-secondary" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl font-bold text-primary-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Special Dietary Needs
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We accommodate various dietary requirements including vegetarian,
              allergies, and religious dietary restrictions. Please inform the dining
              staff in advance.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {["Vegetarian", "Halal", "Allergies", "Medical Diets"].map((diet) => (
                <span
                  key={diet}
                  className="px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium"
                >
                  {diet}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
