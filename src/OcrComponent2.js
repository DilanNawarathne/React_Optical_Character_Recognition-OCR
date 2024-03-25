import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OcrComponent2 = () => {
  const [companyRegNo, setCompanyRegNo] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Reset error when a new file is selected
    setError(null);
  };

  const handleCompanyRegNoChange = (event) => {
    setCompanyRegNo(event.target.value);
  };

  const handleOCR = async () => {
    if (file) {
      const { data: { text } } = await Tesseract.recognize(file);

      // Check if the OCR result includes the Company Reg. No.
      if (!text.includes(companyRegNo)) {
        setError("Company Reg. No. not found in the uploaded file.");
      } else {
        setError(null);
      }
    } else {
      setError("Please upload a file.");
    }
  };

  const handleSubmit = () => {
    // Perform OCR before submitting if a file is selected
    handleOCR();

    // Your additional submit logic goes here
  };

  return (
    <div>
      {/* Company Reg. No. input */}
      <input
        type="text"
        value={companyRegNo}
        onChange={handleCompanyRegNoChange}
      />

      {/* Upload BR section */}
      <input type="file" onChange={handleFileChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Submit button */}
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
};

export default OcrComponent2;
