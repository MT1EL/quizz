import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Quizz from "./components/Quizz";
import { useFormik } from "formik";
import * as Yup from "yup";
function App() {
  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      difficulty: "",
      type: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().min(1).required("required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [data, setData] = useState("");
  const { amount, category, difficulty, type } = formik.values;

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${amount && amount}&category=${
        category && category
      }&difficulty=${difficulty && difficulty}&type=${type && type}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [formik.values]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home formik={formik} />} />
          <Route
            path="/quizz"
            element={<Quizz data={data} formik={formik} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
