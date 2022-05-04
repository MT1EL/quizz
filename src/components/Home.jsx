import React from "react";
import { Link } from "react-router-dom";
function Home({ formik }) {
  return (
    <div className="home-container">
      <div className="title">
        <h1>Welcome to Quiizical</h1>
      </div>

      <form action="" onSubmit={formik.handleSubmit}>
        <p>Number of Questions:</p>

        <input
          type="number"
          id="amount"
          onChange={formik.handleChange}
          value={formik.values.amount}
          onBlur={formik.handleBlur}
        />
        <p style={{ color: "red" }}>
          {formik.errors.amount && formik.touched ? formik.errors.amount : null}
        </p>
        <p> select Category:</p>
        <select
          name="category"
          id="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          {Category().map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        <p>Select Difficulty:</p>
        <select
          name="difficulty"
          id="difficulty"
          onChange={formik.handleChange}
          value={formik.values.difficulty}
        >
          {Difficulty().map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        <p>Select Type:</p>
        <select
          name="type"
          id="type"
          onChange={formik.handleChange}
          value={formik.values.type}
        >
          {Type().map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        {formik.values.amount ? (
          <Link to="/quizz">
            <button type="submit" className="quizButton">
              click
            </button>
          </Link>
        ) : (
          <button type="submit" className="quizButton">
            click
          </button>
        )}
      </form>
    </div>
  );
}

export default Home;

const Category = () => {
  return [
    { value: "any", name: "Any Category" },
    { value: "9", name: "General Knowledge" },
    { value: "10", name: "Entertainment: Books" },
    { value: "11", name: "Entertainment: Film" },
    { value: "12", name: "Entertainment: Music" },
    { value: "13", name: "Entertainment: Musicals; Theatres" },
    { value: "14", name: "Entertainment: Television" },
    { value: "15", name: "Entertainment: Video Games" },
    { value: "16", name: "Entertainment: Board Games" },
    { value: "17", name: "Science & Nature" },
    { value: "18", name: "Science: Computers" },
    { value: "19", name: "Science: Mathematics" },
    { value: "20", name: "Mythology" },
    { value: "21", name: "Sports" },
    { value: "22", name: "Geography" },
    { value: "23", name: "History" },
    { value: "24", name: "Politics" },
    { value: "25", name: "Art" },
    { value: "26", name: "Celebrities" },
    { value: "27", name: "Animals" },
    { value: "28", name: "Vehicles" },
    { value: "29", name: "Entertainment: Comics" },
    { value: "30", name: "Science: Gadgets" },
    { value: "31", name: "Entertainment: Japanese Anime & Manga" },
    { value: "32", name: "Entertainment: Cartoon & Animations" },
  ];
};

const Difficulty = () => {
  return [
    { value: "any", name: "Any Difficulty" },
    { value: "easy", name: "Easy" },
    { value: "medium", name: "Medoim" },
    { value: "hard", name: "Hard" },
  ];
};

const Type = () => {
  return [
    { value: "any", name: "Any Type" },
    { value: "multiple", name: "Multiple Choice" },
    { value: "boolean", name: "True / False" },
  ];
};
