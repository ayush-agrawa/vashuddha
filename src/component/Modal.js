import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import openmic from "../images/openmic.svg";
import micophone from '../images/microphone.gif'
function Modal(props) {
    const [string, setString] = useState('')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition();


  useEffect(() => {
    if (transcript&&listening) {
      props.handleChange(transcript);
    }else if(finalTranscript&&!listening){
        props.handleSubmit()
        resetTranscript()
        SpeechRecognition.stopListening()
        props.isClose()
    }else if(!finalTranscript&&!listening){
        setString('Didnt get that')
    }
  }, [transcript,listening]);

  useEffect(()=>{
if(props.open){
    StartListening()
}
  },[props.open])
  const StartListening = ()=>{
      setString('Speak Now')
        SpeechRecognition.startListening()
        setTimeout(()=>{
        setString('Listening...')
        },[3000])
    
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div
      id="myModal"
      className={`${props.open ? "modal-open" : "modal-close"}`}
    >
      <div className="modal-content">
        <span className="close" onClick={() => {props.isClose();SpeechRecognition.stopListening();SpeechRecognition.resetTranscript()}}>
          &times;
        </span>
        <div>
          <div className="mic-main">
            <div style={{marginRight:'20%'}}>
                <h1>

            {transcript?transcript:string}{string=='Didnt get that'&&<span onClick={()=>StartListening()}>Try Again</span>}
                </h1>
            </div>
            <div>
              {
                listening?<div><img src={micophone} width='400'/></div>:!transcript&&<div><img onClick={()=>StartListening()} src={openmic} width='200' className="cursor-pointer"/></div>
              }
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default Modal;
