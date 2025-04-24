import React, { useState } from "react";

const StudentForm = ({ addStudent }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !course) {
      setMessage("Please fill in all fields.");
      return;
    }
    await addStudent(name, course); // Call function from App.js
    setName("");
    setCourse("");
    setMessage("Student added successfully!");
  };

  return (
    <div className="input-placeholder">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="STUDENT NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ textTransform: "uppercase" }}
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={{ textTransform: "uppercase" }}
        />
        <button type="submit">Add Student</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default StudentForm;