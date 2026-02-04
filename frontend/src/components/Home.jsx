import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Smartphone, 
  Globe, 
  GraduationCap, 
  ShoppingBag, 
  Users, 
  Award, 
  BookOpen, 
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Shield,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full border border-emerald-200 mb-4 shadow-sm">
                <Sparkles className="text-emerald-600" size={20} />
                <span className="text-emerald-600 font-medium text-sm">TECHNOLOGY & INNOVATION</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Build Tomorrow's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">
                  Digital Solutions
                </span>{' '}
                Today
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Apex Software Solutions delivers cutting-edge software development, tech education, and premium merchandise all under one roof.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/academy"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 shadow-md group"
                >
                  <GraduationCap size={22} />
                  Explore Academy
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-emerald-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-emerald-500 hover:shadow-md transition-all shadow-sm group"
                >
                  <Code size={22} />
                  Start Project
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-emerald-600" />
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <Cpu className="text-emerald-600" size={20} />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">50+</div>
                    <div className="text-sm text-gray-500">Projects Delivered</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-cyan-600" size={20} />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">1,500+</div>
                    <div className="text-sm text-gray-500">Students Trained</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-blue-600" size={20} />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">98%</div>
                    <div className="text-sm text-gray-500">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Services Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 shadow-2xl border border-emerald-200 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-emerald-500/10 to-green-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Comprehensive Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Software Development */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100 text-center">
                      <div className="inline-flex p-3 bg-white rounded-lg border border-emerald-200 mb-3">
                        <Code className="text-emerald-600" size={24} />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">Software Dev</h4>
                      <p className="text-xs text-gray-600">Custom Solutions</p>
                    </div>
                    
                    {/* Mobile Apps */}
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100 text-center">
                      <div className="inline-flex p-3 bg-white rounded-lg border border-cyan-200 mb-3">
                        <Smartphone className="text-cyan-600" size={24} />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">Mobile Apps</h4>
                      <p className="text-xs text-gray-600">iOS & Android</p>
                    </div>
                    
                    {/* Academy */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 text-center">
                      <div className="inline-flex p-3 bg-white rounded-lg border border-amber-200 mb-3">
                        <GraduationCap className="text-amber-600" size={24} />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">Tech Academy</h4>
                      <p className="text-xs text-gray-600">Courses & Training</p>
                    </div>
                    
                    {/* Merchandise */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 text-center">
                      <div className="inline-flex p-3 bg-white rounded-lg border border-purple-200 mb-3">
                        <ShoppingBag className="text-purple-600" size={24} />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">Merchandise</h4>
                      <p className="text-xs text-gray-600">Premium Products</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                <div className="flex items-center gap-2">
                  <Zap size={16} />
                  <span>Since 2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Tech Solutions</span>
            </h2>
            <p className="text-lg text-gray-600">
              From custom software development to tech education and premium merchandise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service 1: Software Development */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 group">
              <div className="inline-flex p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Software Development</h3>
              <p className="text-gray-600 mb-4">
                Custom web and mobile applications built with cutting-edge technologies. We turn your ideas into powerful digital solutions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={16} />
                  <span className="text-sm text-gray-600">Web Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={16} />
                  <span className="text-sm text-gray-600">Mobile Apps (iOS/Android)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={16} />
                  <span className="text-sm text-gray-600">Cloud Solutions</span>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 mt-6 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 2: Tech Academy */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 group">
              <div className="inline-flex p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-cyan-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Apex Academy</h3>
              <p className="text-gray-600 mb-4">
                Industry-recognized tech courses taught by experts. Get job-ready skills and certifications that matter.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-cyan-500" size={16} />
                  <span className="text-sm text-gray-600">Programming Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-cyan-500" size={16} />
                  <span className="text-sm text-gray-600">Certifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-cyan-500" size={16} />
                  <span className="text-sm text-gray-600">Mentorship Programs</span>
                </div>
              </div>
              <Link 
                to="/academy" 
                className="inline-flex items-center gap-2 mt-6 text-cyan-600 font-medium hover:text-cyan-700 transition-colors"
              >
                Browse Courses
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Service 3: Merchandise Shop */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 group">
              <div className="inline-flex p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="text-amber-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Merchandise Shop</h3>
              <p className="text-gray-600 mb-4">
                Premium tech merchandise and accessories. From branded apparel to developer tools and gadgets.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-amber-500" size={16} />
                  <span className="text-sm text-gray-600">Branded Apparel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-amber-500" size={16} />
                  <span className="text-sm text-gray-600">Developer Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-amber-500" size={16} />
                  <span className="text-sm text-gray-600">Tech Accessories</span>
                </div>
              </div>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 mt-6 text-amber-600 font-medium hover:text-amber-700 transition-colors"
              >
                Visit Shop
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-white to-emerald-50 border-y border-emerald-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '50+', label: 'Projects Delivered', color: 'text-emerald-600', icon: <Code className="text-emerald-500" size={20} /> },
              { number: '1,500+', label: 'Students Trained', color: 'text-cyan-600', icon: <GraduationCap className="text-cyan-500" size={20} /> },
              { number: '98%', label: 'Client Satisfaction', color: 'text-blue-600', icon: <Award className="text-blue-500" size={20} /> },
              { number: '5+', label: 'Years Experience', color: 'text-amber-600', icon: <TrendingUp className="text-amber-500" size={20} /> }
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

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="inline-flex p-4 bg-white/20 rounded-full border border-white/30 mb-6">
                <Sparkles className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Whether you need custom software, tech education, or premium merchandise, Apex Software Solutions has you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
                >
                  <Database size={20} />
                  Start a Project
                </Link>
                <Link 
                  to="/academy"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  <GraduationCap size={20} />
                  Explore Academy
                </Link>
                <Link 
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  <ShoppingBag size={20} />
                  Visit Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;