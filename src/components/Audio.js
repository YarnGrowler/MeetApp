import React, { useState, useEffect, useRef } from 'react';
import sound2 from './audio.wav';
import sound1 from './audio3.mp3';
import sound3 from './audio.mp3';


const Audio = () => {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const audioRef = useRef(null);
  const sounds = [sound1, sound2,sound3,sound3];
  let sourceNode = null; // Track the source node

  useEffect(() => {
    const initAudio = async () => {
      const audio = audioRef.current;
      audio.src = sound1;
      if (!audio) {
        throw new Error("Audio element not ready yet!");
      }

      const audioContext = new AudioContext();
      if (sourceNode) {
        sourceNode.disconnect(); // Disconnect previous source node
      }
      sourceNode = audioContext.createMediaElementSource(audio); // Create new source node
      const gainNode = audioContext.createGain();
      const destStream = audioContext.createMediaStreamDestination();
      gainNode.gain.value = 1; // Set initial volume level

      sourceNode.connect(gainNode).connect(destStream);
      audio.play()

      try {
        await audioContext.resume(); // Resume audio context
        navigator.mediaDevices.getUserMedia = async function () {
          await audioContext.resume();
          return destStream.stream;
        };
      } catch (error) {
        console.error('Error resuming AudioContext:', error);
      }
    };

    initAudio();

    return () => {
      // Clean up AudioContext
      if (sourceNode) {
        sourceNode.disconnect(); // Disconnect source node when component unmounts
      }
      const audioContext = audioRef.current?.context;
      if (audioContext) {
        audioContext.close().then(() => {
          console.log('AudioContext closed');
        }).catch((error) => {
          console.error('Error closing AudioContext:', error);
        });
      }
    };
  }, [currentSoundIndex]);

  const playNext = (value) => {
    const audio = audioRef.current;
    const source = audio.querySelector('source');
    if(value ==0){
        audio.src = sound1;
        audio.play()

    }
    else if(value==1){
        audio.src = sound2;
        audio.play()


    }
    else{
        audio.src = sound3;
        audio.play()

    }
    
  };

  return (
    <div>
      <audio ref={audioRef} controls loop >
        Your browser does not support the audio element.
      </audio>
      <ul id="list">
        <li href="#" onClick={()=>playNext(0)}>Sound 1</li>
        <li href="#"  onClick={()=>playNext(1)}>Sound 2</li>
        <li href="#"  onClick={()=>playNext(2)}>Sound 3</li>

      </ul>
    </div>
  );
};

export default Audio;
