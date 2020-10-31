import { Avatar } from '@material-ui/core'
import { Add, Call, ExpandMore, Headset, InfoOutlined, Mic, Settings, SignalCellularAlt } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import db, { auth } from './firebase'
import './Sidebar.css'
import SidebarChannel from './SidebarChannel'

function Sidebar() {

    // pulling user info from data layer
    const user = useSelector(selectUser); 
    const [channels, setChannels] = useState([]);

    useEffect(()=>{
        // take snapshot --> whenever there is change in the collection channels
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id, // channelId
                channel: doc.data(), //channelName
            })))
        ))
    },[])

    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name');

        // if user enters channelName --> add it to the collection channels 
        if(channelName) {
            db.collection('channels').add({
                channelName : channelName,
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <h3>Clever Programmer</h3>
                <ExpandMore />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMore />
                        <h4>Text Channels</h4>
                    </div>

                    <Add onClick={handleAddChannel} className='sidebar__addChannel' />
                </div>

                <div className="sidebar__channelsList">
                    {/* Map through every channels and return SidebarChannel if u have none it returns none */}
                    {channels.map(({id, channel}) => (
                        <SidebarChannel key={id} id={id} channelName={channel.channelName}  />
                    ))}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAlt className='sidebar__voiceIcon' fontSize='large' />

                <div className="sidebar__voiceInfo">
                    <h3>Voive Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlined />
                    <Call />
                </div>
            </div>

            <div className="sidebar__profile">
                {/* this will sign u out & trigger off the listner in app.js and dispatch logout action & set user to null  */}
                <Avatar onClick={()=> auth.signOut()} src={user.photo} />

                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <Mic />
                    <Headset />
                    <Settings />
                </div>
            </div>

            
        </div>
    )
}

export default Sidebar
