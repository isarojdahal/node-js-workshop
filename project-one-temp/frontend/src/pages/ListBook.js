import React, { useEffect, useState } from "react";
import api from "../api/config";

const ListBook = () => {

    const [bookList,]
  useEffect(() => {
    async function fetchBooks() {
      const response = await api.get("book/");
      console.log(response.data);
    }

    fetchBooks();
  }, []);
  return <div>{}</div>;
};

export default ListBook;
