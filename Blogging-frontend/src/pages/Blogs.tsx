import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
const url=import.meta.env.VITE_BACKEND_URL

interface Blog {
  id: number;
  author: {
    name: string;
  };
  title: string;
  content: string;
  createdAt: string;
  authorId:number
}

const THEMES = {
  light: {
    bg: "bg-gradient-to-b from-indigo-50 via-slate-50 to-slate-100",
    card: "bg-white",
    text: "text-indigo-900",
    nav: "bg-gradient-to-r from-indigo-950 to-purple-900",
    navText: "text-slate-100",
    select: "bg-white text-indigo-900 border-indigo-200"
  },
  dark: {
    bg: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
    card: "bg-gray-800",
    text: "text-gray-100",
    nav: "bg-gradient-to-r from-gray-900 to-gray-800",
    navText: "text-gray-100",
    select: "bg-gray-700 text-gray-100 border-gray-600"
  },
  custom: {
    bg: "bg-gradient-to-b from-yellow-50 via-pink-50 to-pink-100",
    card: "bg-pink-50",
    text: "text-pink-900",
    nav: "bg-gradient-to-r from-pink-400 to-yellow-300",
    navText: "text-pink-900",
    select: "bg-pink-100 text-pink-900 border-pink-300"
  }
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
  const name = localStorage.getItem("name");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/all-blog`, {
          headers: {
            'Authorization': token,
          },
        });
        const sortedBlogs = response.data.sort((a: Blog, b: Blog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [token]);

  // Save theme to localStorage and update on change
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeObj = THEMES[theme as keyof typeof THEMES];

  return (
    <div className={`${themeObj.bg} min-h-screen transition-colors duration-300`}>
      <nav className={`${themeObj.nav} py-4 shadow-xl sticky top-0 z-10 border-b border-white/10`}>
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-serif ${themeObj.navText}`}>
            <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-200 text-transparent bg-clip-text animate-gradient-text">BlogNest</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {/* Theme Switcher - visually attractive */}
            <div className="flex items-center">
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className={`rounded-xl px-2 sm:px-3 py-2 border focus:outline-none shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-sm sm:text-base ${themeObj.select}`}
                aria-label="Select theme"
                style={{
                  fontWeight: 600,
                  minWidth: 100,
                  boxShadow: theme === "dark" ? "0 0 0 2px #222" : undefined
                }}
              >
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="custom">🎨 Custom</option>
              </select>
            </div>
            
            <a
              href="/write"
              className={`font-serif text-sm sm:text-base lg:text-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-purple-600 hover:to-indigo-700 border border-indigo-700/30"
                  : theme === "custom"
                  ? "bg-gradient-to-r from-pink-400 to-rose-300 text-white hover:from-pink-300 hover:to-rose-200 border border-pink-300/30"
                  : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-500 hover:to-purple-600 border border-white/10"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Create Blog</span>
              <span className="sm:hidden">Create</span>
            </a>

            <a
              href="/ai"
              className={`font-serif text-sm sm:text-base lg:text-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-purple-600 hover:to-indigo-700 border border-indigo-700/30"
                  : theme === "custom"
                  ? "bg-gradient-to-r from-pink-400 to-rose-300 text-white hover:from-pink-300 hover:to-rose-200 border border-pink-300/30"
                  : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-500 hover:to-purple-600 border border-white/10"
              }`}
            >
              <span className="hidden sm:inline">🤖 AI Assistant</span>
              <span className="sm:hidden">🤖 AI</span>
            </a>

            <button
              onClick={() => {
                // Clear authentication data
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('id');

                // Dispatch auth change event
                window.dispatchEvent(new Event('auth-change'));

                // Navigate to home page
                window.location.href = '/';
              }}
              className={`font-serif text-sm sm:text-base lg:text-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 border border-red-500/30"
                  : theme === "custom"
                  ? "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-300 hover:to-red-400 border border-red-300/30"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 border border-red-400/30"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </button>
            
            <div className={`relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 overflow-hidden rounded-xl shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-500/30"
                : theme === "custom"
                ? "bg-gradient-to-br from-pink-300 to-pink-400 border border-pink-200/30"
                : "bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20"
            }`}>
              <span className={`font-bold text-sm sm:text-base lg:text-xl font-serif ${
                theme === "dark" ? "text-gray-100" : "text-white"
              }`}>{name?.slice(0, 1).toUpperCase()}</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Switcher */}
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className={`rounded-lg px-2 py-1 border focus:outline-none shadow-md text-xs ${themeObj.select}`}
              aria-label="Select theme"
              style={{
                fontWeight: 600,
                minWidth: 80
              }}
            >
              <option value="light">🌞</option>
              <option value="dark">🌙</option>
              <option value="custom">🎨</option>
            </select>

            {/* Mobile User Avatar */}
            <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-lg shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-500/30"
                : theme === "custom"
                ? "bg-gradient-to-br from-pink-300 to-pink-400 border border-pink-200/30"
                : "bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20"
            }`}>
              <span className={`font-bold text-sm font-serif ${
                theme === "dark" ? "text-gray-100" : "text-white"
              }`}>{name?.slice(0, 1).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 ${themeObj.text}`}>
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-100/90 text-indigo-900 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-sm">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="hidden sm:inline">YOUR PERSONAL SPACE</span>
            <span className="sm:hidden">PERSONAL SPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-indigo-950 to-purple-900 text-transparent bg-clip-text animate-gradient-text">Your Creative Feed</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-2 mb-4 sm:mb-6"></div>
          <p className="text-indigo-900 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-serif leading-relaxed">
            Discover and manage your collection of thoughtful blog posts in one beautiful space
          </p>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden flex flex-wrap gap-3 mb-8 justify-center">
          <a
            href="/write"
            className={`font-serif text-sm px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-purple-600 hover:to-indigo-700 border border-indigo-700/30"
                : theme === "custom"
                ? "bg-gradient-to-r from-pink-400 to-rose-300 text-white hover:from-pink-300 hover:to-rose-200 border border-pink-300/30"
                : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-500 hover:to-purple-600 border border-white/10"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Create
          </a>

          <a
            href="/ai"
            className={`font-serif text-sm px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-purple-600 hover:to-indigo-700 border border-indigo-700/30"
                : theme === "custom"
                ? "bg-gradient-to-r from-pink-400 to-rose-300 text-white hover:from-pink-300 hover:to-rose-200 border border-pink-300/30"
                : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-500 hover:to-purple-600 border border-white/10"
            }`}
          >
            🤖 AI
          </a>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('name');
              localStorage.removeItem('id');
              window.dispatchEvent(new Event('auth-change'));
              window.location.href = '/';
            }}
            className={`font-serif text-sm px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1 ${
              theme === "dark"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 border border-red-500/30"
                : theme === "custom"
                ? "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-300 hover:to-red-400 border border-red-300/30"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 border border-red-400/30"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className={`${themeObj.card} text-center py-8 sm:py-12 lg:py-16 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 max-w-2xl mx-auto border border-indigo-100 hover-shine`}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg border border-indigo-200 transform transition-all duration-500 hover:rotate-3 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-indigo-950 mb-3 sm:mb-4">Your Feed is Empty</h2>
            <p className="text-base sm:text-lg lg:text-xl font-serif text-indigo-800 mb-6 sm:mb-8 lg:mb-10 max-w-lg mx-auto">Start your writing journey by creating your first blog post and share your unique perspective with the world!</p>
            <a href="/write" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-serif py-3 sm:py-4 px-6 sm:px-8 lg:px-10 rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-base sm:text-lg font-bold">
              Create Your First Blog
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                author={blog.author.name}
                authorId={blog.authorId}
                title={blog.title}
                content={blog.content}
                date={blog.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;

