import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from './features/appSlice'
import './SidebarChannel.css'

function SidebarChannel( { id, channelName }) {
    // dispatch --> gun use to fire action to the listner
    const dispatch = useDispatch();

    return (
        // onClick --> dispatch setChannelInfo action to the listner with payload as channelId, channelName
        <div onClick={() => dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName,
        }))} className='sidebarChannel'>
            <h4><span className='sidebarChannel__hash'>#</span>{channelName}</h4>
        </div>
    )
}

export default SidebarChannel
