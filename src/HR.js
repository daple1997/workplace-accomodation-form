import { collection, getDocs } from "firebase/firestore";
import firebase from "./firebaseConfig.js";
import { useState, useEffect } from "react";

const HR = () => {
    const [subs, setSubs] = useState([]);
    const [docIDs, setDocIDs] = useState([]);
    const fetchPost = async () => {
       
        const querySnapshot = await getDocs(collection(firebase.db, "submissions"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            
            
            if(!docIDs.includes(doc.id)) {  
                //console.log(doc.id, " => ", doc.data());
                setDocIDs((ids) => [...ids, doc.id]);
                setSubs((subs) => [...subs, doc.data()
                    // {   
                    //     id: doc.data().id, dept: doc.data().dept, es: doc.data().es, name: doc.data().name, email: doc.data().email, url: doc.data().url
                    // }
                ]);
            }
        });
        docIDs.forEach((doc) => {
            console.log(doc);
        });   
       
    }
   
    useEffect(()=>{
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