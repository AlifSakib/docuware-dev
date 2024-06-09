import "./style.css";

interface ToolbarProps {
  nextPage: () => void;
  previousPage: () => void;
  setRotation: (rotation: number) => void;
  setScale: (scale: number) => void;
  setIsAnnotationMode: (isAnnotationMode: boolean) => void;
  isAnnotationMode: boolean;
}

const Toolbar = ({
  nextPage,
  previousPage,
  setRotation,
  setScale,
  isAnnotationMode,
  setIsAnnotationMode,
}: ToolbarProps) => {
  return (
    <div>
      <div className="toolbar">
        <button onClick={previousPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
        {/* Rotate Right */}
        <button onClick={() => setRotation((prev) => prev + 90)}>
          Rotate Right
        </button>
        {/* Rotate Left */}
        <button onClick={() => setRotation((prev) => prev - 90)}>
          Rotate Left
        </button>
        {/* Zoom In */}
        <button onClick={() => setScale((prev) => prev + 0.1)}>Zoom In</button>
        <button onClick={() => setScale((prev) => prev - 0.1)}>Zoom Out</button>

        {/* Annotation */}
        <button onClick={() => setIsAnnotationMode((prev) => !prev)}>
          {isAnnotationMode ? "Exit Annotation Mode" : "Enter Annotation Mode"}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
