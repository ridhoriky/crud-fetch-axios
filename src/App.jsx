import { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import "./index.css";

function App() {
  const [currentView, setCurrentView] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [apiMethod, setApiMethod] = useState("axios"); // 'axios' or 'fetch'

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setCurrentView("form");
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView("form");
  };

  const handleBackToList = () => {
    setCurrentView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Employee Management
              </h1>
              <p className="text-gray-600">
                Simple CRUD with {apiMethod.toUpperCase()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                <span className="text-gray-600">API Method:</span>
                <button
                  onClick={() => setApiMethod("axios")}
                  className={`px-3 py-1 rounded ${
                    apiMethod === "axios"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Axios
                </button>
                <button
                  onClick={() => setApiMethod("fetch")}
                  className={`px-3 py-1 rounded ${
                    apiMethod === "fetch"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Fetch
                </button>
              </div>

              {currentView === "list" && (
                <button onClick={handleAddEmployee} className="btn btn-primary">
                  + Add Employee
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6">
          {currentView === "list" ? (
            <EmployeeList onEdit={handleEditEmployee} apiMethod={apiMethod} />
          ) : (
            <EmployeeForm
              employee={selectedEmployee}
              onSuccess={handleBackToList}
              onCancel={handleBackToList}
              apiMethod={apiMethod}
            />
          )}
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>
            React + JSON Server +{" "}
            {apiMethod === "axios" ? "Axios" : "Fetch API"}
          </p>
          <p>Server running at: http://localhost:5000/employees</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
