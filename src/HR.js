import { collection, query, where, getDocs } from "firebase/firestore";
import firebase from "./firebaseConfig.js";
import { useState, useEffect } from "react";

const HR = () => {
    const [subs, setSubs] = useState([]);
    const [filt, setFilt] = useState("");
    const [choice, setChoice] = useState("");
    const fetchPost = async () => {
        setSubs([]);
        const querySnapshot = await getDocs(collection(firebase.db, "submissions"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setSubs((subs) => [...subs, doc.data()]);
        }); 
       
    }
    const handleChoice = async(option) => {
        setChoice(option);
    }

    const handleChange = async(filter) => {
        console.log(choice + " " + filter);
        setFilt(filter);
    }

    const search = async() => {
        if(choice) {
            setSubs([]);
            const q = query(collection(firebase.db, "submissions"), where(choice, "==", filt));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setSubs((subs) => [...subs, doc.data()]);
            });
        }
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])

    return (
        <div className="App-header">
          <h1>HR Page</h1>
          <label htmlFor="location"> 
             Choice of parameter
            <input 
                type="text" 
                id="choice" 
                value={choice} 
                placeholder="Choice"
                onChange={(e) => handleChoice(e.target.value)}
                />
			
          </label>
          <label htmlFor="location"> 
             Filter
            <input 
                type="text" 
                id="filt" 
                value={filt} 
                placeholder="Filter"
                onChange={(e) => handleChange(e.target.value)}
                />
			
          </label>
          <button onClick={search}>Search</button>
          <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Department</th>
                <th>Employment Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>URL</th>
                </tr>
            </thead>
            <tbody>
                {
                    subs?.map((sub,i)=>(
                        <tr key={i}>
                            <td>{sub.id}</td><td>{sub.dept}</td><td>{sub.es}</td><td>{sub.name}</td>
                            <td>{sub.email}</td><td>{sub.url}</td>
                        </tr>
                    ))
                }
            </tbody>
          </table>
        </div>
      );
}
export default HR;