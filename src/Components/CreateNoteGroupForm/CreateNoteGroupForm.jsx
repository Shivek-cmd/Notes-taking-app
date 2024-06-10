import React, { useState } from "react";
import "./styles.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

function CreateNoteGroupForm({
  createButtonVisible,
  setCreateButtonVisible,
  addNoteGroup,
}) {
  const [groupName, setGroupName] = useState("");
  const [selectedTitleColor, setSelectedTitleColor] = useState("#B38BFA");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNoteGroup(groupName, selectedTitleColor);
    setGroupName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form-container ${createButtonVisible ? "visible" : ""}`}
    >
      <div className="form-header">Create New Notes Group</div>
      <div className="form-content">
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
        <div className="form-group">
          <label className="form-label">Choose color</label>
          <div className="color-options ">
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
      <div className="form-submit-button">
        {" "}
        <button
          type="submit"
          onClick={() => {
            setCreateButtonVisible(false);
          }}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateNoteGroupForm;
