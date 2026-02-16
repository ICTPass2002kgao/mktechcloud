"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  Paperclip, 
  Loader2,
  Clock,
  AlertCircle 
} from "lucide-react";
import Link from "next/link";

// --- INNER COMPONENT (Handles the logic) ---
function ConsultationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialTier = searchParams.get("tier") || "General Inquiry";

  const [formState, setFormState] = useState({
    email: "",
    phone: "",
    description: "",
    attachmentUrl: "",
    tier: initialTier
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Update form state if URL param changes
  useEffect(() => {
    if (initialTier) {
        setFormState(prev => ({ ...prev, tier: initialTier }));
    }
  }, [initialTier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const emailBody = `
      NEW INQUIRY: ${formState.tier.toUpperCase()}
      -------------------
      Type: ${formState.tier}
      
      CONTACT DETAILS
      Email: ${formState.email}
      Phone: ${formState.phone}
      
      MESSAGE / DETAILS
      ${formState.description}
      
      ATTACHMENT
      ${formState.attachmentUrl || "No attachment provided"}
    `;

    try {
      // Use Environment Variable for API URL
      const apiUrl = "https://dankie.up.railway.app"; // Replace with your actual API URL or use process.env.NEXT_PUBLIC_API_URL
      
      const response = await fetch(`${apiUrl}/api/send_custom_email`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "kgaogelodeveloper@gmail.com", 
          subject: `New Lead: ${formState.tier} - ${formState.email}`,
          body: emailBody,
          attachmentUrl: formState.attachmentUrl
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        throw new Error(data.error || "Failed to submit");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-green-900/20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2 font-space">Received!</h2>
          <p className="text-slate-400 mb-8">
            Your inquiry has been secured. Our engineering team will review your details and respond within <span className="text-blue-400 font-bold">24 hours</span>.
          </p>

          <Link href="/">
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all">
              Go Back Home
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          <div className="mb-8 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-space mb-2">
              Let's Talk Business.
            </h1>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium bg-blue-400/10 px-3 py-1.5 rounded-full w-fit">
              <Clock className="w-4 h-4" />
              <span>Guaranteed feedback within 24 hours</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Selected Tier */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Inquiry Type</label>
              <select 
                name="tier" 
                value={formState.tier} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none appearance-none"
              >
                <option value="The Digital Kickstart">I need a Simple Website (Startup Tier)</option>
                <option value="Full Brand Ecosystem">I need a Full Business Website (Corporate Tier)</option>
                <option value="SaaS & Mobile Apps">I need a Mobile App or Custom Software</option>
                <option value="Partnership Proposal">I want to discuss a Partnership</option>
                <option value="General Inquiry">General Question / Other</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="name@company.com"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Contact Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required
                  placeholder="+27 00 000 0000"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Message / Description</label>
              <textarea 
                name="description" 
                required
                rows={5}
                placeholder={formState.tier === 'Partnership Proposal' ? "Tell us how you would like to collaborate..." : "Tell us about your goals, features you need, or the problem you are solving..."}
                value={formState.description}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">
                <Paperclip className="w-3 h-3" /> File Link (Optional)
              </label>
              <input 
                type="url" 
                name="attachmentUrl" 
                placeholder="https://drive.google.com/..."
                value={formState.attachmentUrl}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-slate-600 mt-2">
                *Provide a direct link (Google Drive, Dropbox, etc.) for any RFPs, specs, or partnership decks.
              </p>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3 text-red-400"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Submit Inquiry <Send className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </main>
  );
}

// --- MAIN PAGE (Wraps the form in Suspense) ---
export default function ConsultationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    }>
      <ConsultationForm />
    </Suspense>
  );
}