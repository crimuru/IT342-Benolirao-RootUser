import React, { useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import '../styles/BookAppointment.css';

const BookAppointment = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    consultation: 'General Consultation',
    concern: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const consultationTypes = [
    'General Consultation',
    'Teeth Cleaning',
    'Whitening',
    'Braces Consultation',
    'Tooth Extraction',
    'Dental Checkup'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'date' ? { time: '' } : {}),
    }));
  };

  const handleTimeSelect = (selectedTime) => {
    if (!bookingData.date) return;
    setBookingData(prev => ({ ...prev, time: selectedTime }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    
    if (!bookingData.date || !bookingData.time) {
      alert("Please select both a date and a time.");
      return;
    }

    // 🚀 1. READ THE LOGGED-IN USER FROM LOCAL STORAGE
    const userString = localStorage.getItem("user");
    if (!userString) {
      alert("You must be logged in to book an appointment!");
      return;
    }
    const loggedInUser = JSON.parse(userString);

    setIsSubmitting(true);
    setShowSuccess(false);

    // 🚀 2. USE THE DYNAMIC ID FOR THE DATABASE
    const payload = {
      date: bookingData.date,
      time: bookingData.time,
      concern: bookingData.concern,
      user: { id: loggedInUser.id } // This now dynamically changes based on who is logged in!
    };

    try {
      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), 
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setBookingData({ date: '', time: '', concern: '' });
        }, 3000);
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Could not connect to the server. Make sure Spring Boot is running!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-content book-appointment-page">
        <div className="page-header">
            <h1>Book an Appointment</h1>
            <p>Schedule your next visit with us.</p>
        </div>

        <form onSubmit={handleConfirm} className="booking-form">
          <div className="booking-top-row">
            {/* Date Selection */}
            <div className="booking-card">
              <div className="card-header">
                <Calendar className="header-icon" size={20} />
                <h3>Select Date</h3>
              </div>
              <div className="input-wrapper date-input-wrapper">
                <Calendar className="input-icon" size={18} />
                <input 
                  type="date" 
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Consultation Type */}
            <div className="booking-card">
              <div className="card-header">
                <FileText className="header-icon" size={20} />
                <h3>Consultation Type</h3>
              </div>
              <div className="input-wrapper select-input-wrapper">
                <select
                  name="consultation"
                  value={bookingData.consultation}
                  onChange={handleChange}
                >
                  {consultationTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Concern Textarea */}
          <div className="booking-card full-width">
            <div className="card-header">
              <Clock className="header-icon" size={20} />
              <div>
                <h3>Available Slots</h3>
                <p className="slot-subtitle">Pick a date first to see the available time slots.</p>
              </div>
            </div>

            {!bookingData.date ? (
              <div className="slot-placeholder">
                <p>Please select a date first to view available appointment times.</p>
              </div>
            ) : (
              <>
                <div className="slot-meta">
                  <span>{`${timeSlots.length} slots available on ${new Date(bookingData.date).toLocaleDateString('en-US')}`}</span>
                  {bookingData.time && <span>Selected: {bookingData.time}</span>}
                </div>
                <div className="time-grid">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`time-slot-btn ${bookingData.time === slot ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="booking-card full-width">
            <div className="card-header">
              <FileText className="header-icon" size={20} />
              <h3>Dental Concern (Optional)</h3>
            </div>
            <textarea 
              name="concern"
              value={bookingData.concern}
              onChange={handleChange}
              placeholder="Describe your dental concern or reason for visit..."
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-confirm" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={18} className="spinner" /> Confirming...</>
              ) : (
                'Confirm Booking'
              )}
            </button>

            {showSuccess && (
              <span className="success-msg">
                <CheckCircle2 size={18} /> 
                Appointment booked successfully!
              </span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default BookAppointment;