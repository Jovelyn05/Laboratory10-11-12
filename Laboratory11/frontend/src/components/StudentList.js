import React from "react";

const StudentList = ({ students, deleteStudent }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Student List</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {students.length === 0 ? (
          <p style={{ textAlign: "center" }}>No students added yet.</p>
        ) : (
          students.map((student, index) => (
            <li
              key={student.id || index}
              className="student-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                textTransform: "uppercase" 
              }}
            >
              <div
                className="name-container"
                style={{ position: "relative", display: "inline-block" }}
              >
                <span>{student.name}</span>
              </div>
              <span>{student.course}</span>
              <button
                className="delete-button"
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentList;