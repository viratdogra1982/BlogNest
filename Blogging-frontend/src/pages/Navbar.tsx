import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-950 to-purple-900 py-4 shadow-xl border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl shadow-lg flex items-center justify-center mr-2 sm:mr-4 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8 text-indigo-900" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif">
              <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-200 text-transparent bg-clip-text animate-gradient-text">BlogNest</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <a
            href="/signin"
            className="text-slate-100 font-serif text-base lg:text-lg hover:text-white transition-colors duration-200 flex items-center border-b-2 border-transparent hover:border-purple-300 pb-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            <span className="hidden lg:inline">Explore Blogs</span>
            <span className="lg:hidden">Blogs</span>
          </a>

          <a
            href="/signup"
            className="text-slate-100 font-serif text-base lg:text-lg hover:text-white transition-colors duration-200 flex items-center border-b-2 border-transparent hover:border-purple-300 pb-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Sign up
          </a>

          <a
            href="/signin"
            className="bg-white/10 backdrop-blur-md text-white font-serif text-base lg:text-lg px-4 lg:px-6 py-2 lg:py-3 rounded-xl hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            Sign in
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-950 to-purple-900 border-t border-white/10 shadow-xl">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="/blogs"
              className="flex items-center text-slate-100 font-serif text-lg hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Explore Blogs
            </a>

            <a
              href="/signup"
              className="flex items-center text-slate-100 font-serif text-lg hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Sign up
            </a>

            <a
              href="/signin"
              className="flex items-center bg-white/10 backdrop-blur-md text-white font-serif text-lg py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              Sign in
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar