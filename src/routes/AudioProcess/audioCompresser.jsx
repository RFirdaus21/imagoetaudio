import React, { useState, useEffect } from 'react';

const AudioCompressor = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [compressedAudioBlob, setCompressedAudioBlob] = useState(null);
  const [error, setError] = useState(null);
  const [lamejsLoaded, setLamejsLoaded] = useState(false); // Flag to indicate if lamejs is loaded

  useEffect(() => {
    // Load lamejs from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.0/lame.min.js';
    script.async = true;
    script.onload = () => {
      setLamejsLoaded(true); // Set flag to true when lamejs is loaded
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script tag
    };
  }, []);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    setSelectedAudio(file);
    setError(null); // Clear any previous errors
  };

  const compressAudio = async (audio) => {
    // Check if lamejs is loaded from the CDN before using it
    if (!lamejsLoaded) {
      console.warn("lamejs is not loaded yet. Compression cannot proceed.");
      return;
    }
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const reader = new FileReader();

    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      try {
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const mp3Encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 32);

        // Implement your compression logic here:
        const samples = audioBuffer.getChannelData(0);
        const sampleBlockSize = 1152;
        const mp3Data = [];

        for (let i = 0; i < samples.length; i += sampleBlockSize) {
          const sampleChunk = samples.subarray(i, i + sampleBlockSize);
          const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
          if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
          }
        }

        const mp3buf = mp3Encoder.flush();
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }

        const mergedMp3Data = new Uint8Array(
          mp3Data.reduce((acc, val) => acc + val.length, 0)
        );
        let offset = 0;
        for (let i = 0; i < mp3Data.length; i++) {
          mergedMp3Data.set(mp3Data[i], offset);
          offset += mp3Data[i].length;
        }

        const blob = new Blob([mergedMp3Data], { type: "audio/mp3" });
        setCompressedAudioBlob(blob);
      } catch (error) {
        setError(error);
        console.error("Error during compression:", error);
      }
    };

    reader.readAsArrayBuffer(audio);
  };

  const handleDownloadAudio = () => {
    if (compressedAudioBlob) {
      const url = URL.createObjectURL(compressedAudioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'compressed_audio.mp3';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className='audio-comp'>
      <label htmlFor="file-upload">Select Audio File</label>
      <input id="file-upload" type="file" accept="audio/*" onChange={handleAudioUpload} />
      {selectedAudio && (
        <div className='select'>
          <p>Selected Audio:</p>
          <audio controls>
            <source src={URL.createObjectURL(selectedAudio)} type="audio/mp3" />
          </audio>
        </div>
      )}
      {selectedAudio && (
        <button className='bn632-hover bn25' onClick={() => compressAudio(selectedAudio)} disabled={!lamejsLoaded}>
          Compress
        </button>
      )}
      {compressedAudioBlob && (
        <div className='compressed'>
          <p>Compressed Audio:</p>
          <audio controls>
            <source src={URL.createObjectURL(compressedAudioBlob)} type="audio/mp3" />
          </audio>
          <button className='bn632-hover bn25 download-button' onClick={handleDownloadAudio}>Download</button>
        </div>
      )}
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
};

export default AudioCompressor;
