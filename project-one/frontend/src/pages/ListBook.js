import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListBook = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");

      console.log(response.data);
      if (response.data) {
        setBookList(response.data);
      }
    }

    getBooks();
  }, []);

  const deleteBook = async (id, idx) => {
    const data = window.confirm("Do you want to Delete ? ");
    if (data) {
      try {
        const response = await api.delete(`/book/delete/${id}`);
        console.log(response);
        if (response.data.success) {
          const newBookList = bookList.filter((book, index) => index !== idx);
          setBookList(newBookList);

          console.log("book deleted");
          toast.success("Book Deleted");
        } else {
          console.log("unable to delete book");
          toast.error("Unable to Delete Book");
        }
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      }
    }
  };
  return (
    <center>
      <ToastContainer />
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  color: "green",
                  width: "45%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {book.name}
                <FaTrashAlt
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            );
          })
        : "No Books"}
    </center>
  );
};

export default ListBook;
