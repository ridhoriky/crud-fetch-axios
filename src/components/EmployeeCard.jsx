import {
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const { id, name, position, department, email } = employee;

  const departmentColors = {
    Engineering: "bg-blue-100 text-blue-800",
    Design: "bg-purple-100 text-purple-800",
    HR: "bg-green-100 text-green-800",
    Marketing: "bg-yellow-100 text-yellow-800",
    Sales: "bg-red-100 text-red-800",
    Finance: "bg-indigo-100 text-indigo-800",
  };

  const deptColor = departmentColors[department] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{name}</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${deptColor}`}
          >
            {department}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(employee)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <FaBriefcase className="text-gray-400" />
          <span className="text-gray-700">{position}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-gray-400" />
          <span className="text-gray-700 truncate">{email}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaBuilding className="text-gray-400" />
          <span className="text-gray-700">ID: {id}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
