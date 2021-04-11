import logo from './logo.svg';
import './App.css';
import React, { Component,createRef, useState } from 'react';
import { Redirect } from 'react-router'
import { url } from "./baseUrl.js";

const Item = props => {
  return (
    <>
      <div class="py-6 bg-gray-300 flex justify-center font-bold text-gray-600 text-2xl rounded">
        {props.name}
      </div>
    </>
  )
}
const Error = () => {
  return (
    <>
      <div class="flex justify-between bg-red-100 items-center py-3 px-2 rounded">
        <span class="text-red-500 font-bold"> You have to sign in first </span>
        
      </div>
    </>
  )
}

const Home = props => 
{
  let [data, setData] = useState([]);
  let [show, setShow] = useState(false);

    const fetchData = () => {
      fetch(`${url}/fetch`).then(res => res.json()).then(json => {
            // setUsers(json.data);
            setData(json.data);
       });
    }

    const clearData = () => {
      setData([]);
    }

    const process = () => {
      let user = localStorage.getItem('user');

      if (user === null) {
        setShow(true);
        console.log('user')
        return ;
      }
      console.log(user.token)
      fetch(`${url}/process`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            
        }).then(res => res.json()).then(data => {
            setData(data);
            
        });

    }
    
    return (
      <>
      
      <div class="max-w-7xl mx-auto mt-5 ">
        
        <div class="max-w-3xl mx-auto space-x-4">

            <div class="py-6">
              {show ? <Error   /> : ''}
            </div>
            <div class="flex justify-center space-x-3">
              <button onClick={fetchData} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                fetch
              </button>
              <button onClick={clearData} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                clear
              </button>
              <button onClick={process} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Process
              </button>
            </div>
        <div class="grid grid-cols-4 gap-4 mt-4">
          
          {data.map(d => <Item key={d.id} name={d.randAlphabet} />)}

        </div>
        </div>
      </div>

      </>
    )
    
}

export default Home