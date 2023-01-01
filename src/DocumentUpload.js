import { useState } from 'react';
import storage from "./firebaseConfig.js"
import {
      ref,
      uploadBytesResumable,
      getDownloadURL 
  } from "firebase/storage";

function DocumentUpload() {
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      alert('Please Upload a File')
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
      
              // update progress
                  setPercent(percent);
              },
              (err) => console.log("Error: " + err),
              () => {
                  // download url
                  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
              }
            ); 
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
      <p>{percent} "% done"</p>
    </div>
  );
}

export default DocumentUpload;