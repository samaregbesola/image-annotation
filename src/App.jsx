import { useRef, useEffect, useState } from "react";

const App = () => {
  let imageUrl = "https://source.unsplash.com/1980x1020/?beach";
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000"); // new state variable for brush color

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth; // set canvas width to be 100% of windows width
    canvas.height = window.innerHeight * 0.9; // set canvas height to 90% of window height
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  const handleMouseDown = (event) => {
    setDrawing(true);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = event.nativeEvent;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = event.nativeEvent;

    context.lineWidth = brushWidth;
    context.strokeStyle = brushColor; // set the stroke style based on brushColor state variable
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleBrushWidthChange = (event) => {
    setBrushWidth(event.target.value);
  };

  const handleBrushColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div>
        <label htmlFor="brush-width">Brush Width:</label>
        <input
          type="range"
          id="brush-width"
          name="brush-width"
          min="1"
          max="20"
          value={brushWidth}
          onChange={handleBrushWidthChange}
        />
      </div>
      <div>
        <label htmlFor="brush-color">Brush Color:</label>
        <select
          id="brush-color"
          name="brush-color"
          value={brushColor}
          onChange={handleBrushColorChange}
        >
          <option value="#000000">Black</option>
          <option value="#ff0000">Red</option>
          <option value="#0000ff">Blue</option>
        </select>
      </div>
    </div>
  );
};

export default App;
