import { useState, useEffect, useRef } from 'react'
import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import { LuFile } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import filePic from "../../assets/lucide_file.svg";
import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";
import { db } from '../../auth/Config';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import QuestionPage from '../../components/QuestionPage';


import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

// icons
import { FaClock, FaClipboardQuestion, FaChevronLeft, FaChevronRight} from "react-icons/fa6";


import { useLoaderData } from "react-router";

// Firebase
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();


function Carousel() {
    return <div className='flex items-center'>
        <FaChevronLeft onClick={"handleGoBackward"} className="text-8xl"/>
        <QuestionCard />
        <FaChevronRight onClick={"handleGoForward"}className="text-8xl "/>
    </div>
}

export default function QuizViewPage() {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);


    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate])

    
    return (
        <div className="py-4 px-12 min-h-[100dvh] bg-black text-white flex flex-col gap-12">
            <NavBar />
            <div className="flex justify-between items-center flex-1">
               {/* Quiz Info */}
                <div className='flex flex-col gap-4 w-1/3 '>
                    <h1 className='text-8xl font-bold text-secondary'>French</h1>
                    <div className='flex flex-col'>
                        <div className='flex justify-start items-center gap-8 text-lg'><FaClock/> <span>1 hour 5 minutes</span></div>
                        <div className='flex justify-start items-center gap-8 text-lg'><FaClipboardQuestion/> <span>1/25</span></div>
                    </div>
                    <div className="w-full flex flex-row gap">
                        <Button className="w-full border" text="Save" style={"transparent"} onClick={"handleSave"}></Button>
                        <Button className="w-full" text="Submit" onClick={'handleSubmit'}></Button>
                    </div>
                </div>
               {/* Quiz Question Carousel */}
            
            </div>
        </div>
    )
}
