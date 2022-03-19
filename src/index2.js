import React from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import "./styles.css";

function App() {

  return (
    <div className="App">
      <h1>React-Canvas-Draw</h1>
      <h3>A simple yet powerful canvas-drawing component for React</h3>
      <iframe
        frameborder="0"
        scrolling="0"
        width="160px"
        height="30px"
      />
      <CanvasDraw
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);