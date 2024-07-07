import express from 'express';
const router = express.Router();
import { spawn } from 'child_process';

// Route to handle incoming messages
router.post('/', (req, res) => {
  const message = req.body.message;
  const chatbotProcess = spawn('python', ['C:/Users/madha/Desktop/medibot/backend/Chatbot/Test/Chatbot_test/chat.py', message]);

  let chatResponse = '';

  chatbotProcess.stdout.on('data', (data) => {
    chatResponse += data.toString();
  });

  chatbotProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
  });

  chatbotProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
    }
    console.log(`Chatbot response: ${chatResponse}`);
    res.send({ response: chatResponse });
  });
});

export default router;

