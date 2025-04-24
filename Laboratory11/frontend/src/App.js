import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import './App.css';

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate(
        {
            left: `${posX}px`,
            top: `${posY}px`,
        },
        {
            duration: 500,
            fill: "forwards"
        }
    );

    });

const App = () => {
    const [students, setStudents] = useState([]);
    const audioRef = useRef(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        fetchStudents();

        if (!localStorage.getItem("visited")) {
            setAnimate(true);
            localStorage.setItem("visited", "true");
            setTimeout(() => {
                setAnimate(false);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.1;
        }
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const addStudent = async (name, course) => {
        try {
            await axios.post("http://127.0.0.1:5000/api/students", { name, course });
            fetchStudents();
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    const deleteStudent = async (studentId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/students/${studentId}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div className={`container ${animate ? "pop-animate" : ""}`}>
            <div className="snake-border">
                <svg
                    className="snake-svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                    }}
                >
                    <rect className="snake-rect" x="0" y="0" width="100" height="100" rx="5" />
                </svg>
                <div
                    className="overlay"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        padding: "20px",
                        textAlign: "center",
                    }}
                >
                    <h1 className="srs-head">Student Recording System</h1>
                    <StudentForm addStudent={addStudent} />
                    <StudentList students={students} deleteStudent={deleteStudent} />
                </div>
            </div>
        </div>
    );
};

export default App;