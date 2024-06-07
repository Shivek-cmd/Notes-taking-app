import React from "react";
import rightArrow from "../../assets/rightArrow.png";
import "./styles.css";
function formatDate(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGroupInitials(groupName) {
  const words = groupName.split(" ");
  if (words.length === 1) {
    return groupName.substring(0, 2).toUpperCase();
  } else {
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials.substring(0, 2);
  }
}

function NoteDetails({
  selectedGroup,
  notesTitle,
  notesData,
  setNotesData,
  handleNoteData,
}) {
  return (
    <>
      <div className="right-header note-item">
        <div
          className="note-color-circle "
          style={{ backgroundColor: notesTitle[selectedGroup].color }}
        >
          {getGroupInitials(notesTitle[selectedGroup].groupName)}
        </div>
        <div className="note-name">{notesTitle[selectedGroup].groupName}</div>
      </div>
      <div className="right-content">
        {notesTitle[selectedGroup].notesData
          .filter((note) => note.data.length > 0)
          .map((note, index) => (
            <div className="right-content-data" key={index}>
              <div className="note-info">
                <div className="note-date">{formatDate(note.dateTime)}</div>
                <div className="note-time">{formatTime(note.dateTime)}</div>
              </div>
              <div className="note-data">{note.data}</div>
            </div>
          ))}
      </div>
      <div className="right-footer">
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
        <div className="right-arrow">
          <img
            src={rightArrow}
            alt="Right Arrow Icon"
            width="24"
            height="24"
            style={{ cursor: "pointer" }} // Style change for cursor
            onClick={handleNoteData}
          />
        </div>
      </div>
    </>
  );
}

export default NoteDetails;
