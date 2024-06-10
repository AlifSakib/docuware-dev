import React from "react";

interface ControlsProps {
  onImportImageClick: () => void;
  onExportClick: () => void;

  fileRef: React.RefObject<HTMLInputElement>;
}

const Controls: React.FC<ControlsProps> = ({ onExportClick }) => {
  return <div>Control Panel</div>;
};

export default Controls;
