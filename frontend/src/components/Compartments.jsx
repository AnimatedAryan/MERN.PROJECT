import React, { useState } from 'react';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const Compartments = () => {
  const [code, setCode] = useState(`#include <iostream> 
    using namespace std;
    int main() { 
        int num1, num2, sum;
        cin >> num1 >> num2;  
        sum = num1 + num2;  
        cout << "The sum of the two numbers is: " << sum;  
        return 0;  
    }`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [activeTab, setActiveTab] = useState('input');

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post('http://localhost:8000/run', payload);
      setOutput(data.output);
      setActiveTab('output');
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div className="flex h-screen w-screen p-0 m-0">
      <ResizablePanelGroup direction="horizontal" className="flex h-full w-full border bg-gray-100">
        <ResizablePanel defaultSize={30} className="flex-shrink-0">
          <div className="relative flex flex-col h-full p-4 bg-gray-300">
            {/* Compact Dropdown Menu */}
            <div className="absolute top-4 right-4">
              <Select className="w-[120px]" onValueChange={(value) => setLanguage(value)}>
                <SelectTrigger className="text-sm px-2 py-1 bg-white border border-gray-300 rounded-md text-black opacity-80">
                  <SelectValue placeholder="Lang" />
                </SelectTrigger>
                <SelectContent className="text-sm bg-white border border-gray-300 rounded-md">
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="js">JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Main Content */}
            <div className="flex flex-col h-full pt-10">
              {/* Question Title */}
              <h1 className="text-2xl font-semibold mb-2">Question Title</h1>

              {/* Question Description */}
              <textarea
                rows="10"
                placeholder="Write the description here..."
                className="border border-gray-300 rounded-lg py-2 px-4 w-full h-full resize-none mt-2"
              ></textarea>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-gray-500" />
        <ResizablePanel defaultSize={80} className="flex-shrink-0 flex flex-col">
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={60} className="flex-shrink-0">
              <div className="bg-gray-100 shadow-md w-full h-full">
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
            </ResizablePanel>
            <ResizableHandle className="bg-gray-500" />
            <ResizablePanel defaultSize={40} className="flex-shrink-0">
              {/* Tabs Component */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full mb-4">
                <TabsList>
                  <TabsTrigger value="output">Output</TabsTrigger>
                  <TabsTrigger value="input">Input</TabsTrigger>
                  <TabsTrigger value="verdict">Verdict</TabsTrigger>
                </TabsList>
                <TabsContent value="output">
                  <div className="bg-gray-100 rounded-sm shadow-md p-4 mb-4 w-full">
                    <h2 className="text-lg font-semibold mb-2">Output</h2>
                    <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 16 }}>
                      {output}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="input">
                  <div className="bg-gray-100 rounded-sm shadow-md p-4 mb-4 w-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Input</h2>
                      <div className="flex space-x-4">
                        {/* Run button */}
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="bg-black text-white font-medium rounded-full text-sm px-5 py-2.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block align-middle me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                          </svg>
                          Run
                        </button>

                        {/* Submit button */}
                        <button
                          type="button"
                          className="bg-black text-white font-medium rounded-full text-sm px-5 py-2.5"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows="5"
                      cols="15"
                      value={input}
                      placeholder="Input"
                      onChange={(e) => setInput(e.target.value)}
                      className="border border-gray-300 rounded-lg py-1.5 px-4 w-full resize-none"
                    ></textarea>
                  </div>
                </TabsContent>
                <TabsContent value="verdict">
                  <div className="bg-gray-100 rounded-sm shadow-md p-4 mb-4 w-full">
                    <h2 className="text-lg font-semibold mb-2">Verdict</h2>
                    <p className="text-sm">Here you can display the verdict.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Compartments;
