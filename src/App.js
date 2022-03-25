import React, { useCallback, useEffect, useRef, useState } from 'react';
import GestureHandler from "quantumleapjs";
import LeftSwipe from './images/flat_left.png';
import RightSwipe from './images/flat_right.png';
import ThumbUp from './images/thumb_up.png';
import PointIndex from './images/point_forward.png';
let tabFinal=[];
let stroke_id=0;
let finalGesture =""

function App() {
  const action = document.getElementById('action');
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = "black";
      ctx.current.lineWidth = 7;
      ctx.current.lineJoin = 'round';
      var objectCoord ={
        "x": x,
        "y": y,
        "t": Date.now(),
      };
      tabFinal[stroke_id].push(objectCoord);
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, setPosition])

  const submit_canvas = () => {
    checkInputs();
    stroke_id=0;
  }

  const checkInputs = () => {
    const actionValue = action.value.trim();
    if(actionValue === ''){
        console.log(action, 'Action cannot be blank');
    }
    else {
      console.table(tabFinal);
      var dataGesture = {
        "name": actionValue,
        "subjet": "1",
        "paths": [{"label": "point_canvas", "strokes": []}]
      };
      tabFinal.forEach((stroke, strokeId) => {
        dataGesture.paths[0].strokes.push({"id": strokeId, "points": stroke})
      })
      var dataString = JSON.stringify(dataGesture);
      console.log(dataString);
      tabFinal = [];
      clear()
      finalGesture = dataString;
    }
  }

  const download = () => {
    checkInputs();
    const actionValue = action.value.trim();
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset-utf-8,' + encodeURIComponent(finalGesture));
    element.setAttribute('download', actionValue);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
    tabFinal[stroke_id]=[]
    draw(e.pageX, e.pageY)
  }

  const onMouseUp = (e) => {
    stroke_id++
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

  const swapImage = (e) => {
    let image = document.getElementById('hand');
    if (image.src.includes(LeftSwipe)){
      image.src = RightSwipe;
    }
    else{
      image.src = LeftSwipe
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <canvas
              style={{
                border: "1px solid #000"
              }}
              width={650}
              height={650}
              ref={canvasRef}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onMouseMove={onMouseMove}
          />
          </div>
          <br />

        <div>
          <img className="box2" style={{maxWidth:'100%'}} src={RightSwipe} id="hand"/>
          <img className="box2" style={{maxWidth:'100%'}} src={LeftSwipe} id="hand"/>
        </div>
      </div>
      <div className="box">
        <form>
          <input type="text" placeholder="New Action" id="action"/>
        </form>
          <button onClick={submit_canvas}>Submit</button>
          <button onClick={clear}>Clear</button>
          <button onClick={download}>Download</button>
          <button onClick={swapImage}>SwapImage</button>
      </div>
    </div>
  );
}

export default App;


