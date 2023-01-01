import { collection, getDocs } from "firebase/firestore";
import firebase from "./firebaseConfig.js";
import { useState, useEffect } from "react";

const HR = () => {
    const [subs, setSubs] = useState([]);
    //const [docIDs, setDocIDs] = useState([]);
    const fetchPost = async () => {
       
        const querySnapshot = await getDocs(collection(firebase.db, "submissions"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setSubs((subs) => [...subs, doc.data()]);
        }); 
       
    }
   
    useEffect(()=>{
        console.log('i fire once');
        fetchPost();
    }, [])

    return (
        <div>
          <h1>HR Page</h1>
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