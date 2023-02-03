import React, { useEffect, useState } from "react";
import vishuddha from '../images/ai-bot.png'
import user from '../images/user.png'
function Chat() {
  const [chatMessage, setChatMessage] = useState([]);
  const [form, setForm] = useState({
    message: "",
  });
  const [gptMessage,setGptMessage]=useState([])
  useEffect(()=>{
if(gptMessage.length>0){
  gptMessage.map(item=>{

    setChatMessage([...chatMessage,item])
    setGptMessage([])
  })
}
  },[gptMessage])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setChatMessage([...chatMessage, { user: "self", message: form.message }]);
    setForm({ ...form, message: "" });
    const response =  await fetch('https://backend-h427.onrender.com/',{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        message:form.message
      })
    })
    const data =await response.json();
    setGptMessage([...gptMessage, { user: "Chat GPT", message: data.message }]);
    
    console.log(data.message)
  };
  return (
    <form className="chat-main" onSubmit={handleSubmit}>
      {console.log(chatMessage)}
      {chatMessage.map((item, i) => {
        return (
          <div className="chat-text-field">
            <span>{item.user=='self'?<img src={user}/>:<img src={vishuddha} className='vishuddha-img'/>}</span><span className="message">{item.message}</span>
          </div>
        );
      })}
      <footer className="footer">
        <input
          type={"text"}
          onChange={handleChange}
          name="message"
          value={form.message}
          placeholder="Type here anything you want to ask with Ai Vashuddha"
        />
      </footer>
    </form>
  );
}

export default Chat;
