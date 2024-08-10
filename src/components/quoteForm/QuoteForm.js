import React, { useState } from "react";
import "./QuoteForm.css";

function QuoteForm({ onClose, pagesource }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: pagesource,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://email-server-misty-grass-5845.fly.dev/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderEmail: formData.email,
            subject: "Inquiry from website",
            category: formData.category,
            message: `${formData.name} has submitted an inquiry.\n\nEmail: ${formData.email}\nCategory: ${formData.category}`,
            name: formData.name,
          }),
        }
      );

      if (response.ok) {
        console.log("Email sent successfully");
        setMessage("Request sent! We will email you back shortly."); // Set the message
        setTimeout(() => {
          setMessage(""); // Clear the message after 2 seconds
          onClose(); // Close the modal or perform other actions as needed
        }, 4000);
      } else {
        console.error("Failed to send email");
        setMessage("Failed to send request. Please try again."); // Optional error message
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Error sending request. Please try again."); // Optional error message
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>Request a Quote</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <label>
              Name:
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type='submit' className='submit-button'>
            Request
          </button>
        </form>
        {message && <p className='confirmation-message'>{message}</p>}{" "}
        {/* Show message */}
      </div>
    </div>
  );
}

export default QuoteForm;
