import React, { useState } from "react";
import "./QuoteForm.css";

function QuoteForm({ onClose, pagesource }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: pagesource,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pagesource", pagesource);
    console.log("form data", formData);
    try {
      const response = await fetch("/send-email", {
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
      });

      if (response.ok) {
        console.log("Email sent successfully");
        onClose(); // Close the modal or perform other actions as needed
      } else {
        console.error("Failed to send email");
        // Handle error
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>Request a Quote</h2>
        <form onSubmit={handleSubmit} pagesource='corporate'>
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
      </div>
    </div>
  );
}

export default QuoteForm;
