import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchUserProfile from '../Services/userService';

export const Submissiontable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCode, setSelectedCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const fetchSubmissions = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/submissions/user/${user._id}`, {
          withCredentials: true
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [user]);

  const handleViewCode = async (submissionId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/submissions/${submissionId}/code`, {
        withCredentials: true
      });
      setSelectedCode(response.data.code);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCode('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Heading */}
      <div className="p-4">
        <h1 className="text-5xl font-bold text-blue-600">Submissions</h1>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Verdict</th>
            <th scope="col" className="px-6 py-3">Code</th>
            <th scope="col" className="px-6 py-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <tr key={submission._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {submission.problemId.title}
                </td>
                <td className="px-6 py-4">
                  {submission.verdict}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewCode(submission._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View Code
                  </button>
                </td>
                <td className="px-6 py-4">
                  {new Date(submission.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">No submissions found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for displaying code */}
      <div id="static-modal" className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full ${isModalOpen ? 'block' : 'hidden'}`} aria-hidden="true">
        <div className="relative p-4 w-full max-w-3xl max-h-screen bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Submitted Code
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-96">
            <pre className="text-base leading-relaxed text-black dark:text-blue-400 whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">
              {selectedCode}
            </pre>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button onClick={closeModal} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissiontable;
