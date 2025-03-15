import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");  
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [resultData, setResultData] = useState("");

    const delayPara = (text) => {
        setResultData(""); // Clear previous data
        let words = text.split(" "); // Split into words
        words.forEach((word, index) => {
            setTimeout(() => {
                setResultData((prev) => prev + " " + word);
            }, 75 * index);
        });
    };

    const onSent = async (prompt) => {
        if (!prompt.trim()) return; // Prevent empty prompts

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        setPrevPrompts(prev=>[...prev,input])

        try {
            const response = await runChat(prompt);
            if (!response) {
                setResultData("No response received.");
                setLoading(false);
                return;
            }

            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let formattedResponse = newResponse.split("*").join("</br>");

            delayPara(formattedResponse); // Use delay function
        } catch (error) {
            console.error("❌ Error sending prompt:", error);
            setResultData("An error occurred. Please try again.");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
