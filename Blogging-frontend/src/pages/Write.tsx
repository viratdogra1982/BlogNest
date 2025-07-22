import { CreatePostType } from '@mohit-kumar/common-zod-all';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
const url=import.meta.env.VITE_BACKEND_URL

const Write = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<CreatePostType>({
    title: '',
    content: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      await axios.post(`${url}/api/v1/blog`, {
        ...postInputs,
      }, {
        headers: {
          'Authorization': token
        }
      });
      setTimeout(() => {
        setLoading(false);
        navigate("/blogs");
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10 py-16 px-4">
      {loading ? (
        <Loader />
      ) : (
        <form
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-2xl flex flex-col gap-8 border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-sm font-medium mb-6 border border-white/20 shadow-xl">
              <svg className="w-4 h-4 mr-2 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              SHARE YOUR THOUGHTS
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="text-white">Create a New Blog</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-2 mb-6"></div>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-serif leading-relaxed">
              Express your ideas and share your knowledge with the world
            </p>
          </div>

          <div>
            <label className="block text-lg font-medium text-white font-serif mb-3">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter a captivating title"
              value={postInputs.title}
              className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-lg focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-white transition-all duration-200 placeholder-indigo-200"
              onChange={(e) => setPostInputs({ ...postInputs, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white font-serif mb-3">Content</label>
            <textarea
              name="content"
              rows={10}
              placeholder="Share your thoughts, ideas, and stories..."
              value={postInputs.content}
              className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-lg focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-white transition-all duration-200 placeholder-indigo-200"
              onChange={(e) => setPostInputs({ ...postInputs, content: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 px-6 font-bold rounded-xl text-indigo-900 bg-white hover:bg-indigo-50 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:-translate-y-1 mt-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Publish Blog
          </button>

          <div className="flex justify-center mt-2">
            <a href="/blogs" className="text-indigo-200 hover:text-white transition-colors duration-200 flex items-center font-serif">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blogs
            </a>
          </div>
        </form>
      )}
      </div>
    </div>
  );
};

export default Write;

