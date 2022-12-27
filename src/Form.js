import {useState} from 'react';


export default function Form(){
    const [name, setName] = useState("");
    return (
        <div>
            <form>
                <label htmlFor="name"> 
                Name: 
                <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        placeholder="Name"
                        onChange={(e)=>setName(e.target.value)}
                        />
                        
                </label>
            </form>
        </div>
    );
}
 