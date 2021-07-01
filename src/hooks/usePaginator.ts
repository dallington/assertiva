import React, { useState } from "react";
import { StoreType } from "../types";

export default function usePaginator(data: Array<StoreType>, perPage = 10) {
  if (!data.length) {
    throw Error("the data array cannot be empty");
  }
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleTotalPages = (arrayLength: number) => {
    setTotalPages(Math.round(arrayLength / perPage));
  };

  const slice = (array = data) => {
    const offset = (currentPage - 1) * perPage;
    handleTotalPages(array.length);
    setFilteredData(array.slice(offset).slice(0, perPage));
  };

  const searchStoreData = (text: string) => {
    if (text === "") slice();

    const textLowerCase = text.toLowerCase();
    const filtered = data.filter((item) => {
      const name = item.name.toLowerCase();
      return name.includes(textLowerCase);
    });
    setCurrentPage(1);
    slice(filtered);
  };
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    filteredData,
    setFilteredData,
    slice,
    searchStoreData,
  };
}
