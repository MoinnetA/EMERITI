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
import { MultiSelect } from "react-multi-select-component";

let tabFinal=[];
let stroke_id=0;
let checkList = []
let checkListAssign = {}
let gestureList = []
let recognizedActionList = []
let recognizedDeviceList = []
let deviceList = ["TV", "LampeCave", "LampeSalon", "LampeSDB", "LampeSAM", "Ordinateur", "Micro_ondes", "Machine_a_laver"]
const actionList = ["Allumer", "Eteindre", "Tout_Allumer", "Tout_Eteindre"]

let ActionsList =[
  { label: 'Turn on', value: 1 },
  { label: 'Turn Off', value: 2 },
  { label: 'Increase', value: 3 },
  { label: 'Dicrease', value: 4 },
  { label: 'Pause', value: 5 },
  { label: 'Play', value: 6 },
  { label: 'Mute', value: 7 },
  { label: 'Next', value: 8 },
]
let DevicesList =[
  { label: 'Television', value: 1 },
  { label: 'Computer', value: 2 },
  { label: 'Micro-waves', value: 3 },
  { label: 'Washing machine', value: 4 },
  { label: 'Radio', value: 5 },
  { label: 'Air Conditionner', value: 6 },
  { label: 'Fan', value: 7 },
]

let EnvironmentList =[
  { label: 'Children bedroom', value: 1 },
  { label: 'Bathroom', value: 2 },
  { label: 'Parent\'s bedrrom', value: 3 },
  { label: 'Kitchen', value: 4 },
  { label: 'Dining room', value: 5 },
  { label: 'Living room', value: 6 },
  { label: 'Office', value: 7 },
  { label: 'Laundry room', value: 7 },
]


let ParametersList =[
  { label: 'Volume', value: 1 },
  { label: 'Brightness', value: 2 },
  { label: 'Speed', value: 3 },
  { label: 'Channel', value: 4 },
  { label: 'Time', value: 5 },
  { label: 'Program', value: 6 }
]




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
      pause:true,
      turn_on:"1",
      actions:[],
      devices:[],
      environment:[],
      parameters:[]
    };
    this.canvasRef = createRef(null);
    this.ctx = createRef(null);
    this.intervalRef = createRef(null);
    // Bind
    this.onGesture = this.onGesture.bind(this);
    this.draw = this.draw.bind(this);
    this.recognize_canvas = this.recognize_canvas.bind(this);
    this.checkInputsRecord = this.checkInputsRecord.bind(this);
    this.record = this.record.bind(this);
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
    this.clearDataSet = this.clearDataSet.bind(this);
    this.macroCommand = this.macroCommand.bind(this);
    this.ModifyActionsList = this.ModifyActionsList.bind(this);
    this.ModifyDevicesList = this.ModifyDevicesList.bind(this);
    this.ModifyEnvironmentList = this.ModifyEnvironmentList.bind(this);
    this.ModifyParametersList = this.ModifyParametersList.bind(this);

    // Timer
    this.timer = null;
    // STEP 2
    this.gestureHandler = new GestureHandler();
    //this.updateCount =this.updateCount.bind(this);

  }

  setData(){
    console.log("checkListAssign for setData:", checkListAssign)
    localStorage.setItem('checkListAssign', JSON.stringify(checkListAssign));
    localStorage.setItem('checkList', JSON.stringify(checkList));
  }

  getData(){
    let checkListAssignData = localStorage.getItem('checkListAssign');
    checkListAssignData = JSON.parse(checkListAssignData);
    if(checkListAssignData === null){
      checkListAssign = {}
    }
    else{
      checkListAssign = checkListAssignData
    }

    let checkListData = localStorage.getItem('checkList');
    checkListData = JSON.parse(checkListData);
    if(checkListData === null){
      checkList = []
    }
    else{
      checkList = checkListData
    }
    console.log("checkListAssign for getData:", checkListAssign)
    console.log("checkList for getData:", checkList)
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
    this.gestureHandler.registerGestures("dynamic", this.state.checked);

    // STEPS 5, 7, 8, 10, 11
    this.gestureHandler.addListener('gesture', (event) => {
      if (checkList.includes(event.gesture.name)) {
        console.log("NOW, IT'S %s", event.gesture.name)
        try {
          if (checkListAssign.hasOwnProperty(event.gesture.name)) {
            if (deviceList.includes(checkListAssign[event.gesture.name])) {
              recognizedDeviceList.push(checkListAssign[event.gesture.name])
            } else if (actionList.includes(checkListAssign[event.gesture.name])) {
              recognizedActionList.push(checkListAssign[event.gesture.name])
            } else {
              console.log("error gesture recognize");
            }
            console.log("recognizedDeviceList:", recognizedDeviceList)
            console.log("recognizedActionList:", recognizedActionList)
          }
        } catch (error) {
          console.log(error)
        }
        if(recognizedActionList.length!==0) {
          for (let i = 0; i < recognizedActionList.length; i++) {
            console.log("action:", recognizedActionList[i])
            if (recognizedActionList[i] === "Allumer") {
              this.setState({
                turn_on: "1"
              })
              for (const device of recognizedDeviceList) {
                try {
                  console.log("device:", device)
                  let image = document.getElementById(device);
                  image.style.opacity = this.state.turn_on;
                } catch (error) {
                  console.log(error)
                }
              }
            }
            else if (recognizedActionList[i] === "Eteindre") {
              this.setState({
                turn_on: "0"
              })
              for (const device of recognizedDeviceList) {
                try {
                  console.log("device:", device)
                  let image = document.getElementById(device);
                  image.style.opacity = this.state.turn_on;
                } catch (error) {
                  console.log(error)
                }
              }
            }
            else if (recognizedActionList[i] === "Tout_Allumer") {
              for (const device of deviceList) {
                try {
                  console.log("device:", device)
                  let image = document.getElementById(device);
                  image.style.opacity = "1";
                } catch (error) {
                  console.log(error)
                }
              }
            }
            else if (recognizedActionList[i] === "Tout_Eteindre") {
              for (const device of deviceList) {
                try {
                  console.log("device:", device)
                  let image = document.getElementById(device);
                  image.style.opacity = "0";
                } catch (error) {
                  console.log(error)
                }
              }
            }
            else {
              console.log("No action")
            }
          }
        }
        else{
          var lastGesture = recognizedDeviceList[recognizedDeviceList.length-1];
          try {
            console.log("device with no action:", lastGesture)
            let image = document.getElementById(lastGesture);
            if(image.style.opacity === "1"){
              image.style.opacity = "0"
            }
            else{
              image.style.opacity ="1"
            }
          } catch (error) {
            console.log(error)
          }
        }
      } else {
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
    this.gestureHandler.registerGestures("dynamic", this.state.checked);
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
    gestureList = []
    this.clear()
    stroke_id=0;
  }


  checkInputsRecord(){
    const actionValue = this.action.value.trim();
    if(actionValue === ''){
        console.log(this.action, 'Action cannot be blank');
    }
    else {
      var dataGestureRecord = {
          "name":actionValue,
          "subjet":"1",
          "paths":[{"label":"point", "strokes":[]}]
      };

      tabFinal.forEach((stroke, strokeId) => {dataGestureRecord.paths[0].strokes.push({"id": strokeId, "points": stroke})})
      var dataStringRecord = JSON.stringify(dataGestureRecord);
      tabFinal = [];
      this.clear()
      return dataStringRecord;
    }
  }

  record(){
    var dataStringRecord = this.checkInputsRecord();
    const actionValue = this.action.value.trim();
    this.gestureHandler.addNewGesture(dataStringRecord, actionValue.toLowerCase());
    if(!checkList.includes(actionValue.toUpperCase())){
       checkList.push(actionValue.toUpperCase());
    }
    if(!checkListAssign.hasOwnProperty(actionValue.toUpperCase())) {
      console.log("It's in")
      const table = document.getElementById("target")
      const item = {nameGesture: actionValue.toUpperCase(), actionGesture: this.state.action}
      let row = table.insertRow();
      let nameGesture = row.insertCell(0);
      nameGesture.innerHTML = item.nameGesture;
      let actionGesture = row.insertCell(1);
      actionGesture.innerHTML = item.actionGesture;
    }
    checkListAssign[actionValue.toUpperCase()] = this.state.action;
    if(!checkList.includes(actionValue.toUpperCase()))
      checkList.push(actionValue.toUpperCase())
    console.log("checkListAssign:", checkListAssign)
    console.log("checkList:", checkList)
    this.setData()
  }

  macroCommand(){
    var dataStringRecord = this.checkInputsRecord();
    const actionValue = this.action.value.trim();
    this.gestureHandler.addNewGesture(dataStringRecord, actionValue.toLowerCase());
    if(!checkList.includes(actionValue.toUpperCase())){
       checkList.push(actionValue.toUpperCase());
    }
    if(!checkListAssign.hasOwnProperty(actionValue.toUpperCase())) {
      console.log("It's in")
      const table = document.getElementById("target")
      const item = {nameGesture: actionValue.toUpperCase(), actionGesture: this.state.action}
      let row = table.insertRow();
      let nameGesture = row.insertCell(0);
      nameGesture.innerHTML = item.nameGesture;
      let actionGesture = row.insertCell(1);
      actionGesture.innerHTML = item.actionGesture;
    }
    checkListAssign[actionValue.toUpperCase()] = this.state.action;
    if(!checkList.includes(actionValue.toUpperCase()))
      checkList.push(actionValue.toUpperCase())
    console.log("checkListAssign:", checkListAssign)
    console.log("checkList:", checkList)
    this.setData()
  }

  clear(){
    this.ctx.current.clearRect(0, 0, this.ctx.current.canvas.width, this.ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
    recognizedActionList = []
    recognizedDeviceList = []
    this.setState({
      count:2
    })
  }

  clearEverything(){
    this.clear()
    gestureList = []
    checkListAssign = {}
    checkList = []
    this.setData()
    this.updateCheckListAssign()
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
    this.gestureHandler.registerGestures("dynamic", this.state.checked);
  }

  getSelectValue(){
    var selectedValue = document.getElementById("list").value;
    console.log("selectedValue:", selectedValue)
    this.setState({

      action: selectedValue
    })
  }

  fmt(s){
    return s
  }

  updateCheckListAssign(){
    const table = document.getElementById("target")
    for(const i in checkListAssign){
      const item = { nameGesture: i, actionGesture: checkListAssign[i] }
      let row = table.insertRow();
      let nameGesture = row.insertCell(0);
      nameGesture.innerHTML = item.nameGesture;
      let actionGesture = row.insertCell(1);
      actionGesture.innerHTML = item.actionGesture;
    }
  }


  // updateCheckListAssign(){
  //   document.getElementById("target").innerHTML="<tr>\n" +
  //       " <th>#</th>\n" +
  //       " <th>Nom du geste</th>\n" +
  //       " <th>Action</th>\n" +
  //       " </tr>"
  //   var iter = 1
  //   for(const i in checkListAssign){
  //     document.getElementById("target").innerHTML+="<tr>\n" +
  //       " <td>"+iter+"</td>\n" +
  //       " <td>"+i+"</td>\n" +
  //       " <td>"+checkListAssign[i]+"</td>\n" +
  //       " </tr>"
  //     iter+=1;
  //   }
  // }

  clearDataSet(){
    this.clearEverything()
    this.gestureHandler.clearDataset()
  }

  ModifyActionsList(event){
    this.setState({
     actions:event
    })
  }
  ModifyDevicesList(event){
    this.setState({
     devices:event
    })
  }
  ModifyEnvironmentList(event){
    this.setState({
     environment:event
    })
  }
  ModifyParametersList(event){
    this.setState({
     parameters:event
    })
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
          </div>
          <br />
          <div className="box">
            <h1 className={"h1"}>Smart home</h1>
            <img className="overlay" style={{maxWidth:'100%'}} src={House} alt={"HOUSE"}/>
            <img className="overlay" style={{opacity:"0"}} src={TV} id="TV" alt={"TV"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeCave} id="LampeCave" alt={"LampeCave"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSalon} id="LampeSalon" alt={"LampeSalon"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSDB} id="LampeSDB" alt={"LampeSDB"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSAM} id="LampeSAM" alt={"LampeSAM"}/>
            <img className="overlay" style={{opacity:"0"}} src={Ordinateur} id="Ordinateur" alt={"Ordinateur"}/>
            <img className="overlay" style={{opacity:"0"}} src={Micro_ondes} id="Micro_ondes" alt={"Micro_ondes"}/>
            <img className="overlay" style={{opacity:"0"}} src={Machine_a_laver} id="Machine_a_laver" alt={"Machine_a_laver"}/>
            
          </div>
      </div>
      <div className="container">
        <div className="box2">
              <div className={"time before next gesture"}>Timer : {this.fmt(this.state.count)}</div>
          <form className={"container"}>
            <div className={"box"}>
              <label className="custom-field one">
                <input className={"textArea"} type="text" placeholder=" " id="action"/>
                <span className="placeholder">Name of the gesture</span>
              </label>
            </div>
            <div className={"list"}>

            <MultiSelect options={ActionsList}
              value={this.state.actions}
              onChange={this.ModifyActionsList}
              labelledBy="Action"
              isCreatable={true}/>
            </div>

            <div className={"list"}>
            <MultiSelect options={DevicesList}
              value={this.state.devices}
              onChange={this.ModifyDevicesList}
              labelledBy="Device"
              isCreatable={true}/>
            </div>
            <div className={"list"}>
            <MultiSelect options={EnvironmentList}
              value={this.state.environment}
              onChange={this.ModifyEnvironmentList}
              labelledBy="Environment"
              isCreatable={true}/>
            </div>
            <div className={"list"}>
              <MultiSelect options={ParametersList}
                value={this.state.parameters}
                onChange={this.ModifyParametersList}
                labelledBy="Environment"
                isCreatable={true}/>
            </div>
          <button className={"button"} onClick={this.record}>Record</button>

            <div className={"box"}>
              <div className="select">

                <select className={"format"} id={"list"} onChange={this.getSelectValue}>
                  <option selected disabled>Choose an action</option>
                  <optgroup label="Actions">
                    <option value={"Allumer"}>Allumer</option>
                    <option value={"Eteindre"}>Eteindre</option>
                    <option value={"Tout_Allumer"}>Tout Allumer</option>
                    <option value={"Tout_Eteindre"}>Tout Eteindre</option>
                  </optgroup>
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
              </div>
            </div>
          </form>
          <button className={"button"} onClick={this.recognize_canvas}>Recognize</button>
          <button className={"button"} onClick={this.clear}>Clear</button>
          <button className={"button"} onClick={this.macroCommand}>Macro-Command</button>
          

          <div >
          <h1>Table of gestures</h1>
          {/* <button className={"button"} onClick={this.clearEverything}>Clear Everything</button> */}
          <button className={"button"} onClick={this.clearDataSet}>Clear Dataset</button>
          <table className={"content-table"} id={"target"}>
            <tr>
            <th>Name of gesture</th>
            <th>Actions</th>
            <th>Devices</th>
            <th>Environments</th>
            <th>Parameters</th>
            </tr>
          </table>
          </div>
        </div>
      </div>
      
    </div>
    
    
  );
  }
}

export default App;


