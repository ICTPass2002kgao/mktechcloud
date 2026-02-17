"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Rocket, 
  Smartphone, 
  Server, 
  Menu, 
  X,
  Users,
  Handshake,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";

// --- ANIMATION VARIANTS (Typed Fixed) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const // Fixed: "as const" tells TS this is a tuple of 4 specific numbers
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02, 
    transition: { duration: 0.3, ease: "easeOut" } 
  }
};

// --- DATA ---
const services = [
  {
    tier: "Startup / Entry-Level",
    title: "The Digital Kickstart",
    price: "R1,500 - R2,500", 
    recurrence: "One-time", 
    description: "Perfect for hustlers and new startups. Get a professional Next.js footprint without the corporate price tag.",
    features: [
      "Standardized Next.js Blueprint",
      "Single Page / Landing Page",
      "AWS Cloud Hosting Included",
      "Basic SEO Optimization",
      "Monthly Maintenance (Optional)"
    ],
    highlight: false,
    icon: <Rocket className="w-8 h-8 text-blue-500" />,
  },
  {
    tier: "Enterprise / Corporate",
    title: "Full Brand Ecosystem",
    price: "R8,500 - R15,000", 
    recurrence: "+ Maintenance",
    description: "For registered companies requiring bespoke design, advanced functionality, and deep SEO strategy.",
    features: [
      "Custom UI/UX Design",
      "Multi-Page Architecture (5-10)",
      "Advanced SEO & Analytics",
      "CMS Integration",
      "Priority Support SLA"
    ],
    highlight: true,
    icon: <Server className="w-8 h-8 text-white" />,
  },
  {
    tier: "Custom Solutions",
    title: "SaaS & Mobile Apps",
    price: "Custom Quote",
    recurrence: "Milestone Based",
    description: "Complex internal tools, Uber-like apps, or large scale e-commerce platforms.",
    features: [
      "Flutter Mobile Apps (iOS/Android)",
      "Django Backend Logic",
      "Database Design (PostgreSQL)",
      "Payment Gateway Integration",
      "Full Source Code Ownership"
    ],
    highlight: false,
    icon: <Smartphone className="w-8 h-8 text-blue-400" />,
  },
];

const projects = [
  {
    name: "Dankie",
    category: "The TACT system",
    description: "A high-performance PWA demonstrating real-time user interaction and seamless mobile adaptation.",
    image: "/dankie.PNG", 
    link: "https://dankie-website.web.app/",
    tech: ["Flutter", "DJANGO", "Paystack", "AWS"],
  },
];

const techStack = [
  { name: "Next.js", desc: "For instant SEO & Speed", icon: "⚡" },
  { name: "Django", desc: "Bank-grade Security", icon: "🛡️" },
  { name: "AWS", desc: "Cape Town Region (af-south-1)", icon: "☁️" },
  { name: "Flutter", desc: "Cross-Platform Magic", icon: "📲" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden selection:bg-blue-500 selection:text-white bg-slate-950">
      
      {/* --- NAVBAR --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="#home" className="text-2xl font-bold font-space text-white tracking-tighter" aria-label="MK TechCloud Home">
            MK<span className="text-blue-600">.</span>TECHCLOUD 
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
              >
                <Link 
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/consultation">
                <button 
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] active:scale-95"
                  aria-label="Book a consultation"
                >
                  Book Consultation
                </button>
              </Link>
            </motion.div>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 absolute top-full left-0 right-0 border-t border-slate-800 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-6 h-full">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-medium text-slate-300 hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-8 mt-auto mb-20">
                  <Link href="/consultation" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-lg shadow-blue-900/20">
                      Book Consultation
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pt-20 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
        
        <div className="container px-4 mx-auto text-center z-10"> 
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 text-sm font-medium border border-blue-600/30 rounded-full bg-blue-600/10 text-blue-400 backdrop-blur-sm shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)]">
                Level 1 B-BBEE Partner
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold font-space tracking-tight text-white leading-[1.1]"
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 animate-gradient-x">
                Digital Dominance
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              We don't build templates. We engineer enterprise-grade digital ecosystems using the <strong>MK Power Stack</strong> on AWS.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
            >
              <Link href="#services">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all shadow-lg shadow-blue-900/40"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="flex items-center gap-2">
                    View Pricing <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/consultation?tier=Partnership Proposal">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-900/50 text-slate-200 border border-slate-700 hover:border-slate-500 rounded-lg font-semibold transition-all backdrop-blur-sm"
                >
                  Partner With Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TECH STACK TICKER --- */}
      <div id="about" className="bg-slate-950 border-y border-slate-800 py-10 scroll-mt-24">
        <div className="container mx-auto px-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8"
          >
            Powered by The MK Power Stack
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {techStack.map((tech, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: "rgba(37,99,235,0.5)" }}
                className="flex flex-col items-center p-6 rounded-xl bg-slate-900/50 border border-slate-800/50 transition-colors cursor-default"
              >
                <span className="text-4xl mb-3 filter drop-shadow-lg" role="img" aria-label={tech.name}>{tech.icon}</span>
                <span className="font-bold text-white mb-1">{tech.name}</span>
                <span className="text-xs text-slate-400">{tech.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- ABOUT US --- */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-4 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <div className="inline-flex items-center gap-2 text-blue-500 font-bold uppercase tracking-wider text-sm mb-6">
                <Users className="w-4 h-4" /> The Core Team
             </div>
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Lean. Agile. Specialized.</h2>
             <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
               We are not a bloated agency with account managers and middlemen. We are a specialized <strong>duo of engineers</strong>. 
               When you hire us, you speak directly to the builders, ensuring zero communication loss and rapid execution.
             </p>
           </motion.div>
        </div>
      </section>

      {/* --- PROJECTS GRID --- */}
      <section id="projects" className="py-24 bg-slate-950 relative scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space text-white mb-4">Our Work</h2>
            <p className="text-slate-400 text-lg">Deployed into the wild.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover="hover"
                variants={scaleOnHover}
                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col"
              >
                <div className="relative h-56 w-full bg-slate-800 flex items-center justify-center p-6 overflow-hidden">
                   <div className="absolute inset-0 bg-slate-800 animate-pulse opacity-50" />
                   {/* Glow Effect behind image */}
                   <div className="absolute inset-0 bg-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   <div className="relative z-10 w-full h-full transition-transform duration-500 group-hover:scale-105">
                     <Image 
                       src={project.image} 
                       alt={project.name} 
                       fill
                       className="object-contain"
                     />
                   </div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-20 bg-slate-900">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-950 text-slate-500 text-xs rounded border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link href={project.link} target="_blank">
                    <button className="w-full py-3 bg-slate-950 hover:bg-blue-600 hover:text-white border border-slate-800 text-slate-300 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm group-hover:border-blue-600">
                      Launch Project <ExternalLink className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARTNERSHIP CTA --- */}
      <section className="py-12 bg-slate-950 border-y border-slate-800">
        <div className="container mx-auto px-4">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700/50 shadow-2xl"
           >
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Handshake className="text-blue-500" /> Partner With Us
                </h3>
                <p className="text-slate-400 mt-2 max-w-xl">
                  Are you a marketing agency needing a white-label dev team? Or an investor looking for technical co-founders? We are open to strategic alliances.
                </p>
              </div>
              <Link href="/consultation?tier=Partnership Proposal">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="whitespace-nowrap px-8 py-4 bg-white text-slate-900 hover:bg-blue-50 font-bold rounded-lg transition-colors shadow-lg"
                >
                  Discuss Partnership
                </motion.button>
              </Link>
           </motion.div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
     <section id="services" className="py-24 bg-slate-950 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white mb-6">Choose Your Growth Tier</h2>
          <p className="text-slate-400 text-lg">
            Whether you are a hustler just starting out or a registered corporate entity, we have a structure that fits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`flex flex-col p-8 rounded-2xl border transition-all w-full group relative overflow-hidden h-full ${
                service.highlight 
                  ? "bg-slate-900/80 border-blue-600 shadow-2xl shadow-blue-600/20" 
                  : "bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-900/80"
              }`}
            >
                
                {service.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
                    MOST POPULAR
                  </div>
                )}

                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start mb-4">
                    <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 group-hover:text-blue-400 transition-colors">
                        {service.tier}
                    </div>
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className={`p-3 rounded-xl ${service.highlight ? 'bg-blue-500/20' : 'bg-slate-800 group-hover:bg-slate-700'} transition-colors`}
                    >
                        {service.icon}
                    </motion.div>
                </div>
                
                <h3 className="relative z-10 text-2xl font-bold text-white mb-4">{service.title}</h3>
                
                <div className="relative z-10 mb-6 flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl lg:text-3xl font-bold text-white">{service.price}</span>
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{service.recurrence}</span>
                </div>

                <p className="relative z-10 text-slate-400 text-sm mb-8 min-h-[4rem] leading-relaxed">
                  {service.description}
                </p>

                <ul className="relative z-10 space-y-4 mb-8 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${service.highlight ? "text-blue-500" : "text-slate-600 group-hover:text-blue-500"} transition-colors`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/consultation?tier=${encodeURIComponent(service.title)}`} className="relative z-10 mt-auto w-full">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-lg font-bold transition-all ${
                    service.highlight 
                      ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-600/30" 
                      : "border border-slate-700 text-white hover:bg-white hover:text-slate-900"
                  }`}>
                    {service.price === "Custom Quote" ? "Request Quote" : "Consult"}
                  </motion.button>
                </Link>

              </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* --- PROFESSIONAL FOOTER --- */}
      <footer id="contact" className="bg-slate-950 pt-20 border-t border-slate-900">
        <div className="container mx-auto px-4">
          
          {/* CTA Box */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden mb-20 shadow-2xl shadow-blue-900/30"
          >
            {/* Animated particles/circles in background of CTA */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-6">Ready to digitize your business?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join the 100% Black-Owned technology partner that puts your business on the global map.
              </p>
              <Link href="/consultation">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Book a Free Consultation
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-t border-slate-900 pt-12">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <Link href="#home" className="text-2xl font-bold font-space text-white tracking-tighter">
                MK<span className="text-blue-600">.</span>TECHCLOUD
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">
                We engineer enterprise-grade digital ecosystems. Specialized in Next.js, Cloud Architecture, and High-Performance Web Apps.
              </p>
              <div className="flex gap-4 pt-2">
                {[<Linkedin key="li" />, <Twitter key="tw" />, <Instagram key="ig" />].map((icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    whileHover={{ y: -3, color: "#fff", backgroundColor: "#2563eb" }}
                    className="p-2 bg-slate-900 rounded-full text-slate-400 transition-colors"
                  >
                    <div className="w-4 h-4">{icon}</div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#home" className="hover:text-blue-500 transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                <li><Link href="#projects" className="hover:text-blue-500 transition-colors">Projects</Link></li>
                <li><Link href="/consultation" className="hover:text-blue-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#services" className="hover:text-blue-500 transition-colors">Digital Kickstart</Link></li>
                <li><Link href="#services" className="hover:text-blue-500 transition-colors">Brand Ecosystem</Link></li>
                <li><Link href="#services" className="hover:text-blue-500 transition-colors">Custom Software</Link></li>
                <li><Link href="#services" className="hover:text-blue-500 transition-colors">Partnerships</Link></li>
              </ul>
            </div>

             {/* Column 4: Contact */}
             <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>admin@mktechcloud.co.za</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>POPIA Compliant</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Centered & Clean */}
          <div className="border-t border-slate-900 py-8 text-center">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} MK TECHCLOUD (Pty) Ltd. All rights reserved. Registration: 2026/122679/07
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}