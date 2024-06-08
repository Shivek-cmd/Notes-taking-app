import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Shivek from "../assets/image-removebg-preview 1.png";
import CreateNoteGroupForm from "../Components/CreateNoteGroupForm/CreateNoteGroupForm.jsx";
import NoteGroupList from "../Components/NoteGroupList/NoteGroupList.jsx";
import NoteDetails from "../Components/NoteDetails/NoteDetails.jsx";

import "./styles.css";

function Page1() {
  const [createButtonVisible, setCreateButtonVisible] = useState(false);
  const [notesTitle, setNotesTitle] = useState([]);
  const [notesData, setNotesData] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const createButton = () => {
    setCreateButtonVisible(true);
  };

  const addNoteGroup = (groupName, selectedTitleColor) => {
    const newNote = {
      id: notesTitle.length + 1,
      groupName: groupName,
      color: selectedTitleColor,
      notesData: [],
    };
    setNotesTitle([...notesTitle, newNote]);
  };

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

  const handleGroupSelection = (index) => {
    setSelectedGroup(selectedGroup === index ? null : index);
  };

  const handleBackButton = () => {
    setSelectedGroup(null);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="page1-container">
      {createButtonVisible && (
        <div
          className="overlay"
          onClick={() => setCreateButtonVisible(false)}
        />
      )}
      <div
        className={`left-container ${
          selectedGroup !== null && isMobileView ? "hidden" : ""
        }`}
      >
        <div className="header">Pocket Notes</div>
        <div className="create-button-wrapper">
          <button onClick={createButton} className="create-button">
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>Create Notes group</div>
          </button>
        </div>
        <NoteGroupList
          notesTitle={notesTitle}
          handleGroupSelection={handleGroupSelection}
          selectedGroup={selectedGroup}
          isMobileView={isMobileView}
        />
      </div>
      <div
        className={`right-container ${
          selectedGroup === null && isMobileView ? "hidden" : ""
        }`}
      >
        {selectedGroup !== null ? (
          <>
            <NoteDetails
              selectedGroup={selectedGroup}
              notesTitle={notesTitle}
              notesData={notesData}
              setNotesData={setNotesData}
              handleNoteData={handleNoteData}
              handleBackButton={handleBackButton}
            />
          </>
        ) : (
          <>
            <img src={Shivek} alt="/blank" className="image-placeholder" />
            <h3>Pocket Notes</h3>
            <p className="description">
              Send and receive messages without keeping your phone{" "}
              <span style={{ whiteSpace: "nowrap" }}>online</span>.<br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </>
        )}
      </div>
      <CreateNoteGroupForm
        createButtonVisible={createButtonVisible}
        setCreateButtonVisible={setCreateButtonVisible}
        addNoteGroup={addNoteGroup}
      />
    </div>
  );
}

export default Page1;
