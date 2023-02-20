import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import LogoutButton from "./LogoutButton";

const ChatView = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  // TODO: load the chat history for the user and render it on the page
  fetch("http://127.0.0.1:4444/chat_history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify({
    })
  })
    .then((res) => {
      if (!res.ok) {
        console.error('Response not OK:', res.status, res.statusText);
        throw new Error(res.statusText);
      }
      return res.json();
    });
	// ************************

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send the input to an API to get the response from AI
	fetch("http://127.0.0.1:4444/chat", {
	  method: "POST",
	  headers: {
	    "Content-Type": "application/json",
	    'Accept': 'application/json'
	  },
	  body: JSON.stringify({input
	  })
	})
	  .then((res) => {
	    if (!res.ok) {
	      console.error('Response not OK:', res.status, res.statusText);
	      throw new Error(res.statusText);
	    }
	    return res.json();
	  });

    setOutput("AI's response");
    setHistory([...history, { input, output }]);
    setInput("");
  };

  return (
    <div className="chat-view">
      <div className="left-panel">
        <ChatHistory history={history} />
        <LogoutButton></LogoutButton>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="output">{output}</div>
      </div>
    </div>
  );
};

export default ChatView;
