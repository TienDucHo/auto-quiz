import { useState, useEffect, useRef } from "react";
import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import { FaUpload } from "react-icons/fa6";
import { LuFile } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";
import { db } from "../../auth/Config";
import { addDoc, collection } from "firebase/firestore";
import { IoClose } from "react-icons/io5";

// Firebase
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth();

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Create() {
  const [file, setFile] = useState(null);
  const [pdfContent, setPdfContent] = useState("");
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const fileInputRef = useRef();
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (duration) => {
      return {
        pathLength: 1.5,
        opacity: 1,
        transition: {
          pathLength: {
            type: "spring",
            duration: duration,
            bounce: 0,
          },
          opacity: { duration: 0.01 },
        },
      };
    },
  };

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [user, loading, navigate]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getPDFText = (files) => {
    if (files.length > 0) {
      let file = files[0];
      if (file.type === "application/pdf") {
        setFile(file);
        let fileReader = new FileReader();

        fileReader.onload = function () {
          let typedarray = new Uint8Array(this.result);
          const loadingTask = pdfjs.getDocument(typedarray);
          loadingTask.promise.then((pdf) => {
            let maxPages = pdf._pdfInfo.numPages;
            let countPromises = []; // collecting all page promises
            for (let j = 1; j <= maxPages; j++) {
              let page = pdf.getPage(j);
              countPromises.push(
                page.then(function (page) {
                  // add page promise
                  let textContent = page.getTextContent();
                  return textContent.then(function (text) {
                    // return content promise
                    return text.items
                      .map(function (s) {
                        return s.str;
                      })
                      .join(""); // value page text
                  });
                })
              );
            }
            // Wait for all pages and join text
            return Promise.all(countPromises).then(function (texts) {
              setPdfContent(texts.join(""));
            });
          });
        };
        fileReader.readAsArrayBuffer(file);
      } else {
        alert("Please drop only PDF files.");
      }
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    getPDFText(files);
  };
  const handleUpload = async () => {
    if (pdfContent.length > 0) {
      try {
        let collectionRef = collection(
          db,
          "users",
          user.uid,
          "quizSets"
        ); // Use collection instead of doc
        await addDoc(collectionRef, {
          // Use addDoc instead of setDoc
          textContent: pdfContent,
          name: quizName,
        });
        navigate("/dashboard");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPdfContent("");
    navigate("/dashboard");
  };

  const handleDelete = () => {
    setFile(null);
    setPdfContent("");
  };

  return loading ? (
    <div className="bg-black min-h-[100dvh] flex flex-col justify-center items-center">
      <motion.svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.circle
          cx="50%"
          cy="50%"
          r="6"
          stroke="#CBD8DF"
          fill="#141E26"
          strokeWidth={2}
          variants={draw}
          custom={2}
        />
      </motion.svg>
    </div>
  ) : (
    <div className="py-4 px-12 min-h-[100dvh] bg-black text-white flex flex-col gap-12">
      <NavBar />

      <div className=" w-full flex flex-col flex-1 items-center justify-center gap-8">
        <input
          placeholder="Quiz name"
          type="text"
          maxLength={20}
          className="selection-secondary text-secondary outline-none border-secondary bg-black h-10 w-1/2 border-opacity-70 border-2 border-dashed rounded-2xl px-6 py-2"
          value={quizName}
          onChange={(e) => {
            setQuizName(e.target.value);
          }}
        />
        {!file ? (
          <div
            className="w-1/2 rounded-lg border-2 border-secondary border-dashed border-opacity-70 h-64 flex flex-col items-center justify-center hover:cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <LuFile className="text-6xl text-secondary mb-8 cursor-pointer" />
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={() => {
                if (fileInputRef.current !== null) {
                  getPDFText(fileInputRef.current.files);
                }
              }}
            />

            <h1 className=" text-secondary text-xl">Drag & drop </h1>
            <h1>PDF with max size of 1G only </h1>
          </div>
        ) : (
          <div className="w-1/2 rounded-lg border-2 border-dashed border-opacity-70 border-secondary h-64 flex flex-col items-center justify-center">
            <LuFile className="text-6xl text-secondary mb-8" />
            <div className="flex gap-1 justify-center items-center">
              <h1 className=" text-secondary text-xl center">
                {file.name}
              </h1>
              <IoClose
                onClick={handleDelete}
                className="text-secondary text-2xl hover:cursor-pointer w-8 h-8"
              />
            </div>
          </div>
        )}
        <div className=" w-1/2 flex flex-col gap-4 items-center">
          <Button
            className={"w-full"}
            icon={<FaUpload />}
            text={"Upload"}
            onClick={handleUpload}
          />
          <Button
            className={"w-full"}
            text={"Cancel"}
            style={"primary"}
            onClick={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
