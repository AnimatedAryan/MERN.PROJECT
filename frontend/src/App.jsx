import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import './App.css';
import Compartments from './components/Compartments';
import { Divide } from 'lucide-react';


const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/run';

 


function App() {
 

  /*const [code, setCode] = useState(`#include <iostream> 
    using namespace std;
    // Define the main function
    int main() { 
        // Declare variables
        int num1, num2, sum;
        // Prompt user for input
        cin >> num1 >> num2;  
        // Calculate the sum
        sum = num1 + num2;  
        // Output the result
        cout << "The sum of the two numbers is: " << sum;  
        // Return 0 to indicate successful execution
        return 0;  
    }`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code,
      input,
    };

    try {
      const { data } = await axios.post(BASE_URL, payload);
      setOutput(data.output);
    } catch (error) {
      console.log(error);
    }
  };
*/
  return (
    <div className='Comp'>
      <div className="nav">

      </div>
      <div className="compart">
      <Compartments />
      </div>

    </div>
    
    /*
    <div className="flex h-screen">
      {/* Left Column: Description }
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p>
          This is a description box where you can provide details about the code editor, the languages supported, and any other relevant information. Use this area to help users understand how to use the editor and what to expect from the compiler.
        </p>
      </div>

      {/* Right Column: Code Editor and Functionalities }
      <div className="w-3/4 flex flex-col">
        {/* Code Editor }
        <div className="flex-1 p-4">
          <div className="bg-gray-100 shadow-md w-full" style={{ height: 'calc(50vh - 60px)' }}>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                outline: 'none',
                border: 'none',
                backgroundColor: '#f7fafc',
                height: '100%',
                overflowY: 'auto'
              }}
            />
          </div>
        </div>

        {/* Run and Submit Functionality }
        <div className="p-4 flex flex-col items-end">
          {/* Input textarea }
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Input</h2>
            <textarea
              rows='5'
              cols='15'
              value={input}
              placeholder='Input'
            //  onChange={(e) => setInput(e.target.value)}
              className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
            ></textarea>
          </div>

          {/* Output box }
          <div className="bg-gray-100 rounded-sm shadow-md p-4 mb-4 w-full">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 12 }}>{output}</div>
          </div>

          {/* Run button }
          <button onClick={handleSubmit} type="button" className="bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle me-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>
            Run
          </button>
        </div>
      </div>

      {/* Fixed Position: Bottom Right Buttons }
      <div className="fixed bottom-4 right-4">
        {/* Run button }
        <button onClick={handleSubmit} type="button" className="bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
          Run
        </button>

        {/* Output button }
        <button type="button" className="bg-gradient-to-br from-green-500 to-blue-400 hover:from-green-600 hover:to-blue-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
          Output
        </button>
      </div>
    </div>*/
    
  );
}

export default App;
