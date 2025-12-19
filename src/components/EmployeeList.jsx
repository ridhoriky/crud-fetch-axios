import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import EmployeeCard from "./EmployeeCard";
import { employeeAPI as axiosAPI } from "../services/api-axios";
import { employeeAPI as fetchAPI } from "../services/api-fetch";

const EmployeeList = ({ onEdit, apiMethod }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const api = apiMethod === "axios" ? axiosAPI : fetchAPI;

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAll();
      setEmployees(data);
    } catch (err) {
      setError(
        "Failed to load employees. Please check if JSON Server is running."
      );
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await api.delete(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      alert("Failed to delete employee");
      console.error("Error deleting employee:", err);
    }
  };

  // Search employees
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchEmployees();
      return;
    }

    try {
      const results = await api.search(searchTerm);
      setEmployees(results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [apiMethod]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-red-600 font-semibold mb-2">Error!</div>
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchEmployees} className="btn btn-primary">
          Try Again
        </button>
        <div className="mt-4 text-sm text-gray-600">
          <p>Make sure JSON Server is running:</p>
          <code className="bg-gray-100 p-2 rounded block mt-1">
            npm run server
          </code>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, position, or department..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                fetchEmployees();
              }}
              className="btn bg-gray-200 hover:bg-gray-300"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">📁</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No employees found
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try a different search term"
              : "Add your first employee!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
