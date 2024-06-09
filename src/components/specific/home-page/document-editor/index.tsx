// DocumentEditor.js
import React, { useMemo, useState, useEffect, useCallback } from "react";
import Canvas from "./canvas";
import debounce from "lodash/debounce";
import Toolbar from "./toolbar/toolbar";

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

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  selectedDocumentId,
  documents,
  setSelectedDocumentId,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [annotations, setAnnotations] = useState<{ x: number; y: number }[]>(
    []
  );
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);

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

  const handleCanvasClick = (x: number, y: number) => {
    if (isAnnotationMode) {
      setAnnotations([...annotations, { x, y }]);
    }
  };

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
      <Toolbar
        nextPage={nextPage}
        previousPage={previousPage}
        setRotation={debouncedSetRotation}
        setScale={debouncedSetScale}
        setIsAnnotationMode={setIsAnnotationMode}
        isAnnotationMode={isAnnotationMode}
      />
      <Canvas
        imageUrl={images[selectedDocumentId]}
        rotation={rotation}
        scale={scale}
        annotations={annotations}
        onCanvasClick={handleCanvasClick}
        isAnnotationMode={isAnnotationMode}
      />
    </div>
  );
};

export default DocumentEditor;
