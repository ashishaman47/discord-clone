import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import Message from './Message'
import { useSelector } from 'react-redux'
import './ChatHeader.css'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { selectUser } from './features/userSlice'
import db from './firebase'
import firebase from 'firebase'

function Chat() {

    // pulling info from data layer
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=> {
        if(channelId) {
            db.collection('channels').doc(channelId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ));
        }
    },[channelId]) //refreshes each time channelId changes

    const sendMessage = e => {
        e.preventDefault();

        // storing message in messages collection inside particular the channelId
        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    }

    return (
        <div className='chat'>
            <ChatHeader channelName = {channelName} />

            <div className="chat__messages">
                {messages.map(message => (
                    <Message 
                     timestamp={message.timestamp}
                     message={message.message}
                     user={message.user}
                    />
                ))}
            </div>

            <div className="chat__input">
                <AddCircle fontSize='large' />
                <form>
                    <input value={input} 
                    onChange={(e)=> setInput(e.target.value)} 
                    disabled={!channelId}
                    placeholder={`Message #${channelName}`} 
                    type="text"/>
                    
                    <button 
                    onClick={sendMessage}
                    disabled={!channelId}
                    className='chat__inputButton' type='submit'>Send Message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcard fontSize='large' />
                    <Gif fontSize='large' />
                    <EmojiEmotions fontSize='large' />
                </div>
            </div>
        </div>
    )
}

export default Chat
