import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const farmcentral = { email, fullname, password}

        setIsPending(true);

        fetch('http://localhost:8000/farmcentrals', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(farmcentral)
        }).then(() => {
            console.log('NEW FARMER ADDED');
            setIsPending(false);
            //history.go(-1)
            history.push('/');
        })  
    }




    return (  
        <div className="create">
            <h2>ADD A NEW FARMER</h2>
            <form onSubmit={handleSubmit}>
            <label>FARMER EMAIL:</label>
          <input 
          type="text" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          >
          </input>
          <label>FARMER FULLNAME:</label>
          <input 
          type="text" 
          required 
          value={fullname} 
          onChange={(e) => setFullname(e.target.value)}
          >
          </input>
          <label>FARMER PASSWORD:</label>
          <input 
          type="text" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          >
          </input>
          { !isPending && <button>Add Farmer</button>}
          { isPending && <button disabled>Adding Farmer...</button>}
            </form>
        </div>
    );
}
 
export default Create;