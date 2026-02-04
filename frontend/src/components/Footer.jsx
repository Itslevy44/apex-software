import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Leaf
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Products: ['Merchandise', 'Software Tools'],
    Services: ['Web Development', 'Mobile Apps'],
    Academy: ['Courses', 'Bootcamps'],
    Company: ['About Us', 'Contact'],
  };

  const socialLinks = [
    { icon: <Facebook size={16} />, label: 'Facebook', href: '#' },
    { icon: <Twitter size={16} />, label: 'Twitter', href: '#' },
    { icon: <Linkedin size={16} />, label: 'LinkedIn', href: '#' },
    { icon: <Instagram size={16} />, label: 'Instagram', href: '#' },
  ];

  const contactInfo = [
    { icon: <Mail size={14} />, text: 'contact@apexsolutions.co.ke' },
    { icon: <Phone size={14} />, text: '+254 712 345 678' },
    { icon: <MapPin size={14} />, text: 'Nairobi, Kenya' },
  ];

  return (
    <footer className="bg-gradient-to-b from-emerald-50 to-green-50 border-t border-emerald-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center shadow-sm shadow-emerald-200">
                <Leaf className="text-white" size={16} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">APEX SOLUTIONS</h2>
                <p className="text-emerald-600 text-xs font-medium">Technology & Innovation</p>
              </div>
            </div>
            <p className="text-gray-600 mb-3 max-w-md text-sm">
              Building the future of technology through innovative solutions, 
              quality education, and premium tech products.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-1 mb-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600 text-xs">
                  <div className="text-emerald-600">{info.icon}</div>
                  <span>{info.text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter Signup - Removed to reduce size */}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-gray-800 font-bold mb-2 text-xs">{category}</h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-600 hover:text-emerald-600 transition-colors text-xs"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-emerald-200 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Apex Solutions. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-1.5 bg-white border border-emerald-200 rounded-md text-gray-600 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-sm transition-all shadow-sm"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
            <a href="#" className="hover:text-emerald-600 transition-colors text-xs">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors text-xs">Terms</a>
            <a href="#" className="hover:text-emerald-600 transition-colors text-xs">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;