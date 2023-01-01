import {useState} from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firebaseConfig.js"
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
import { collection, 
    addDoc 
} from "firebase/firestore";

export default function Form(){
    const [name, setName] = useState("");
    const [id, setID] = useState("");
    const [dept, setDept] = useState("");
    const [es, setES] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState();
    const [percent, setPercent] = useState(0);
    const [url, setUrl] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
    const handleUploadClick = () => {
        if(!name || !id || !dept || !es || !email) {
            alert('Please fill in all the fields');
            return;
        }
        if (!file) {
          alert('Please Upload a File')
          return;
        }
    
        const storageRef = ref(firebase.storage, `/files/${file.name}`);
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
                      
                      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        setUrl(url);
                        addSubmission();
                    });
                  }
                ); 
      };

    const addSubmission = async() => {
        
        try {
            const docRef = await addDoc(collection(firebase.db, "submissions"), {
              name: name,
              id: id,
              dept: dept,
              es: es,
              email: email,
              url: url
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="App-header">
            
                <h1>Submission Form</h1>
            
                <p>
                    Name: 
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        placeholder="Name"
                        onChange={(e)=>setName(e.target.value)}
                        />
                        
                </p> 
                <p> 
                    ID: 
                    <input 
                        type="text" 
                        id="ID" 
                        value={id} 
                        placeholder="ID"
                        onChange={(e)=>setID(e.target.value)}
                        />
                        
                </p>
                <p> 
                    Department: 
                        <input 
                            type="text" 
                            id="Department" 
                            value={dept} 
                            placeholder="Department"
                            onChange={(e)=>setDept(e.target.value)}
                        />
                    </p>
                <p> 
                    Employment Status: 
                    <input 
                        type="text" 
                        id="Employment status" 
                        value={es} 
                        placeholder="Employment status"
                        onChange={(e)=>setES(e.target.value)}
                    /> 
                </p>
                <p> 
                    Email: 
                    <input 
                        type="text" 
                        id="Email" 
                        value={email} 
                        placeholder="Email"
                        onChange={(e)=>setEmail(e.target.value)}
                    /> 
                </p>
                <input type="file" onChange={handleFileChange} />

                <div>{file && `${file.name} - ${file.type}`}</div>

                <button onClick={handleUploadClick}>Upload</button>
                <p>{percent} "% done"</p>
                <br></br>
                <Link to="/hr">Human Resources</Link>
        </div>
    );
}
 