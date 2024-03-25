import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OcrComponent = () => {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [inputText, setInputText] = useState("");
  const [matching, setMatching] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOcrConversion = () => {
    if (file) {
      Tesseract.recognize(
        file,
        "eng", // Language code (e.g., 'eng' for English)
        { logger: (info) => console.log(info) } // Optional logger
      ).then(({ data: { text } }) => {
        setOcrText(text);
        checkMatching(text);
      });
    } else {
      alert("Please select a file first!");
    }
  };

  const checkMatching = (ocrText) => {
    if (ocrText.includes(inputText)) {
      setMatching(true);
    } else {
      setMatching(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <label>
       <b>  Input Text:  </b>
        <input type="text" value={inputText} onChange={handleInputChange} />
      </label>

      <button onClick={handleOcrConversion} style={{marginLeft:30}} >SUBMIT</button>
      {ocrText && (
        <div>
          <h3>OCR Text:</h3>
          <p>{ocrText}</p>
          <h3>Matching Result: </h3>
        </div>
      )}

      {matching !== null && (
  
        <div style={{ color: matching ? "green" : "red" }}>
          {matching ? "MATCHING DATA" : "Not Match Data"}
        </div>
      )}
    </div>
  );
};

export default OcrComponent;
