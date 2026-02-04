import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Linkedin,
  Twitter,
  Github,
  Leaf,
  Clock,
  Award
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="text-emerald-600" size={24} />,
      title: 'Email Us',
      details: 'info@apexsolutions.co.ke',
      link: 'mailto:info@apexsolutions.co.ke',
    },
    {
      icon: <Phone className="text-emerald-600" size={24} />,
      title: 'Call Us',
      details: '+254 712 345 678',
      link: 'tel:+254712345678',
    },
    {
      icon: <MapPin className="text-emerald-600" size={24} />,
      title: 'Visit Us',
      details: 'Nairobi, Kenya',
      link: '#',
    },
  ];

  const socialLinks = [
    { icon: <Twitter size={20} />, label: 'Twitter', href: '#' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: '#' },
    { icon: <Github size={20} />, label: 'GitHub', href: '#' },
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-gradient-to-b from-emerald-50 to-green-50">
      {/* Floating gradient orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600 rounded-full text-sm font-medium mb-4 border border-emerald-200">
            <Leaf size={16} />
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">Let's Build</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500">
              Something Amazing
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can turn your ideas into reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative group">
            {/* Gradient Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            
            <div className="relative bg-white border border-emerald-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl border border-emerald-200">
                  <MessageSquare size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Send Message</h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full mb-4 border border-emerald-200">
                    <CheckCircle size={48} className="text-emerald-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-sm"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none shadow-sm"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 shadow-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 bg-white border border-emerald-200 rounded-xl hover:border-emerald-500 transition-colors group shadow-sm hover:shadow-md"
                  >
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 group-hover:bg-gradient-to-br from-emerald-50 to-green-50 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {info.title}
                      </h4>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 bg-white border border-emerald-200 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-md transition-all group shadow-sm"
                    aria-label={social.label}
                  >
                    <div className="group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="text-emerald-600" size={20} />
                  <div className="text-3xl font-bold text-emerald-600">24/7</div>
                </div>
                <div className="text-gray-600 text-sm">Support Response</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="text-green-600" size={20} />
                  <div className="text-3xl font-bold text-green-600">100+</div>
                </div>
                <div className="text-gray-600 text-sm">Projects Delivered</div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-gradient-to-r from-white to-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Business Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-800">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-800">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-800">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;