import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, Users, MessageCircle, Shield, Star, MapPin, GraduationCap, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to feed
    if (user) {
      navigate('/app/feed');
    }
  }, [user, navigate]);

  // Only show home page content if user is not logged in
  if (user) {
    return null; // or a loading spinner
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-md border-b border-purple-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                CampusMatch
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Campus Match
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow college students, build meaningful relationships, and discover love right on your campus. 
              Join thousands of students already finding their perfect match!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Matching Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-purple-400/50 text-purple-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-900/30 hover:border-purple-400/80 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Already a Member?</span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-900/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-gray-400 font-medium">Active Students</div>
              </div>
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-900/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className="text-gray-400 font-medium">Universities</div>
              </div>
              <div className="text-center bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-900/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-gray-400 font-medium">Successful Matches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Why Choose CampusMatch?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Designed specifically for college students, with features that matter most to your campus life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.02] border border-purple-900/50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Campus-Focused</h3>
              <p className="text-gray-400 leading-relaxed">
                Connect with students from your university or nearby campuses. Find someone who understands your academic life and schedule.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02] border border-cyan-900/50">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safe & Verified</h3>
              <p className="text-gray-400 leading-relaxed">
                All profiles are verified with .edu email addresses. Your safety and privacy are our top priorities.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 transform hover:scale-[1.02] border border-pink-900/50">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Matching</h3>
              <p className="text-gray-400 leading-relaxed">
                Our algorithm considers your interests, major, and campus activities to find your most compatible matches.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.02] border border-purple-900/50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Easy Messaging</h3>
              <p className="text-gray-400 leading-relaxed">
                Start conversations with your matches instantly. Share your campus experiences and plan study dates together.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02] border border-cyan-900/50">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Location-Based</h3>
              <p className="text-gray-400 leading-relaxed">
                Find matches nearby on campus or in your dorm. Perfect for spontaneous coffee dates between classes.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 transform hover:scale-[1.02] border border-pink-900/50">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
              <p className="text-gray-400 leading-relaxed">
                Join a vibrant community of college students. Share experiences, make friends, and find meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-900/50 via-indigo-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Getting started is simple - just three easy steps to find your perfect campus match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/50">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Your Profile</h3>
              <p className="text-gray-400 leading-relaxed">
                Sign up with your .edu email, add your best photos, and tell us about your interests and what you're studying.
              </p>
            </div>

            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-900/50">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Start Swiping</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse through profiles of students from your campus and nearby universities. Swipe right if you're interested!
              </p>
            </div>

            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-pink-900/50">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Make Connections</h3>
              <p className="text-gray-400 leading-relaxed">
                When you both swipe right, it's a match! Start chatting and plan your first campus date together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real students, real connections, real love stories from campuses across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-purple-900/50 hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "I met my boyfriend on CampusMatch during my sophomore year at UCLA. We've been together for 8 months now and couldn't be happier!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-white">Sarah M.</div>
                  <div className="text-sm text-gray-400">UCLA, Psychology</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-cyan-900/50 hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "CampusMatch helped me find someone who actually understands the engineering grind. We study together and it's perfect!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-white">Mike R.</div>
                  <div className="text-sm text-gray-400">Stanford, Engineering</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-900/50 hover:shadow-pink-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Not only did I find my girlfriend here, but I also made some great friends. The campus community is amazing!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  EL
                </div>
                <div>
                  <div className="font-semibold text-white">Emma L.</div>
                  <div className="text-sm text-gray-400">Berkeley, Art History</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Your Campus Match?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of college students who have already found love, friendship, and meaningful connections on CampusMatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Join CampusMatch Today</span>
              <Heart className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2 text-purple-100">
              <CheckCircle className="w-5 h-5" />
              <span>Free to join • Safe & secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm text-white py-12 border-t border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  CampusMatch
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The premier dating app for college students. Find love, friendship, and meaningful connections right on your campus.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
                  <Users className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CampusMatch. All rights reserved. Made with <span className="text-pink-400">❤️</span> for college students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;