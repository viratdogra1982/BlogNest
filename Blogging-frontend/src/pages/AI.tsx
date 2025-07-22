import { useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY; 

const AIChatBox = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult("Thinking...");

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct", // free model
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResult(response.data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setResult("Error: Could not fetch response.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10 py-16 px-4">
        <form
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-2xl flex flex-col gap-8 border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-sm font-medium mb-6 border border-white/20 shadow-xl">
              🤖 AI Assistant
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
              Ask Anything
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-2 mb-6"></div>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-serif leading-relaxed">
              Get instant answers powered by free AI model
            </p>
          </div>

          <div>
            <label className="block text-lg font-medium text-white font-serif mb-3">Your Question</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-lg focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-white transition-all duration-200 placeholder-indigo-200"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-lg font-medium text-white font-serif mb-3">AI Response</label>
            <div className="relative">
              <textarea
                rows={10}
                value={loading ? "Thinking..." : result}
                readOnly
                placeholder="AI will respond here..."
                className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-lg focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-white transition-all duration-200 placeholder-indigo-200 pr-16"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-purple-200"
                title={isCopied ? "Copied!" : "Copy content"}
              >
                {isCopied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 font-bold rounded-xl text-indigo-900 bg-white hover:bg-indigo-50 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center transform hover:-translate-y-1 mt-4"
          >
            Ask AI
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
      </div>
    </div>
  );
};

export default AIChatBox;

