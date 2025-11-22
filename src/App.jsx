import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, User, Gamepad2, Music, Coffee, Camera, Github,
  Mail, ArrowLeft, Terminal, Cpu, Globe, Database,
  Layers, Sparkles, RefreshCw, MessageSquare, LogOut,
  Send, Construction, Settings, Loader2
} from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp } from "firebase/app";
import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut,
  onAuthStateChanged, signInAnonymously
} from "firebase/auth";
import {
  getFirestore, collection, addDoc, query, orderBy,
  onSnapshot, serverTimestamp
} from "firebase/firestore";

// ==============================================
// 1. PASTE YOUR GEMINI API KEY HERE (Optional)
// ==============================================
const apiKey = "AIzaSyDo6AXQ0paLz2b3FuI59My3q-fM4R-ywYg";

// ==============================================
// 2. PASTE YOUR FIREBASE CONFIG HERE (Required for Guestbook)
// ==============================================
const firebaseConfig = {
  // Go to Firebase Console -> Project Settings to get these:
  apiKey: "AIzaSyBMpjtEXjJXW0NBuYjR13CMcDyGrShrFPw",
  authDomain: "my-portfolio-limath.firebaseapp.com",
  projectId: "my-portfolio-limath",
  storageBucket: "my-portfolio-limath.firebasestorage.app",
  messagingSenderId: "815587738426",
  appId: "1:815587738426:web:b397eaa0c8b8fe25e84603",
  measurementId: "G-K885RDQZ5H"
};

// --- Safe Initialization ---
let auth = null;
let db = null;
let appId = "portfolio-local";

try {
  // We only initialize if the user has actually replaced the placeholder text
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("AIzaSy...")) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.log("Firebase not configured yet. Guestbook will be disabled.");
  }
} catch (e) {
  console.error("Firebase Init Error:", e);
}

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
    { icon: Gamepad2, label: "Gaming", desc: "RPG & Strategy" },
    { icon: Music, label: "Music", desc: "Lo-fi & Synthwave" },
    { icon: Camera, label: "Photography", desc: "Urban & Street" },
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
const Card = ({ children, className = "" }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-neutral-600 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

const Guestbook = () => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'portfolio_comments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!auth) return alert("Please configure Firebase in App.jsx first!");
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !db) return;
    await addDoc(collection(db, 'portfolio_comments'), {
      text: newComment.trim(),
      displayName: user.displayName || "Guest",
      photoURL: user.photoURL,
      uid: user.uid,
      timestamp: serverTimestamp()
    });
    setNewComment("");
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
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
            placeholder="Leave a mark..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-white text-black px-4 rounded font-bold"><Send size={16} /></button>
        </form>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {comments.map((c) => (
          <div key={c.id} className="bg-neutral-900/50 p-3 rounded flex gap-3">
            {c.photoURL && <img src={c.photoURL} className="w-6 h-6 rounded-full" alt="" />}
            <div>
              <div className="text-xs text-neutral-400">{c.displayName}</div>
              <div className="text-sm text-neutral-200">{c.text}</div>
            </div>
          </div>
        ))}
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
      <button onClick={handleAsk} disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-bold">
        {loading ? "Thinking..." : "Inspire Me"}
      </button>
    </Card>
  );
};

const PersonalView = ({ onBack }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black text-neutral-200 p-6 md:p-12 relative overflow-hidden">
    {/* Background Blobs */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
    </div>

    <div className="max-w-4xl mx-auto relative z-10">
      <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white mb-8"><ArrowLeft size={20} /> Return</button>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-neutral-900 rounded-full border border-neutral-800"><User size={48} /></div>
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">Under Construction</span>
            <h1 className="text-5xl font-bold text-white mt-2">{PERSONAL_DATA.title}</h1>
          </div>
        </div>
        <p className="text-xl text-neutral-400">{PERSONAL_DATA.bio}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PERSONAL_DATA.hobbies.map((h, i) => (
          <Card key={i} className="flex items-center gap-4">
            <div className="p-2 bg-neutral-800 rounded"><h.icon size={24} /></div>
            <div><div className="font-bold text-white">{h.label}</div><div className="text-sm text-neutral-400">{h.desc}</div></div>
          </Card>
        ))}
      </div>

      <AIMuse />
      <Guestbook />
    </div>
  </motion.div>
);

const DeveloperView = ({ onBack }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#050505] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
    </div>

    <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-neutral-500 hover:text-emerald-400 z-20"><ArrowLeft size={20} /> Return</button>

    <div className="text-center z-10">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="mb-8 inline-block">
        <Settings size={120} className="text-emerald-500/20" />
      </motion.div>

      <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">COMING SOON</h1>
      <div className="flex items-center justify-center gap-2 text-neutral-500 font-mono mb-8">
        <Loader2 className="animate-spin" size={16} /> SYSTEM_UPGRADE_IN_PROGRESS...
      </div>

      <div className="flex items-center justify-center gap-3">
        <a href="https://github.com/LimathJayawardena" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full hover:border-emerald-500 transition-colors">
          <Github size={20} /> <span>Check GitHub</span>
        </a>
        <span className="text-xs text-neutral-600 italic">(it also in progress)</span>
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
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          <motion.span initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>Hi, I'm </motion.span>
          <motion.span initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">Limath Jayawardena</motion.span>
        </h1>
      </motion.div>

      <div
        className="flex-1 bg-black border-r border-neutral-800 flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative"
        onClick={() => onSelect('personal')}
      >
        <div className="text-center z-10 group-hover:scale-110 transition-transform">
          <User size={64} className="mx-auto mb-4 text-neutral-400 group-hover:text-white" />
          <h2 className="text-4xl font-bold text-white">PERSONAL</h2>
          <p className="text-neutral-500">Life & Hobbies</p>
        </div>
      </div>

      <div
        className="flex-1 bg-[#050505] flex items-center justify-center cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative"
        onClick={() => onSelect('developer')}
      >
        <div className="text-center z-10 group-hover:scale-110 transition-transform">
          <Code size={64} className="mx-auto mb-4 text-neutral-400 group-hover:text-white" />
          <h2 className="text-4xl font-bold text-white font-mono">&lt;DEVELOPER /&gt;</h2>
          <p className="text-neutral-500">Code & Projects</p>
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