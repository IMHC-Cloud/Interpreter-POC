import React, {useRef, useState} from 'react'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import video from '../assets/testInterpreterApp.mp4'
import './Assignment.css'


function Assignment() {
  const [MenuValue, setMenuValue] = React.useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [recordedChunks, setRecordedChunks] = useState([]);
  const recordedChunks = useRef([]);
  console.log("chucks", recordedChunks)
  const videoRef = useRef(null);
  const startPlaying = useRef(null);
  console.log(startPlaying.current)
  

  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };
  const startRecording = async () => {
    try{
      const streamCamera = await navigator.mediaDevices.getUserMedia({ video: true })
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
    
      console.log(stream)
      videoRef.current.srcObject = streamCamera;
      startPlaying.current.play()
    
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        console.log("hitting chunks")
        // setRecordedChunks(chunks);
        recordedChunks.current = chunks
        saveRecording();
        
      };

      recorder.start();
    } catch (error){
      console.log(error)

    }

  };




  const stopRecording = () => {
    if (mediaRecorder) {
      console.log("media is here")
      startPlaying.current.pause()
      mediaRecorder.stop();
      setMediaRecorder(null);
      videoRef.current.srcObject = null;
      
    }
    
  };

  const saveRecording = () => {
    if (recordedChunks.length === 0) {
      console.warn('No recording available.');
      return;
    }

    
    const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    // Create a link element and set its href and download attributes
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screen_recording.webm';

    // Programmatically click the link to start the download
    a.click();
  };

  return (
    <div>
     <h3 className='assignmentTitle'>Translation Text</h3>
    <div>
   
      <div>
        <center className='videoContainer'>
        <video src={video} style={{ width: '800px', height:'500px'}}  controls ref={startPlaying}/>
        {/* <source src={video} type="video/mp4"></source> */}
      
         <video
        ref={videoRef}
        style={{ width: '600px', height:'500px' }}
        autoPlay
        playsInline
        muted // Muting the video to avoid feedback loop 
        /> 
        </center>
        <div className='buttons'>
          <button className='startButton' onClick={startRecording}> Start Recording</button>
          <button className='stopButton' onClick={stopRecording}> Stop Recording</button>
        </div>
      </div>
    
    </div>
    </div>
  )
}

export default Assignment
