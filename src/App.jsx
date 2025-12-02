import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, User, Gamepad2, Music, Coffee, Camera, Github,
  Mail, ArrowLeft, Terminal, Cpu, Globe, Database,
  Layers, Sparkles, RefreshCw, MessageSquare, LogOut,
  Send, Construction, Settings, Loader2, Copy, Check, X, ExternalLink
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

// ==============================================
// OPTIONAL: Gemini API Key
// ==============================================
const apiKey = "AIzaSyDo6AXQ0paLz2b3FuI59My3q-fM4R-ywYg";

// --- API Helper ---
const callGemini = async (prompt) => {
  if (!apiKey) return "Please add your API Key in App.jsx to use this feature!";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!response.ok) throw new Error('API Call Failed');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error parsing response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Connection Failed. Check console for details.";
  }
};

// --- Data Constants ---
const PERSONAL_DATA = {
  title: "The Human",
  bio: "I believe that great code comes from a balanced mind. When I'm not debugging, I'm exploring the world through music, gaming, and photography.",
  hobbies: [
    {
      icon: Gamepad2,
      label: "Gaming",
      desc: "RPG & Strategy",
      action: "modal", // Triggers the popup
      steam: "https://steamcommunity.com/profiles/76561199571562449/", // YOUR STEAM LINK
      epic: "YOUR_EPIC_ID_HERE" // Update this when you have your Epic ID
    },
    { icon: Music, label: "Music", desc: "Lo-fi & Synthwave" },
    { icon: Camera, label: "Photography", desc: "Urban & Street", link: "http://instagram.com/stories/highlights/18143518057383699/" },
    { icon: Coffee, label: "Coffee", desc: "Pour-over" }
  ],
  socials: [
    { icon: Mail, label: "Email", link: "mailto:limathramika8876@gmail.com" }
  ]
};

const DEV_DATA = {
  title: "The Coder",
  bio: "I architect scalable web solutions with a focus on performance and user experience. My code is clean, tested, and documented.",
  skills: [
    { icon: Globe, label: "Frontend", items: ["React", "Next.js", "Tailwind"] },
    { icon: Database, label: "Backend", items: ["Node.js", "PostgreSQL"] },
    { icon: Layers, label: "DevOps", items: ["Docker", "AWS"] },
    { icon: Terminal, label: "Tools", items: ["Git", "Vim"] }
  ]
};

// --- Sub-Components ---
const Card = ({ children, className = "", onClick }) => (
  <motion.div
    onClick={onClick}
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-neutral-600 transition-colors ${className}`}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111] border border-neutral-700 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 text-white">
          <Gamepad2 size={28} className="text-purple-500" />
          <h2 className="text-2xl font-bold">Let's Play</h2>
        </div>

        <div className="space-y-4">
          {/* Steam Button */}
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

          {/* Epic Button */}
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
    <Card className="mt-12 border-neutral-700 bg-neutral-900/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-white">
          <MessageSquare size={20} />
          <h3 className="font-bold text-sm">Guestbook</h3>
        </div>
        {user && <button onClick={() => signOut(auth)} className="text-xs text-red-400"><LogOut size={12} /></button>}
      </div>

      {!user ? (
        <div className="text-center py-6">
          <button onClick={handleLogin} className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
            Sign in to Comment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded p-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            placeholder="Leave a mark..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-white text-black px-4 rounded font-bold hover:bg-neutral-200 transition-colors"><Send size={16} /></button>
        </form>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.map((c) => (
          <div key={c.id} className="bg-neutral-900/50 p-3 rounded flex gap-3 border border-neutral-800/50">
            {c.photo && <img src={c.photo} className="w-8 h-8 rounded-full border border-neutral-700" alt="" />}
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-bold text-neutral-400 mb-1">{c.name}</div>
              </div>
              <div className="text-sm text-neutral-200">{c.text}</div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center text-neutral-600 text-sm py-4 italic">
            No messages yet. Be the first!
          </div>
        )}
      </div>
    </Card>
  );
};

const AIMuse = () => {
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState(null);

  const handleAsk = async () => {
    setLoading(true);
    const result = await callGemini("Suggest a creative short hobby challenge for a gamer/photographer.");
    setIdea(result);
    setLoading(false);
  };

  return (
    <Card className="mt-12 border-purple-500/30 bg-purple-900/10">
      <div className="flex items-center gap-2 text-purple-400 mb-4">
        <Sparkles size={20} /> <h3 className="font-bold">The Digital Muse</h3>
      </div>
      {idea && <p className="mb-4 text-purple-200 italic">"{idea}"</p>}
      <button onClick={handleAsk} disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-bold hover:bg-purple-500 transition-colors">
        {loading ? "Thinking..." : "Inspire Me"}
      </button>
    </Card>
  );
};

const PersonalView = ({ onBack }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black text-neutral-200 p-6 md:p-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white mb-8 transition-colors"><ArrowLeft size={20} /> Return</button>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-neutral-900 rounded-full border border-neutral-800"><User size={48} /></div>
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">Under Construction</span>
              <h1 className="text-5xl font-bold text-white mt-2">{PERSONAL_DATA.title}</h1>
            </div>
          </div>
          <p className="text-xl text-neutral-400 leading-relaxed">{PERSONAL_DATA.bio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERSONAL_DATA.hobbies.map((h, i) => {
            const cardContent = (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neutral-800 rounded-lg text-neutral-200"><h.icon size={24} /></div>
                <div>
                  <div className="font-bold text-white text-lg">{h.label}</div>
                  <div className="text-sm text-neutral-400">{h.desc}</div>
                </div>
              </div>
            );

            // CASE 1: Gaming Modal Card
            if (h.action === "modal") {
              return (
                <Card
                  key={i}
                  className="cursor-pointer hover:border-purple-500/50 transition-colors"
                  onClick={() => setActiveModal('gaming')}
                >
                  {cardContent}
                </Card>
              );
            }

            // CASE 2: External Link Card
            if (h.link) {
              return (
                <a
                  key={i}
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="h-full hover:bg-neutral-800/80 transition-colors cursor-pointer border-neutral-700 hover:border-neutral-500">
                    {cardContent}
                  </Card>
                </a>
              );
            }

            // CASE 3: Standard Card
            return (
              <Card key={i}>
                {cardContent}
              </Card>
            );
          })}
        </div>

        <AIMuse />
        <Guestbook />

        {/* RENDER MODAL */}
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
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#050505] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
    </div>

    <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-neutral-500 hover:text-emerald-400 z-20 transition-colors"><ArrowLeft size={20} /> Return</button>

    <div className="text-center z-10">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="mb-8 inline-block">
        <Settings size={120} className="text-emerald-500/20" />
      </motion.div>

      <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">COMING SOON</h1>
      <div className="flex items-center justify-center gap-2 text-neutral-500 font-mono mb-8">
        <Loader2 className="animate-spin" size={16} /> SYSTEM_UPGRADE_IN_PROGRESS...
      </div>

      <div className="flex items-center justify-center gap-3">
        <a href="https://github.com/LimathJayawardena" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full hover:border-emerald-500 hover:text-emerald-400 transition-all">
          <Github size={20} /> <span>Check GitHub</span>
        </a>
        <span className="text-xs text-neutral-600 italic">(it is also in progress)</span>
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
    <div className="h-screen flex flex-col md:flex-row bg-black relative overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-50 bg-black pointer-events-none"
        animate={{ y: introDone ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center px-4">
          <motion.span initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>Hi, I'm </motion.span>
          <motion.span initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">Limath Jayawardena</motion.span>
        </h1>
      </motion.div>

      <div
        className="flex-1 bg-black border-r border-neutral-800 flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden"
        onClick={() => onSelect('personal')}
      >
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors" />
        <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
          <User size={64} className="mx-auto mb-4 text-neutral-400 group-hover:text-white transition-colors" />
          <h2 className="text-4xl font-bold text-white mb-2">PERSONAL</h2>
          <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors">Life & Hobbies</p>
        </div>
      </div>

      <div
        className="flex-1 bg-[#050505] flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden"
        onClick={() => onSelect('developer')}
      >
        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors" />
        <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
          <Code size={64} className="mx-auto mb-4 text-neutral-400 group-hover:text-white transition-colors" />
          <h2 className="text-4xl font-bold text-white font-mono mb-2">&lt;DEVELOPER /&gt;</h2>
          <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors">Code & Projects</p>
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