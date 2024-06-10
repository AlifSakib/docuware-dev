// DocumentEditor.js
import React, { useMemo, useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import Paint from "./paint/paint";

interface Document {
  id: number;
  title: string;
  dateTime: string;
  image: string;
}

interface DocumentEditorProps {
  selectedDocumentId: number | null;
  documents: Document[];
  setSelectedDocumentId: (id: number) => void;
}

const DocumentsEditor: React.FC<DocumentEditorProps> = ({
  selectedDocumentId,
  documents,
  setSelectedDocumentId,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (selectedDocumentId !== null) {
      const index = documents.findIndex((doc) => doc.id === selectedDocumentId);
      if (index !== -1) {
        setCurrentPage(index);
      }
    }
  }, [selectedDocumentId, documents]);

  const nextPage = useCallback(() => {
    const newPage = (currentPage + 1) % documents.length;
    setCurrentPage(newPage);
    setSelectedDocumentId(documents[newPage].id);
  }, [currentPage, documents, setSelectedDocumentId]);

  const previousPage = useCallback(() => {
    const newPage = (currentPage - 1 + documents.length) % documents.length;
    setCurrentPage(newPage);
    setSelectedDocumentId(documents[newPage].id);
  }, [currentPage, documents, setSelectedDocumentId]);

  const images = useMemo(() => {
    return documents.reduce((acc, document) => {
      acc[document.id] = document.image;
      return acc;
    }, {} as { [key: number]: string });
  }, [documents]);

  // Debounce functions
  const debouncedSetRotation = useMemo(
    () => debounce((rotation: number) => setRotation(rotation), 300),
    []
  );

  const debouncedSetScale = useMemo(
    () => debounce((scale: number) => setScale(scale), 300),
    []
  );

  if (selectedDocumentId === null) {
    return <div>No document selected</div>;
  }

  return (
    <div
      style={{
        display: "flex",

        height: "100%",
      }}
    >
      <Paint imageUrl={images[selectedDocumentId]} />
    </div>
  );
};

export default DocumentsEditor;
