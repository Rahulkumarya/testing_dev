"use client"
import React from 'react'
import ChatBox from './ChatBox'
const currentUserId = "68443297adca3e568303839f"; // (e.g. from session or Redux)
const receiverId = "6842a143c228f415aec06788"; 
interface Props {
    
}

const page = (props: Props) => {
    return (
      <div>
        <ChatBox receiverId={receiverId} />
      </div>
    );
}

export default page
