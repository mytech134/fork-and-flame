"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { useEffect, useState } from "react";
import {
  Flame,
  UtensilsCrossed,
  Wine,
  Leaf,
  Clock,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

/* ----------------------------- DATA ----------------------------- */

type Badge = "Vegan" | "Spicy" | "GF" | "Signature" | "New";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  badges?: Badge[];
}

interface MenuCategory {
  category: string;
  tagline: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    category: "Starters",
    tagline: "Small plates, big flavor",
    icon: <Leaf className="h-4 w-4" />,
    items: [
      {
        name: "Charred Octopus",
        description:
          "Grilled octopus, smoked paprika, lemon oil, fingerling potatoes",
        price: "$18",
        badges: ["GF", "Signature"],
      },
      {
        name: "Flame-Kissed Burrata",
        description: "Torched burrata, heirloom tomatoes, basil ash, sourdough",
        price: "$16",
        badges: ["Signature"],
      },
      {
        name: "Ember Wings",
        description: "Slow-smoked wings, honey chipotle glaze, pickled slaw",
        price: "$14",
        badges: ["Spicy"],
      },
      {
        name: "Truffle Arancini",
        description: "Crispy risotto spheres, black truffle, parmesan cream",
        price: "$15",
        badges: ["Vegan"],
      },
      {
        name: "Smoked Beet Tartare",
        description: "Wood-roasted beets, capers, mustard seed, rye crisp",
        price: "$13",
        badges: ["Vegan", "GF"],
      },
    ],
  },
  {
    category: "Mains",
    tagline: "From the hearth",
    icon: <UtensilsCrossed className="h-4 w-4" />,
    items: [
      {
        name: "Fork & Flame Ribeye",
        description:
          "45-day dry-aged ribeye, bone marrow butter, charred shallot",
        price: "$52",
        badges: ["Signature", "GF"],
      },
      {
        name: "Wood-Fired Salmon",
        description: "Cedar plank salmon, citrus glaze, charred fennel",
        price: "$34",
        badges: ["GF"],
      },
      {
        name: "Truffle Risotto",
        description: "Arborio rice, black truffle, aged parmesan",
        price: "$28",
        badges: ["Vegan"],
      },
      {
        name: "Ember Lamb Chops",
        description: "Harissa-rubbed lamb, mint yogurt, pomegranate",
        price: "$42",
        badges: ["Spicy", "GF"],
      },
      {
        name: "Fire-Roasted Half Chicken",
        description: "Brined 24h, smoked paprika rub, charred lemon",
        price: "$29",
        badges: ["GF"],
      },
      {
        name: "Charred Cauliflower Steak",
        description: "Tahini, dukkah, golden raisins, herb oil",
        price: "$24",
        badges: ["Vegan", "GF"],
      },
    ],
  },
  {
    category: "From the Grill",
    tagline: "Pure fire, pure craft",
    icon: <Flame className="h-4 w-4" />,
    items: [
      {
        name: "Tomahawk (for 2)",
        description: "60-day dry-aged tomahawk, smoked salt, chimichurri",
        price: "$95",
        badges: ["Signature"],
      },
      {
        name: "Wagyu Flat Iron",
        description: "A5 wagyu, bone marrow jus, charred spring onion",
        price: "$68",
        badges: ["GF"],
      },
      {
        name: "Smoked Short Rib",
        description: "12-hour smoked, coffee rub, horseradish cream",
        price: "$44",
        badges: ["Signature"],
      },
      {
        name: "Whole Grilled Branzino",
        description: "Lemon, thyme, olive oil, sea salt",
        price: "$38",
        badges: ["GF"],
      },
    ],
  },
  {
    category: "Sides",
    tagline: "The supporting cast",
    icon: <Leaf className="h-4 w-4" />,
    items: [
      {
        name: "Charred Broccolini",
        description: "Chili flakes, lemon, toasted almond",
        price: "$9",
        badges: ["Vegan", "GF"],
      },
      {
        name: "Truffle Fries",
        description: "Hand-cut, truffle oil, parmesan, chive",
        price: "$11",
      },
      {
        name: "Ember Potatoes",
        description: "Fire-roasted, rosemary, garlic aioli",
        price: "$8",
        badges: ["Vegan"],
      },
      {
        name: "Smoked Corn Ribs",
        description: "Chipotle butter, cotija, lime",
        price: "$10",
        badges: ["Spicy"],
      },
    ],
  },
  {
    category: "Desserts",
    tagline: "Sweet endings",
    icon: <Star className="h-4 w-4" />,
    items: [
      {
        name: "Burnt Basque Cheesecake",
        description: "Caramelized top, berry compote",
        price: "$12",
        badges: ["Signature"],
      },
      {
        name: "Molten Chocolate",
        description: "Dark chocolate lava, vanilla bean ice cream",
        price: "$11",
      },
      {
        name: "Smoked Honey Panna Cotta",
        description: "Applewood smoked honey, toasted almonds",
        price: "$10",
        badges: ["GF"],
      },
      {
        name: "Campfire S'mores Tart",
        description: "Torched marshmallow, graham crust, dark ganache",
        price: "$12",
        badges: ["New"],
      },
    ],
  },
  {
    category: "Drinks",
    tagline: "Poured with intention",
    icon: <Wine className="h-4 w-4" />,
    items: [
      {
        name: "Smoked Old Fashioned",
        description: "Bourbon, applewood smoke, orange bitters",
        price: "$16",
        badges: ["Signature"],
      },
      {
        name: "Ember Margarita",
        description: "Mezcal, chili-infused agave, charred lime",
        price: "$15",
        badges: ["Spicy"],
      },
      {
        name: "House Red / White",
        description: "Rotating selection, ask your server",
        price: "$12",
      },
      {
        name: "Zero-Proof Spritz",
        description: "Blood orange, rosemary, sparkling water",
        price: "$9",
        badges: ["Vegan", "GF"],
      },
    ],
  },
];

const badgeStyles: Record<Badge, string> = {
  Vegan: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Spicy: "bg-red-500/10 text-red-400 border-red-500/30",
  GF: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Signature: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  New: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

/* ----------------------------- PAGE ----------------------------- */

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = menuData.find((c) => c.category === activeCategory)!;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans overflow-x-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-600/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-red-600/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"
        />
      </div>

      {/* -------------------- NAV -------------------- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <motion.a
            href="#top"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Flame className="h-6 w-6 text-amber-500" />
            </motion.div>
            <span className="text-lg font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Fork & Flame
            </span>
          </motion.a>

          <ul className="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
            {[
              { label: "Menu", href: "#menu" },
              { label: "About", href: "#about" },
              { label: "Reviews", href: "#reviews" },
              { label: "Visit", href: "#reserve" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative text-neutral-300 transition hover:text-amber-400 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-amber-400 after:to-red-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#reserve"
            className="hidden rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-5 py-2 text-xs font-semibold tracking-wider text-white uppercase shadow-lg shadow-orange-900/40 transition-transform hover:scale-105 md:inline-block"
          >
            Book a Table
          </a>
        </div>
      </nav>

      {/* -------------------- HERO -------------------- */}
      <section
        id="top"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 text-center"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black" />
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 30% 40%, rgba(251,146,60,0.15), transparent 60%)",
                  "radial-gradient(circle at 70% 60%, rgba(239,68,68,0.15), transparent 60%)",
                  "radial-gradient(circle at 30% 40%, rgba(251,146,60,0.15), transparent 60%)",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 mb-4 text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase"
        >
          Est. 2018 · Wood-Fired Kitchen
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          Where Fire Meets{" "}
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "linear-gradient(90deg, #fbbf24, #f97316, #dc2626, #f97316, #fbbf24)",
              backgroundSize: "200% 100%",
            }}
            className="bg-clip-text text-transparent"
          >
            Flavor
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative z-10 mt-6 max-w-xl text-lg text-neutral-300"
        >
          A culinary journey forged in flame — seasonal ingredients, bold
          flavors, and a menu that celebrates the art of fire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/40"
          >
            <span className="relative z-10">Explore the Menu</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.a>
          <motion.a
            href="#reserve"
            whileHover={{ scale: 1.05, borderColor: "#f59e0b" }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-neutral-700 bg-neutral-950/50 px-8 py-3.5 text-sm font-semibold text-neutral-200 backdrop-blur transition hover:text-amber-400"
          >
            Reserve a Table
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-widest text-neutral-400 uppercase"
        >
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-amber-500" /> Tue–Sun · 5pm–11pm
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-amber-500" /> 123 Ember Lane
          </span>
          <span className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-amber-500" /> (555) 018-2018
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 1 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-neutral-700 p-1.5">
            <div className="h-2 w-1 rounded-full bg-amber-500" />
          </div>
        </motion.div>
      </section>

      {/* -------------------- SIGNATURE STRIP -------------------- */}
      <section className="relative z-10 border-y border-neutral-900 bg-neutral-950/60 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-xs tracking-[0.25em] text-neutral-400 uppercase">
          {["★ Michelin Recommended", "Featured in Bon Appétit", "#1 Steakhouse 2024"].map(
            (text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {text}
              </motion.span>
            )
          )}
        </div>
      </section>

      {/* -------------------- MENU -------------------- */}
      <section id="menu" className="relative z-10 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
              Our Menu
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Crafted Over{" "}
              <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                Open Flame
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              Every dish passes through fire. Every plate tells a story.
            </p>
          </motion.div>

          <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
            {menuData.map((section) => {
              const isActive = activeCategory === section.category;
              return (
                <motion.button
                  key={section.category}
                  onClick={() => setActiveCategory(section.category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-red-600 shadow-lg shadow-orange-900/40"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {section.icon}
                    {section.category}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mb-8 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={active.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs tracking-[0.3em] text-neutral-500 uppercase"
              >
                {active.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {active.items.map((item, i) => (
                <motion.article
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-neutral-950 p-6 transition-colors hover:border-amber-500/50"
                >
                  {/* Fire glow on hover */}
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-orange-500/10 to-red-500/0 blur-xl" />
                  </div>

                  <div className="relative z-10">
                    {/* Badges row */}
                    <div className="mb-4 flex flex-wrap items-center gap-1.5">
                      {item.badges?.map((b) => (
                        <span
                          key={b}
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${badgeStyles[b]}`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Name + Price */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-neutral-50 transition-colors group-hover:text-amber-400">
                        {item.name}
                      </h3>
                      <span className="shrink-0 text-lg font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                      {item.description}
                    </p>

                    {/* Divider */}
                    <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

                    {/* Footer */}
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-medium tracking-widest text-amber-500/70 uppercase">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🔥
                      </motion.span>
                      <span>Chef's Pick</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* -------------------- ABOUT -------------------- */}
      <section
        id="about"
        className="relative z-10 border-t border-neutral-900 bg-neutral-950/60 px-6 py-24 md:px-10"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
              Our Story
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Rooted in Smoke,{" "}
              <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                Guided by Fire
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-neutral-400">
              Fork & Flame was born from a simple obsession: what happens when
              you strip cooking back to its most primal form? We source
              whole-animal, farm-direct, and seasonally foraged ingredients,
              then let live fire do the rest.
            </p>
            <p className="mt-4 leading-relaxed text-neutral-400">
              Every plate is an act of patience — from 60-day dry-aged steaks
              to 12-hour smoked short ribs. No shortcuts. Just craft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Years Firing", value: "7+" },
              { label: "Dishes Served", value: "120k" },
              { label: "Chef Awards", value: "12" },
              { label: "Guest Rating", value: "4.9" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "#f59e0b" }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-center transition-colors"
              >
                <p className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-3xl font-bold text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs tracking-widest text-neutral-400 uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* -------------------- REVIEWS -------------------- */}
      <section
        id="reviews"
        className="relative z-10 border-t border-neutral-900 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
              What Guests Say
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Loved by{" "}
              <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                Fire Enthusiasts
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "The ribeye was transcendent. I've eaten at steakhouses across three continents — nothing comes close.",
                name: "Alex Rivera",
                role: "Food Critic",
              },
              {
                quote:
                  "The smoked old fashioned and ember wings are a religious experience. The atmosphere is unmatched.",
                name: "Priya Shah",
                role: "Regular Guest",
              },
              {
                quote:
                  "Every dish felt intentional. The chef's tasting menu is worth every single penny.",
                name: "Marcus Lee",
                role: "Sommelier",
              },
            ].map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-amber-500/30"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + idx * 0.05 }}
                    >
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </motion.div>
                  ))}
                </div>
                <p className="italic leading-relaxed text-neutral-300">
                  “{r.quote}”
                </p>
                <div className="mt-5">
                  <p className="font-semibold text-neutral-100">{r.name}</p>
                  <p className="text-xs tracking-widest text-neutral-500 uppercase">
                    {r.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- RESERVE / FOOTER -------------------- */}
      <section
        id="reserve"
        className="relative z-10 border-t border-neutral-900 bg-gradient-to-b from-neutral-950 to-black px-6 py-24 text-center md:px-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl"
        >
          Ready to Taste the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            Flame?
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-4 max-w-lg text-neutral-400"
        >
          Book your table tonight and let our chefs take you on a journey of
          smoke, spice, and savor.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-900/40"
        >
          Reserve Now
        </motion.a>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 text-sm text-neutral-400 md:grid-cols-3">
          <div>
            <p className="mb-2 text-xs tracking-widest text-amber-500 uppercase">
              Hours
            </p>
            <p>Tue–Thu · 5pm–10pm</p>
            <p>Fri–Sat · 5pm–11pm</p>
            <p>Sun · 4pm–9pm</p>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-widest text-amber-500 uppercase">
              Visit
            </p>
            <p>123 Ember Lane</p>
            <p>Flame District</p>
            <p>(555) 018-2018</p>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-widest text-amber-500 uppercase">
              Follow
            </p>
            <p>Instagram · @forkandflame</p>
            <p>Facebook · /forkandflame</p>
            <p>hello@forkandflame.com</p>
          </div>
        </div>

        <p className="mt-16 text-xs tracking-widest text-neutral-600 uppercase">
          © 2026 Fork & Flame · All rights reserved
        </p>
      </section>
    </div>
  );
}