
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [title , setTitle] = useState("");
  const [file , setFile] = useState("")
  const [allImage , setAllImage] = useState(null)

  useEffect(()=> {
    getPdf()
  } , [])

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files")
    setAllImage(result.data.data)
  }

  const submitImage= async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title" , title);
    formData.append("file" , file)
    console.log("formData" , formData)
    const result = await axios.post("http://localhost:5000/upload-files" , formData , {
      headers: {"Content-Type": "multipart/form-data"}
    })
    console.log("result" , result)
    if (result.data.status === "ok") {
      alert("Upload succesfully") 
      getPdf()
    }
  }

  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    // setPdfFile(`http://localhost:5000/files/${pdf}`)
  };

  return (
    <div className="App">
      <form className='formStyle' onSubmit={submitImage}>
      <h4> Upload pdf</h4><br/>
      <input type = "text" className='form-control' placeholder='title' onChange={(e) => setTitle(e.target.value)} required/> 
      <br/>
      <input type = "file" className='form-control' accept='application/pdf' onChange={(e) => setFile(e.target.files[0])} required/> 
      <br/>
      <button className='btn btn-primary' type="submit">
        Submit
      </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      {/* <PdfComp pdfFile={pdfFile}/> */}
    </div>
    // </div>
  );
}

export default App;
