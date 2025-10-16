import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase";

// CREATE
export const createStudent = createAsyncThunk("students/createStudent", async (data) => {
  await addDoc(collection(db, "students"), data);
  Swal.fire("Success", "Student added successfully!", "success");
});

// READ
export const viewStudents = createAsyncThunk("students/viewStudents", async () => {
  const querySnapshot = await getDocs(collection(db, "students"));
  let list = [];
  querySnapshot.forEach((docu) => {
    list.push({ id: docu.id, ...docu.data() });
  });
  return list;
});

// UPDATE
export const updateStudent = createAsyncThunk("students/updateStudent", async (data) => {
  const ref = doc(db, "students", data.id);
  await updateDoc(ref, data);
  Swal.fire("Updated", "Student record updated!", "info");
});

// DELETE
export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id) => {
  await deleteDoc(doc(db, "students", id));
  Swal.fire("Deleted", "Student record removed!", "error");
  return id;
});

const studentSlice = createSlice({
  name: "students",
  initialState: { studentList: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewStudents.fulfilled, (state, action) => {
        state.studentList = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.studentList = state.studentList.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
