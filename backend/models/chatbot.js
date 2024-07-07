const express = require('express');
const bodyParser = require('body-parser');
const chatbotRouter = require('./Routes/chatbotRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());


app.use('/chatbotRouter', chatbotRouter);


app.get('/messages', (req, res) => {
  const messages = [
    { user: false, text: 'Message 1 from backend' },
    { user: true, text: 'Message 2 from backend' },
    { user: false, text: 'Message 3 from backend' }
  ];

  res.json(messages);
});

app.listen(port, () => {
  console.log('Server running on port', port);
});
