import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { app } from './firebaseConfig';

const db = getFirestore(app);

export default function Guestbook({ user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // 1. Listen for messages
    useEffect(() => {
        const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
        return () => unsubscribe();
    }, []);

    // 2. Send a message
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        try {
            await addDoc(collection(db, "guestbook"), {
                text: newMessage,
                name: user.displayName,
                photo: user.photoURL,
                createdAt: serverTimestamp()
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message. Check console.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-900 rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-white mb-4">Guestbook</h2>

            {/* Input Form */}
            {user ? (
                <form onSubmit={sendMessage} className="flex gap-2 mb-8">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-500 transition">
                        Send
                    </button>
                </form>
            ) : (
                <p className="text-gray-400 mb-6 bg-gray-800 p-3 rounded text-center">
                    Please sign in above to leave a message.
                </p>
            )}

            {/* Message List */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded bg-gray-800 border border-gray-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            {msg.photo && <img src={msg.photo} alt={msg.name} className="w-8 h-8 rounded-full border border-gray-600" />}
                            <span className="font-bold text-blue-300">{msg.name}</span>
                        </div>
                        <p className="text-gray-200 ml-11">{msg.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}