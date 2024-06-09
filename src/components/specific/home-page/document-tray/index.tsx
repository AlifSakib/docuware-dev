// DocumentTray.js
import React from "react";
import "./styles.css";

interface Document {
  id: number;
  title: string;
  dateTime: string;
  image: string;
}

interface DocumentTrayProps {
  documents: Document[];
  onDocumentDoubleClick: (id: number) => void;
  selectedDocumentId: number | null;
}

const DocumentTray: React.FC<DocumentTrayProps> = React.memo(
  ({ documents, onDocumentDoubleClick, selectedDocumentId }) => {
    return (
      <div className="documents">
        {documents.map((document) => (
          <div
            key={document.id}
            className={`document ${
              document.id === selectedDocumentId ? "selected" : ""
            }`}
            onDoubleClick={() => onDocumentDoubleClick(document.id)}
          >
            <img src={document.image} alt={document.title} />
            <div className="document-info">
              <p>{document.title}</p>
              <p>{document.dateTime}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default DocumentTray;
