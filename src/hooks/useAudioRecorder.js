import { useState, useRef } from 'react';

/**
 * useAudioRecorder Hook
 * 
 * Provides audio recording functionality using MediaRecorder API.
 * Records audio in WebM format and provides base64 conversion.
 * 
 * @returns {Object} Audio recording controls and state
 * 
 * FUTURE BACKEND INTEGRATION:
 * - Upload recordings to cloud storage (Supabase Storage/Firebase Storage)
 * - Implement audio compression before upload
 * - Add audio waveform visualization
 * - Support multiple audio formats (MP3, WAV)
 * - Add audio transcription service integration
 */
export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setAudioBlob(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please grant permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    setAudioBlob(null);
  };

  // Convert blob to base64 for storage
  const getAudioBase64 = () => {
    return new Promise((resolve, reject) => {
      if (!audioBlob) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(audioBlob);
    });
  };

  return {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    clearRecording,
    getAudioBase64,
  };
};

