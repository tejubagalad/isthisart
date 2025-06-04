import React, { useRef, useState, useEffect } from "react";

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#17b8bd";
    ctxRef.current = ctx;
  }, []);

  const toggleEraser = () => {
    setErasing((prev) => !prev);
    ctxRef.current.globalCompositeOperation = erasing ? "source-over" : "destination-out";
    ctxRef.current.lineWidth = erasing ? 5 : 50;
  };

  const startDrawing = (e) => {
    if (e.buttons !== 1) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onDoubleClick={toggleEraser}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      ></canvas>
    </div>
  );
};

export default DrawingApp;
