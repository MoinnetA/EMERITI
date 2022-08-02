import React, {createRef} from 'react';
import GestureHandler from "quantumleapjs";
import Television from './images/Television.png';
import House from './images/house.png';
import LampeCave from './images/lampeCave.png';
import LampeSalon from './images/lampeSalon.png';
import LampeSDB from './images/lampeSDB.png';
import LampeSAM from './images/lampeSAM.png';
import Computer from './images/Computer.png';
import Micro_ondes from './images/microOnde.png';
import Machine_a_laver from './images/machineALaver.png';
import { MultiSelect } from "react-multi-select-component";

let tabFinal=[];
let stroke_id=0;
let checkList = []
let checkMacroList = []
let checkListAssign = {}
let checkMacroListAssign = {}
let gestureList = []
let macroActionList = []
let macroDeviceList=[]

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
    : "Macro-commands";
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
      nameListOfGesture: [],
      action:"",
      macro:"",
      gestureDeleted:"",
      count:2,
      pause:true,
      turn_on:"1",
      actions:[],
      devices:[],
      environment:[],
      parameters:[],
      macros:[],
      macro_instruction:[],
      instructions:[],
      recognizedList:[]
    };
    this.canvasRef = createRef(null);
    this.ctx = createRef(null);
    this.intervalRef = createRef(null);
    // Bind
    this.onGesture = this.onGesture.bind(this);
    this.draw = this.draw.bind(this);
    this.recognize_canvas = this.recognize_canvas.bind(this);
    this.checkInputsRecord = this.checkInputsRecord.bind(this);
    this.checkMacroInputsRecord = this.checkMacroInputsRecord.bind(this);
    this.record = this.record.bind(this);
    this.clear = this.clear.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
    this.fmt = this.fmt.bind(this);
    this.clearEverything = this.clearEverything.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.updateCheckListAssign = this.updateCheckListAssign.bind(this);
    this.updateCheckMacroListAssign = this.updateCheckMacroListAssign.bind(this);
    this.clearDataSet = this.clearDataSet.bind(this);
    this.clearGesture = this.clearGesture.bind(this);
    this.clearMacroGesture = this.clearMacroGesture.bind(this);
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
    this.toggleCITable = this.toggleCITable.bind(this);
    this.toggleNumber = this.toggleNumber.bind(this);
    this.composedInstructions = this.composedInstructions.bind(this);
    this.showInstructions = this.showInstructions.bind(this);
    this.showRecognizedInstructions = this.showRecognizedInstructions.bind(this);
    this.recognizeDevice = this.recognizeDevice.bind(this);

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
  setMacroData(){
    console.log("checkMacroListAssign for setMacroData:", checkMacroListAssign)
    localStorage.setItem('checkMacroListAssign', JSON.stringify(checkMacroListAssign));
    localStorage.setItem('checkMacroList', JSON.stringify(checkMacroList));
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
    for(let i=0;i<checkList.length;i++){
      MacrosList=MacrosList.concat({label:checkList[i],value:i})
    }
    this.setState({
      nameListOfGesture:checkList
    }, () => {
      this.getMacroData()
    })
  }

  getMacroData(){
    let checkMacroListAssignData = localStorage.getItem('checkMacroListAssign');
    checkMacroListAssignData = JSON.parse(checkMacroListAssignData);
    if(checkMacroListAssignData === null){
      checkMacroListAssign = {}
    }
    else{
      checkMacroListAssign = checkMacroListAssignData
    }

    let checkMacroListData = localStorage.getItem('checkMacroList');
    checkMacroListData = JSON.parse(checkMacroListData);
    if(checkMacroListData === null){
      checkMacroList = []
    }
    else{
      checkMacroList = checkMacroListData
    }
    console.log("checkMacroListAssign for getData:", checkMacroListAssign)
    console.log("checkMacroList for getData:", checkMacroList)
    this.setState({
      nameListOfGesture:this.state.nameListOfGesture.concat(checkMacroList)
    }, () => {
      console.log("nameListOfGesture : ", this.state.nameListOfGesture)
    })
    this.setState({
    }, () => {
      this.updateCheckListAssign();
      this.updateCheckMacroListAssign();

    })
  }

  componentDidMount() {
    this.getData()
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
    this.macro = document.getElementById('macro');
    this.gestureDeleted = document.getElementById('gestureDeleted');
    this.macrogestureDeleted = document.getElementById('macrogestureDeleted');
    this.instructions = document.getElementById('instructions');
    this.number = document.getElementById('number');
    // STEPS 6 and 7
    this.gestureHandler.registerGestures("dynamic", this.state.nameListOfGesture);
    // STEPS 5, 7, 8, 10, 11
    this.gestureHandler.addListener('gesture', (event) => {
      if (checkListAssign.hasOwnProperty(event.gesture.name)) {
        console.log("NOW, IT'S %s", event.gesture.name)
        let macroList = checkListAssign[event.gesture.name]
        let action = macroList[0].split(', ')
        if(action[0]!=="-"){
          macroActionList = macroActionList.concat(action)
          if(macroActionList.length>1){
            macroActionList=[macroActionList[1]]
            macroDeviceList=[]
            this.setState({
              recognizedList: []
            })
          }
        }
        let device=macroList[1].split(', ')
        if(device[0]!=='-'){
          macroDeviceList = macroDeviceList.concat(device)
        }

        this.setState({
          recognizedList: macroActionList.concat(macroDeviceList)
        })
        console.log("macroDeviceList: ", macroDeviceList)
        console.log("macroActionList: ", macroActionList)
        if(macroActionList.length>0 && macroDeviceList.length>0){
          for(const macro_action of macroActionList){
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
                console.log("macro Turn Off");
              })
            }
            this.recognizeDevice()
          }
        }
        else{
          console.log("You must have an Action and a Device")
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
      }
      else if(checkMacroListAssign.hasOwnProperty(event.gesture.name)){
        console.log("NOW, IT'S %s", event.gesture.name)
        let composedList = checkMacroListAssign[event.gesture.name]
        console.log(composedList)
        for(const i in composedList){
          var instruction=composedList[i]
          if(checkListAssign.hasOwnProperty(instruction)){
          let macroList = checkListAssign[instruction]

          let action = macroList[0].split(', ')
            if(action[0]!=="-"){
              macroActionList = macroActionList.concat(action)
              if(macroActionList.length>1){
                macroActionList=[macroActionList[1]]
                macroDeviceList=[]
                this.setState({
                  recognizedList: []
                })
              }
            }

            let device=macroList[1].split(', ')
            if(device[0]!=='-'){
              macroDeviceList = macroDeviceList.concat(device)
            }
          }

          console.log("macroDeviceList: ", macroDeviceList)
          console.log("macroActionList: ", macroActionList)
          this.setState({
            recognizedList: macroActionList.concat(macroDeviceList)
          })
          if(macroActionList.length>0 && macroDeviceList.length>0){
            for(const macro_action of macroActionList){
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
                  console.log("macro Turn Off");
                })
              }
              this.recognizeDevice()
            }
          }
          else{
            console.log("You must have an Action and a Device")
          }
        }

      }
      else {
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

  recognizeDevice(){
    var i=0
    while(i< macroDeviceList.length){
      let image = document.getElementById(macroDeviceList[i]);
      image.style.opacity = this.state.turn_on;
      i++
    }
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
    this.gestureHandler.registerGestures("dynamic", this.state.nameListOfGesture);
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

    this.setState({
      count:2
    })
  }


  checkInputsRecord(){
    const actionValue = this.action.value.trim();
    if(actionValue === ''){
        console.log('Action cannot be blank');
        this.clear()
    }
    else if(tabFinal.length===0){
        console.log( 'No Data');
        this.clear()
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
  checkMacroInputsRecord(){
    const macroValue = this.macro.value.trim();
    if(macroValue === ''){
        console.log(this.macro, 'Action cannot be blank');
        this.clear()
    }
    else {
      var dataGestureRecord = {
          "name":macroValue,
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
      if(typeof dataStringRecord!=='undefined'){
        const actionValue = this.action.value.trim();
        this.gestureHandler.addNewGesture(dataStringRecord, actionValue.toLowerCase());

        if(!checkListAssign.hasOwnProperty(actionValue.toUpperCase())) {
          if(!checkList.includes(actionValue.toUpperCase())){
            checkList.push(actionValue.toUpperCase());          
          }
          if(!this.state.instructions[0]){
            var tab = this.composedInstructions()
            const table = document.getElementById("target")
            const item = {nameGesture: actionValue.toUpperCase(), actionGesture: tab[0],devicesGesture: tab[1],EnvironmentGesture: tab[2],ParametersGesture: tab[3]}
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

            checkListAssign[actionValue.toUpperCase()] = tab;
            if(!checkList.includes(actionValue.toUpperCase()))
              checkList.push(actionValue.toUpperCase())
            console.log("checkListAssign:", checkListAssign)
            console.log("checkList:", checkList)
            this.setData()
            MacrosList=MacrosList.concat({label:actionValue.toUpperCase(),value:checkList.length})
          }
          else{
            if(!checkMacroList.includes(actionValue.toUpperCase())){
              checkList.push(actionValue.toUpperCase());          
            }
            tab = this.composedInstructions()
            var i1,i2,i3,i4=[]
            var check=false
            if( this.state.instructions[0]){
              i1=this.state.instructions[0].value
            }
            if(typeof this.state.instructions[1]!== 'undefined'){
              i2=this.state.instructions[1].value
            }
            else{
              i2=tab
              check=true
            }
            if(!check && typeof this.state.instructions[2]!== 'undefined'){
              i3=this.state.instructions[2].value
            }
            else if(!check && typeof this.state.instructions[2]=== 'undefined'){
              i3=tab
              check=true
            }

            if(!check && typeof this.state.instructions[3]!== 'undefined'){
              i4=this.state.instructions[3].value
            }
            else if(!check && typeof this.state.instructions[3]=== 'undefined'){
              i4=tab
            }

            const table = document.getElementById("TableM")
            const item = {nameGesture: actionValue.toUpperCase(), instruction1: i1,instruction2: i2,instruction3: i3,instruction4: i4}
            let row = table.insertRow();
            let nameGesture = row.insertCell(0);
            nameGesture.innerHTML = item.nameGesture;
            let instruction1 = row.insertCell(1);
            instruction1.innerHTML = item.instruction1;
            let instruction2 = row.insertCell(2);
            let instruction3 = row.insertCell(3);
            let instruction4 = row.insertCell(4);
            var bool = true
            
            if(item.instruction2===[]){
              instruction2.innerHTML = '-';        
              instruction3.innerHTML = '-';        
              instruction4.innerHTML = '-';  
              bool=false
            }
            else{
              instruction2.innerHTML = item.instruction2;
            }
            if(bool){
              if(item.instruction3!==[]){   
                instruction3.innerHTML = '-';        
                instruction4.innerHTML = '-';  
                bool=false      
              }
              else{
                instruction3.innerHTML = item.instruction3;
              }
      
            }
            if(bool){
              if(item.instruction4!==[]){   
                instruction4.innerHTML = '-'; 
              }
              else{      
                instruction4.innerHTML = item.instruction4;
              }
            }

            checkMacroListAssign[actionValue.toUpperCase()] = [i1,i2,i3,i4];
            if(!checkMacroList.includes(actionValue.toUpperCase()))
              checkMacroList.push(actionValue.toUpperCase())
            console.log("checkMacroListAssign:", checkMacroListAssign)
            console.log("checkMacroList:", checkMacroList)
            this.setMacroData()            
          }
        }
      }
      else{
        console.log("No data")
      }

      this.setState({
        instructions:[],
        actions:[],
        devices:[],
        environment:[],
        parameters:[]
      })

      for(let k=0;k<ActionsList.length;k++){
        ActionsList[k].disabled=false
      }
      for(let k=0;k<EnvironmentList.length;k++){
        EnvironmentList[k].disabled=false
      }
      for(let k=0;k<ParametersList.length;k++){
        ParametersList[k].disabled=false
      }
    }

  
    macroCommand(){
    var dataStringRecord = this.checkMacroInputsRecord();
    if(typeof dataStringRecord!=='undefined'){
      const macroValue = this.macro.value.trim();
      this.gestureHandler.addNewGesture(dataStringRecord, macroValue.toLowerCase());

      var tableau = this.composedMacrosInstructions()
      var actionAndDevice=true


      var act = []
      var dev = []
      for(const i in tableau){
        if(checkList.includes(tableau[i])){
          console.log(checkList)
          var instruct = checkListAssign[tableau[i]]
          if(instruct[0]!=='-'){
            act=act.concat([instruct[0]])
          }
          if(instruct[1]!=='-'){
            dev=dev.concat([instruct[1]])
          }
        }
      }
      if(act===[] || dev===[]){
        actionAndDevice=false
      }
      console.log(actionAndDevice)
      if (actionAndDevice){
        if(!checkMacroList.includes(macroValue.toUpperCase())){
          checkMacroList.push(macroValue.toUpperCase());
        }
        if(!checkMacroListAssign.hasOwnProperty(macroValue.toUpperCase())) {      
          const item = {nameGesture: macroValue.toUpperCase(), instruction1: tableau[0],instruction2: tableau[1],instruction3: tableau[2],instruction4:tableau[3]}
          const table = document.getElementById("TableM")
          let row = table.insertRow();
          let nameGesture = row.insertCell(0);
          nameGesture.innerHTML = item.nameGesture;
          let instruction1 = row.insertCell(1);
          instruction1.innerHTML = item.instruction1;
          let instruction2 = row.insertCell(2);
          let instruction3 = row.insertCell(3);
          let instruction4 = row.insertCell(4);
          var i2 = true
          if(typeof item.instruction2==='undefined'){
            instruction2.innerHTML = '-';        
            instruction3.innerHTML = '-';        
            instruction4.innerHTML = '-';  
            i2=false
          }
          else{
            instruction2.innerHTML = item.instruction2;
          }
          if(i2){
            if(typeof item.instruction3==='undefined'){   
              instruction3.innerHTML = '-';        
              instruction4.innerHTML = '-';  
              i2=false      
            }
            else{
              instruction3.innerHTML = item.instruction3;
            }
    
          }
          if(!i2 && typeof item.instruction4!=='undefined'){   
            instruction4.innerHTML = item.instruction4;
          }
          else{      
            instruction4.innerHTML = '-'; 
          }
        }
        checkMacroListAssign[macroValue.toUpperCase()] = tableau;
        if(!checkMacroList.includes(macroValue.toUpperCase()))
          checkMacroList.push(macroValue.toUpperCase())
        console.log("checkMacroListAssign:", checkMacroListAssign)
        console.log("checkMacroList:", checkMacroList)
        this.setMacroData()
        this.setState({
          macros:[]
        })
      }
      else{
        console.log("The macro command must have an Action and a Device")
      }
    }
    else{
      console.log("No Data")
    }
    
  }

  clear(){
    this.ctx.current.clearRect(0, 0, this.ctx.current.canvas.width, this.ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
    this.setState({
      count:2,
      instructions:[],
      actions:[],
      devices:[],
      environment:[],
      parameters:[]
    })

    for(let k=0;k<ActionsList.length;k++){
      ActionsList[k].disabled=false
    }
    for(let k=0;k<EnvironmentList.length;k++){
      EnvironmentList[k].disabled=false
    }
    for(let k=0;k<ParametersList.length;k++){
      ParametersList[k].disabled=false
    }
  }

  clearEverything(){
    this.clear()
    gestureList = []
    checkListAssign = {}
    checkList = []
    checkMacroListAssign = {}
    checkMacroList = []
    this.setData()
    this.setMacroData()
    this.updateCheckListAssign()
    this.updateCheckMacroListAssign()
  }

  clearGesture(){
    const gestureDeleted=this.gestureDeleted.value.trim();
    this.gestureHandler.clearGesture(gestureDeleted.toLowerCase());
    
    this.clear()
    delete checkListAssign[gestureDeleted.toUpperCase()];
    var index=checkList.indexOf(gestureDeleted.toUpperCase());
    if(index>-1){
      checkList.splice(index,1)
    }
    index=MacrosList.indexOf(gestureDeleted.toUpperCase());
    if(index>-1){
      MacrosList.splice(index,1)
    }

    this.setData()
    this.updateCheckListAssign()
    window.location.reload();
  }

  clearMacroGesture(){
    const macrogestureDeleted=this.macrogestureDeleted.value.trim();
    this.gestureHandler.clearGesture(macrogestureDeleted.toLowerCase());
    
    this.clear()
    delete checkMacroListAssign[macrogestureDeleted.toUpperCase()];
    const index=checkMacroList.indexOf(macrogestureDeleted.toUpperCase());
    if(index>-1){
      checkMacroList.splice(index,1)
    }
    this.setMacroData()
    this.updateCheckMacroListAssign()
    window.location.reload();
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

  updateCheckMacroListAssign(){
    const table = document.getElementById("TableM")
    for(const i in checkMacroListAssign){
      const item = { nameGesture: i, instruction: checkMacroListAssign[i] }
      let row = table.insertRow();
      let nameGesture = row.insertCell(0);
      nameGesture.innerHTML = item.nameGesture;
      let instruction1 = row.insertCell(1);
      instruction1.innerHTML = item.instruction[0];
      let instruction2 = row.insertCell(2);
      let instruction3 = row.insertCell(3);
      let instruction4 = row.insertCell(4);
      var i2 = true
      if(typeof item.instruction[1]==='undefined'){
        instruction2.innerHTML = '-';        
        instruction3.innerHTML = '-';        
        instruction4.innerHTML = '-';  
        i2=false
      }
      else{
        instruction2.innerHTML = item.instruction[1];
      }
      if(i2){
        if(typeof item.instruction[2]==='undefined'){   
          instruction3.innerHTML = '-';        
          instruction4.innerHTML = '-';  
          i2=false      
        }
        else{
          instruction3.innerHTML = item.instruction[2];
        }

      }
      if(!i2 && typeof item.instruction[3]!=='undefined'){ 
        instruction4.innerHTML = item.instruction[3];
      }
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
      for(let k=0;k<ActionsList.length;k++){
        ActionsList[k].disabled=false
      }
      for(let j=0;j<DevicesList.length;j++){
        DevicesList[j].disabled=false
      }
    }
    else{
      for(let k=0;k<ActionsList.length;k++){
        ActionsList[k].disabled=true
      }
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
  
  ModifyParametersList(event){
    var element= document.getElementById("Numbers")
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

  toggleCITable(){
    var element= document.getElementById("TableOfMacros")
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

    var listI= this.composedInstructions()
    var list = []
      for(const j in listI){
        if(listI[j]!=="-"){
          list.push(listI[j])
        }
      }
    if(!this.state.macros[0]){  
      if(listI[0]!=='-' && listI[1]!=='-'){
        this.setState({
          instructions: this.state.instructions.concat({value:list}) 
        })
      }
      else{
        console.log('You have to choose an Action and a Device')
      }
    }
    else{
      this.setState({
        instructions:this.state.instructions.concat({value:this.state.macros[0].label}) 
       })
    }


    this.setState({
      actions:[],
      devices:[],
      environment:[],
      parameters:[]
    })

    for(let k=0;k<ActionsList.length;k++){
      ActionsList[k].disabled=false
    }
    for(let k=0;k<EnvironmentList.length;k++){
      EnvironmentList[k].disabled=false
    }
    for(let k=0;k<ParametersList.length;k++){
      ParametersList[k].disabled=false
    }
  }

  composedInstructions(){

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
    var basicInstruction = [a,d,e,p]
    return basicInstruction;
  }
  composedMacrosInstructions(){

    let macro=[]
    for (const i in this.state.macros){
      macro = macro.concat(this.state.macros[i].label)
    }
    return macro;
  }

  showInstructions(){
    var listI= this.composedInstructions()
    var list = []
      for(const j in listI){
        if(listI[j]!=="-"){
          list.push(listI[j]+" ")
        }
      }
    if(!this.state.instructions[0]){
      return list
    }
    else{
      var ins = ""
      for(var i in this.state.instructions){
        if(this.state.instructions[i].value !=="-"){

          ins+= this.state.instructions[i].value +" and "
        }
      }
      return ins + list
    }
  }

  showRecognizedInstructions(){
    var list =""
    for(const recognized in this.state.recognizedList){
      list+=this.state.recognizedList[recognized]+" "
    }
    return list;
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
          <div className="box2">
            <h1 className={"h1"} style={{textAlign: "center"}}>Smart home</h1>
            <img className="overlay" style={{maxWidth:'100%'}} src={House} alt={"HOUSE"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television} id="Television" alt={"Television"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeCave} id="LampeCave" alt={"LampeCave"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSalon} id="LampeSalon" alt={"LampeSalon"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSDB} id="LampeSDB" alt={"LampeSDB"}/>
            <img className="overlay" style={{opacity:"0"}} src={LampeSAM} id="LampeSAM" alt={"LampeSAM"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer} id="Computer" alt={"Computer"}/>
            <img className="overlay" style={{opacity:"0"}} src={Micro_ondes} id="Micro_ondes" alt={"Micro_ondes"}/>
            <img className="overlay" style={{opacity:"0"}} src={Machine_a_laver} id="Machine_a_laver" alt={"Machine_a_laver"}/> 
                 
          </div>     
        </div>
        <div className={"instructions"}>  Instruction : {this.showInstructions()}</div> 
        <div className={"instructions"}>  Recognized Instruction : {this.showRecognizedInstructions()}</div> 
        <div className="container2">
          <div className="box3">
            <div className={"time before next gesture"}>Timer : {this.fmt(this.state.count)}</div>

            <button className={"button"} onClick={this.recognize_canvas}>Recognize</button>
            <button className={"button"} onClick={this.clear}>Clear</button>
            <button className={"button"} onClick={this.add_instruction}>Add Instruction</button>

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
                  valueRenderer={actionsRenderer}
                  hasSelectAll={false}/>
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

            <form className={"container"}>
              <div className={"box"}>
                <label className="custom-field one">
                  <input className={"textArea"} type="text" placeholder=" " id="macro"/>
                  <span className="placeholder">Name of the composed instruction</span>
                </label>
              </div>
              <div className={"list"}>
                <MultiSelect options={MacrosList}
                  value={this.state.macros}
                  onChange={this.ModifyMacrosList}
                  labelledBy="Macros"
                  isCreatable={true}
                  valueRenderer={MacroRenderer}
                  hasSelectAll={false}/>
              </div>
              <button  type="button" className={"button"} onClick={this.macroCommand}>Macro-Command</button>
            </form>

            <form >
              <button type="button" className={"triangle-down"} onClick={this.toggleTable}></button>
                <h1>Table of gestures</h1>  
                <div id ="TableOfGestures">
                  <label className="custom-field one">
                    <input className={"textArea"} type="text" placeholder=" " id="gestureDeleted"/>
                    <span className="placeholder">Name of the gesture to delete</span>
                  </label>
                  <button type="button" className={"button"} onClick={this.clearGesture}>Delete</button>
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
                <button type="button" className={"triangle-down"} onClick={this.toggleCITable}></button>
                <h1>Table of composed instruction</h1>
                <div id ="TableOfMacros">
                  <label className="custom-field one">
                    <input className={"textArea"} type="text" placeholder=" " id="macrogestureDeleted"/>
                    <span className="placeholder">Name of the instruction to delete</span>
                  </label>
                  <button type="button" className={"button"} onClick={this.clearMacroGesture}>Delete</button>
                  <table className={"content-table"} id={"TableM"}>
                    <tbody>
                      <tr>
                        <th>Name of composed instruction</th>
                        <th>First instruction</th>
                        <th>Second instruction</th>
                        <th>Third instruction</th>
                        <th>Fourth instruction</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </form>
            </div>
          </div>
      </div>   
    );
  }
}

export default App;


