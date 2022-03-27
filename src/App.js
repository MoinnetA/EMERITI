import React, {createRef} from 'react';
import GestureHandler from "quantumleapjs";
import TV from './images/TV.png';
import House from './images/house.png';
import LampeCave from './images/lampeCave.png';
import LampeSalon from './images/lampeSalon.png';
import LampeSDB from './images/lampeSDB.png';
import LampeSAM from './images/lampeSAM.png';
import Ordinateur from './images/ordi.png';
import Micro_ondes from './images/microOnde.png';
import Machine_a_laver from './images/machineALaver.png';

let tabFinal=[];
let stroke_id=0;
let checkList = []
let checkListAssign = {}
let gestureList = []


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
      checked: [],
      action:"",
      count:2,
      pause:true
    };
    this.canvasRef = createRef(null);
    this.ctx = createRef(null);
    this.intervalRef = createRef(null);
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
    this.handleCheck = this.handleCheck.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
    this.fmt = this.fmt.bind(this);
    this.clearEverything = this.clearEverything.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.updateCheckListAssign = this.updateCheckListAssign.bind(this);

    // Timer
    this.timer = null;
    // STEP 2
    this.gestureHandler = new GestureHandler();
    //this.updateCount =this.updateCount.bind(this);

  }

  setData(){
    console.log("checkListAssign for setData:", checkListAssign)
    localStorage.setItem('myData', JSON.stringify(checkListAssign));
  }

  getData(){
    let data = localStorage.getItem('myData');
    data = JSON.parse(data);
    checkListAssign = data
    console.log("checkListAssign for getData:", checkListAssign)
  }

  componentDidMount() {
    this.getData()
    this.updateCheckListAssign();
    this.timer= setInterval(() =>{
      if(!this.state.pause && this.state.count !== 0) {
        this.setState({
          count: this.state.count - 1
        })
      }
    },1000)
    if (this.canvasRef.current) {
      this.ctx.current = this.canvasRef.current.getContext('2d');
    }
    this.action = document.getElementById('action');
    // STEPS 6 and 7
    this.setState({
      checked:checkList
    })
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
          try {
            //console.log("checkListAssign:", checkListAssign)
            if(checkListAssign.hasOwnProperty(event.gesture.name)) {
              let image = document.getElementById(checkListAssign[event.gesture.name]);
              if (image.style.opacity === "0") {
                image.style.opacity = "1";
              } else {
                image.style.opacity = "0";
              }
            }
            
          } catch (error) {
            console.log(error)
          }
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
      this.ctx.current.moveTo(this.state.lastPosition.x-10, this.state.lastPosition.y-10);
      this.ctx.current.lineTo(x-10, y-10);
      this.ctx.current.closePath();
      this.ctx.current.stroke();
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
    if(tabFinal.length!==0) {
      gestureList.push(tabFinal)
      this.clear()
    }
    for(const gest of gestureList) {
      var dataGesture = {
        "name": "",
        "subjet": "1",
        "paths": {"point_lmc": {"label": "point_lmc", "strokes": []}}
      };
      gest.forEach((stroke, strokeId) => {
        dataGesture.paths["point_lmc"].strokes.push({"id": strokeId, "points": stroke})
      })
      this.gestureHandler.sendGestures(dataGesture);
    }
    tabFinal = [];
    gestureList = []
    this.clear()
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
    checkListAssign[actionValue.toUpperCase()] = this.state.action;
    this.setData()
    this.updateCheckListAssign()

  }

  clear(){
    this.ctx.current.clearRect(0, 0, this.ctx.current.canvas.width, this.ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
    this.setState({
      count:2
    })
  }

  clearEverything(){
    this.clear()
    gestureList = []
    checkListAssign = {}
    this.setData()
  }

  onMouseDown(e){
    if(this.state.count===0){
      if(tabFinal.length!==0) {
        gestureList.push(tabFinal)
        this.clear()
      }
    }
    this.setState({
      lastPosition:{x:e.pageX, y:e.pageY},
      mouseDown:true,
      count:2,
      pause:true
    });
    tabFinal[stroke_id]=[]
    this.draw(e.pageX, e.pageY)
  }

  onMouseUp(e){
    stroke_id++
    this.setState({
      mouseDown:false,
      pause:false
    });
  }

  onMouseMove(e){
    this.draw(e.pageX, e.pageY)
  }

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

  getSelectValue(){
    var selectedValue = document.getElementById("list").value;
    this.setState({
      action: selectedValue
    })
    console.log("selectedValue:", selectedValue)
  }

  fmt(s){
    return (s-(s%=60))/60+(9<s?':':':0')+s}

  updateCheckListAssign(){
    document.getElementById("target").innerHTML="<thead><tr><th>Name Gesture</th><th>Action</th></tr></thead>"
    for(const i in checkListAssign){
      document.getElementById("target").innerHTML+="<tbody><tr><td>"+i+"</td><td>"+checkListAssign[i]+"</td></tr></tbody>";
    }
  }

  render() {
    return (
      <div className="App">
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
            <> {this.fmt(this.state.count)}
            </>
          </div>
          <br />
          <div className="box">
            <img className="overlay" style={{maxWidth:'100%'}} src={House} alt={"HOUSE"}/>
            <img className="overlay" src={TV} id="TV" alt={"TV"}/>
            <img className="overlay" src={LampeCave} id="LampeCave" alt={"LampeCave"}/>
            <img className="overlay" src={LampeSalon} id="LampeSalon" alt={"LampeSalon"}/>
            <img className="overlay" src={LampeSDB} id="LampeSDB" alt={"LampeSDB"}/>
            <img className="overlay" src={LampeSAM} id="LampeSAM" alt={"LampeSAM"}/>
            <img className="overlay" src={Ordinateur} id="Ordinateur" alt={"Ordinateur"}/>
            <img className="overlay" src={Micro_ondes} id="Micro_ondes" alt={"Micro_ondes"}/>
            <img className="overlay" src={Machine_a_laver} id="Machine_a_laver" alt={"Machine_a_laver"}/>
          </div>

      </div>
      <div className="container">
        <div className="box2">
          <form>
            <input className={"button"} type="text" placeholder="New Action" id="action"/>
            <select className={"button"} id={"list"} onChange={this.getSelectValue}>
              <optgroup label="Appareils connectés">
                <option value={"TV"}>TV</option>
                <option value={"LampeCave"}>Lampe Cave</option>
                <option value={"LampeSalon"}>Lampe Salon</option>
                <option value={"LampeSDB"}>Lampe Salle de bain</option>
                <option value={"Ordinateur"}>Ordinateur</option>
                <option value={"Micro_ondes"}>Micro-ondes</option>
                <option value={"Machine_a_laver"}>Machine à laver</option>
                <option value={"LampeSAM"}>Lampe Salle à manger</option>
              </optgroup>
            </select>
          </form>
          <button className={"button"} onClick={this.recognize_canvas}>Recognize</button>
          <button className={"button"} onClick={this.clear}>Clear</button>
          <button className={"button"} onClick={this.download}>Download</button>
          <button className={"button"} onClick={this.clearEverything}>Clear Everything</button>
          <table className={"styled-table"} id={"target"} border={"1"}></table>
        </div>
        <div className="box2">
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
      </div>
    </div>
  );
  }
}

export default App;


