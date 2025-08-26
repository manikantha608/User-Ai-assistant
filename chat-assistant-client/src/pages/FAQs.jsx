import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const { faqs, token } = useAppContext()


  const handleSubmit = async (e) => {
    e.preventDefault();

    const question = e.target.question.value;
    const answer = e.target.answer.value;

    try {
      const { data } = await axios.post(
        '/api/admin/faq',
        { question, answer }, // data goes here
        { headers: { Authorization: `Bearer ${token}` } } // config goes here
      );

      if (data.success) {
        toast.success("FAQ Created successfully..!");
        e.target.question.value = "";
        e.target.answer.value = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 px-4 md:px-10 py-8">
      {/* Left Side - Form */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold mb-4">Create FAQ</h1>

        <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[400px] p-6 text-left text-sm rounded-lg border border-gray-300/60 shadow-sm">
          <label className="font-medium" htmlFor="question">
            Question
          </label>
          <input
            id="question"
            className="w-full border mt-1.5 mb-4 border-gray-500/30 outline-none rounded py-2.5 px-3"
            type="text"
            placeholder="Enter title"
            required
          />
          <label className="font-medium" htmlFor="content">
            Answer
          </label>
          <textarea
            rows="3"
            id="answer"
            className="w-full resize-none border mt-1.5 border-gray-500/30 outline-none rounded py-2.5 px-3"
            placeholder="Enter content"
            required
          ></textarea>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="my-3 bg-indigo-500 py-2 px-5 rounded text-white font-medium hover:bg-indigo-600 transition"
            >
              Post
            </button>
            <div className="space-x-2 flex items-center">
              {/* Example buttons/icons */}
              <button type="button" aria-label="add">
                ➕
              </button>
              <button type="button" aria-label="addPicture">
                🖼️
              </button>
              <button type="button" aria-label="notes">
                📝
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Right Side - FAQ List */}
      <div className="flex-1">
        <div className="flex flex-col items-center text-center text-slate-800">
          <h1 className="text-2xl md:text-3xl font-semibold mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-4 max-w-sm">
            Proactively answering FAQs boosts user confidence and cuts down on
            support tickets.
          </p>

          <div className="w-full mt-6 flex flex-col gap-4 items-start text-left">
            {faqs.map((faq, index) => (
              <div key={index} className="flex flex-col items-start w-full">
                <div
                  className="flex items-center justify-between w-full cursor-pointer bg-slate-50 border border-slate-200 p-4 rounded"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h2 className="text-sm font-medium">{faq.question}</h2>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${openIndex === index ? "rotate-180" : ""
                      } transition-all duration-500 ease-in-out`}
                  >
                    <path
                      d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                      stroke="#1D293D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Scrollable Answer */}
                <div
                  className={`px-4 transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index
                      ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                      : "opacity-0 max-h-0 -translate-y-2"
                    }`}
                >
                  <p className="text-sm text-slate-500 overflow-y-auto max-h-[200px] pr-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
