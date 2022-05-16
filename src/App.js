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

let ActionsList =[
  { label: 'Turn On', value: 1 },
  { label: 'Turn Off', value: 2 },
  { label: 'Increase', value: 3 },
  { label: 'Decrease', value: 4 },
  { label: 'Pause', value: 5 },
  { label: 'Play', value: 6 },
  { label: 'Mute', value: 7 },
  { label: 'Next', value: 8 }
]
let MacrosList =[]

let DevicesList =[
  { label: 'Air Conditionner', value: 1 , disabled: false},
  { label: 'Computer', value: 2 , disabled: false},
  { label: 'Fan', value: 3 , disabled: false},
  { label: 'Ligth', value: 4 , disabled: false},
  { label: 'Micro-waves', value: 5 , disabled: false},
  { label: 'Radio', value: 6 , disabled: false},
  { label: 'Television', value: 7 , disabled: false},
  { label: 'Washing machine', value: 8 , disabled: false},
]

let EnvironmentList =[
  { label: 'Bathroom', value: 1 , disabled: false},
  { label: 'Children bedroom', value: 2 , disabled: false},
  { label: 'Dining room', value: 3 , disabled: false},
  { label: 'Kitchen', value: 4 , disabled: false},
  { label: 'Laundry room', value: 5 , disabled: false},
  { label: 'Living room', value: 6 , disabled: false},
  { label: 'Office', value: 7 , disabled: false},
  { label: 'Parent\'s bedroom', value: 8 , disabled: false},
]

let ParametersList =[
  { label: 'Brightness', value: 1 , disabled: false},
  { label: 'Channel', value: 2 , disabled: false},
  { label: 'Program', value: 3 , disabled: false},
  { label: 'Speed', value: 4 , disabled: false},
  { label: 'Time', value: 5 , disabled: false},
  { label: 'Volume', value: 6 , disabled: false},
]


const actionsRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label+ ", ")
    : "Actions";
};
const DevicesRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label+ ", ")
    : "Devices";
};
const EnvironmentRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label+ ", ")
    : "Environments";
};
const parametersRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label+ ", ")
    : "Parameters";
};
const MacroRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label+ ", ")
    : "Macro-commandes";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '/',
      type: '/',
      image: '',
      visible: true,
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
      parameters:[],
      macros:[],
      macro_instruction:[]
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
    this.ModifyMacrosList = this.ModifyMacrosList.bind(this);
    this.dynamicActionsList = this.dynamicActionsList.bind(this);
    this.add_instruction = this.add_instruction.bind(this);
    this.dynamicDevicesList = this.dynamicDevicesList.bind(this);
    this.toggleTable = this.toggleTable.bind(this);
    this.toggleNumber = this.toggleNumber.bind(this);

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
    console.log("checkListAssignData: ", checkListAssignData)
    checkListAssignData = JSON.parse(checkListAssignData);
    if(checkListAssignData === null){
      checkListAssign = {}
    }
    else{
      checkListAssign = checkListAssignData
    }

    let checkListData = localStorage.getItem('checkList');
    console.log("checkListData: ", checkListData)
    checkListData = JSON.parse(checkListData);
    if(checkListData === null){
      checkList = []
    }
    else{
      checkList = checkListData
    }
    console.log("checkListAssign for getData:", checkListAssign)
    console.log("checkList for getData:", checkList)
    for(let i=0;i<checkList.length;i++){
      MacrosList=MacrosList.concat({label:checkList[i],value:i})
    }
    this.setState({
      checked:checkList
    })
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
    this.number = document.getElementById('number');
    // STEPS 6 and 7
    this.gestureHandler.registerGestures("dynamic", this.state.checked);

    // STEPS 5, 7, 8, 10, 11
    this.gestureHandler.addListener('gesture', (event) => {
      if (checkListAssign.hasOwnProperty(event.gesture.name)) {
        console.log("NOW, IT'S %s", event.gesture.name)
        let macroList = checkListAssign[event.gesture.name]
        console.log("macroList: ", macroList)
        console.log("macroList[0]: ", macroList[0])
        let macroActionList = macroList[0].split(', ')
        console.log("macroActionList: ", macroActionList)
        let macroDeviceList = macroList[1].split(', ')
        console.log("macroDeviceList: ", macroDeviceList)
        for(const macro_action of macroActionList){
          console.log("macro_action: ", macro_action)
          if(macro_action==="Turn On"){
            this.setState({
              turn_on: "1"
            }, function (){
              console.log("macro Turn On")
            })
          }
          else if(macro_action==="Turn Off"){
            this.setState({
              turn_on: "0"
            }, function (){
              console.log("macro Turn Off")
            })
          }
        }
        for(const macro_device of macroDeviceList){
          let image = document.getElementById(macro_device);
          image.style.opacity = this.state.turn_on;
        }

        // try {
        //   if (checkListAssign.hasOwnProperty(event.gesture.name)) {
        //     if (deviceList.includes(checkListAssign[event.gesture.name])) {
        //       recognizedDeviceList.push(checkListAssign[event.gesture.name])
        //     } else if (actionList.includes(checkListAssign[event.gesture.name])) {
        //       recognizedActionList.push(checkListAssign[event.gesture.name])
        //     } else {
        //       console.log("error gesture recognize");
        //     }
        //     console.log("recognizedDeviceList:", recognizedDeviceList)
        //     console.log("recognizedActionList:", recognizedActionList)
        //     console.log("checkListAssign:", checkListAssign)
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
        // if(recognizedActionList.length!==0) {
        //   for (let i = 0; i < recognizedActionList.length; i++) {
        //     console.log("action:", recognizedActionList[i])
        //     if (recognizedActionList[i] === "Turn On") {
        //       this.setState({
        //         turn_on: "1"
        //       })}
        //     else if (recognizedActionList[i] === "Turn Off") {
        //     this.setState({
        //       turn_on: "0"
        //     })}
        //     for (let j = 0; j < this.state.devices.length; j++){
        //       try {
        //         console.log("device:", this.state.devices[j])
        //         let image = document.getElementById(this.state.devices[j].label);
        //         image.style.opacity = this.state.turn_on;
        //       } catch (error) {
        //         console.log(error)
        //       }
        //     }
        //   }
        // }
        // else{
        //   var lastGesture = recognizedDeviceList[recognizedDeviceList.length-1];
        //   try {
        //     console.log("device with no action:", lastGesture)
        //     let image = document.getElementById(lastGesture);
        //     if(image.style.opacity === "1"){
        //       image.style.opacity = "0"
        //     }
        //     else{
        //       image.style.opacity ="1"
        //     }
        //   } catch (error) {
        //     console.log(error)
        //   }
        // }
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
      this.ctx.current.moveTo(this.state.lastPosition.x-10, this.state.lastPosition.y-67);
      this.ctx.current.lineTo(x-10, y-67);
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

    let a=""
    let d=""
    let e=""
    let p=""
    
    if(!this.state.actions[0]){
      a = "-"
    }
    else{
      for(let i = 0; i<this.state.actions.length-1; i++){
        a = a.concat(this.state.actions[i].label+", ")
      }
      a = a.concat(this.state.actions[this.state.actions.length-1].label)
    }

    if(!this.state.devices[0]){
      d = "-"
    }
    else{      
      for(let i = 0; i<this.state.devices.length-1; i++){
        d = d.concat(this.state.devices[i].label+", ")
      }
      d = d.concat(this.state.devices[this.state.devices.length-1].label)
    }
    
    if(!this.state.environment[0]){
      e = "-"
    }
    else{
      for(let i = 0; i<this.state.environment.length-1; i++){
        e = e.concat(this.state.environment[i].label+", ")
      }
      e = e.concat(this.state.environment[this.state.environment.length-1].label)
    }
    
    if(!this.state.parameters[0]){
      p = "-"
    }
    else{
      for(let i = 0; i<this.state.parameters.length-1; i++){
        p = p.concat(this.state.parameters[i].label+", ")
      }
      p = p.concat(this.state.parameters[this.state.parameters.length-1].label)
    }

    if(!checkList.includes(actionValue.toUpperCase())){
       checkList.push(actionValue.toUpperCase());
       
    }
    if(!checkListAssign.hasOwnProperty(actionValue.toUpperCase())) {
      console.log("It's in")
      const table = document.getElementById("target")
      const item = {nameGesture: actionValue.toUpperCase(), actionGesture: a,devicesGesture: d,EnvironmentGesture: e,ParametersGesture: p}
      let row = table.insertRow();
      let nameGesture = row.insertCell(0);
      nameGesture.innerHTML = item.nameGesture;
      let actionGesture = row.insertCell(1);
      actionGesture.innerHTML = item.actionGesture;
      let devicesGesture = row.insertCell(2);
      devicesGesture.innerHTML = item.devicesGesture;
      let EnvironmentGesture = row.insertCell(3);
      EnvironmentGesture.innerHTML = item.EnvironmentGesture;
      let ParametersGesture = row.insertCell(4);
      ParametersGesture.innerHTML = item.ParametersGesture;
    }
    console.log(a,d,e,p)
    checkListAssign[actionValue.toUpperCase()] = [a,d,e,p];
    if(!checkList.includes(actionValue.toUpperCase()))
      checkList.push(actionValue.toUpperCase())
    console.log("checkListAssign:", checkListAssign)
    console.log("checkList:", checkList)
    this.setData()
    MacrosList=MacrosList.concat({label:actionValue.toUpperCase(),value:checkList.length})
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
      actionGesture.innerHTML = item.actionGesture[0];
      let devicesGesture = row.insertCell(2);
      devicesGesture.innerHTML = item.actionGesture[1];
      let EnvironmentGesture = row.insertCell(3);
      EnvironmentGesture.innerHTML = item.actionGesture[2];
      let ParametersGesture = row.insertCell(4);
      ParametersGesture.innerHTML = item.actionGesture[3];
    }
  }

  clearDataSet(){
    this.clearEverything()
    this.gestureHandler.clearDataset()
    window.location.reload();
  }

  ModifyActionsList(event){
    this.setState({
     actions:event
    },function(){this.dynamicActionsList(this.state.actions)})


  }

  dynamicActionsList(event){
    if(!event[0]){
      for(let j=0;j<DevicesList.length;j++){
        DevicesList[j].disabled=false
      }
    }
    else{
      for(let j=0;j<DevicesList.length;j++){
        DevicesList[j].disabled=false
      }

      for(let i = 0; i<event.length; i++){
        if(event[i].label==="Increase" || event[i].label==="Dicrease"){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Micro-waves" || label==="Fan" ){
              DevicesList[j].disabled=true
            }
          }
        }
        if(event[i].label==="Pause" || event[i].label==="Play"){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Computer" || label==="Micro-waves" || label==="Washing machine" || label==="Radio" || label==="Air Conditionner" || label==="Fan" ){
              DevicesList[j].disabled=true
            }
          }
        }
        if(event[i].label==="Mute" ){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Micro-waves" || label==="Washing machine" || label==="Air Conditionner" || label==="Fan" ){
              DevicesList[j].disabled=true
            }
          }
        }
        if(event[i].label==="Next" ){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Micro-waves" || label==="Computer" || label==="Fan" ){
              DevicesList[j].disabled=true
            }
          }
        }
      }
    }
  }

  ModifyDevicesList(event){
    this.setState({
     devices:event
    },function(){this.dynamicDevicesList(this.state.devices)})
  }

  dynamicDevicesList(event){
    if(!event[0]){
      for(let j=0;j<EnvironmentList.length;j++){
        EnvironmentList[j].disabled=false
      }
      for(let j=0;j<ParametersList.length;j++){
        ParametersList[j].disabled=false
      }
    }
    else{
      for(let j=0;j<EnvironmentList.length;j++){
        EnvironmentList[j].disabled=false
      }
      for(let j=0;j<ParametersList.length;j++){
        ParametersList[j].disabled=false
      }
    }

    for(let j=0;j<event.length;j++){
      let label =event[j].label
      console.log(label)
      if(event[j].disabled!==true){
        if(label==="Micro-waves"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Kitchen"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Speed" || ParametersList[i].label==="Volume" || ParametersList[i].label==="Channel"|| ParametersList[i].label==="Brightness"){
              ParametersList[i].disabled=true
            }
          }
        }
        if(label==="Washing machine"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Laundry room"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Speed" || ParametersList[i].label==="Volume" || ParametersList[i].label==="Channel"|| ParametersList[i].label==="Brightness"){
              ParametersList[i].disabled=true
            }
          }
        }
        if(label==="Computer"){
          console.log(label)
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Office"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Speed" || ParametersList[i].label==="Time" || ParametersList[i].label==="Channel"|| ParametersList[i].label==="Program"){
              ParametersList[i].disabled=true
            }
          }
        }
        if(label==="Television"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Living room"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Speed" || ParametersList[i].label==="Time"|| ParametersList[i].label==="Program" ){
              ParametersList[i].disabled=true
            }
          }
        }
        if(label==="Radio"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Parent's bedroom"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Speed" || ParametersList[i].label==="Time"|| ParametersList[i].label==="Program" || ParametersList[i].label==="Brightness" ){
              ParametersList[i].disabled=true
            }
          }
        }
        if(label==="Air Conditionner"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Children bedroom"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label!=="Program"){
              ParametersList[i].disabled=true
            }
          }
        }
        if(label==="Fan"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label!=="Living room"){
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(!ParametersList[i].label==="Program" || !ParametersList[i].label==="Speed"){
              ParametersList[i].disabled=true
            }
          }
        }
      }
    }

  }

  ModifyEnvironmentList(event){
    this.setState({
     environment:event
    })
  }
  
  ModifyParametersList(event){var element= document.getElementById("Numbers")
    if(event.length>this.state.parameters.length){
        element.style.display = "block";        
    }
    else{
      element.style.display = "none";
    }
    
    this.setState({
     parameters:event
    })
  }

  ModifyMacrosList(event){
    this.setState({
     macros:event
    })
  }

  toggleTable(){
    var element= document.getElementById("TableOfGestures")
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  toggleNumber(){
    var element= document.getElementById("Numbers")
    element.style.display = "none";
  
    this.number = document.getElementById('number');
    this.setState({
      parameters:this.state.parameters.concat({label:this.number.value.trim(),value:this.state.parameters[this.state.parameters.length-1].value})
    })
    this.number.value=""
  }

  add_instruction(){
    console.log("actions :", this.state.actions)
    console.log("devices :", this.state.devices)
    console.log("environment :", this.state.environment)
    console.log("parameters :", this.state.parameters)
  }

  render() {
    return (
      
      <div className="App">
        <div className="container">
          <div className="box">
            <h1 className={"h1"} style={{textAlign: "center"}}>Drawing area</h1>
            <canvas id="myCanvas" ref={this.canvasRef}
              style={{
                border: "1px solid #000"
              }}
              width={500}
              height={500}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp}
              onMouseLeave={this.onMouseUp}
              onMouseMove={this.onMouseMove}>
            </canvas>
          </div>
          <br />
          <div className="box2">
            <h1 className={"h1"} style={{textAlign: "center"}}>Smart home</h1>
            <img className="overlay" style={{maxWidth:'100%'}} src={House} alt={"HOUSE"}/>
            <img className="overlay" style={{opacity:"0"}} src={TV} id="Television" alt={"Television"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeCave} id="LampeCave" alt={"LampeCave"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSalon} id="LampeSalon" alt={"LampeSalon"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSDB} id="LampeSDB" alt={"LampeSDB"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSAM} id="LampeSAM" alt={"LampeSAM"}/>
            <img className="overlay" style={{opacity:"0"}} src={Ordinateur} id="Computer" alt={"Computer"}/>
            <img className="overlay" style={{opacity:"0"}} src={Micro_ondes} id="Micro_ondes" alt={"Micro_ondes"}/>
            <img className="overlay" style={{opacity:"0"}} src={Machine_a_laver} id="Machine_a_laver" alt={"Machine_a_laver"}/>
            
          </div>
      </div>
      <div className="container2">
        <div className="box3">
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
                labelledBy="Actions"
                isCreatable={true}
                valueRenderer={actionsRenderer}/>
            </div>
            <div className={"list"}>
              <MultiSelect options={DevicesList}
                value={this.state.devices}
                onChange={this.ModifyDevicesList}
                labelledBy="Devices"
                isCreatable={true}
                valueRenderer={DevicesRenderer}/>
            </div>
            <div className={"list"}>
              <MultiSelect options={EnvironmentList}
                value={this.state.environment}
                onChange={this.ModifyEnvironmentList}
                labelledBy="Environments"
                isCreatable={true}
                valueRenderer={EnvironmentRenderer}/>
            </div>
            <div className={"list"}>
              <MultiSelect options={ParametersList}
                value={this.state.parameters}
                onChange={this.ModifyParametersList}
                labelledBy="Parameters"
                isCreatable={true}
                valueRenderer={parametersRenderer}/>
            </div>
            <div id ="Numbers" style={{display:"none"}}>
              <label className="custom1-field one">
                <input className={"textArea"} type="text" placeholder=" " id="number"/>
                <span className="placeholder">Number</span>
              </label>
              <button type="button" className={"button"} onClick={this.toggleNumber}>Number</button>
            </div>
          <button type="button" className={"button"} onClick={this.record}>Record</button>
          </form>
          <button className={"button"} onClick={this.recognize_canvas}>Recognize</button>
          <button className={"button"} onClick={this.clear}>Clear</button>
          <button className={"button"} onClick={this.macroCommand}>Macro-Command</button>
          <button className={"button"} onClick={this.add_instruction}>Add Instruction</button>

          <div>

          <div className={"list"}>
              <MultiSelect options={MacrosList}
                value={this.state.macros}
                onChange={this.ModifyMacrosList}
                labelledBy="Macros"
                isCreatable={true}
                valueRenderer={MacroRenderer}/>
            </div>
            <div className="box4">
                <button className={"triangle-down"} onClick={this.toggleTable}></button>
                <h1>Table of gestures</h1>
                <div id ="TableOfGestures">
                  <button className={"button"} onClick={this.clearDataSet}>Clear Dataset</button>
                  <table className={"content-table"} id={"target"}>
                    <tbody>
                      <tr>
                        <th>Name of gesture</th>
                        <th>Actions</th>
                        <th>Devices</th>
                        <th>Environments</th>
                        <th>Parameters</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    
    
  );
  }
}

export default App;


