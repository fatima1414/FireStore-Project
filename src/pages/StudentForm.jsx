import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createStudent, updateStudent, viewStudents } from "../features/studentSlice";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const courseOptions = ["BCA", "BBA", "BSc IT", "MBA"];

const StudentForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const { id } = useParams();
  const { studentList } = useSelector((state) => state.students);

  const singleStudent = studentList?.find((item) => item.id === id);

  useEffect(() => {
    dispatch(viewStudents());
    reset(singleStudent);
  }, [dispatch, id, singleStudent, reset]);

  const Add = (data) => {
    if (!data.name || !data.email || !data.course) {
      Swal.fire("Error", "All required fields must be filled!", "error");
      return;
    }

    if (!id) {
      dispatch(createStudent(data));
    } else {
      dispatch(updateStudent({ ...data, id }));
    }

    reset();
    redirect("/");
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg col-lg-6 mx-auto border-0 rounded-4">
        <div className="card-header bg-dark text-white text-center rounded-top-4">
          <h3>{id ? "Update Student" : "Add New Student"}</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit(Add)}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Student Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter student name"
                {...register("name")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Course</label>
              <select className="form-select" {...register("course")} defaultValue="">
                <option value="" disabled>
                  -- Select Course --
                </option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                {...register("city")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Marks</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter marks"
                {...register("marks")}
              />
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-dark px-4">
                {id ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
