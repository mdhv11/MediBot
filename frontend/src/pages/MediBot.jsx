import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chatbotContainer: {
    width: 'min(90vw, 400px)',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  chatHistory: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  chatMessage: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
  },
  userMessage: {
    backgroundColor: '#fff',
    color: '#000',
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    position: 'relative',
    '&:after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: '-15px',
      width: '0',
      height: '0',
      borderTop: '15px solid transparent',
      borderBottom: '15px solid #fff',
      borderLeft: '15px solid transparent',
    },
  },
  botMessage: {
    backgroundColor: '#000',
    color: '#fff',
    marginLeft: theme.spacing(2),
    marginRight: 'auto',
    position: 'relative',
    '&:after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      right: '-15px',
      width: '0',
      height: '0',
      borderTop: '15px solid transparent',
      borderBottom: '15px solid #000',
      borderRight: '15px solid transparent',
    },
  },
  inputField: {
    color: theme.palette.primary.main,
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  textInput: {
    flex: 1,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  submitButton: {
    padding: theme.spacing(1, 2),
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Chatbot = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  
  useEffect(() => {
    fetch('/messages')
      .then(response => response.json())
      .then(data => {

        setMessages(data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const message = inputRef.current.value.trim();

    if (!message) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: true, text: message },
    ]);
    inputRef.current.value = '';


    const botResponse = await simulateBotResponse(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: false, text: botResponse },
    ]);
  };

  const simulateBotResponse = async message => {

    return `Processing: "${message}"...`;
  };

  return (
    <Card className={classes.chatbotContainer}>
      <CardContent>
        <h1>Chatbot</h1>
        <ul className={classes.chatHistory}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${classes.chatMessage} ${
                message.user ? classes.userMessage : classes.botMessage
              }`}
            >
              {message.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage} className={classes.inputField}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Type your message..."
            className={classes.textInput}
          />
          <button type="submit" className={classes.submitButton}>
            Send
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
