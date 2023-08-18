import React, { useState } from 'react';
import axios from 'axios';

const Enregvideo = () => {
  const [stream, setStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    
      setStream(mediaStream);
    
      const videoPreview = document.getElementById('preview');
      videoPreview.srcObject = mediaStream;
    
      const recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = handleDataAvailable;
      recorder.start();
    
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors de la capture vidéo:', error);
    }
    
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const uploadVideoToServer = async (blob) => {
    const formData = new FormData();
    formData.append('video', blob);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:8080/Enreg_video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Réponse du serveur :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la vidéo au serveur :', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });

        // Envoie le blob de la vidéo enregistrée au serveur
        await uploadVideoToServer(blob);

        const newRecording = {
          blob: blob,
          url: URL.createObjectURL(blob),
          name: `Recording ${recordings.length + 1}`,
          date: new Date().toLocaleString(),
        };

        setRecordings((prevRecordings) => [...prevRecordings, newRecording]);
        setRecordedChunks([]);
        setStream(null);
        setIsRecording(false);
      };
    }
  };

  return (
    <div>
      <label htmlFor="title">Titre de la vidéo:</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="description">Description de la vidéo:</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <video id="preview" autoPlay controls />
      <button id="start-cbutton" onClick={startRecording} disabled={isRecording}>
        Commencer l'enregistrement
      </button>
      <button id="stop-cbutton" onClick={stopRecording} disabled={!isRecording}>
        Arrêter l'enregistrement
      </button>
      <ul id="record-list">
        {recordings.map((recording, index) => (
          <li key={index}>
            <span>{recording.name}</span>
            <span>{recording.date}</span>
            <a href={recording.url} download={`${recording.name}.webm`}>
              Télécharger
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Enregvideo;
