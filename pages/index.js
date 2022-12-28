import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const callGeneratePixelart = async () => {
    setIsGenerating(true);
    
    const response = await fetch('https://api.voxdream.art/pixelart', {
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

  const callGenerateVoxelart = async () => {
    setIsGenerating(true);
    
    const response = await fetch('https://api.voxdream.art/voxelart', {
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
            <h1>"I need an asset for my game,<br/>something that looks like..."</h1>
          </div>
          {/* <div className="header-subtitle">
            <h2>type a prompt, download the generated assets, import them in your game.</h2>
          </div> */}
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="harry potter wand // emerald // viking helmet"
            value={userInput}
            onChange={onUserChangedText}
          />;
        </div>
        <div className="prompt-container">
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGeneratePixelart}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Pixel art</p>}
              </div>
            </a>
            <a
              id="voxelart"
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateVoxelart}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Voxel art</p>}
              </div>
            </a>
            <a
              id="voxelart3d"
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
            >
              <div className="generate">
                <p>Voxel art 3D</p>
                <p>(soon)</p>
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
        <div>
        <p style={{ color: '#FFFFFF' }}>
          Twitter:
          <a style={{ color: '#FFFFFF' }} href='https://twitter.com/caillef_' >@caillef_</a><br/>
          Keep this tool free: caillef.eth
        </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
