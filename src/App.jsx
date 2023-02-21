import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState(
        "Search cats in sea"
    );

    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_OPEN_AI_Key,
    })

    const openai = new OpenAIApi(configuration)

    const generateImg = async () => {
        setPlaceholder(`Search ${prompt}..`);
        setLoading(true);
        const res = await openai.createImage({
            prompt: prompt,
            size: "512x512"
        });
        setLoading(false);
        setResult(res.data.data[0].url);
    }

    return (
        <div className='main'>
            {loading ? (
                <>
                    <h2>Yuklanmoqda...</h2>
                </>
            ) : (
                <>
                    <h2>DALL-E Generator</h2>
                    <textarea
                        className='input'
                        placeholder={placeholder}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows="10"
                        cols="40"
                    />
                    <button onClick={generateImg}>Generate</button>
                    {result.length > 0 ? (
                        <img src={result} className="result-image" alt="result" />
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
};

export default App;