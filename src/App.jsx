import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./pages/StudentForm";
import StudentList from "./pages/StudentList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
