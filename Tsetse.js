import React, { useState } from 'react';
import axios from 'axios'
function Tsetse(){
    const [file, setFile] = useState (null);
    const [classificationResults, setClassificationResults] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };
const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      const fileId = response.data.fileId;

      console.log('File ID:', fileId);

      const results = response.data.classificationResults;
      setClassificationResults(results); 
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  };
  return (
    <div className="Tse">
      <h1>Trypanosoma classification</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload and Classify</button>

      {classificationResults.length > 0 && (
        <div className="results">
          <h2>Classification Results</h2>
          <table>
            <thead>
              <tr>
                <th>Sample ID</th>
                <th>Predicted Species</th>
              </tr>
            </thead>
            <tbody>
              {classificationResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.sampleId}</td>
                  <td>{result.predictedSpecies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default Tsetse;