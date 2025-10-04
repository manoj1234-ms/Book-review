import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: 'black', minHeight: '100vh', padding: '2rem' }}>
      <div className="row">
        {/* Header Section */}
        <div className="col-12 mb-5">
          <h1 className="text-center mb-4" style={{ color: 'white' }}>Contact Us</h1>
          <p className="text-center lead" style={{ color: '#ccc' }}>
            Have questions about our book review platform? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="col-lg-8 mx-auto">
          <div className="row">
            {/* Contact Information */}
            <div className="col-md-5 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title mb-4">Get in Touch</h3>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i className="fas fa-envelope text-primary fs-4"></i>
                      </div>
                      <div>
                        <h6 className="mb-1">Email</h6>
                        <p className="text-muted mb-0">contact@bookreviewplatform.com</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i className="fas fa-phone text-primary fs-4"></i>
                      </div>
                      <div>
                        <h6 className="mb-1">Phone</h6>
                        <p className="text-muted mb-0">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i className="fas fa-map-marker-alt text-primary fs-4"></i>
                      </div>
                      <div>
                        <h6 className="mb-1">Address</h6>
                        <p className="text-muted mb-0">
                          123 Book Street<br />
                          Literature City, LC 12345
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr />
                  
                  <h5 className="mb-3">Business Hours</h5>
                  <div className="mb-2">
                    <span className="fw-bold">Monday - Friday:</span> 9:00 AM - 6:00 PM
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold">Saturday:</span> 10:00 AM - 4:00 PM
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold">Sunday:</span> Closed
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-7">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title mb-4">Send us a Message</h3>
                  
                  {submitStatus === 'success' && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="fas fa-check-circle me-2"></i>
                      Thank you for your message! We'll get back to you soon.
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSubmitStatus('')}
                      ></button>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      Sorry, there was an error sending your message. Please try again.
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSubmitStatus('')}
                      ></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="business">Business Partnership</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="col-12 mt-5">
          <div className="card shadow-sm" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
            <div className="card-body">
              <h3 className="card-title text-center mb-4" style={{ color: 'white' }}>Frequently Asked Questions</h3>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5 style={{ color: '#007bff' }}>How do I create an account?</h5>
                  <p style={{ color: '#ccc' }}>
                    Click on the "Sign Up" button in the navigation bar and fill out the registration form with your details.
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <h5 style={{ color: '#007bff' }}>How can I add a book review?</h5>
                  <p style={{ color: '#ccc' }}>
                    First, find the book you want to review. Click on the book details and then select "Add Review" to share your thoughts.
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <h5 style={{ color: '#007bff' }}>Can I edit my reviews?</h5>
                  <p style={{ color: '#ccc' }}>
                    Yes! You can edit your reviews by going to your profile or by visiting the book page where you left the review.
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <h5 style={{ color: '#007bff' }}>How do I report inappropriate content?</h5>
                  <p style={{ color: '#ccc' }}>
                    If you encounter inappropriate content, please contact us through this form with the details, and we'll investigate promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
