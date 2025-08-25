import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";


export default function Documents() {
  
  const {documents} = useAppContext()

  // console.log("mdsjndsj",documents)
  
  const [openIndex, setOpenIndex] = useState(null);

  // const faqsData = [
  //   {
  //     question: "File 1.pdf",
  //     answer: "This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed.This document was uploaded successfully and processed."
  //   },
  //   {
  //     question: "Invoice_2023.xlsx",
  //     answer:
  //       "Excel file uploaded on 24th Aug 2025. Contains billing information."
  //   },
  //   {
  //     question: "Contract.docx",
  //     answer:
  //       "Word document with company contract details. Uploaded on 20th Aug."
  //   }
  // ];

  return (
    <div className="flex flex-col justify-between md:flex-row gap-6 p-4">
      {/* Upload Box */}
      <div className="w-full md:w-1/2 max-w-md mx-auto md:mx-0 p-6 bg-white rounded-lg border border-gray-500/30 shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">
        <div className="flex items-center justify-center w-11 h-11 bg-gray-500/10 rounded-full">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.124 11.083h4.75m5.541 3.959a1.584 1.584 0 0 1-1.583 1.583H3.165a1.583 1.583 0 0 1-1.583-1.583V3.958a1.583 1.583 0 0 1 1.583-1.583h3.959L8.707 4.75h7.125a1.583 1.583 0 0 1 1.583 1.583z"
              stroke="#2563EB"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl text-gray-800 font-medium mt-3">Upload a file</h2>
        <p className="text-gray-500/80 mt-1">Attach the file below</p>

        {/* Upload input */}
        <label
          htmlFor="fileInput"
          className="border-2 border-dotted border-gray-400 p-8 mt-6 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition"
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-gray-500">Drag files here to upload</p>
          <p className="text-gray-400">
            Or <span className="text-blue-500 underline">click here</span> to
            select a file
          </p>
          <input id="fileInput" type="file" className="hidden" />
        </label>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-9 py-2 border border-gray-500/50 bg-white hover:bg-blue-100/30 active:scale-95 transition-all text-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded"
          >
            Upload File
          </button>
        </div>
      </div>

      {/* Uploaded Documents Results */}
      <div className="w-full md:w-1/2 flex flex-col items-center text-center text-slate-800 px-3">
        <h1 className="text-3xl md:text-4xl font-semibold mt-2">
          Uploaded Documents Results
        </h1>
        <p className="text-sm text-slate-500 mt-4 max-w-sm">
          Track uploaded files, check status, and view details.
        </p>

        <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
          {documents.map((doc, index) => (
            <div key={index} className="flex flex-col items-start w-full">
              <div
                className="flex items-center justify-between w-full cursor-pointer bg-slate-50 border border-slate-200 p-4 rounded"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <h2 className="text-sm font-medium">{doc.title}</h2>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    openIndex === index ? "rotate-180" : ""
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

              <div
                className={`px-4 transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                <p className="text-sm text-slate-500 overflow-y-auto max-h-[200px] pr-2">
                  {doc.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
