import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, setResultData, setShowResult, setInput } = useContext(Context);

    const handleNewChat = () => {
        setRecentPrompt("");  // Clear recent prompt
        setResultData("");  // Clear result data
        setShowResult(false); // Hide result section
        setInput(""); // Clear input field
    };

    const handleRecentClick = (prompt) => {
        setRecentPrompt(prompt);
        onSent(prompt);
    };

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="Menu" />
                <div className="new-chat" onClick={handleNewChat}> {/* ✅ New Chat Reset Function */}
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended && prevPrompts.length > 0 && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div 
                                key={index} 
                                className="recent-entry" 
                                onClick={() => handleRecentClick(item)}
                            >
                                <img src={assets.message_icon} alt="Message" />
                                <p>{item.length > 18 ? item.slice(0, 18) + "..." : item}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History" />
                    {extended ? <p>History</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
