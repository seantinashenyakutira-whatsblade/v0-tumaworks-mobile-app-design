import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { Message, Chat } from '../utils/types';

export const useChat = (chatId?: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!chatId) return;

        setLoading(true);
        const q = query(
            collection(db, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snap) => {
            const msgs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
            setMessages(msgs);
            setLoading(false);
        });

        return unsubscribe;
    }, [chatId]);

    const sendMessage = async (senderId: string, text: string, image?: string) => {
        if (!chatId) return;
        
        const messageData = {
            chatId,
            senderId,
            text,
            image,
            createdAt: serverTimestamp()
        };

        await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
        
        // Update last message in chat object
        await updateDoc(doc(db, 'chats', chatId), {
            lastMessage: text,
            updatedAt: serverTimestamp()
        });
    };

    return {
        messages,
        loading,
        sendMessage
    };
};
