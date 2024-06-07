import React from "react";
import "./styles.css";

function getGroupInitials(groupName) {
  const words = groupName.split(" ");
  if (words.length === 1) {
    return groupName.substring(0, 2).toUpperCase();
  } else {
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials.substring(0, 2);
  }
}

function NoteGroupList({ notesTitle, handleGroupSelection, selectedGroup }) {
  return (
    <div className="notesTitle-list">
      {notesTitle.map((note, index) => (
        <div
          key={note.id}
          className="note-item border"
          style={{
            backgroundColor: selectedGroup === index ? "#f7ecdc" : "white",
          }}
          onClick={() => handleGroupSelection(index)}
        >
          <div
            className="note-color-circle"
            style={{ backgroundColor: note.color }}
          >
            {getGroupInitials(note.groupName)}
          </div>
          <div className="note-name">{note.groupName}</div>
        </div>
      ))}
    </div>
  );
}

export default NoteGroupList;
