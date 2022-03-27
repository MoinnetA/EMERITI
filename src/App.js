import React, {createRef} from 'react';
import GestureHandler from "quantumleapjs";
import TV from './images/TV.png';
import House from './images/house.png';
let tabFinal=[];
let stroke_id=0;
let checkList = []


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '/',
      type: '/',
      image: '',
      displayTime: 0,
      connected: false,
      mouseDown: false,
      lastPosition: {x:0, y:0},
      checked: []
    };
    this.canvasRef = createRef(null);
    this.ctx = createRef(null);
    // Bind
    this.onGesture = this.onGesture.bind(this);
    this.draw = this.draw.bind(this);
    this.recognize_canvas = this.recognize_canvas.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.checkInputsDownload = this.checkInputsDownload.bind(this);
    this.download = this.download.bind(this);
    this.clear = this.clear.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.swapTV = this.swapTV.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    // Timer
    this.timer = null;
    // STEP 2
    this.gestureHandler = new GestureHandler();

  }

  componentDidMount() {
    if (this.canvasRef.current) {
      this.ctx.current = this.canvasRef.current.getContext('2d');
    }
    this.action = document.getElementById('action');
    // STEPS 6 and 7
    this.gestureHandler.registerGestures("dynamic", this.state.checked.concat(["information"]));

    // STEPS 5, 7, 8, 10, 11
    this.gestureHandler.addListener('gesture', (event) => {
      if(checkList.includes(event.gesture.name) || (event.gesture.name === "information")){
        if(event.gesture.name === "information"){
          for(const [key, value] of event.gesture.data.allDirectory.entries()) {
            if (!checkList.includes(value)) {
              checkList.push(value);
            }
          }
        }
        else{
          console.log("NOW, IT'S %s", event.gesture.name)
        }
      }
      else{
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

  draw(x, y){
    if (this.state.mouseDown) {
      this.ctx.current.beginPath();
      this.ctx.current.strokeStyle = "black";
      this.ctx.current.lineWidth = 7;
      this.ctx.current.lineJoin = 'round';
      var objectCoord ={
        "x": x,
        "y": y,
        "t": Date.now(),
      };
      tabFinal[stroke_id].push(objectCoord);
      this.ctx.current.moveTo(this.state.lastPosition.x, this.state.lastPosition.y);
      this.ctx.current.lineTo(x, y);
      this.ctx.current.closePath();
      this.ctx.current.stroke();

      //this.state.lastPosition={x, y}
      this.setState({
        lastPosition:{x, y}
      });
    }
  }

  recognize_canvas(){
    this.gestureHandler.registerGestures("dynamic", this.state.checked.concat(["information"]));
    this.checkInputs();
    stroke_id=0;
  }

  checkInputs(){
    var dataGesture = {
      "name": "",
      "subjet": "1",
      "paths": {"point_lmc":{"label": "point_lmc", "strokes": []}}
    };
    tabFinal.forEach((stroke, strokeId) => {
      dataGesture.paths["point_lmc"].strokes.push({"id": strokeId, "points": stroke})
    })
    tabFinal = [];
    this.clear()
    this.gestureHandler.sendGestures(dataGesture);
  }

  checkInputsDownload(){
    const actionValue = this.action.value.trim();
    if(actionValue === ''){
        console.log(this.action, 'Action cannot be blank');
    }
    else {
      var dataGestureDownload = {
          "name":actionValue,
          "subjet":"1",
          "paths":[{"label":"point", "strokes":[]}]
      };

      tabFinal.forEach((stroke, strokeId) => {dataGestureDownload.paths[0].strokes.push({"id": strokeId, "points": stroke})})
      var dataStringDownload = JSON.stringify(dataGestureDownload);
      tabFinal = [];
      this.clear()
      return dataStringDownload;
    }
  }

  download(){
    var dataStringDownload = this.checkInputsDownload();
    const actionValue = this.action.value.trim();
    this.gestureHandler.addNewGesture(dataStringDownload, actionValue.toLowerCase());
    if(!checkList.includes(actionValue.toUpperCase())){
      checkList.push(actionValue.toUpperCase());
    }

    // var path = "C:" + File.separator + "hello" + File.separator + "hi.txt";
    // // Use relative path for Unix systems
    // var f = new File(path);
    //
    // f.getParentFile().mkdirs();
    // f.createNewFile();

    // var file = new File([finalGesture], 'sample.txt', {
    //   lastModified: new Date(0), // optional - default = now
    //   type: "overide/mimetype" // optional - default = ''
    // });

  }

  clear(){
    this.ctx.current.clearRect(0, 0, this.ctx.current.canvas.width, this.ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
  }

  onMouseDown(e){
    this.setState({
      lastPosition:{x:e.pageX, y:e.pageY},
      mouseDown:true
    });
    tabFinal[stroke_id]=[]
    this.draw(e.pageX, e.pageY)
  }

  onMouseUp(e){
    stroke_id++
    this.setState({
      mouseDown:false
    });
  }

  onMouseMove(e){
    this.draw(e.pageX, e.pageY)
  }

  swapTV(e) {
    let image = document.getElementById('television');
    console.log(image.style.opacity )
    if (image.style.opacity === "0"){
      image.style.opacity = "1";
    }
    else{
      image.style.opacity = "0";
    }
  }

  
  /* const swapLightSDB = (e) => {
    let image = document.getElementById('lightSDB');
    if (image.src.includes(lightSDB0)){
      image.src = lightSDB1;
    }
    else{
      image.src = lightSDB0
    }
  } */

  handleCheck(e){
    var updatedList = [...this.state.checked];
    if (e.target.checked) {
      updatedList = [...this.state.checked, e.target.value];
    } else {
      updatedList.splice(this.state.checked.indexOf(e.target.value), 1);
    }
    this.setState({
      checked:updatedList
    });
    this.gestureHandler.registerGestures("dynamic", this.state.checked.concat(["information"]));
  }

  render() {
    return (
      <div onload = "loaded();" className="App">
        <div className="container">
          <div className="box">
            <canvas id="myCanvas" ref={this.canvasRef}
                style={{
                  border: "1px solid #000"
                }}
                width={650}
                height={650}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseUp}
                onMouseMove={this.onMouseMove}>
            </canvas>
            </div>
            <br />
            <div class="box2">
              <img className="television" style={{maxWidth:'100%'}} src={House}/>
              <img className="television" src={TV} id="television"/>
            </div>

        </div>
        <div className="box">
          <form>
            <input type="text" placeholder="New Action" id="action"/>
          </form>
            <button onClick={this.recognize_canvas}>Recognize</button>
            <button onClick={this.clear}>Clear</button>
            <button onClick={this.download}>Download</button>
            <button onClick={this.swapTV}>swapTV</button>
        </div>
        <div className="checkList">
          <div className="title">Your CheckList:</div>
          <div className="list-container">
            {checkList.map((item, index) => (
               <div key={index}>
                 <input value={item} type="checkbox" onChange={this.handleCheck} />
                 <span>{item}</span>
               </div>
            ))}
          </div>
          <br />
        <div>
          {`Items checked are: ${this.state.checked}`}
        </div>

        
      </div>
     
    </div>
  );
  }
}

export default App;


