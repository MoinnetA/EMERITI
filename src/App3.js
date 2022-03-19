import React, { useCallback, useEffect, useRef, useState } from 'react';
import GestureHandler from "quantumleapjs";
import LeftSwipe from './images/flat_left.png';
import RightSwipe from './images/flat_right.png';
import ThumbUp from './images/thumb_up.png';
import PointIndex from './images/point_forward.png';
let tabFinal=[];
let stroke_id=0;
let finalGesture =""


const action = document.getElementById('action');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '/',
      type: '/',
      image: '',
      displayTime: 0,
      connected: false,
      mouseDown : false,
      lastPosition:{x:0, y:0},
      canvas:document.getElementById("myCanvas"),
      ctx:null
    };
    // Bind
    this.onGesture = this.onGesture.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.onThumb = this.onThumb.bind(this);
    this.onPoint = this.onPoint.bind(this);
    // Timer
    this.timer = null;
    // STEP 2
    this.gestureHandler = new GestureHandler();

  }

  componentDidMount() {
    // STEPS 6 and 7
    this.gestureHandler.registerGestures("dynamic", ["swipe left", "swipe right"]);

    // STEPS 9 and 10
    this.gestureHandler.registerGestures("static", ["point index", "thumb"]);

    // STEPS 5, 7, 8, 10, 11
    this.gestureHandler.addListener('gesture', (event) => {
      switch (event.gesture.name) {
        case "swipe left":
          this.onLeftSwipe();
          break;
        case "swipe right":
          this.onRightSwipe();
          break;
        case "point index":
          this.onPoint();
          break;
        case "thumb":
          this.onThumb();
          break;
        default:
          console.log("Unsupported gesture");
      }

      this.onGesture(event.gesture.type, event.gesture.name);
    });

    // STEP 12
    this.gestureHandler.addListener('connect', (event) => {
      this.setConnected(true);
    });

    // STEP 13
    this.gestureHandler.addListener('disconnect', (event) => {
      this.setConnected(false);
    });

    // STEP 3
    this.gestureHandler.connect();


    // Timer
    this.timer = setInterval(() => {
      if (this.state.displayTime > 0) {
        this.setState((prevState) => {
          return { displayTime: prevState.displayTime - 1 };
        });
      } else if (this.state.image) {
        this.setState({ name: '/', type: '/', image: '' });
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    // STEP 4
    this.gestureHandler.disconnect();

  }

  setConnected(connected) {
    this.setState({
      connected: connected,
    });
  }

  onGesture(type, name) {
    this.setState({
      name: name,
      type: type,
    });
  }

  onLeftSwipe() {
    this.setState({
      image: LeftSwipe,
      displayTime: 10,
    });
  }

  onRightSwipe() {
    this.setState({
      image: RightSwipe,
      displayTime: 10,
    });
  }

  onThumb() {
    this.setState({
      image: ThumbUp,
      displayTime: 10,
    });
  }

  onPoint() {
    this.setState({
      image: PointIndex,
      displayTime: 10,
    });
  }
  //this.gestureHandler = new GestureHandler();

  draw(x, y){
    if (this.state.mouseDown) {
      this.state.ctx.current.beginPath();
      this.state.ctx.current.strokeStyle = "black";
      this.state.ctx.current.lineWidth = 7;
      this.state.ctx.current.lineJoin = 'round';
      var objectCoord ={
        "x": x,
        "y": y,
        "t": Date.now(),
      };
      tabFinal[stroke_id].push(objectCoord);
      this.state.ctx.current.moveTo(this.state.lastPosition.x, this.state.lastPosition.y);
      this.state.ctx.current.lineTo(x, y);
      this.state.ctx.current.closePath();
      this.state.ctx.current.stroke();

      this.state.lastPosition={x, y}
    }
  }

  submit_canvas(){
    this.checkInputs();
    stroke_id=0;
  }

  checkInputs(){
    const actionValue = action.value.trim();
    if(actionValue === ''){
        console.log(action, 'Action cannot be blank');
    }
    else {
      console.table(tabFinal);
      var dataGesture = {
        "name": actionValue,
        "subjet": "1",
        "paths": [{"label": "point", "strokes": []}]
      };
      tabFinal.forEach((stroke, strokeId) => {
        dataGesture.paths[0].strokes.push({"id": strokeId, "points": stroke})
      })
      var dataString = JSON.stringify(dataGesture);
      console.log(dataString);
      tabFinal = [];
      this.clear()
      finalGesture = dataString;
    }
  }

  download(){
    this.checkInputs();
    const actionValue = action.value.trim();
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset-utf-8,' + encodeURIComponent(finalGesture));
    element.setAttribute('download', actionValue);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  clear(){
    this.state.ctx.current.clearRect(0, 0, this.state.ctx.current.canvas.width, this.state.ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
  }

  onMouseDown(e){
    this.state.lastPosition = {
      x: e.pageX,
      y: e.pageY
    }
    this.state.mouseDown = true
    tabFinal[stroke_id]=[]
    this.draw(e.pageX, e.pageY)
  }

  onMouseUp(e){
    stroke_id++
    this.state.mouseDown = false
  }

  onMouseMove(e){
    this.draw(e.pageX, e.pageY)
  }

  swapImage(e){
    let image = document.getElementById('hand');
    if (image.src.includes(LeftSwipe)){
      image.src = RightSwipe;
    }
    else{
      image.src = LeftSwipe
    }
  }
  render() {
    const { classes } = this.props;
    const { image, name, type, connected } = this.state;
    return (
      <div onload = "loaded();" className="App">
        <div className="container">
          <div className="box">
            <canvas id="myCanvas">
                style={{
                  border: "1px solid #000"
                }}
                width={650}
                height={650}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseUp}
                onMouseMove={this.onMouseMove}
            </canvas>
            </div>
            <br />

          <div className="box">
            <img style={{maxWidth:'100%'}} src={LeftSwipe} id="hand"/>
          </div>
        </div>
        <div className="box">
          <form>
            <input type="text" placeholder="New Action" id="action"/>
          </form>
            <button onClick={this.submit_canvas}>Submit</button>
            <button onClick={this.clear}>Clear</button>
            <button onClick={this.download}>Download</button>
            <button onClick={this.swapImage}>SwapImage</button>
        </div>
      </div>
    );
  }
}

export default App;


