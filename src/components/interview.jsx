import React, { useState, useEffect } from 'react';
import { RetellWebClient } from "retell-client-js-sdk";
import { FaMicrophone, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Lottie from 'lottie-react';
import voiceWaveAnimation from '../Animation - 1740202389597.json';
import './RetellAudioCall.css';

const BACKEND_URL = 'https://backend-tutor.vercel.app';

const RetellAudioCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [retellClient] = useState(new RetellWebClient());
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState('');

  useEffect(() => {
    const setupEventListeners = () => {
      retellClient.on("call_started", () => {
        setIsCallActive(true);
        setCallStatus('Call started');
        setError(null);
      });

      retellClient.on("call_ended", () => {
        setIsCallActive(false);
        setIsAgentSpeaking(false);
        setCallStatus('');
        setTranscripts([]);
      });

      retellClient.on("agent_start_talking", () => {
        setIsAgentSpeaking(true);
      });

      retellClient.on("agent_stop_talking", () => {
        setIsAgentSpeaking(false);
      });

      retellClient.on("update", (update) => {
        console.log("Received update:", update);
        
        if (update.transcript) {
          // Extract agent messages from the transcript
          const agentMessages = Object.values(update.transcript)
            .filter(msg => msg.role === "agent")
            .map(msg => msg.content);
          
          // Only display the last agent message
          if (agentMessages.length > 0) {
            const lastMessage = agentMessages[agentMessages.length - 1];
            setTranscripts([lastMessage]);
          }
        }
        
        if (update.isSpeaking !== undefined) {
          setIsAgentSpeaking(update.isSpeaking);
        }
      });

      retellClient.on("error", (error) => {
        console.error("An error occurred:", error);
        setError(error.message || "An error occurred during the call");
        retellClient.stopCall();
        setIsCallActive(false);
        setIsAgentSpeaking(false);
        setCallStatus('');
      });
    };

    setupEventListeners();
    return () => {
      if (isCallActive) {
        retellClient.stopCall();
      }
    };
  }, [retellClient, isCallActive]);

  const startCall = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setCallStatus('Call initializing...');

      const hasMicPermission = await checkMicrophonePermission();
      if (!hasMicPermission) return;

      const response = await axios.post(`${BACKEND_URL}/api/create-call`, {
        userName: 'Test User',
        language: 'english'
      });

      console.log('Created call:', response.data);
      
      await retellClient.startCall({
        accessToken: response.data.access_token,
        sampleRate: 24000,
        captureDeviceId: "default",
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setError(error.response?.data?.message || "Failed to start call. Please try again.");
      setCallStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error("Microphone permission error:", error);
      setError("Please allow microphone access to start the call");
      return false;
    }
  };

  const stopCall = () => {
    retellClient.stopCall();
    setIsCallActive(false);
    setIsAgentSpeaking(false);
    setCallStatus('');
    setTranscripts([]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Interview Practice</h1>
        <nav className="header-nav">
          <a href="/" className="nav-link">
            <span>Back to Home</span>
          </a>
        </nav>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <section className="interview-section">
          <div className="status-section">
            {callStatus && (
              <div className="call-status">
                <span className="status-dot"></span>
                <span>{callStatus}</span>
              </div>
            )}
          </div>

          <div className="lottie-section">
            <div className="interview-instructions">
              <h2>Practice Your Interview Skills</h2>
              <p>Click the microphone button below to start a mock interview with our AI assistant.</p>
              <p>Speak clearly and answer questions as you would in a real interview.</p>
            </div>
            
            <div className="animation-container">
              <Lottie 
                animationData={voiceWaveAnimation}
                loop={true}
                autoplay={isCallActive}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {transcripts.length > 0 && (
              <div className="transcript-text">
                {transcripts[0]}
              </div>
            )}

            <div className="control-buttons">
              <button 
                className={`control-button ${!isCallActive ? 'start' : ''}`}
                onClick={startCall}
                disabled={isLoading || isCallActive}
              >
                <FaMicrophone />
                <span>{isLoading ? 'Starting...' : 'Start Interview'}</span>
              </button>
              <button 
                className={`control-button ${isCallActive ? 'stop' : ''}`}
                onClick={stopCall}
                disabled={!isCallActive}
              >
                <FaTimes />
                <span>End Interview</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RetellAudioCall;