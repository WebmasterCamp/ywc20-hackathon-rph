import React from "react";
import "./SearchInput.css";
import { Search } from "lucide-react";

const SearchInput = () => {
  return <div className="relative">
    <Search size={24} className="text-white absolute left-2 top-1/2 -translate-y-1/2"/>
    <input className="search-input" />
  </div>;
};

export default SearchInput;
