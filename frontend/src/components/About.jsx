import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Globe, 
  Users, 
  Award, 
  Code, 
  GraduationCap, 
  ShoppingBag, 
  Heart,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  Smartphone,
  Database,
  Cloud
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/contact', { state: { intent: 'project' } });
  };

  const handleContactTeam = () => {
    navigate('/contact', { state: { intent: 'general' } });
  };

  const values = [
    {
      icon: <Target className="text-emerald-600" size={32} />,
      title: 'Our Mission',
      description: 'To deliver cutting-edge software solutions, quality tech education, and premium merchandise that empower businesses and individuals in the digital age.',
      gradient: 'from-emerald-50 to-green-50'
    },
    {
      icon: <Globe className="text-cyan-600" size={32} />,
      title: 'Our Vision',
      description: 'To be Africa\'s leading technology hub, recognized for innovative software solutions, transformative education, and quality products.',
      gradient: 'from-cyan-50 to-emerald-50'
    },
    {
      icon: <Users className="text-blue-600" size={32} />,
      title: 'Our Team',
      description: 'A passionate team of developers, educators, and innovators committed to excellence and community impact.',
      gradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: <Award className="text-amber-600" size={32} />,
      title: 'Our Values',
      description: 'Excellence in delivery, Innovation in approach, Integrity in relationships, and Community in impact.',
      gradient: 'from-amber-50 to-orange-50'
    },
  ];

  const services = [
    {
      icon: <Code className="text-emerald-600" size={28} />,
      title: 'Software Development',
      description: 'Custom web and mobile applications built with modern frameworks and technologies'
    },
    {
      icon: <Smartphone className="text-cyan-600" size={28} />,
      title: 'Mobile Applications',
      description: 'iOS and Android apps developed with native and cross-platform technologies'
    },
    {
      icon: <GraduationCap className="text-blue-600" size={28} />,
      title: 'Tech Academy',
      description: 'Industry-recognized courses, certifications, and mentorship programs'
    },
    {
      icon: <ShoppingBag className="text-amber-600" size={28} />,
      title: 'Merchandise Shop',
      description: 'Premium tech products, branded apparel, and developer accessories'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full border border-emerald-200 mb-6 shadow-sm">
              <Sparkles className="text-emerald-600" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-800">About</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">
                Apex Software Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We are a comprehensive technology company that builds innovative software, provides quality tech education, 
              and delivers premium merchandise to empower digital transformation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 shadow-md">
                <Zap size={20} />
                Innovating Since 2019
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-emerald-200 text-gray-700 rounded-xl font-bold hover:border-emerald-500 hover:shadow-md transition-all shadow-sm">
                <Heart size={20} className="text-emerald-600" />
                98% Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide our work and define who we are
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white border border-emerald-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 shadow-sm group"
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${value.gradient} rounded-xl border border-emerald-100 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-white to-emerald-50 border-y border-emerald-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Impact</span>
            </h2>
            <p className="text-lg text-gray-600">
              Numbers that tell our story of growth and success
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '50+', label: 'Projects Delivered', color: 'text-emerald-600', icon: <Code className="text-emerald-500" size={20} /> },
              { number: '1,500+', label: 'Students Trained', color: 'text-cyan-600', icon: <GraduationCap className="text-cyan-500" size={20} /> },
              { number: '98%', label: 'Client Satisfaction', color: 'text-blue-600', icon: <Heart className="text-blue-500" size={20} /> },
              { number: '5+', label: 'Years Experience', color: 'text-amber-600', icon: <Award className="text-amber-500" size={20} /> }
            ].map((stat, index) => (
              <div key={index} className="bg-white border border-emerald-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {stat.icon}
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.number}</div>
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">We Offer</span>
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive technology solutions and services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white border border-emerald-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 shadow-sm group"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="inline-flex p-4 bg-white/20 rounded-full border border-white/30 mb-6">
                <Sparkles className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build with Us?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Whether you need software solutions, tech education, or premium merchandise, we're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleStartProject}
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Zap size={20} />
                  Start a Project
                </button>
                <button 
                  onClick={handleContactTeam}
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  <Users size={20} />
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;