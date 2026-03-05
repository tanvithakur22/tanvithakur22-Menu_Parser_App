import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="label">Search dishes</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a dish name (e.g. Paneer, Pasta)"
        className="input search-input"
        aria-label="Search dishes"
      />
      <p className="helper-text">
        Search works instantly as you type.
      </p>
    </div>
  );
}
