import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Problemtable = () => {
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/problems`);
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter problems based on search query
  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Heading */}
      <div className="p-4">
        <h1 className="text-5xl font-bold text-blue-600">Problems</h1>
      </div>

      {/* Search input */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by title or topic..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-md p-2"
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Topic</th>
            <th scope="col" className="px-6 py-3">Solve</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <tr key={problem._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {problem.title}
                </th>
                <td className="px-6 py-4">
                  {problem.topic}
                </td>
                <td className="px-6 py-4">
                    <Link to={`/compiler/${problem._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Solve</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center">No problems found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Problemtable;
