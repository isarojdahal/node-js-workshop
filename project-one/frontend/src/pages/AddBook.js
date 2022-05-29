import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();

    try {
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
      if (response.data.id) {
        console.log(response);
        console.log("success");
        toast.success("Added New Book");

        e.target.reset();
        setFormData({});
        setImageData();
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ToastContainer />
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
