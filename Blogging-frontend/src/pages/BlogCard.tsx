import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const url=import.meta.env.VITE_BACKEND_URL



interface BlogCardProps {
  id: number;
  author: string;
  title: string;
  content: string;
  date:string;
  authorId:number;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, author, title,  date, content, authorId }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [more,setMore] = useState(true);
  const navigate=useNavigate()
  const token = localStorage.getItem('token');
  const userId=localStorage.getItem("id")

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setIsDeleted(true);
      alert("Want to delete this blog?")
    } catch (error) {
      console.error('Error deleting the blog:', error);
    }
  };

  if (isDeleted) {
    return null;
  }



  const handleUpdate = () => {
    navigate(`/update/${id}`);
  }



  const handleMore =()=>{
    setMore(!more)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] hover-shine">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
                <span className="font-medium font-serif text-xl text-white">{author[0].toUpperCase()}</span>
              </div>
              <div>
                <span className="font-serif font-bold text-indigo-950 text-xl block">{author.toUpperCase()}</span>
                <span className="text-indigo-500 text-sm font-serif">{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {authorId === Number(userId) && (
                <>
                  <button
                    onClick={handleUpdate}
                    className="p-3 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-indigo-200"
                    title="Edit blog"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-red-200"
                    title="Delete blog"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={handleCopy}
                className="p-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-purple-200"
                title={isCopied ? "Copied!" : "Copy content"}
              >
                {isCopied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="border-l-4 border-gradient-to-b from-indigo-600 to-purple-600 pl-6 mb-8">
            <h2 className="text-3xl font-bold font-serif text-indigo-950 mb-3 leading-tight">{title}</h2>
          </div>

          <div className="prose prose-indigo max-w-none">
            <p className="text-indigo-800 font-serif text-lg leading-relaxed mb-8">
              {more ? (content.slice(0, 300) + '...') : content}
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-10 pt-6 border-t border-indigo-100">
            <div className="flex items-center text-indigo-700 bg-indigo-50 px-5 py-2.5 rounded-xl shadow-sm border border-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-serif font-medium">{Math.ceil(content.length / 200)} min read</span>
            </div>

            <button
              onClick={handleMore}
              className="py-3 px-8 rounded-xl font-serif text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-base flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold border border-white/10"
            >
              {more ? (
                <>
                  <span>Show More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Show Less</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

