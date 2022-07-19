import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggest, setSuggest] = useState('');
  

  useEffect ( () => {
    const loadUsers = async () => {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      setUsers(response.data.data);
    }
    loadUsers();
  }, [])

  const onchangeHandler = (text) => {
    let matches = [];
    if(text.length > 0){
      matches = users.filter( user => {
        const regex =  new RegExp(`${text}`, "gi");
        return user.email.match(regex);
      })
    }
    setSuggest(matches);
    setText(text);
  }

  return (
    <div className="App">
      <h1>Search for it...</h1>
      <div className='search-container'>
        <input className="search-input" type="text" 
          onChange={e => onchangeHandler(e.target.value)}
          onBlur={() => {
            setTimeout ( () => {
              setSuggest([])
            }, 100);
          }}
          value={text} ></input>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className='suggestions'>
        {suggest && suggest.map( (suggest, i) => 
          <div className="suggest" onClick={(e) => {
            setText(suggest.email);
            setSuggest([]);
          }} key={i}>{suggest.email}</div>
        )}
      </div>
    </div>
  );
}

export default App;
