import React from 'react';
import { ArrowRight, Code, Cpu, Shield, Leaf, Zap, Sparkles } from 'lucide-react';

const Hero = () => {
  const features = [
    { 
      icon: <Code className="text-emerald-600" size={24} />, 
      text: 'Custom Software Development',
      description: 'Tailored solutions for your business needs'
    },
    { 
      icon: <Cpu className="text-emerald-600" size={24} />, 
      text: 'Tech Solutions & Consulting',
      description: 'Expert guidance for digital transformation'
    },
    { 
      icon: <Shield className="text-emerald-600" size={24} />, 
      text: 'Cybersecurity Services',
      description: 'Protect your digital assets with confidence'
    },
  ];

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-green-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      {/* Floating leaves/particles */}
      <div className="absolute top-1/4 left-10 animate-float">
        <Leaf className="text-emerald-300/50" size={24} />
      </div>
      <div className="absolute top-1/3 right-20 animate-float delay-300">
        <Leaf className="text-green-300/50" size={20} />
      </div>
      <div className="absolute bottom-1/4 left-20 animate-float delay-700">
        <Leaf className="text-emerald-400/30" size={16} />
      </div>
      <div className="absolute bottom-1/3 right-10 animate-float delay-1000">
        <Leaf className="text-green-400/30" size={28} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-600 text-sm font-medium">WELCOME TO APEX SOLUTIONS</span>
            <Sparkles className="text-emerald-500" size={14} />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-800">Precision in</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 animate-gradient">
              Code
            </span>
            <br />
            <span className="text-gray-800">Excellence in</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 animate-gradient">
              Solutions
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            We build cutting-edge software solutions and provide premium tech products 
            that drive innovation and transform businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 group shadow-md">
              <span className="flex items-center justify-center gap-2">
                Explore Our Shop
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 bg-white border border-emerald-200 text-gray-800 font-bold rounded-xl hover:border-emerald-500 hover:shadow-md transition-all duration-300 shadow-sm">
              View Academy Courses
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">1.5K+</div>
              <div className="text-sm text-gray-600">Students Trained</div>
            </div>
            <div className="text-center p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-white border border-emerald-200 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-white border border-emerald-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all duration-300 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{feature.text}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <Zap size={14} />
                    <span>Learn more →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted By */}
          <div className="mt-16 pt-8 border-t border-emerald-100">
            <p className="text-gray-600 text-sm mb-6">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              <div className="text-xl font-bold text-gray-400">TECHNOVA</div>
              <div className="text-xl font-bold text-gray-400">INNOVATE</div>
              <div className="text-xl font-bold text-gray-400">DIGITAL</div>
              <div className="text-xl font-bold text-gray-400">GREENSPACE</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;