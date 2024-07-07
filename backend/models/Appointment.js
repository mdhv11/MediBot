const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.options('/api/v1/bookAppointment', cors());

let appointments = [];

app.post('http://localhost:5000/api/v1/bookAppointment', (req, res) => {
  const { name, email, phoneNumber, date, time } = req.body;

  if (!name || !email || !phoneNumber || !date || !time) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
  }

  const appointment = { name, email, phoneNumber, date, time };
  appointments.push(appointment);

  res.json({ success: true, message: 'Appointment booked successfully!', appointment });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
