import React from "react";
import "./styles.css";

// Function to get group initials
function getGroupInitials(groupName) {
  const words = groupName.split(" ");
  if (words.length === 1) {
    return groupName.substring(0, 2).toUpperCase();
  } else {
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials.substring(0, 2);
  }
}

// Component for displaying the list of note groups
function NoteGroupList({
  notesTitle, // Array of note titles
  handleGroupSelection, // Function to handle group selection
  selectedGroup, // Index of the selected group
  isMobileView, // Flag to indicate mobile view
}) {
  return (
    <div className="notesTitle-list">
      {/* Map through note titles and render each item */}
      {notesTitle.map((note, index) => (
        <div
          key={note.id}
          className="note-item border"
          style={{
            backgroundColor: isMobileView
              ? "white"
              : selectedGroup === index
              ? "#f7ecdc" // Highlight selected group
              : "white",
          }}
          onClick={() => handleGroupSelection(index)} // Handle group selection on click
        >
          {/* Note group color circle */}
          <div
            className="note-color-circle"
            style={{ backgroundColor: note.color }}
          >
            {/* Display group initials */}
            {getGroupInitials(note.groupName)}
          </div>
          {/* Note group name */}
          <div className="note-name">{note.groupName}</div>
        </div>
      ))}
    </div>
  );
}

export default NoteGroupList;
