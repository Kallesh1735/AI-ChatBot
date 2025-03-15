import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => { 
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, setShowResult } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                { !showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev</span></p>
                            <p>How Can I Help You Today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful roads for an upcoming trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Explain what JavaScript is</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Tell me about React</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>What is Fullstack?</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                            ?<div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                        :<div dangerouslySetInnerHTML={{ __html: resultData }} />
                        }
                             
                        </div>
                    </div>
                )}
                
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Enter a prompt here" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                        />
                        <div onClick={() => {
                            onSent(input);
                            setShowResult(true);
                        }}>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="Send" />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info. It does not guarantee the source. Please do your own research before making a decision.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
