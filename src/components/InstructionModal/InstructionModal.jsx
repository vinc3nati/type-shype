import React from "react";
import { BsStarFill } from "react-icons/bs";
import { INSTRUCTIONS } from "../../utils/constants";

export const InstructionModal = ({ showModal, setShowModal }) => {
  return (
    <div className={`modal-container ${showModal && "active"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="h4 text-primary">Instructions</div>
          <button className="close-modal" onClick={() => setShowModal(false)}>
            ×
          </button>
        </div>
        <div className="modal-text text-justify">
          <div className="instruction-list">
            {INSTRUCTIONS.map((item) => (
              <li key={item} className="instruction-item">
                <BsStarFill className="instruction-icon" />
                <span>{item}</span>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
