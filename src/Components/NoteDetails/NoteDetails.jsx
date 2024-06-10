import React from "react";
import rightArrow from "../../assets/rightArrow.png";
import leftArrow from "../../assets/leftArrow.png"; // Importing left arrow icon
import "./styles.css";

// Function to format date
function formatDate(dateTime) {
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Function to format time
function formatTime(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

// Component for displaying note details
function NoteDetails({
  selectedGroup,
  notesTitle,
  notesData,
  setNotesData,
  handleNoteData,
  handleBackButton, // Add handleBackButton prop
}) {
  return (
    <>
      {/* Header section */}
      <div className="right-header">
        {/* Back button */}
        <button className="back-button" onClick={handleBackButton}>
          <img src={leftArrow} alt="leftarrow" />
        </button>
        {/* Note group color circle */}
        <div
          className="note-color-circle "
          style={{ backgroundColor: notesTitle[selectedGroup].color }}
        >
          {/* Group initials */}
          {getGroupInitials(notesTitle[selectedGroup].groupName)}
        </div>
        {/* Note group name */}
        <div className="note-name">{notesTitle[selectedGroup].groupName}</div>
      </div>
      {/* Content section */}
      <div className="right-content">
        {/* Display notes */}
        {notesTitle[selectedGroup].notesData
          .filter((note) => note.data.length > 0)
          .map((note, index) => (
            <div className="right-content-data" key={index}>
              {/* Note information */}
              <div className="note-info">
                {/* Note time */}
                <div className="note-time">{formatTime(note.dateTime)}</div>
                {/* Note date */}
                <div className="note-date">{formatDate(note.dateTime)}</div>
              </div>
              {/* Note data */}
              <div className="note-data">{note.data}</div>
            </div>
          ))}
      </div>
      {/* Footer section */}
      <div className="right-footer">
        {/* Text area for entering notes */}
        <textarea
          placeholder="Enter your text here..."
          className="text-area"
          value={notesData}
          onChange={(e) => {
            setNotesData(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleNoteData();
            }
          }}
        ></textarea>
        {/* Right arrow icon for submitting notes */}
        <div className="right-arrow">
          <img
            src={rightArrow}
            alt="Right Arrow Icon"
            width="24"
            height="24"
            style={{ cursor: "pointer" }} // Change cursor style
            onClick={handleNoteData}
          />
        </div>
      </div>
    </>
  );
}

export default NoteDetails;
