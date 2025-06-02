import React from "react";
import "./SearchInput.css";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  return <div className="relative">
    <Search size={24} className="text-white absolute left-2 top-1/2 -translate-y-1/2"/>
    <input
      className="search-input"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch((e.target as HTMLInputElement).value);
        }
      }}
    />
  </div>;
};

export default SearchInput;
