
import React, { Component,createRef, useState } from 'react';
import { Redirect } from 'react-router'
import { url } from "./baseUrl.js";

const Signup = props => 
{
    
    let [ user, setUser ] = useState({
        email:'',
        password:'',
    });
    let [ redirect, setRedirect ] = useState(false);
    let [loading, setLoading] = useState(false);
    let [ message, setMessage ] = useState();

    let emailRef = createRef();
    let passwordRef = createRef();

    let signup = () => {
        
        let emailvalue = emailRef.current.value;
        let passwordvalue = passwordRef.current.value;

        // loading
        setLoading(true);
        fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: emailvalue, password:passwordvalue })
        }).then(res => res.json()).then(data => {
            
            console.log(data);
            setUser(data);
            setRedirect(true);
            setLoading(false);
            localStorage.setItem('user', data);

        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', 
            error.message);
            setMessage(message);
        });
        
    }
    if (redirect) {
        return <Redirect to='/'/>;
      }
    return (
        <>
            <div >
            
                {/* {<strong>{user.email}, {user.password}</strong>} */}
                <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    
                <span>{message}</span>
                {loading ? <span class="text-gray-300 animate-pulse">Loading...</span> : ''}
                    <div class="rounded-md shadow-sm -space-y-px">
                        
                        <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input   type="email" ref={emailRef}   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                        <label for="password" class="sr-only">Password</label>
                        <input  ref={passwordRef}  type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" /> 
                        </div>
                    </div>

                    

                    <div>
                        <button onClick={signup} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign up
                        </button>
                    </div>

                </div>
                </div>

            </div>
        </>
    )
    
}

export default Signup