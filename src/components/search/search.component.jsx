import React from "react";

// components
import Input from "../input/input.component";
import { FaSearch } from "react-icons/fa";

function Search({ value, onchange, onEnterPress }) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Input
        id="search"
        type="text"
        value={value}
        onchange={onchange}
        bordered={true}
        icon={() => <FaSearch />}
        placeholder="search"
        onEnterPress={onEnterPress}
      />
    </div>
  );
}

export default Search;
