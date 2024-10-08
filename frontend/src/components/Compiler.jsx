import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Styles.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import fetchUserProfile from '../Services/userService';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { DEFAULT_CPP_CODE } from './Default_code';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import _ from 'lodash';

export const Compartments = () => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const compilerUrl = import.meta.env.VITE_COMPILER_URL;
  const { problemId } = useParams();
  const [code, setCode] = useState(DEFAULT_CPP_CODE);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState(`cpp`);
  const [activeTab, setActiveTab] = useState('input');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [constraints, setConstraints] = useState([]);
  const [verdict, setVerdict] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };
    
    getUserProfile();
  }, []);

  useEffect(() => {
    const fetchProblem = async () => {
      if (problemId) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/problems/${problemId}`);
          setCode(data.initialCode || '');
          setDescription(data.description || '');
          setTitle(data.title || '');
          setTestCases(data.testCases || []);
          setConstraints(data.constraints || []);
        } catch (error) {
          console.error('Error fetching problem:', error);
        }
      } else {
        console.log("PROBLEM ID NOT DEFINED");
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleSubmit = useCallback(_.debounce(async () => {
    const payload1 = {
      language,
      code,
      problemId,
    };
    const payload2 ={
      user,
      verdict,
      code,
      problemId,
    }
    try {

      const { data } = await axios.post(`${compilerUrl}/submit`, payload1, {
        withCredentials: true, // Include cookies with the request
      });
      payload2.verdict = data.verdict;
      setVerdict(data.verdict);
      await axios.post(`${backendUrl}/api/submissions`, payload2, {
        withCredentials: true,
        });
      setVerdict(data.verdict);
      setActiveTab('verdict');
    } catch (error) {
      if (error === 'Time Limit Exceeded') {
        setVerdict('Time Limit Exceeded');
    } else {
       // Handle other errors or default behavior
        setVerdict('An error occurred');
    }
      setActiveTab('verdict');
      console.error('Error submitting code:', error);
    }
  }, 1000), [language, code, problemId]);

  const handlerun = useCallback(_.debounce(async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post(`${compilerUrl}/run`, payload);
      setOutput(data.output);
      setActiveTab('output');
    } catch (error) {
    if (error === 'Time Limit Exceeded') {
        setOutput('Time Limit Exceeded');
    } else {
        // Handle other errors or default behavior
        setOutput('An error occurred');
    }
      setActiveTab('output');
    }
  }, 1000), [language, code, input]);

  const combinedContent = `
  <div style="font-family: Arial, sans-serif;">
    ${description ? `<strong style="color: black;">DESCRIPTION</strong><br>${description}<br><br>` : ''}
    ${testCases.length > 0 ? `<strong style="color: black;">TEST CASES</strong><br>` + testCases.map((testCase, index) => (
      `<div>Test Case ${index + 1}:<br>Input: ${testCase.input}<br>Output: ${testCase.expectedOutput}<br>Explanation: ${testCase.explanation || 'No explanation provided'}<br></div>`
    )).join('<br>') : ''}
    ${constraints.length > 0 ? `<strong style="color: black;">CONSTRAINTS</strong><br>` + constraints.map((constraint, index) => (
      `${index + 1}. ${constraint}<br>`
    )).join('<br>') : ''}
  </div>
`;


  return (
    <div className="flex flex-col h-screen w-screen p-0 m-0 bg-sky-blue">
      <div className="flex-grow">
        <ResizablePanelGroup direction="horizontal" className="flex h-full w-full border border-ocean-blue">
          <ResizablePanel size={30} className="flex-shrink-0 flex flex-col">
            <div className="flex flex-col h-full p-4 bg-ocean-blue text-white flex-1">
              <div className="absolute top-2 right-4 bg-white rounded-md border border-ocean-blue">
                <Select className="w-[120px] select-trigger" onValueChange={(value) => setLanguage(value)}>
                  <SelectTrigger className="text-sm px-2 py-1 bg-white text-black rounded-md">
                    <SelectValue placeholder="C++" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-ocean-blue rounded-md">
                    <SelectItem value="cpp" className="select-item">C++</SelectItem>
                    <SelectItem value="python" className="select-item">Python</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <h1 className="text-2xl font-semibold mb-2 text-black bg-gray-100">{title}</h1>
              <div className="border border-ocean-blue rounded-lg p-4 bg-sky-blue flex-1 flex flex-col">
              <div
  className="content-container"
  dangerouslySetInnerHTML={{ __html: combinedContent }}
></div>

              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle className="bg-ocean-blue" />
          <ResizablePanel size={70} className="flex-shrink-0 flex flex-col">
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel size={60} className="flex-shrink-0">
                <div className="bg-ocean-blue text-black shadow-md w-full h-full">
                  <div className="flex items-center bg-sky-blue text-black font-semibold p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                    Code Editor
                  </div>
                  <Editor
                    height="500px"
                    language={language}
                    value={DEFAULT_CPP_CODE}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle className="bg-ocean-blue" />
              <ResizablePanel size={40} className="flex-shrink-0">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full mb-4">
                  <TabsList className="bg-ocean-blue text-black flex">
                    <TabsTrigger value="output" className="flex-1 py-2 text-center border-b border-sky-blue">Output</TabsTrigger>
                    <TabsTrigger value="input" className="flex-1 py-2 text-center border-b border-sky-blue">Input</TabsTrigger>
                    <TabsTrigger value="verdict" className="flex-1 py-2 text-center border-b border-sky-blue">Verdict</TabsTrigger>
                  </TabsList>
                  <TabsContent value="output">
                    <div className="bg-sky-blue rounded-sm shadow-md p-4 mb-4 w-full">
                      <h2 className="text-lg font-semibold mb-2 text-black bg-ocean-blue p-2">Output</h2>
                      <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 16, color: "black" }}>
                        {output}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="input">
                    <div className="bg-sky-blue rounded-sm shadow-md p-4 mb-4 w-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={handlerun}
                          type="button"
                          className="bg-ocean-blue text-black font-medium rounded-full py-2 px-4"
                        >
                          Run
                        </button>
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="bg-green-500 text-black font-medium rounded-full py-2 px-4"
                        >
                          Submit
                        </button>
                      </div>
                      <textarea
                        rows="5"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your input here..."
                        className="border border-ocean-blue rounded-lg py-2 px-4 w-full resize-none bg-sky-blue text-white mb-2"
                        style={{ height: '150px' }}
                      ></textarea>
                    </div>
                  </TabsContent>
                  <TabsContent value="verdict">
                    <div className="bg-sky-blue rounded-sm shadow-md p-4 mb-4 w-full">
                      <h2 className="text-lg font-semibold mb-2 text-black bg-ocean-blue p-2">Verdict</h2>
                      <div className="text-black">
                        {verdict ? verdict : "No verdict available"}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Compartments;
