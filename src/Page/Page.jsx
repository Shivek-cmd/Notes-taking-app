import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Shivek from "../assets/image-removebg-preview 1.png";
import CreateNoteGroupForm from "../Components/CreateNoteGroupForm/CreateNoteGroupForm.jsx";
import NoteGroupList from "../Components/NoteGroupList/NoteGroupList.jsx";
import NoteDetails from "../Components/NoteDetails/NoteDetails.jsx";
import "./styles.css";

function Page() {
  // State variables
  const [createButtonVisible, setCreateButtonVisible] = useState(false);
  const [notesTitle, setNotesTitle] = useState([]);
  const [notesData, setNotesData] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Load notesTitle from localStorage on component mount
  useEffect(() => {
    const storedNotesTitle = localStorage.getItem("notesTitle");
    if (storedNotesTitle) {
      try {
        setNotesTitle(JSON.parse(storedNotesTitle));
      } catch (error) {
        console.error("Failed to parse notesTitle from localStorage:", error);
        localStorage.removeItem("notesTitle"); // Remove corrupted data
      }
    }
  }, []);

  // Save notesTitle to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
  }, [notesTitle]);

  // Function to show create button
  const createButton = () => setCreateButtonVisible(true);

  // Function to add a new note group
  const addNoteGroup = (groupName, selectedTitleColor) => {
    const newNote = {
      id: notesTitle.length + 1,
      groupName,
      color: selectedTitleColor,
      notesData: [],
    };
    setNotesTitle([...notesTitle, newNote]);
  };

  // Function to handle adding note data to a selected group
  const handleNoteData = () => {
    if (selectedGroup !== null) {
      const updatedNotesTitle = [...notesTitle];
      updatedNotesTitle[selectedGroup].notesData.push({
        data: notesData,
        dateTime: new Date().toLocaleString(),
      });
      setNotesTitle(updatedNotesTitle);
      setNotesData("");
    }
  };

  // Function to handle group selection
  const handleGroupSelection = (index) =>
    setSelectedGroup((prevIndex) => (prevIndex === index ? null : index));

  // Function to handle going back to the note group list
  const handleBackButton = () => setSelectedGroup(null);

  // Function to handle resizing for mobile view
  const handleResize = () => setIsMobileView(window.innerWidth <= 768);

  // Effect to handle window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="page1-container">
      {/* Overlay for create button */}
      {createButtonVisible && (
        <div
          className="overlay"
          onClick={() => setCreateButtonVisible(false)}
        />
      )}
      {/* Left container */}
      <div
        className={`left-container ${
          selectedGroup !== null && isMobileView ? "hidden" : ""
        }`}
      >
        {/* Header */}
        <div className="header">Pocket Notes</div>
        {/* Create button */}
        <div className="create-button-wrapper">
          <button onClick={createButton} className="create-button">
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>Create Notes group</div>
          </button>
        </div>
        {/* Note group list */}
        <NoteGroupList
          notesTitle={notesTitle}
          handleGroupSelection={handleGroupSelection}
          selectedGroup={selectedGroup}
          isMobileView={isMobileView}
        />
      </div>
      {/* Right container */}
      <div
        className={`right-container ${
          selectedGroup === null && isMobileView ? "hidden" : ""
        }`}
      >
        {selectedGroup !== null ? (
          // Show note details if a group is selected
          <NoteDetails
            selectedGroup={selectedGroup}
            notesTitle={notesTitle}
            notesData={notesData}
            setNotesData={setNotesData}
            handleNoteData={handleNoteData}
            handleBackButton={handleBackButton}
          />
        ) : (
          // Show default page if no group is selected
          <div className="right-default-page">
            <div className="image-placeholder">
              <img src={Shivek} alt="/blank" width="50%" />
            </div>
            <h3>Pocket Notes</h3>
            <p className="description">
              Send and receive messages without keeping your phone{" "}
              <span style={{ whiteSpace: "nowrap" }}>online</span>.<br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </div>
        )}
      </div>
      {/* Create note group form */}
      <CreateNoteGroupForm
        createButtonVisible={createButtonVisible}
        setCreateButtonVisible={setCreateButtonVisible}
        addNoteGroup={addNoteGroup}
      />
    </div>
  );
}

export default Page;
