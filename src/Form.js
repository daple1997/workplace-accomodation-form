import {useState} from 'react';


export default function Form(){
    const [name, setName] = useState("");
    const [id, setID] = useState("");
    const [dept, setDept] = useState("");
    const [es, setES] = useState("");
    const [email, setEmail] = useState("");
    return (
        <div>
            <form>
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
            </form>
        </div>
    );
}
 