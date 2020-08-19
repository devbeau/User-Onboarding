import React, { useState } from 'react';
import Form from './Components/Form'
import './App.css';

function App() {

let [userList, setUserList] = useState([]);

  return (
    <div className="App">
      <Form 
        userList={userList}
        setUserList={setUserList}
      />
      {userList.length > 0 && userList.map(user => {
        return (
        <div key={user.id} className='user-card'>
          <div className='card-name'>Name: {user.name}</div>
          <div className='card-credentials'>
            <p className='credentials-username'>
              UserName:  {user.username}
            </p>
            <p className='credentials-password'>
              Password: {user.password}
            </p>
            <p className='credentials-email'>
            Email:  {user.email}
            </p>
        {user.role && <p>Role: {user.role}</p>}
          </div>
        </div>
          )
      })}
    </div>
  );
}

export default App;
