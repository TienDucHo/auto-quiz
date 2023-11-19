import {useState} from 'react'
import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import { FaUpload } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import filePic from "../../assets/lucide_file.svg";
import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export default function Create() {
    const [file, setFile] = useState(null);
    const [pdfContent, setPdfContent] = useState('');
    const navigate = useNavigate();

    const handleDragOver = (event) =>{
        event.preventDefault();
    };
    
    const handleDrop = async (event) =>{
        event.preventDefault();
        let files = event.dataTransfer.files;
        if(files.length > 0){
            let file = files[0];
            if(file.type === "application/pdf"){
                setFile(file);
                let fileReader = new FileReader();
                
                fileReader.onload = function() {
                    let typedarray = new Uint8Array(this.result);
                    const loadingTask = pdfjs.getDocument(typedarray);
                    loadingTask.promise.then(pdf => {
                        let maxPages = pdf._pdfInfo.numPages;
                        let countPromises = []; // collecting all page promises
                        for (let j = 1; j <= maxPages; j++) {
                            let page = pdf.getPage(j);
                            countPromises.push(page.then(function(page) { // add page promise
                                let textContent = page.getTextContent();
                                return textContent.then(function(text){ // return content promise
                                    return text.items.map(function (s) { return s.str; }).join(''); // value page text 
                                });
                            }));
                        }
                        // Wait for all pages and join text
                        return Promise.all(countPromises).then(function (texts) {
                            setPdfContent(texts.join(''));
                        });
                    });         
                };
                fileReader.readAsArrayBuffer(file);

            } else {
                alert("Please drop only PDF files.");
            }
        }
    };
    const handleUpload = async () => {
        // Handle file upload here
        // const formData = new FormData();
        // formData.append('pdf', file);
        // try {
        //     const response = await axios.post('/uploadPDF', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     console.log(response.data);
        // } catch (error) {
        //     console.error(error);
        // }
    };
    const handleCancel = () => {
        setFile(null);
        setPdfContent('');
        navigate("/dashboard");
        
    };
    const handleLogout = () => {
        // Handle logout here
    };
    return (
        <>
            <div className ="py-4 px-12 min-h-[100dvh] bg-black text-white flex flex-col gap-12">
                <NavBar />
                <div className = "flex flex-col flex-1 items-center justify-center gap-4">
                    {!file ? <div className="border-2 border-dashed border-white w-64 h-64 flex flex-col items-center justify-center"
                            onDragOver={handleDragOver}
                            onDrop  ={handleDrop}>
                            <img src={filePic} alt="File Icon" />
                            <h1>Drag & drop </h1>
                            <h1>PDF with max size of 1G only </h1>
                        </div> : <div className = "flex flex-col items-center justify-center">
                        <div className="border-2 border-dashed border-white w-64 h-64 flex flex-col items-center justify-center">
                            <img src={filePic} alt="File Icon" />
                            <h1>{file.name}</h1>
                        </div>
                    </div>}
                    <div className=" w-64 flex flex-col gap-4 items-center">
                        <Button className={"w-full"} icon={<FaUpload/>} text={"Upload"}/>
                        <Button className={"w-full"} text={"Cancel"} style={"primary"} onClick={handleCancel}/>
                    </div>
                </div>                
            </div>
        </>
    )
}
