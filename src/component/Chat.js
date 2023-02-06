import React, { useEffect, useState } from "react";
import vishuddha from "../images/ai-bot.png";
import user from "../images/user.png";
import openmic from "../images/openmic.svg";
import Modal from "./Modal";
function Chat() {
  const [chatMessage, setChatMessage] = useState([]);
  const [form, setForm] = useState({
    message: "",
  });
  const [modal, setModal] = useState(false);
  const [gptMessage, setGptMessage] = useState([]);

  useEffect(() => {
    if (gptMessage.length > 0) {
      gptMessage.map((item) => {
        setChatMessage([...chatMessage, item]);
        setGptMessage([]);
      });
    }
  }, [gptMessage]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangepeak = (value) => {
    console.log(value)
    setForm({ ...form, message: value });
  };
  const handleSubmit = async (e) => {
    if (form.message !== "") {
      e?.preventDefault();
      setChatMessage([...chatMessage, { user: "self", message: form.message }]);
      setForm({ ...form, message: "" });
      const response = await fetch("https://backend-h427.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: form.message,
        }),
      });
      const data = await response.json();
      setGptMessage([
        ...gptMessage,
        { user: "Chat GPT", message: data.message },
      ]);
    }
  };
  return (
    <>
      <div className={`${!modal && "mic"}`}>
        <img
          src={openmic}
          onClick={() => setModal(true)}
          width="30"
          className="cursor-pointer"
        />
      </div>
      <form className="chat-main" onSubmit={handleSubmit}>
        {chatMessage.map((item, i) => {
          return (
            <div className="chat-text-field">
              <span>
                {item.user == "self" ? (
                  <img src={user} />
                ) : (
                  <img src={vishuddha} className="vishuddha-img" />
                )}
              </span>
              <span className="message">{item.message}</span>
            </div>
          );
        })}
        {console.log(form)}
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
      <Modal open={modal} isClose={() => setModal(false)} handleChange={handleChangepeak} handleSubmit={handleSubmit}/>
    </>
  );
}

export default Chat;
