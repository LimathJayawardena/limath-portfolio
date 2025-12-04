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
    // LIGHT THEME: Soft purple card with white background
    <Card className="mt-12 border-purple-200 bg-white/80 shadow-xl hover:shadow-purple-200/50 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-purple-600">
          <Zap size={20} className={decryption ? "animate-pulse text-amber-500" : ""} />
          <h3 className="font-bold font-mono tracking-wider">DAILY_ORACLE</h3>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-purple-300"></span>
          <span className="w-2 h-2 rounded-full bg-purple-100"></span>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 font-mono text-sm text-purple-900 min-h-[60px] flex items-center shadow-inner">
        <span className="mr-2 text-purple-500">{">"}</span>
        {text}
        <span className="animate-pulse ml-1 text-purple-400">_</span>
      </div>

      <button
        onClick={decrypt}
        disabled={decryption}
        className="mt-4 w-full py-2 bg-purple-100 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
      >
        {decryption ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
        {decryption ? "DECRYPTING..." : "GENERATE_SIGNAL"}
      </button>
    </Card>
  );
};

// --- Sub-Components ---
const Card = ({ children, className = "", onClick }) => (
  <motion.div
    onClick={onClick}
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white border border-stone-200 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 text-stone-800">
          <Gamepad2 size={28} className="text-rose-500" />
          <h2 className="text-2xl font-bold">Let's Play</h2>
        </div>

        <div className="space-y-4">
          <a
            href={steamLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-blue-400 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-800 font-bold">Steam</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-blue-600">
              Profile <ExternalLink size={12} />
            </div>
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center justify-between w-full p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-stone-400 rounded-xl transition-all group"
          >
            <div className="text-left">
              <span className="block text-stone-800 font-bold">Epic Games</span>
              <span className="text-xs text-stone-500">{epicId}</span>
            </div>
            <div className="text-xs">
              {copied ? (
                <span className="text-green-600 flex items-center gap-1"><Check size={14} /> Copied</span>
              ) : (
                <span className="text-stone-400 group-hover:text-stone-600 flex items-center gap-1"><Copy size={14} /> Copy ID</span>
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
    // LIGHT THEME: White background, subtle shadows
    <Card className="mt-12 border-stone-200 bg-white/80 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-stone-800">
          <MessageSquare size={20} className="text-rose-400" />
          <h3 className="font-bold text-sm">Guestbook</h3>
        </div>
        {user && <button onClick={() => signOut(auth)} className="text-xs text-red-400 hover:text-red-600"><LogOut size={12} /></button>}
      </div>

      {!user ? (
        <div className="text-center py-6">
          <button onClick={handleLogin} className="bg-stone-800 text-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-stone-800/20">
            Sign in to Comment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            className="flex-1 bg-stone-50 border border-stone-200 rounded p-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-rose-400 focus:bg-white transition-colors"
            placeholder="Leave a mark..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-rose-500 text-white px-4 rounded font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"><Send size={16} /></button>
        </form>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.map((c) => (
          <div key={c.id} className="bg-stone-50 p-3 rounded flex gap-3 border border-stone-100">
            {c.photo && <img src={c.photo} className="w-8 h-8 rounded-full border border-stone-200" alt="" />}
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-bold text-stone-700 mb-1">{c.name}</div>
              </div>
              <div className="text-sm text-stone-600">{c.text}</div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center text-stone-400 text-sm py-4 italic">
            No messages yet. Be the first!
          </div>
        )}
      </div>
    </Card>
  );
};

const PersonalView = ({ onBack }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [constructionId, setConstructionId] = useState(null);

  const triggerConstruction = (index) => {
    setConstructionId(index);
    setTimeout(() => setConstructionId(null), 2000);
  };

  return (
    // LIGHT THEME: Soft Peach/Cream Gradient
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fdfbf7] text-stone-800 p-6 md:p-12 relative overflow-hidden"
    >
      <div className="fixed inset-0 pointer-events-none">
        {/* Soft pastel ambient blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-100 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-100 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-stone-800 mb-8 transition-colors"><ArrowLeft size={20} /> Return</button>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white rounded-full border border-stone-100 shadow-xl shadow-stone-200/50"><User size={48} className="text-orange-400" /></div>
            <div>
              <span className="text-amber-600 text-xs font-bold uppercase border border-amber-200 bg-amber-50 px-3 py-1 rounded-full">Under Construction</span>
              <h1 className="text-5xl font-bold text-stone-900 mt-2">{PERSONAL_DATA.title}</h1>
            </div>
          </div>
          <p className="text-xl text-stone-600 leading-relaxed font-light">{PERSONAL_DATA.bio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERSONAL_DATA.hobbies.map((h, i) => {
            const isConstruction = constructionId === i;
            const cardClasses = `
              h-full relative overflow-hidden group cursor-pointer 
              transition-all duration-300 ease-out 
              border border-white bg-white/60 backdrop-blur-sm shadow-sm
              hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100 
              hover:border-orange-200 hover:bg-white
              ${isConstruction ? 'border-amber-400 bg-amber-50' : ''}
            `;

            const content = (
              <>
                <div className={`flex items-center gap-4 transition-opacity duration-300 ${isConstruction ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                  <div className="p-3 bg-stone-50 rounded-lg text-stone-500 group-hover:scale-110 group-hover:text-white group-hover:bg-rose-400 transition-all duration-300">
                    <h.icon size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-stone-800 text-lg">{h.label}</div>
                    <div className="text-sm text-stone-500">{h.desc}</div>
                  </div>
                </div>
                <div className={`absolute inset-0 flex items-center justify-center gap-2 text-amber-500 font-bold transition-all duration-300 ${isConstruction ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
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
        </div>

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

const DeveloperView = ({ onBack }) => (
  // LIGHT THEME: Clean Tech Lab (White/Slate/Cyan)
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-50 text-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      {/* Tech Grid Background - subtle grey */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-100/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px]" />
    </div>

    <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-800 z-20 transition-colors"><ArrowLeft size={20} /> Return</button>

    <div className="text-center z-10">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="mb-8 inline-block">
        <Settings size={120} className="text-slate-200" />
      </motion.div>

      {/* Clean Gradient Text */}
      <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">COMING SOON</h1>

      <div className="flex items-center justify-center gap-2 text-slate-500 font-mono mb-8 bg-white/80 px-4 py-2 rounded border border-slate-200 shadow-sm">
        <Loader2 className="animate-spin text-cyan-500" size={16} /> SYSTEM_UPGRADE_IN_PROGRESS...
      </div>

      <div className="flex items-center justify-center gap-3">
        <a href="https://github.com/LimathJayawardena" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full hover:border-cyan-500 hover:text-cyan-600 hover:shadow-lg hover:shadow-cyan-100 transition-all">
          <Github size={20} /> <span>Check GitHub</span>
        </a>
        <span className="text-xs text-slate-400 italic">(it is also in progress)</span>
      </div>
    </div>
  </motion.div>
);

const SplitLanding = ({ onSelect }) => {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    setTimeout(() => setIntroDone(true), 2500);
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-50 bg-white pointer-events-none"
        animate={{ y: introDone ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter text-center px-4">
          <motion.span initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>Hi, I'm </motion.span>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glitch-wrapper"
            style={{ display: 'inline-block' }}
          >
            {/* Note: In CSS you might need to change glitch text color to black/slate for this light theme */}
            <span className="glitch" data-text="Limath Jayawardena" style={{ color: '#1e293b' }}>Limath Jayawardena</span>
          </motion.div>

        </h1>
      </motion.div>

      {/* LEFT: Warm/Human Side (Soft Cream) */}
      <div
        className="flex-1 bg-[#fdfbf7] border-r border-stone-200 flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden"
        onClick={() => onSelect('personal')}
      >
        <div className="absolute inset-0 bg-orange-100/0 group-hover:bg-orange-100/50 transition-colors" />
        <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
          <User size={64} className="mx-auto mb-4 text-stone-300 group-hover:text-stone-800 transition-colors" />
          <h2 className="text-4xl font-bold text-stone-800 mb-2 tracking-wide">PERSONAL</h2>
          <p className="text-stone-400 group-hover:text-stone-600 transition-colors font-light">Life & Hobbies</p>
        </div>
      </div>

      {/* RIGHT: Cool/Dev Side (Crisp White/Slate) */}
      <div
        className="flex-1 bg-slate-50 flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden"
        onClick={() => onSelect('developer')}
      >
        <div className="absolute inset-0 bg-cyan-100/0 group-hover:bg-cyan-100/50 transition-colors" />
        <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
          <Code size={64} className="mx-auto mb-4 text-slate-300 group-hover:text-slate-800 transition-colors" />
          <h2 className="text-4xl font-bold text-slate-800 font-mono mb-2 tracking-tighter">&lt;DEVELOPER /&gt;</h2>
          <p className="text-slate-400 group-hover:text-slate-600 transition-colors font-mono text-sm">Code & Projects</p>
        </div>
      </div>
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