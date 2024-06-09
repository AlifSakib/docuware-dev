// HomePage.js
import React, { useState, useCallback } from "react";
import Split from "react-split";
import DocumentEditor from "../../components/specific/home-page/document-editor";
import DocumentTray from "../../components/specific/home-page/document-tray";
import "./styles.css";

const HomePage = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );

  const documents = [
    {
      id: 100,
      title: "Document 1",
      dateTime: "2021-09-01T12:00:00Z",
      image:
        "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 4,
      title: "Document 2",
      dateTime: "2021-09-01T12:00:00Z",
      image:
        "https://images.pexels.com/photos/2928232/pexels-photo-2928232.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 354,
      title: "Document 3",
      dateTime: "2021-09-01T12:00:00Z",
      image:
        "https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const handleDocumentDoubleClick = useCallback((id: number) => {
    setSelectedDocumentId(id);
  }, []);

  return (
    <div>
      <Split className="split" gutterSize={15} minSize={500}>
        <div>
          <DocumentTray
            documents={documents}
            onDocumentDoubleClick={handleDocumentDoubleClick}
            selectedDocumentId={selectedDocumentId}
          />
        </div>
        <div>
          <DocumentEditor
            selectedDocumentId={selectedDocumentId}
            documents={documents}
            setSelectedDocumentId={setSelectedDocumentId}
          />
        </div>
      </Split>
    </div>
  );
};

export default HomePage;
