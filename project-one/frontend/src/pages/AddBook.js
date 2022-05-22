import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();

    const response = await api.post(
      "/book/add",
      {
        ...formData,
        image: imageData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={addBook}
      >
        Name
        <input type="text" name="name" onChange={handleChange} />
        Author
        <input type="text" name="author" onChange={handleChange} />
        Genre
        <input type="text" name="genre" onChange={handleChange} />
        Description
        <textarea
          name="description"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddBook;
