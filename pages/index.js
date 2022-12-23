import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { images_url } = data;

    console.log(images_url)

    setApiOutput(images_url);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>VoxDream</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>"I need an asset for my game,<br/>a pixel art that looks like..."</h1>
          </div>
          {/* <div className="header-subtitle">
            <h2>type a prompt, download the generated assets, import them in your game.</h2>
          </div> */}
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="cute brown dog or fire sword or magical ice staff"
            value={userInput}
            onChange={onUserChangedText}
          />;
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
        </div>
        {apiOutput.length > 0 && (
          <div className="output">
            <div className="result">
            {
              apiOutput.map((url,index) => {
                return (
                  <img className="resultimg" key={index} src={url} />
                )
              })
            }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
