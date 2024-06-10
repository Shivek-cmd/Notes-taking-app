import React, { useState } from "react";
import "./styles.css";

// Pre-defined colors for note group titles
const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

// Component for creating a new note group
function CreateNoteGroupForm({
  createButtonVisible, // Prop to control visibility of the form
  setCreateButtonVisible, // Function to toggle visibility of the create button
  addNoteGroup, // Function to add a new note group
}) {
  // State variables for group name and selected title color
  const [groupName, setGroupName] = useState("");
  const [selectedTitleColor, setSelectedTitleColor] = useState("#B38BFA");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addNoteGroup(groupName, selectedTitleColor);
    setGroupName(""); // Clear group name after submission
  };

  return (
    // Form for creating a new note group
    <form
      onSubmit={handleSubmit}
      className={`form-container ${createButtonVisible ? "visible" : ""}`}
    >
      {/* Form header */}
      <div className="form-header">Create New Notes Group</div>
      {/* Form content */}
      <div className="form-content">
        {/* Input field for group name */}
        <div className="form-group">
          <label className="form-label">Group Name</label>{" "}
          <input
            type="text"
            placeholder="Enter your group name..."
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            className="form-input"
          />
        </div>
        {/* Color selection for group title */}
        <div className="form-group">
          <label className="form-label">Choose color</label>
          <div className="color-options ">
            {/* Display color options */}
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedTitleColor(color)}
                className="color-circle"
                style={{
                  backgroundColor: color,
                  border:
                    selectedTitleColor === color
                      ? "2px solid black"
                      : "2px solid transparent",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Submit button */}
      <div className="form-submit-button">
        <button
          type="submit"
          onClick={() => {
            setCreateButtonVisible(false); // Hide create button after form submission
          }}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateNoteGroupForm;
