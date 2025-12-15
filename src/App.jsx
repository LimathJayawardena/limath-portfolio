import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, User, Gamepad2, Music, Coffee, Camera, Github,
  Mail, ArrowLeft, Terminal, Cpu, Globe, Database,
  Layers, Sparkles, RefreshCw, MessageSquare, LogOut,
  Send, Construction, Settings, Loader2, Copy, Check, X, ExternalLink,
  Zap
} from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

// ==============================================
// FIREBASE CONFIGURATION
// ==============================================
const firebaseConfig = {
  apiKey: "AIzaSyBMpjtEXjJXW0NBuYjR13CMcDyGrShrFPw",
  authDomain: "my-portfolio-limath.firebaseapp.com",
  projectId: "my-portfolio-limath",
  storageBucket: "my-portfolio-limath.firebasestorage.app",
  messagingSenderId: "815587738426",
  appId: "1:815587738426:web:b397eaa0c8b8fe25e84603",
  measurementId: "G-K885RDQZ5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Data Constants ---
const PERSONAL_DATA = {
  title: "The Human",
  bio: "I believe that great code comes from a balanced mind. When I'm not debugging, I'm exploring the world through music, gaming, and photography.",
  hobbies: [
    {
      icon: Gamepad2,
      label: "Gaming",
      desc: "RPG & Strategy",
      action: "modal",
      steam: "https://steamcommunity.com/profiles/76561199571562449/",
      epic: "82a9d97e039349ccbe8bc44788d1b48e"
    },
    { icon: Music, label: "Music", desc: "Lo-fi & Synthwave" },
    { icon: Camera, label: "Photography", desc: "Urban & Street", link: "http://instagram.com/stories/highlights/18143518057383699/" },
    { icon: Coffee, label: "Coffee", desc: "Pour-over" }
  ],
  socials: [
    { icon: Mail, label: "Email", link: "mailto:limathramika8876@gmail.com" }
  ]
};

// --- NEW CREATIVE COMPONENT: The Glitch Oracle ---
const QUESTS = [
  "QUEST: Capture a photo of something red.",
  "QUEST: Listen to an album from 1985.",
  "QUEST: Sketch your immediate surroundings.",
  "QUEST: Walk without headphones for 30 mins.",
  "QUEST: Read one chapter of a physical book.",
  "QUEST: Find a pattern in nature.",
  "QUEST: Drink a glass of water right now.",
  "QUEST: Organize your desktop icons.",
  "STATUS: Reality Rendering...",
  "STATUS: System Normal.",
  "TRUTH: Code is poetry written in logic."
];

const DailyQuest = () => {
  const [text, setText] = useState("AWAITING_SIGNAL...");
  const [decryption, setDecryption] = useState(false);

  const decrypt = () => {
    setDecryption(true);
    let iterations = 0;
    const targetText = QUESTS[Math.floor(Math.random() * QUESTS.length)];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    const interval = setInterval(() => {
      setText(prev =>
        targetText.split("").map((letter, index) => {
          if (index < iterations) {
            return targetText[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("")
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDecryption(false);
      }

      iterations += 1 / 2; // Controls speed of decryption
    }, 30);
  };

  return (
    // DARK THEME: Glowing Pink/Purple Card
    <Card className="mt-12 border-pink-500/30 bg-black/40 hover:border-pink-500/80 transition-all group shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-pink-400">
          <Zap size={20} className={decryption ? "animate-pulse text-yellow-300" : ""} />
          <h3 className="font-bold font-mono tracking-wider">DAILY_ORACLE</h3>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-purple-500/50"></span>
          <span className="w-2 h-2 rounded-full bg-indigo-500/20"></span>
        </div>
      </div>

      <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 font-mono text-sm text-pink-100 min-h-[60px] flex items-center shadow-inner">
        <span className="mr-2 text-pink-500">{">"}</span>
        {text}
        <span className="animate-pulse ml-1 text-pink-500">_</span>
      </div>

      <button
        onClick={decrypt}
        disabled={decryption}
        className="mt-4 w-full py-2 bg-pink-600/10 border border-pink-500/50 text-pink-200 rounded hover:bg-pink-600 hover:text-white transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]"
      >
        {decryption ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
        {decryption ? "DECRYPTING..." : "GENERATE_SIGNAL"}
      </button>
    </Card>
  );
};


// -----------------------------------------------------------------------
// ADDED/MODIFIED: Container and Item Variants for Staggering
// -----------------------------------------------------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Stagger the children's animation by 0.1 seconds
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// --- Sub-Components ---
const Card = ({ children, className = "", onClick }) => (
  <motion.div
    onClick={onClick}
    // MODIFIED: Use itemVariants for staggering and added interactive effects
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 rounded-xl border backdrop-blur-md ${className}`}
  >
    {children}
  </motion.div>
);

const GamingModal = ({ steamLink, epicId, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(epicId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0a0a0a] border border-purple-500/50 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(168,85,247,0.2)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 text-white">
          <Gamepad2 size={28} className="text-purple-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Let's Play</h2>
        </div>

        <div className="space-y-4">
          <a
            href={steamLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-4 bg-[#171a21] hover:bg-[#2a475e] border border-neutral-700 hover:border-blue-400 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">Steam</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 group-hover:text-white">
              Profile <ExternalLink size={12} />
            </div>
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center justify-between w-full p-4 bg-[#2a2a2a] hover:bg-[#333] border border-neutral-700 hover:border-white rounded-xl transition-all group"
          >
            <div className="text-left">
              <span className="block text-white font-bold">Epic Games</span>
              <span className="text-xs text-neutral-400">{epicId}</span>
            </div>
            <div className="text-xs">
              {copied ? (
                <span className="text-green-400 flex items-center gap-1"><Check size={14} /> Copied</span>
              ) : (
                <span className="text-neutral-500 group-hover:text-white flex items-center gap-1"><Copy size={14} /> Copy ID</span>
              )}
            </div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Guestbook = () => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Check console for details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await addDoc(collection(db, 'guestbook'), {
        text: newComment.trim(),
        name: user.displayName || "Guest",
        photo: user.photoURL,
        uid: user.uid,
        createdAt: serverTimestamp()
      });
      setNewComment("");
    } catch (error) {
      console.error("Error writing to guestbook:", error);
      alert("Could not send message. Check if your database rules are set to public/test mode.");
    }
  };

  return (
    // DARK THEME: Glassy Card
    <Card className="mt-12 border-neutral-700/50 bg-black/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-white">
          <MessageSquare size={20} className="text-purple-400" />
          <h3 className="font-bold text-sm">Guestbook</h3>
        </div>
        {user && <button onClick={() => signOut(auth)} className="text-xs text-red-400"><LogOut size={12} /></button>}
      </div>

      {!user ? (
        <div className="text-center py-6">
          <button onClick={handleLogin} className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Sign in to Comment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            className="flex-1 bg-neutral-900/80 border border-neutral-700 rounded p-2 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Leave a mark..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 text-white px-4 rounded font-bold hover:bg-purple-500 transition-colors"><Send size={16} /></button>
        </form>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.map((c) => (
          <div key={c.id} className="bg-neutral-900/80 p-3 rounded flex gap-3 border border-neutral-800">
            {c.photo && <img src={c.photo} className="w-8 h-8 rounded-full border border-neutral-700" alt="" />}
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-bold text-purple-300 mb-1">{c.name}</div>
              </div>
              <div className="text-sm text-neutral-200">{c.text}</div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center text-neutral-500 text-sm py-4 italic">
            No messages yet. Be the first!
          </div>
        )}
      </div>
    </Card>
  );
};

// -----------------------------------------------------------------------
// MODIFIED: PersonalView (Added page transitions, background animation classes, and staggered container)
// -----------------------------------------------------------------------
const PersonalView = ({ onBack }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [constructionId, setConstructionId] = useState(null);

  const triggerConstruction = (index) => {
    setConstructionId(index);
    setTimeout(() => setConstructionId(null), 2000);
  };

  return (
    // DARK THEME: "Neon Galaxy" - Deep Purple/Blue Gradient Background
    <motion.div
      initial={{ opacity: 0, x: 50 }} // Page Transition: Slide in
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }} // Page Transition: Slide out
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-[#0f0c29] to-black text-neutral-200 p-6 md:p-12 relative overflow-hidden"
    >
      <div className="fixed inset-0 pointer-events-none">
        {/* Colorful ambient orbs - ADDED motion and custom classes (requires custom CSS/Tailwind config) */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow"
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse-slow-reverse"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-300/70 hover:text-white mb-8 transition-colors"><ArrowLeft size={20} /> Return</button>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"><User size={48} className="text-pink-300" /></div>
            <div>
              <span className="text-amber-300 text-xs font-bold uppercase border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.2)]">Under Construction</span>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 mt-2">{PERSONAL_DATA.title}</h1>
            </div>
          </div>
          <p className="text-xl text-indigo-100/80 leading-relaxed font-light">{PERSONAL_DATA.bio}</p>
        </div>

        {/* MODIFIED: Wrapped Hobby Cards in motion.div for staggered loading */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {PERSONAL_DATA.hobbies.map((h, i) => {
            const isConstruction = constructionId === i;
            const cardClasses = `
              h-full relative overflow-hidden group cursor-pointer 
              transition-all duration-300 ease-out 
              border border-white/5 bg-white/5 backdrop-blur-sm
              hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/10 
              hover:border-pink-500/30 hover:bg-white/10
              ${isConstruction ? 'border-amber-500/50 bg-amber-900/20' : ''}
            `;

            const content = (
              <>
                <div className={`flex items-center gap-4 transition-opacity duration-300 ${isConstruction ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                  <div className="p-3 bg-white/5 rounded-lg text-indigo-200 group-hover:scale-110 group-hover:text-white group-hover:bg-pink-500/20 transition-all duration-300">
                    <h.icon size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{h.label}</div>
                    <div className="text-sm text-indigo-200/60">{h.desc}</div>
                  </div>
                </div>
                <div className={`absolute inset-0 flex items-center justify-center gap-2 text-amber-400 font-bold transition-all duration-300 ${isConstruction ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                  <Construction size={24} /> <span>Under Construction</span>
                </div>
              </>
            );

            if (h.action === "modal") {
              return (
                <Card key={i} className={cardClasses} onClick={() => setActiveModal('gaming')}>
                  {content}
                </Card>
              );
            }
            if (h.link) {
              return (
                <a key={i} href={h.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className={cardClasses}>{content}</Card>
                </a>
              );
            }
            return (
              <Card key={i} className={cardClasses} onClick={() => triggerConstruction(i)}>
                {content}
              </Card>
            );
          })}
        </motion.div>

        <DailyQuest />
        <Guestbook />

        <AnimatePresence>
          {activeModal === 'gaming' && (
            <GamingModal
              steamLink={PERSONAL_DATA.hobbies.find(h => h.label === "Gaming").steam}
              epicId={PERSONAL_DATA.hobbies.find(h => h.label === "Gaming").epic}
              onClose={() => setActiveModal(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------
// MODIFIED: DeveloperView (Added consistent page transitions)
// -----------------------------------------------------------------------
const DeveloperView = ({ onBack }) => (
  // DARK THEME: "Cyber Matrix" - Black with Neon Green/Cyan
  <motion.div
    initial={{ opacity: 0, x: -50 }} // Page Transition: Slide in
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }} // Page Transition: Slide out
    transition={{ duration: 0.3 }}
    className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-hidden"
  >
    <div className="absolute inset-0 pointer-events-none">
      {/* Tech Grid Background - Matrix Style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
    </div>

    <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-neutral-500 hover:text-emerald-400 z-20 transition-colors"><ArrowLeft size={20} /> Return</button>

    <div className="text-center z-10">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="mb-8 inline-block">
        <Settings size={120} className="text-emerald-500/20 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
      </motion.div>

      {/* Neon Gradient Text */}
      <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-500 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">COMING SOON</h1>

      <div className="flex items-center justify-center gap-2 text-emerald-500/80 font-mono mb-8 bg-emerald-950/30 px-4 py-2 rounded border border-emerald-500/20">
        <Loader2 className="animate-spin" size={16} /> SYSTEM_UPGRADE_IN_PROGRESS...
      </div>

      <div className="flex items-center justify-center gap-3">
        <a href="https://github.com/LimathJayawardena" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full hover:border-emerald-500 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all">
          <Github size={20} /> <span>Check GitHub</span>
        </a>
        <span className="text-xs text-neutral-600 italic">(it is also in progress)</span>
      </div>
    </div>
  </motion.div>
);

// ==============================================
// MODIFIED SPLIT LANDING COMPONENT (from previous request)
// ==============================================
const SplitLanding = ({ onSelect }) => {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // The total time before the split panels appear is 1.5s
    setTimeout(() => setIntroDone(true), 1500);
  }, []);

  // Variant for the Glitch Title
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, delay: 1.5 } }
  };

  // Variant for the Split Panels
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 1.8 } }
  };

  return (
    <div className="h-screen flex flex-col bg-black relative overflow-hidden">

      {/* 1. INITIAL PAGE LOAD SCREEN (Flash: Welcome to my portfolio) */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black pointer-events-none"
        animate={{ opacity: introDone ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center"
        >
          Welcome to my portfolio
        </motion.h1>
      </motion.div>

      {/* Container for everything else (appears after intro) */}
      <motion.div
        className="flex-1 flex flex-col relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >

        {/* 2. Top Banner: "Hi, I'm Limath Jayawardena" (with glitch) */}
        <motion.header
          className="p-6 bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-700/50 shadow-lg text-center"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
            <span className="mr-2 text-neutral-400">Hi, I'm</span>
            <span
              className="glitch-wrapper inline-block"
              style={{ display: 'inline-block' }}
            >
              <span className="glitch text-white" data-text="Limath Jayawardena">Limath Jayawardena</span>
            </span>
          </h1>
        </motion.header>

        {/* 3. Split Panels */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* LEFT: Warm/Human Side (Dark Purple/Pink) */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 bg-gradient-to-br from-indigo-950 via-purple-950 to-black border-r border-white/10 flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden h-1/2 md:h-full"
            onClick={() => onSelect('personal')}
          >
            <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors" />
            <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
              <User size={64} className="mx-auto mb-4 text-pink-300/50 group-hover:text-pink-300 transition-colors shadow-purple-500/50" />
              <h2 className="text-4xl font-bold text-white mb-2 tracking-wide">HUMAN</h2> {/* SHORTENED */}
              <p className="text-pink-300/50 group-hover:text-pink-200 transition-colors font-light">Life & Hobbies</p>
            </div>
          </motion.div>

          {/* RIGHT: Cool/Dev Side (Dark Cyan/Emerald) */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 bg-gradient-to-bl from-slate-950 via-[#050505] to-black flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden h-1/2 md:h-full"
            onClick={() => onSelect('developer')}
          >
            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors" />
            <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
              <Code size={64} className="mx-auto mb-4 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
              <h2 className="text-4xl font-bold text-white font-mono mb-2 tracking-tighter">DEVELOPER</h2> {/* SHORTENED */}
              <p className="text-emerald-500/50 group-hover:text-emerald-400/80 transition-colors font-mono text-sm">Code & Projects</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('landing');
  return (
    <AnimatePresence mode="wait">
      {view === 'landing' && <SplitLanding key="landing" onSelect={setView} />}
      {view === 'personal' && <PersonalView key="personal" onBack={() => setView('landing')} />}
      {view === 'developer' && <DeveloperView key="developer" onBack={() => setView('landing')} />}
    </AnimatePresence>
  );
}