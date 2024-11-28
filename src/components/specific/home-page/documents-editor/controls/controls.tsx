import React from "react";

interface ControlsProps {
  onImportImageClick: () => void;
  onExportClick: () => void;

  fileRef: React.RefObject<HTMLInputElement>;
}

const Controls: React.FC<ControlsProps> = ({ onExportClick }) => {
  return (
    <div>
      <button onClick={onExportClick}>Export</button>
    </div>
  );
};

export default Controls;
