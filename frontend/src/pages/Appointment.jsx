import React, { useState } from 'react';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import '../Appointment.css';

function Appointment() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleAppointmentBooking = () => {
    if (!name || !email || !phoneNumber || !selectedDate || !selectedTime) {
      setBookingMessage('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/api/v1/bookAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        date: selectedDate,
        time: selectedTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBookingMessage(data.message);
      })
      .catch((error) => {
        console.error('Error booking appointment:', error);
        setBookingMessage('Error booking appointment. Please try again later.');
      });
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>
      <Card className="appointment-form">
        <CardContent>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="date"
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="time"
            label="Select Time"
            value={selectedTime}
            onChange={handleTimeChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAppointmentBooking}
          >
            Book Appointment
          </Button>
          {bookingMessage && <p>{bookingMessage}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default Appointment;
