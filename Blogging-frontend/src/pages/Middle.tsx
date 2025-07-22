import { useEffect, useState } from "react";

const Middle = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Premium, stunning high-quality images for a professional look
  const images = [
    "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100",
    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=100",
    "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100"
  ];

  // Testimonials for social proof
  const testimonials = [
    {
      quote: "BlogNest transformed how I share my stories with the world. The platform is intuitive and beautiful.",
      author: "Sarah Johnson",
      role: "Travel Blogger"
    },
    {
      quote: "As a professional writer, I needed a platform that showcases my work elegantly. BlogNest delivers exactly that.",
      author: "Michael Chen",
      role: "Content Creator"
    },
    {
      quote: "The community I've built through BlogNest has been incredible. My readership has grown exponentially.",
      author: "Priya Sharma",
      role: "Fiction Writer"
    }
  ];

  useEffect(() => {
    // Image carousel effect
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    // Fade-in animation on load
    // Animation handled by CSS now

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections that should animate on scroll
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [images.length]);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Completely redesigned with premium aesthetics */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 min-h-screen">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -left-20 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-60 h-60 sm:w-80 sm:h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row items-center">
          {/* Left content - Text and CTA */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 sm:mb-12 lg:mb-0 lg:pr-8 xl:pr-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-white/20 shadow-xl">
              <span className="flex items-center animate-pulse">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">PREMIUM BLOGGING EXPERIENCE</span>
                <span className="sm:hidden">PREMIUM</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight sm:leading-none mb-4 sm:mb-6">
              Elevate Your <br className="hidden sm:block"/>
              <span className="relative inline-block mt-1 sm:mt-2">
                Writing Journey
                <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 font-serif leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0">
              Craft stunning narratives, build your audience, and join a community of passionate writers on the web's most elegant blogging platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a href="/signin" className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/30 backdrop-blur-sm rounded-xl text-white font-serif font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Explore Blogs
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right content - Image showcase */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent opacity-50 z-10"></div>
                  <img
                    src={image}
                    alt={`Premium writing experience ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}

              {/* Image overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-20">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-white mb-2">Craft Your Narrative</h3>
                  <p className="text-indigo-100 font-serif text-sm sm:text-base">Express your unique voice with our elegant writing tools and beautiful typography.</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex space-x-2 z-20">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-xl transform rotate-3 font-bold text-xs sm:text-sm">
              Premium Design
            </div>
            <div className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-xl transform -rotate-3 font-bold text-xs sm:text-sm">
              Stunning Typography
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white animate-bounce">
          <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Scroll to explore</p>
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Features Section - Redesigned with premium aesthetics */}
      <div className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-100 rounded-full text-indigo-800 text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              PREMIUM FEATURES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-indigo-950 via-purple-800 to-indigo-900 text-transparent bg-clip-text animate-gradient-text">Why Choose BlogNest?</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-2 mb-4 sm:mb-6"></div>
            <p className="text-indigo-800 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-serif">
              A sophisticated platform designed for creative writers and engaged readers to connect through inspiring content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-16">
            {/* Create Stories */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-indigo-100 relative overflow-hidden group hover-shine">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6 transform transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-indigo-950 text-center relative z-10">Create Stories</h3>
              <p className="text-indigo-800 font-serif leading-relaxed text-center text-sm sm:text-base lg:text-lg relative z-10">
                Express yourself through elegant prose and share your unique perspective with readers worldwide
              </p>
              <div className="mt-4 sm:mt-6 w-8 sm:w-12 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full"></div>
            </div>

            {/* Read Blogs */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-indigo-100 relative overflow-hidden group hover-shine">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6 transform transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-indigo-950 text-center relative z-10">Read Blogs</h3>
              <p className="text-indigo-800 font-serif leading-relaxed text-center text-sm sm:text-base lg:text-lg relative z-10">
                Discover thought-provoking content from talented writers across genres and cultures
              </p>
              <div className="mt-4 sm:mt-6 w-8 sm:w-12 h-1 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full"></div>
            </div>

            {/* Connect */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-indigo-100 relative overflow-hidden group hover-shine md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6 transform transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-indigo-950 text-center relative z-10">Connect</h3>
              <p className="text-indigo-800 font-serif leading-relaxed text-center text-sm sm:text-base lg:text-lg relative z-10">
                Build meaningful relationships with like-minded writers and readers in our literary community
              </p>
              <div className="mt-4 sm:mt-6 w-8 sm:w-12 h-1 bg-gradient-to-r from-fuchsia-300 to-purple-300 rounded-full"></div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <a href="/signup" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-900 to-purple-800 text-white font-serif font-bold text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1">
              Start Your Writing Journey
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-xs sm:text-sm font-bold mb-4 sm:mb-6 border border-white/20">
              WHAT WRITERS SAY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-4 sm:mb-6 text-white">
              Loved by Writers Worldwide
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-2 mb-4 sm:mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl scroll-animate">
                <div className="mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-sm sm:text-base lg:text-lg font-serif italic mb-4 sm:mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center mr-3 sm:mr-4">
                    <span className="text-white font-bold text-sm sm:text-base">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-serif text-sm sm:text-base">{testimonial.author}</h4>
                    <p className="text-indigo-200 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;

