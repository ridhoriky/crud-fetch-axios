import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { employeeAPI as axiosAPI } from "../services/api-axios";
import { employeeAPI as fetchAPI } from "../services/api-fetch";

const EmployeeForm = ({ employee, onSuccess, onCancel, apiMethod }) => {
  const isEditMode = !!employee;

  const api = apiMethod === "axios" ? axiosAPI : fetchAPI;

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "Engineering",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: employee.name || "",
        position: employee.position || "",
        department: employee.department || "Engineering",
        email: employee.email || "",
      });
    }
  }, [employee, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        await api.update(employee.id, formData);
        alert("Employee updated successfully!");
      } else {
        await api.create(formData);
        alert("Employee added successfully!");
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving employee:", err);
      alert(
        `Failed to ${isEditMode ? "update" : "add"} employee. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Engineering",
    "Design",
    "HR",
    "Marketing",
    "Sales",
    "Finance",
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Back to list"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Employee" : "Add New Employee"}
        </h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          Using {apiMethod.toUpperCase()}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter employee name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Position Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.position ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Frontend Developer"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          {/* Department Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="employee@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success flex-1"
            >
              {loading
                ? "Processing..."
                : isEditMode
                ? "Update Employee"
                : "Add Employee"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
