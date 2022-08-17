import React, {createRef} from 'react';
import GestureHandler from "quantumleapjs";
import Air_conditioner_program_1 from './images/Air_conditioner/Air_conditioner_on_cold.png';
import Air_conditioner_program_2 from './images/Air_conditioner/Air_conditioner_on_hot.png';
import Brightness_bathroom from './images/Brightness/Brightness_bathroom.png';
import Brightness_children_bedroom from './images/Brightness/Brightness_children_bedroom.png';
import Brightness_dining_room from './images/Brightness/Brightness_diningroom.png';
import Brightness_kitchen from './images/Brightness/Brightness_kitchen.png';
import Brightness_living_room from './images/Brightness/Brightness_livingroom.png';
import Brightness_office from './images/Brightness/Brightness_office.png';
import Brightness_parent_bedroom from './images/Brightness/Brightness_parent_bedroom.png';
import Brightness_laundry_room from './images/Brightness/Brightness_washingroom.png';
import Computer from './images/Computer/Computer_on.png';
import Computer_volume_0 from './images/Computer/Computer_volume_0.png';
import Computer_volume_1 from './images/Computer/Computer_volume_1.png';
import Computer_volume_2 from './images/Computer/Computer_volume_2.png';
import Computer_volume_3 from './images/Computer/Computer_volume_3.png';
import Computer_muted from './images/Computer/Computer_on_muted.png';
import Fan from './images/Fan/Fan_on.png';
import House from './images/House.png';
import Light_bathroom from './images/Light/Light_bathroom.png';
import Light_children_bedroom from './images/Light/Light_children_bedroom.png';
import Light_dining_room from './images/Light/Light_diningroom.png';
import Light_kitchen from './images/Light/Light_kitchen.png';
import Light_laundry_room from './images/Light/Light_laundryroom.png';
import Light_living_room from './images/Light/Light_livingroom.png';
import Light_office from './images/Light/Light_office.png';
import Light_parent_bedroom from './images/Light/Light_parent_bedroom.png';
import Microwave from './images/Microwave/Microwave.png';
import Radio from './images/Radio/Radio_on.png';
import Radio_channel_1 from './images/Radio/Radio_on_channel_1.png';
import Radio_channel_2 from './images/Radio/Radio_on_channel_2.png';
import Radio_channel_3 from './images/Radio/Radio_on_channel_3.png';
import Radio_channel_4 from './images/Radio/Radio_on_channel_4.png';
import Radio_channel_5 from './images/Radio/Radio_on_channel_5.png';
import Radio_volume_0 from './images/Radio/Radio_volume_0.png';
import Radio_volume_1 from './images/Radio/Radio_volume_1.png';
import Radio_volume_2 from './images/Radio/Radio_volume_2.png';
import Radio_volume_3 from './images/Radio/Radio_volume_3.png';
import Radio_muted from './images/Radio/Radio_on_muted.png';
import Television from './images/Television/Television_on_channel_1.png';
import Television_channel_2 from './images/Television/Television_on_channel_2.png';
import Television_channel_3 from './images/Television/Television_on_channel_3.png';
import Television_channel_4 from './images/Television/Television_on_channel_4.png';
import Television_channel_5 from './images/Television/Television_on_channel_5.png';
import Television_volume_0 from './images/Television/Television_volume_0.png';
import Television_volume_1 from './images/Television/Television_volume_1.png';
import Television_volume_2 from './images/Television/Television_volume_2.png';
import Television_volume_3 from './images/Television/Television_volume_3.png';
import Television_muted from './images/Television/Television_muted.png';
import Television_pause from './images/Television/Television_pause.png';
import Washing_machine from './images/Washing machine/Washing_machine.png';
import Washing_machine_program_1 from './images/Washing machine/Washing_machine_program_1.png';
import Washing_machine_program_2 from './images/Washing machine/Washing_machine_program_2.png';
import Washing_machine_program_3 from './images/Washing machine/Washing_machine_program_3.png';
import { MultiSelect } from "react-multi-select-component";

let tabFinal=[];
let stroke_id=0;
let nameListOfGesture = []
let checkList = []
let checkMacroList = []
let checkListAssign = {}
let checkMacroListAssign = {}
let gestureList = []
let macroActionList = []
let macroDeviceList=[]
let macroEnvironmentList=[]
let macroParameterList=[]
let numberOfGestures=0

let ActionsList =[
  { label: 'Turn On', value: 1 , disabled: false},
  { label: 'Turn Off', value: 2 , disabled: false},
  { label: 'Increase', value: 3 , disabled: false},
  { label: 'Decrease', value: 4 , disabled: false},
  { label: 'Pause', value: 5 , disabled: false},
  { label: 'Play', value: 6 , disabled: false},
  { label: 'Mute', value: 7 , disabled: false},
  { label: 'Unmute', value: 8 , disabled: false},
  { label: 'Next', value: 9 , disabled: false}
]

let DevicesList =[
  { label: 'Air conditioner', value: 1 , disabled: false},
  { label: 'Computer', value: 2 , disabled: false},
  { label: 'Fan', value: 3 , disabled: false},
  { label: 'Light', value: 4 , disabled: false},
  { label: 'Microwave', value: 5 , disabled: false},
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
  { label: 'Parent bedroom', value: 8 , disabled: false}
]

let ParametersList =[
  { label: 'Brightness', value: 1 , disabled: false},
  { label: 'Channel', value: 2 , disabled: false},
  { label: 'Program', value: 3 , disabled: false},
  { label: 'Time', value: 4 , disabled: false},
  { label: 'Volume', value: 5 , disabled: false},
]

let MacrosList =[]

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
      action:"",
      drawGesture:"",
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
      recognizedList:[],
      television_volume:3,
      television_muted:false,
      television_channel:1,
      radio_volume:3,
      radio_muted:false,
      radio_channel:1,
      computer_volume:3,
      computer_muted:false,
      brightness_bathroom:1,
      brightness_children_bedroom:1,
      brightness_dining_room:1,
      brightness_kitchen:1,
      brightness_living_room:1,
      brightness_office:1,
      brightness_parent_bedroom:1,
      brightness_laundry_room:1,
      washing_program:1,
      air_conditioner_program:1
    };
    this.canvasRef = createRef(null);
    this.canvasRef1 = createRef(null);
    this.ctx = createRef(null);
    this.ctx1 = createRef(null);
    // Bind
    this.onGesture = this.onGesture.bind(this);
    this.display = this.display.bind(this);
    this.draw = this.draw.bind(this);
    this.draw1 = this.draw1.bind(this);
    this.draw2 = this.draw2.bind(this);
    this.recognize_canvas = this.recognize_canvas.bind(this);
    this.checkInputsRecord = this.checkInputsRecord.bind(this);
    this.checkMacroInputsRecord = this.checkMacroInputsRecord.bind(this);
    this.record = this.record.bind(this);
    this.clear = this.clear.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
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
    this.deleteGesture = this.deleteGesture.bind(this);
    this.deleteGesture2 = this.deleteGesture2.bind(this);
    this.deleteMacroGesture = this.deleteMacroGesture.bind(this);
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
    this.toggleCanvasgesture = this.toggleCanvasgesture.bind(this);
    this.composedInstructions = this.composedInstructions.bind(this);
    this.showInstructions = this.showInstructions.bind(this);
    this.showRecognizedInstructions = this.showRecognizedInstructions.bind(this);
    this.recognizeDevice = this.recognizeDevice.bind(this);
    this.recognizeBrightness = this.recognizeBrightness.bind(this);
    this.recognizeVolume = this.recognizeVolume.bind(this);
    this.recognizeMute = this.recognizeMute.bind(this);
    this.recognizeUnmute = this.recognizeUnmute.bind(this);
    this.recognizeNext = this.recognizeNext.bind(this);
    this.recognizeIncreaseVolume = this.recognizeIncreaseVolume.bind(this);
    this.recognizeDecreaseVolume = this.recognizeDecreaseVolume.bind(this);
    this.recognizeIncreaseBrightness = this.recognizeIncreaseBrightness.bind(this);
    this.recognizePause = this.recognizePause.bind(this);
    this.recognizeProgram = this.recognizeProgram.bind(this);
    this.recognizeChannel = this.recognizeChannel.bind(this);

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
    for(let i=0;i<checkList.length;i++) {
      MacrosList = MacrosList.concat({label: checkList[i], value: i})
    }
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

    for(let i=0;i<checkMacroList.length;i++) {
      MacrosList = MacrosList.concat({label: checkMacroList[i], value: checkList+i})
    }
  }

  componentDidMount() {
    this.getData()
    this.getMacroData()
    nameListOfGesture = checkList.concat(checkMacroList)
    this.updateCheckListAssign();
    this.updateCheckMacroListAssign();
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
    if (this.canvasRef1.current) {
      this.ctx1.current = this.canvasRef1.current.getContext('2d');
    }
    this.action = document.getElementById('action');
    this.drawGesture = document.getElementById('drawGesture');
    this.macro = document.getElementById('macro');
    this.gestureDeleted = document.getElementById('gestureDeleted');
    this.macrogestureDeleted = document.getElementById('macrogestureDeleted');
    this.instructions = document.getElementById('instructions');
    this.number = document.getElementById('number');
    // STEPS 6 and 7
    this.gestureHandler.registerGestures("dynamic", nameListOfGesture);
    // STEPS 5, 7, 8, 10, 11

    this.gestureHandler.addListener('drawGesture', (event) => {

    this.ctx1.current.beginPath();
    this.ctx1.current.strokeStyle = "black";
    this.ctx1.current.lineWidth = 7;
    this.ctx1.current.lineJoin = 'round';

    var jsonData = event.data
    var strokes=jsonData.paths[0].strokes
    for (var i in strokes){
      var points=strokes[i].points
      this.ctx1.current.stroke();
      this.ctx1.current.beginPath();
      this.ctx1.current.strokeStyle = "black";
      this.ctx1.current.lineWidth = 7;
      this.ctx1.current.lineJoin = 'round';
      for(var j in points){
        this.ctx1.current.lineTo(points[j].x, points[j].y);
      }

      this.ctx1.current.stroke();
    }
    });
    this.gestureHandler.addListener('gesture', (event) => {
      numberOfGestures-=1
      var isNew=false
      if(numberOfGestures===0){
        isNew=true
      }
      var ActionList=[]
      if (checkListAssign.hasOwnProperty(event.gesture.name)) {
        console.log("NOW, IT'S %s", event.gesture.name)
        let macroList = checkListAssign[event.gesture.name]
        let action = macroList[0].split(', ')
        if(action[0]!=="-"){
          macroActionList = macroActionList.concat(action)
          if(macroActionList.length>1){
            if(macroActionList[1]){
              ActionList = macroActionList[1]              
              macroActionList = [macroActionList[0]]

              this.display()

              macroActionList=[ActionList]              
              macroDeviceList=[]
              macroEnvironmentList=[]
              macroParameterList=[]
              this.setState({
                recognizedList:this.state.recognizedList.concat("-")
              })
              isNew=true
            }
          }
          else if(isNew){
            var recognizList=[]
            for(let len=this.state.recognizedList.length;this.state.recognizedList[len]!=='-' && len>=0;len--){
              recognizList=recognizList.concat(this.state.recognizedList[len])
            }

            var OldMacro= macroActionList.concat(macroDeviceList,macroEnvironmentList,macroParameterList)
            for(var i in OldMacro){
              if(recognizList===[]){
                if(!recognizList[i].includes(OldMacro[i])){
                  this.setState({
                    recognizedList:this.state.recognizedList.concat(OldMacro[i])
                  })
                }
              }
            }
            if(macroActionList[1]){
              macroActionList=[macroActionList[1]]
              this.setState({
                recognizedList:this.state.recognizedList.concat("-")
              })
            }
            macroDeviceList=[]
            macroEnvironmentList=[]
            macroParameterList=[]
          }
        }

        if(macroList[1]!=='-'){
          let device = macroList[1].split(', ')
          macroDeviceList = macroDeviceList.concat(device)
        }

        if(macroList[2]!=='-'){
          let environment = macroList[2].split(', ')
          macroEnvironmentList = macroEnvironmentList.concat(environment)
        }

        if(macroList[3]!=='-'){
          let parameter = macroList[3].split(', ')
          macroParameterList = macroParameterList.concat(parameter)
        }

        console.log("macroActionList : ", macroActionList)
        console.log("macroDeviceList : ", macroDeviceList)
        console.log("macroEnvironmentList : ", macroEnvironmentList)
        console.log("macroParameterList : ", macroParameterList)

        recognizList=[]
        for(let len=this.state.recognizedList.length;this.state.recognizedList[len]!=='-' && len>=0;len--){
          recognizList=recognizList.concat(this.state.recognizedList[len])
        }
        console.log("this.state.recognizedList1",this.state.recognizedList)
        if(typeof recognizList==='undefined'){
          this.setState({
            recognizedList: this.state.recognizedList.concat(macroActionList[0])
          })
        }
        else if(!recognizList.includes(macroActionList[0])){
          this.setState({
            recognizedList: this.state.recognizedList.concat(macroActionList[0])
          })        
        }

        for(let i in macroDeviceList){
          if(!recognizList.includes(macroDeviceList[i])){
            this.setState({
              recognizedList: this.state.recognizedList.concat(macroDeviceList[i])
            })
          }
        }
        for(let j in macroEnvironmentList){
          if(!recognizList.includes(macroEnvironmentList[j])){
            this.setState({
              recognizedList: this.state.recognizedList.concat(macroEnvironmentList[j])
            })
          }
        }
        for(let k in macroParameterList){
          if(!recognizList.includes(macroParameterList[k])){
            this.setState({
              recognizedList: this.state.recognizedList.concat(macroParameterList[k])
            })
          }
        }
        console.log("this.state.recognizedList2",this.state.recognizedList)
        
        if(isNew && macroActionList.length>0 && macroDeviceList.length>0){
          console.log("macroActionList is New : ", macroActionList)
          let timer = 0
          if(macroParameterList.includes("Time")){
            timer = macroParameterList[macroParameterList.indexOf("Time") + 1]*1000
          }
          // setTimeout(() => {
            this.display()
          // }, timer);
        }
        else{
          console.log("You must have an Action and a Device")
        }
        if(isNew){
          macroActionList=[ActionList]
          macroDeviceList=[]
          macroEnvironmentList=[]
          macroParameterList=[]
        }
      }
      else if(checkMacroListAssign.hasOwnProperty(event.gesture.name)){
        console.log("NOW, IT'S %s", event.gesture.name)
        let composedList = checkMacroListAssign[event.gesture.name]
        for(const i in composedList){
          var instruction=composedList[i]
          let macroList = []
          if(checkListAssign.hasOwnProperty(instruction)){
            macroList = checkListAssign[instruction]
          }
          else{
            macroList=instruction
          }
          let action=[]
          if(macroList.length!==0){
             action = macroList[0].split(', ')
          }
          if(action[0] && action[0]!=="-"){
            macroActionList = macroActionList.concat(action)
            if(macroActionList.length>1){
              macroActionList=[macroActionList[1]]
              macroDeviceList=[]
              macroEnvironmentList=[]
              macroParameterList=[]
              this.setState({
                recognizedList: this.state.recognizedList.concat('-')
              })

            }
          }

          if(macroList[1] && macroList[1]!=='-'){
            let device = macroList[1].split(', ')
            macroDeviceList = macroDeviceList.concat(device)
          }

          if(macroList[2] && macroList[2]!=='-'){
            let environment = macroList[2].split(', ')
            macroEnvironmentList = macroEnvironmentList.concat(environment)
          }

          if(macroList[3] && macroList[3]!=='-'){
            let parameter = macroList[3].split(', ')
            macroParameterList = macroParameterList.concat(parameter)
          }

          console.log("macroActionList: ", macroActionList)
          console.log("macroDeviceList: ", macroDeviceList)
          console.log("macroEnvironmentList: ", macroEnvironmentList)
          console.log("macroParameterList: ", macroParameterList)
          console.log("recognizedList: ", this.state.recognizedList)
          var recoList=[]
          for(let len=this.state.recognizedList.length-1;this.state.recognizedList[len]!=='-' && len>=0;len--){
            recoList=recoList.concat(this.state.recognizedList[len])
          }
          if(!recoList.includes(macroActionList[0])){
            this.setState({
              recognizedList: this.state.recognizedList.concat(macroActionList[0])
            })
          }
          for(let i in macroDeviceList){
            if(!recoList.includes(macroDeviceList[i])){
              this.setState({
                recognizedList: this.state.recognizedList.concat(macroDeviceList[i])
              })
            }
          }
          for(let j in macroEnvironmentList){
            if(!recoList.includes(macroEnvironmentList[j])){
              this.setState({
                recognizedList: this.state.recognizedList.concat(macroEnvironmentList[j])
              })
            }
          }
          for(let k in macroParameterList){
            if(!recoList.includes(macroParameterList[k])){
              this.setState({
                recognizedList: this.state.recognizedList.concat(macroParameterList[k])
              })
            }
          }
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
              if(macroParameterList.includes("Brightness")){
                let intensity_brightness = macroParameterList[macroParameterList.indexOf("Brightness") + 1]
                let decimal_intensity = (intensity_brightness/10).toFixed(1).toString()
                intensity_brightness = decimal_intensity
                this.recognizeBrightness(intensity_brightness)
              }
              else{
                this.recognizeDevice()
              }
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

  display(){

  // setTimeout(() => {
    for(const macro_action of macroActionList){
      console.log("macro_action : ", macro_action)
      if(macro_action==="Turn On"){
        this.setState({
          turn_on: "1"
        }, function (){
          this.recognizeDevice();
        })
      }
      else if(macro_action==="Turn Off"){
        this.setState({
          turn_on: "0"
        }, function (){
          this.recognizeDevice();
        })
      }
      else if(macro_action==="Mute"){
        this.recognizeMute()
      }
      else if(macro_action==="Unmute"){
        this.recognizeUnmute()
      }
      else if(macro_action==="Next"){
        this.recognizeNext()
      }
      else if(macro_action==="Pause"){
        this.recognizePause(true);
      }
      else if(macro_action==="Play"){
        this.recognizePause(false);
      }
      else if(macro_action==="Increase"){
        if(macroParameterList.includes("Volume")){
          let intensity_volume = macroParameterList[macroParameterList.indexOf("Volume") + 1]
          this.recognizeIncreaseVolume(parseInt(intensity_volume))
        }
        else if(macroParameterList.includes("Brightness")){
          let intensity_brightness = macroParameterList[macroParameterList.indexOf("Brightness") + 1]
          console.log("intensity_brightness : ", intensity_brightness)
          let decimal_brightness = ((intensity_brightness / 10).toFixed(1))
          console.log("decimal_brightness : ", decimal_brightness)
          this.recognizeIncreaseBrightness(decimal_brightness)
        }
        else{
          console.log("No parameter to increase !")
        }
      }
      else if(macro_action==="Decrease"){
        if(macroParameterList.includes("Volume")){
          let intensity_volume = macroParameterList[macroParameterList.indexOf("Volume") + 1]
          this.recognizeDecreaseVolume(parseInt(intensity_volume))
        }
        else if(macroParameterList.includes("Brightness")){
          let intensity_brightness = macroParameterList[macroParameterList.indexOf("Brightness") + 1]
          console.log("intensity_brightness : ", intensity_brightness)
          let decimal_brightness = ((intensity_brightness / 10).toFixed(1))
          console.log("decimal_brightness : ", decimal_brightness)
          this.recognizeIncreaseBrightness(-decimal_brightness)
        }
        else{
          console.log("No parameter to decrease !")
        }
      }
      // else if(macro_action==="Turn On" || macro_action==="Turn Off"){
      //   this.recognizeDevice()
      // }
      if(macroParameterList.includes("Brightness") && (macro_action==="Turn On" || macro_action==="Turn Off")){
        let intensity_brightness = macroParameterList[macroParameterList.indexOf("Brightness") + 1]
        if(intensity_brightness>10){
          console.log("Intensity of brightness too high ! Should be between 0 and 10")
        }
        else {
          let decimal_brightness = (1 - (intensity_brightness / 10).toFixed(1)).toString()
          this.recognizeBrightness(decimal_brightness)
        }
      }
      if(macroParameterList.includes("Volume") && (macro_action==="Turn On" || macro_action==="Turn Off")){
        let intensity_volume = macroParameterList[macroParameterList.indexOf("Volume") + 1]
        if(intensity_volume>3){
          console.log("Volume too high ! Should be between 0 and 3")
        }
        else {
          this.recognizeVolume(intensity_volume)
        }
      }
      if(macroParameterList.includes("Program")){
        let number_program = macroParameterList[macroParameterList.indexOf("Program") + 1]
        this.recognizeProgram(number_program)
      }
      if(macroParameterList.includes("Channel")){
        let number_channel = macroParameterList[macroParameterList.indexOf("Channel") + 1]
        this.recognizeChannel(number_channel)
      }
    }
// }, timer);
  }

  recognizeDevice(){
    for(let i = 0; i<macroDeviceList.length; i++){
      if(macroDeviceList[i]==="Light"){
        if(macroEnvironmentList.length !== 0){
          for(let environment of macroEnvironmentList){
            let image_light = document.getElementById("Light_"+environment.toLowerCase())
            image_light.style.opacity = this.state.turn_on;
            let image_brightness = document.getElementById("Brightness_"+environment.toLowerCase())
            let value_brightness = 1-parseInt(this.state.turn_on)
            image_brightness.style.opacity = (value_brightness).toString();
            if(environment==="Bathroom"){
              this.setState({
                brightness_bathroom:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_bathroom)
              })
            }
            else if(environment==="Children bedroom"){
              this.setState({
                brightness_children_bedroom:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_children_bedroom)
              })
            }
            else if(environment==="Dining room"){
              this.setState({
                brightness_dining_room:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_dining_room)
              })
            }
            else if(environment==="Kitchen"){
              this.setState({
                brightness_kitchen:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_kitchen)
              })
            }
            else if(environment==="Laundry room"){
              this.setState({
                brightness_laundry_room:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_laundry_room)
              })
            }
            else if(environment==="Living room"){
              this.setState({
                brightness_living_room:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_living_room)
              })
            }
            else if(environment==="Office"){
              this.setState({
                brightness_office:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_office)
              })
            }
            else if(environment==="Parent bedroom"){
              this.setState({
                brightness_parent_bedroom:value_brightness
              }, function (){
                console.log("Brightness of "+environment+" : "+ this.state.brightness_parent_bedroom)
              })
            }
          }
        }
        else{
          let value_brightness = 1-parseInt(this.state.turn_on)
          let all_light = ["Light_bathroom", "Light_children bedroom", "Light_dining room", "Light_kitchen", "Light_laundry room", "Light_living room", "Light_office", "Light_parent bedroom"]
          let all_brightness = ["Brightness_bathroom", "Brightness_children bedroom", "Brightness_dining room", "Brightness_kitchen", "Brightness_living room", "Brightness_office", "Brightness_parent bedroom", "Brightness_laundry room"]
          for(let k of all_light){
            let image = document.getElementById(k)
            image.style.opacity = this.state.turn_on;
          }
          for(let l of all_brightness){
            let image_brightness = document.getElementById(l)
            image_brightness.style.opacity = value_brightness;
          }
          this.setState({
            brightness_bathroom : value_brightness,
            brightness_children_bedroom : value_brightness,
            brightness_dining_room : value_brightness,
            brightness_kitchen : value_brightness,
            brightness_living_room : value_brightness,
            brightness_office : value_brightness,
            brightness_parent_bedroom : value_brightness,
            brightness_laundry_room : value_brightness
          }, function (){
            console.log("Brightness of every environment : ", this.state.brightness_bathroom, this.state.brightness_children_bedroom, this.state.brightness_dining_room, this.state.brightness_kitchen, this.state.brightness_living_room, this.state.brightness_office, this.state.brightness_parent_bedroom, this.state.brightness_laundry_room)
          })
        }
      }
      else if(macroDeviceList[i]==="Television"){
        let tv_image = document.getElementById("Television_channel_" + (this.state.television_channel).toString());
        tv_image.style.opacity = this.state.turn_on;
        let tv_sound = document.getElementById("Television_volume_" + (this.state.television_volume).toString());
        tv_sound.style.opacity = this.state.turn_on;
        if(this.state.television_muted===true){
          let tv_muted = document.getElementById("Television_muted");
          tv_muted.style.opacity = "0"
        }
      }
      else if(macroDeviceList[i]==="Radio"){
        let radio_image = document.getElementById("Radio_channel_" + (this.state.radio_channel).toString());
        radio_image.style.opacity = this.state.turn_on;
        let radio_sound = document.getElementById("Radio_volume_" + (this.state.radio_volume).toString());
        radio_sound.style.opacity = this.state.turn_on;
        if(this.state.radio_muted===true){
          let radio_muted = document.getElementById("Radio_muted");
          radio_muted.style.opacity = "0"
        }
      }
      else if(macroDeviceList[i]==="Computer"){
        let computer_image = document.getElementById("Computer");
        computer_image.style.opacity = this.state.turn_on;
        let computer_sound = document.getElementById("Computer_volume_" + (this.state.computer_volume).toString());
        computer_sound.style.opacity = this.state.turn_on;
        if(this.state.computer_muted===true){
          let computer_muted = document.getElementById("Computer_muted");
          computer_muted.style.opacity = "0"
        }
      }
      else if(macroDeviceList[i]==="Air conditioner"){
        let old_air_conditioner_image = document.getElementById("Air_conditioner_program_"+this.state.air_conditioner_program);
        old_air_conditioner_image.style.opacity = "0";
        let air_conditioner_image = document.getElementById("Air_conditioner_program_1");
        air_conditioner_image.style.opacity = this.state.turn_on;
        this.setState({
          air_conditioner_program:1
        })
      }
      else if(macroDeviceList[i]==="Washing machine"){
        let old_washing_machine_image = document.getElementById("Washing_machine_program_"+this.state.washing_program);
        old_washing_machine_image.style.opacity = "0";
        let washing_machine_image = document.getElementById("Washing_machine_program_1");
        washing_machine_image.style.opacity = this.state.turn_on;
        this.setState({
          washing_program:1
        })
      }
      else {
        console.log("macroDeviceList[i] : ", macroDeviceList[i])
        let image = document.getElementById(macroDeviceList[i]);
        console.log("image : ", image)
        image.style.opacity = this.state.turn_on;
      }
    }
  }

  recognizeBrightness(intensity_brightness){
    console.log("this.state.brightness_children_bedroom1 : ", this.state.brightness_children_bedroom)
    for(let i = 0; i<macroDeviceList.length; i++){
      if(macroDeviceList[i]==="Light"){
        if(macroEnvironmentList.length !== 0){
          for(let environment of macroEnvironmentList){
            if(environment==="Bathroom"){
              this.setState({
                Brightness_bathroom : intensity_brightness
              })
            }
            else if(environment==="Children bedroom"){
              this.setState({
                Brightness_children_bedroom : intensity_brightness
              })
            }
            else if(environment==="Dining room"){
              this.setState({
                Brightness_dining_room : intensity_brightness
              })
            }
            else if(environment==="Kitchen"){
              this.setState({
                Brightness_kitchen : intensity_brightness
              })
            }
            else if(environment==="Living room"){
              this.setState({
                Brightness_living_room : intensity_brightness
              })
            }
            else if(environment==="Office"){
              this.setState({
                Brightness_office : intensity_brightness
              })
            }
            else if(environment==="Parent bedroom"){
              this.setState({
                Brightness_parent_bedroom : intensity_brightness
              })
            }
            else if(environment==="Washing room"){
              this.setState({
                Brightness_laundry_room : intensity_brightness
              })
            }
            let image_brightness = document.getElementById("Brightness_"+environment.toLowerCase())
            if(this.state.turn_on==="1"){
              image_brightness.style.opacity = intensity_brightness;
            }
            else{
              image_brightness.style.opacity = "0";
            }
          }
        }
        else{
          let all_brightness = ["Brightness_bathroom", "Brightness_children bedroom", "Brightness_dining room", "Brightness_kitchen", "Brightness_living room", "Brightness_office", "Brightness_parent bedroom", "Brightness_laundry room"]
          if(this.state.turn_on==="1") {
            for (i of all_brightness) {
              let image = document.getElementById(i)
              image.style.opacity = intensity_brightness;
            }
          }
          this.setState({
            brightness_bathroom : intensity_brightness,
            brightness_children_bedroom : intensity_brightness,
            brightness_dining_room : intensity_brightness,
            brightness_kitchen : intensity_brightness,
            brightness_living_room : intensity_brightness,
            brightness_office : intensity_brightness,
            brightness_parent_bedroom : intensity_brightness,
            brightness_laundry_room : intensity_brightness
          }, function (){
            console.log("Brightness of every environment : ", this.state.brightness_bathroom, this.state.brightness_children_bedroom, this.state.brightness_dining_room, this.state.brightness_kitchen, this.state.brightness_living_room, this.state.brightness_office, this.state.brightness_parent_bedroom, this.state.brightness_laundry_room)
          })
        }
      }
      else {
        console.log("Wrong device")
      }
    }
  }

  recognizeVolume(intensity_volume){
    for(let i = 0; i<macroDeviceList.length; i++) {
      if (macroDeviceList[i] === "Television") {
        let old_image_television = document.getElementById("Television_volume_" + (this.state.television_volume).toString())
        old_image_television.style.opacity = "0"
        let image_television = document.getElementById("Television_volume_" + intensity_volume.toString())
        image_television.style.opacity = "1"
        this.setState({
          television_volume: parseInt(intensity_volume)
        }, function () {
          console.log("television_volume : ", this.state.television_volume)
        })
      }
      else if (macroDeviceList[i] === "Radio") {
        let old_image_radio = document.getElementById("Radio_volume_" + (this.state.radio_volume).toString())
        old_image_radio.style.opacity = "0"
        let image_radio = document.getElementById("Radio_volume_" + intensity_volume.toString())
        image_radio.style.opacity = "1"
        this.setState({
          radio_volume: parseInt(intensity_volume)
        }, function () {
          console.log("radio_volume : ", this.state.radio_volume)
        })
      }
      else if (macroDeviceList[i] === "Computer") {
        let old_image_computer = document.getElementById("Computer_volume_" + (this.state.computer_volume).toString())
        old_image_computer.style.opacity = "0"
        let image_computer = document.getElementById("Computer_volume_" + intensity_volume.toString())
        image_computer.style.opacity = "1"
        this.setState({
          computer_volume: parseInt(intensity_volume)
        }, function () {
          console.log("computer_volume : ", this.state.computer_volume)
        })
      }
    }
  }

  recognizeMute(){
    if(macroDeviceList.includes("Television")){
      let check_tv_turn_on = document.getElementById("Television_channel_" + (this.state.television_channel).toString())
      if(check_tv_turn_on.style.opacity === "1") {
        let old_image_television = document.getElementById("Television_volume_" + (this.state.television_volume).toString())
        old_image_television.style.opacity = "0"
        let image_television = document.getElementById("Television_muted")
        image_television.style.opacity = "1"
        this.setState({
          television_muted:true
        }, function () {
          console.log("television_volume : ", this.state.television_volume);
          console.log("television_muted : ", this.state.television_muted);
        })
      }
      else{
        console.log("Television is not turned on")
      }
    }
    if(macroDeviceList.includes("Radio")){
      let check_radio_turn_on = document.getElementById("Radio_channel_" + (this.state.radio_channel).toString())
      if(check_radio_turn_on.style.opacity === "1") {
        let old_image_radio = document.getElementById("Radio_volume_" + (this.state.radio_volume).toString())
        old_image_radio.style.opacity = "0"
        let image_radio = document.getElementById("Radio_muted")
        image_radio.style.opacity = "1"
        this.setState({
          radio_muted:true
        }, function () {
          console.log("radio_volume : ", this.state.radio_volume);
          console.log("radio_muted : ", this.state.radio_muted);
        })
      }
      else{
        console.log("Radio is not turned on")
      }
    }
    if(macroDeviceList.includes("Computer")){
      let check_computer_turn_on = document.getElementById("Computer")
      if(check_computer_turn_on.style.opacity === "1") {
        let old_image_computer = document.getElementById("Computer_volume_" + (this.state.computer_volume).toString())
        old_image_computer.style.opacity = "0"
        let image_computer = document.getElementById("Computer_muted")
        image_computer.style.opacity = "1"
        this.setState({
          computer_muted:true
        }, function () {
          console.log("computer_volume : ", this.state.computer_volume);
          console.log("computer_muted : ", this.state.computer_muted);
        })
      }
      else{
        console.log("Computer is not turned on")
      }
    }
  }

  recognizeUnmute(){
    if(macroDeviceList.includes("Television")){
      if(this.state.television_muted !== true) {
        console.log("Television was not muted")
      }
      else {
        if(this.state.television_volume!==-1) {
          let image_television = document.getElementById("Television_volume_" + (this.state.television_volume).toString())
          image_television.style.opacity = "1"
        }
        else{
          console.log("Television was not turned on")
        }
        let old_image_television = document.getElementById("Television_muted")
        old_image_television.style.opacity = "0"
        this.setState({
          television_muted: false
        }, function () {
          console.log("television_volume : ", this.state.television_volume);
          console.log("television_muted : ", this.state.television_muted);
        })
      }
    }
    if(macroDeviceList.includes("Radio")){
      if(this.state.radio_muted !== true) {
        console.log("Radio was not muted")
      }
      else {
        if(this.state.radio_volume!==-1) {
          let image_radio = document.getElementById("Radio_volume_" + (this.state.radio_volume).toString())
          image_radio.style.opacity = "1"
        }
        else{
          console.log("Radio was not turned on")
        }
        let old_image_radio = document.getElementById("Radio_muted")
        old_image_radio.style.opacity = "0"
        this.setState({
          radio_muted: false
        }, function () {
          console.log("radio_volume : ", this.state.radio_volume);
          console.log("radio_muted : ", this.state.radio_muted);
        })
      }
    }
    if(macroDeviceList.includes("Computer")){
      if(this.state.computer_muted !== true) {
        console.log("Computer was not muted")
      }
      else {
        if(this.state.computer_volume!==-1) {
          let image_computer = document.getElementById("Computer_volume_" + (this.state.computer_volume).toString())
          image_computer.style.opacity = "1"
        }
        else{
          console.log("Computer was not turned on")
        }
        let old_image_computer = document.getElementById("Computer_muted")
        old_image_computer.style.opacity = "0"
        this.setState({
          computer_muted: false
        }, function () {
          console.log("computer_volume : ", this.state.computer_volume);
          console.log("computer_muted : ", this.state.computer_muted);
        })
      }
    }
  }

  recognizeNext(){
    if(macroDeviceList.includes("Television")){
      let check_tv_turn_on = document.getElementById("Television_channel_" + (this.state.television_channel).toString())
      if(check_tv_turn_on.style.opacity === "1") {
        check_tv_turn_on.style.opacity = "0"
        if(this.state.television_channel===5){
          this.setState({
            television_channel: 1
          }, function () {
            console.log("television_channel : ", this.state.television_channel);
          })
          let next_channel_tv = document.getElementById("Television_channel_1")
          next_channel_tv.style.opacity = "1"
        }
        else{
          let next_channel_tv = document.getElementById("Television_channel_" + (this.state.television_channel+1).toString())
          next_channel_tv.style.opacity = "1"
          this.setState({
            television_channel: this.state.television_channel+1
          }, function () {
            console.log("television_channel : ", this.state.television_channel);
          })
        }
      }
      else{
        console.log("Television is not turned on")
      }
    }
    if(macroDeviceList.includes("Radio")){
      let check_radio_turn_on = document.getElementById("Radio_channel_" + (this.state.radio_channel).toString())
      if(check_radio_turn_on.style.opacity === "1") {
        check_radio_turn_on.style.opacity = "0"
        if(this.state.radio_channel===5){
          this.setState({
            radio_channel: 1
          }, function () {
            console.log("radio_channel : ", this.state.radio_channel);
          })
          let next_channel_radio = document.getElementById("Radio_channel_1")
          next_channel_radio.style.opacity = "1"
        }
        else{
          let next_channel_radio = document.getElementById("Radio_channel_" + (this.state.radio_channel+1).toString())
          next_channel_radio.style.opacity = "1"
          this.setState({
            radio_channel: this.state.radio_channel+1
          }, function () {
            console.log("radio_channel : ", this.state.radio_channel);
          })
        }
      }
      else{
        console.log("Radio is not turned on")
      }
    }
  }

  recognizeIncreaseVolume(value_to_increase){
    if(macroDeviceList.includes("Television")){
      let value_to_increase_television = value_to_increase
      let updated_volume = this.state.television_volume+value_to_increase_television
      if(updated_volume>3){
        updated_volume=3
      }
      let last_tv_volume = document.getElementById("Television_volume_" + this.state.television_volume.toString())
      last_tv_volume.style.opacity = "0"
      let tv_volume = document.getElementById("Television_volume_" + updated_volume.toString())
      tv_volume.style.opacity = "1"
      this.setState({
        television_volume: updated_volume
      }, function () {
        console.log("television_volume : ", this.state.television_volume);
      })
    }
    if(macroDeviceList.includes("Radio")){
      let radio = value_to_increase
      let updated_volume = this.state.radio_volume+radio
      if(updated_volume>3){
        updated_volume=3
      }
      let last_radio_volume = document.getElementById("Radio_volume_" + this.state.radio_volume.toString())
      last_radio_volume.style.opacity = "0"
      let radio_volume = document.getElementById("Radio_volume_" + updated_volume.toString())
      radio_volume.style.opacity = "1"
      this.setState({
        radio_volume: updated_volume
      }, function () {
        console.log("radio_volume : ", this.state.radio_volume);
      })
    }
    if(macroDeviceList.includes("Computer")){
      let value_to_increase_computer = value_to_increase
      let updated_volume = this.state.computer_volume+value_to_increase_computer
      if(updated_volume>3){
        updated_volume=3
      }
      let last_computer_volume = document.getElementById("Computer_volume_" + this.state.computer_volume.toString())
      last_computer_volume.style.opacity = "0"
      let computer_volume = document.getElementById("Computer_volume_" + updated_volume.toString())
      computer_volume.style.opacity = "1"
      this.setState({
        computer_volume: updated_volume
      }, function () {
        console.log("computer_volume : ", this.state.computer_volume);
      })
    }
    if(macroDeviceList.includes("Light")){

    }
  }

  recognizeDecreaseVolume(value_to_decrease){
    if(macroDeviceList.includes("Television")){
      let value_to_increase_television = value_to_decrease
      let updated_volume = this.state.television_volume-value_to_increase_television
      if(updated_volume<0){
        updated_volume = 0
      }
      let last_tv_volume = document.getElementById("Television_volume_" + this.state.television_volume.toString())
      last_tv_volume.style.opacity = "0"
      let tv_volume = document.getElementById("Television_volume_" + updated_volume.toString())
      tv_volume.style.opacity = "1"
      this.setState({
        television_volume: updated_volume
      }, function () {
        console.log("television_volume : ", this.state.television_volume);
      })
    }
    if(macroDeviceList.includes("Radio")){
      let value_to_increase_radio = value_to_decrease
      let updated_volume = this.state.radio_volume-value_to_increase_radio
      if(updated_volume<0){
        updated_volume = 0
      }
      let last_radio_volume = document.getElementById("Radio_volume_" + this.state.radio_volume.toString())
      last_radio_volume.style.opacity = "0"
      let radio_volume = document.getElementById("Radio_volume_" + updated_volume.toString())
      radio_volume.style.opacity = "1"
      this.setState({
        radio_volume: updated_volume
      }, function () {
        console.log("radio_volume : ", this.state.radio_volume);
      })
    }
    if(macroDeviceList.includes("Computer")){
      let value_to_increase_computer = value_to_decrease
      let updated_volume = this.state.computer_volume-value_to_increase_computer
      if(updated_volume<0){
        updated_volume = 0
      }
      let last_computer_volume = document.getElementById("Computer_volume_" + this.state.computer_volume.toString())
      last_computer_volume.style.opacity = "0"
      let computer_volume = document.getElementById("Computer_volume_" + updated_volume.toString())
      computer_volume.style.opacity = "1"
      this.setState({
        computer_volume: updated_volume
      }, function () {
        console.log("computer_volume : ", this.state.computer_volume);
      })
    }
  }

  recognizeIncreaseBrightness(value_to_increase){
    if(macroDeviceList.includes("Light")){
      if(macroEnvironmentList.length!==0){
        for(let environment of macroEnvironmentList){
          console.log("environment : ", environment)
          if(environment==="Bathroom"){
            let updated_brightness = this.state.brightness_bathroom-value_to_increase
            if(updated_brightness<0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_bathroom = document.getElementById("Brightness_bathroom")
            brightness_bathroom.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_bathroom = document.getElementById("Light_bathroom")
              light_bathroom.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_bathroom = document.getElementById("Light_bathroom")
              light_bathroom.style.opacity = "0"
            }
            this.setState({
              brightness_bathroom: updated_brightness
            }, function () {
              console.log("brightness_bathroom : ", this.state.brightness_bathroom);
            })
          }
          if(environment==="Children bedroom"){
            let updated_brightness = this.state.brightness_children_bedroom-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_children_bedroom = document.getElementById("Brightness_children bedroom")
            brightness_children_bedroom.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_children_bedroom = document.getElementById("Light_children bedroom")
              light_children_bedroom.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_children_bedroom = document.getElementById("Light_children bedroom")
              light_children_bedroom.style.opacity = "0"
            }
            this.setState({
              brightness_children_bedroom: updated_brightness
            }, function () {
              console.log("brightness_children_bedroom : ", this.state.brightness_children_bedroom);
            })
          }
          if(environment==="Dining room"){
            let updated_brightness = this.state.brightness_dining_room-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_dining_room = document.getElementById("Brightness_dining room")
            brightness_dining_room.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_dining_room = document.getElementById("Light_dining room")
              light_dining_room.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_dining_room = document.getElementById("Light_dining room")
              light_dining_room.style.opacity = "0"
            }
            this.setState({
              brightness_dining_room: updated_brightness
            }, function () {
              console.log("brightness_dining_room : ", this.state.brightness_dining_room);
            })
          }
          if(environment==="Kitchen"){
            let updated_brightness = this.state.brightness_kitchen-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_kitchen = document.getElementById("Brightness_kitchen")
            brightness_kitchen.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_kitchen = document.getElementById("Light_kitchen")
              light_kitchen.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_kitchen = document.getElementById("Light_kitchen")
              light_kitchen.style.opacity = "0"
            }
            this.setState({
              brightness_kitchen: updated_brightness
            }, function () {
              console.log("brightness_kitchen : ", this.state.brightness_kitchen);
            })
          }
          if(environment==="Living room"){
            let updated_brightness = this.state.brightness_living_room-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_living_room = document.getElementById("Brightness_living room")
            brightness_living_room.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_living_room = document.getElementById("Light_living room")
              light_living_room.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_living_room = document.getElementById("Light_living room")
              light_living_room.style.opacity = "0"
            }
            this.setState({
              brightness_living_room: updated_brightness
            }, function () {
              console.log("brightness_living_room : ", this.state.brightness_living_room);
            })
          }
          if(environment==="Office"){
            let updated_brightness = this.state.brightness_office-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_office = document.getElementById("Brightness_office")
            brightness_office.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_office = document.getElementById("Light_office")
              light_office.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_office = document.getElementById("Light_office")
              light_office.style.opacity = "0"
            }
            this.setState({
              brightness_office: updated_brightness
            }, function () {
              console.log("brightness_office : ", this.state.brightness_office);
            })
          }
          if(environment==="Parent bedroom"){
            let updated_brightness = this.state.brightness_parent_bedroom-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_parent_bedroom = document.getElementById("Brightness_parent bedroom")
            brightness_parent_bedroom.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_parent_bedroom = document.getElementById("Light_parent bedroom")
              light_parent_bedroom.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_parent_bedroom = document.getElementById("Light_parent bedroom")
              light_parent_bedroom.style.opacity = "0"
            }
            this.setState({
              brightness_parent_bedroom: updated_brightness
            }, function () {
              console.log("brightness_parent_bedroom : ", this.state.brightness_parent_bedroom);
            })
          }
          if(environment==="Laundry room"){
            let updated_brightness = this.state.brightness_laundry_room-value_to_increase
            if(updated_brightness<=0){
              updated_brightness=0
            }
            else if(updated_brightness>1){
              updated_brightness=1
            }
            let brightness_laundry_room = document.getElementById("Brightness_laundry room")
            brightness_laundry_room.style.opacity = updated_brightness.toString()
            if(updated_brightness>=0 && updated_brightness<1){
              let light_laundry_room = document.getElementById("Light_laundry room")
              light_laundry_room.style.opacity = "1"
            }
            else if(updated_brightness===1){
              let light_laundry_room = document.getElementById("Light_laundry room")
              light_laundry_room.style.opacity = "0"
            }
            this.setState({
              brightness_laundry_room: updated_brightness
            }, function () {
              console.log("brightness_laundry_room : ", this.state.brightness_laundry_room);
            })
          }
        }
      }
      else{
        let all_light = ["Light_bathroom", "Light_children bedroom", "Light_dining room", "Light_kitchen", "Light_laundry room", "Light_living room", "Light_office", "Light_parent bedroom"]
        for(let k of all_light){
          let image = document.getElementById(k)
          image.style.opacity = "1";
        }

        let updated_brightness_bathroom = this.state.brightness_bathroom-value_to_increase
        if(updated_brightness_bathroom<=0){
          updated_brightness_bathroom=0
        }
        else if(updated_brightness_bathroom>=1){
          updated_brightness_bathroom=1
          let light_turn_off = document.getElementById("Light_bathroom")
          light_turn_off.style.opacity = "0";
        }
        let brightness_environment = document.getElementById("Brightness_bathroom")
        brightness_environment.style.opacity = updated_brightness_bathroom.toString()


        let updated_brightness_children_bedroom = this.state.brightness_children_bedroom-value_to_increase
        if(updated_brightness_children_bedroom<=0){
          updated_brightness_children_bedroom=0
        }
        else if(updated_brightness_children_bedroom>=1){
          updated_brightness_children_bedroom=1
          let light_turn_off = document.getElementById("Light_children bedroom")
          light_turn_off.style.opacity = "0";
        }
        let brightness_children_bedroom = document.getElementById("Brightness_children bedroom")
        brightness_children_bedroom.style.opacity = updated_brightness_children_bedroom.toString()


        let updated_brightness_dining_room = this.state.brightness_dining_room-value_to_increase
        if(updated_brightness_dining_room<=0){
          updated_brightness_dining_room=0
        }
        else if(updated_brightness_dining_room>=1){
          updated_brightness_dining_room=1
          let light_turn_off = document.getElementById("Light_dining room")
          light_turn_off.style.opacity = "0";
        }
        let brightness_dining_room = document.getElementById("Brightness_dining room")
        brightness_dining_room.style.opacity = updated_brightness_dining_room.toString()


        let updated_brightness_kitchen = this.state.brightness_kitchen-value_to_increase
        if(updated_brightness_kitchen<=0){
          updated_brightness_kitchen=0
        }
        else if(updated_brightness_kitchen>=1){
          updated_brightness_kitchen=1
          let light_turn_off = document.getElementById("Light_kitchen")
          light_turn_off.style.opacity = "0";
        }
        let brightness_kitchen = document.getElementById("Brightness_kitchen")
        brightness_kitchen.style.opacity = updated_brightness_kitchen.toString()


        let updated_brightness_living_room = this.state.brightness_living_room-value_to_increase
        if(updated_brightness_living_room<=0){
          updated_brightness_living_room=0
        }
        else if(updated_brightness_living_room>=1){
          updated_brightness_living_room=1
          let light_turn_off = document.getElementById("Light_living room")
          light_turn_off.style.opacity = "0";
        }
        let brightness_living_room = document.getElementById("Brightness_living room")
        brightness_living_room.style.opacity = updated_brightness_living_room.toString()


        let updated_brightness_office = this.state.brightness_office-value_to_increase
        if(updated_brightness_office<=0){
          updated_brightness_office=0
        }
        else if(updated_brightness_office>=1){
          updated_brightness_office=1
          let light_turn_off = document.getElementById("Light_office")
          light_turn_off.style.opacity = "0";
        }
        let brightness_office = document.getElementById("Brightness_office")
        brightness_office.style.opacity = updated_brightness_office.toString()


        let updated_brightness_parent_bedroom = this.state.brightness_parent_bedroom-value_to_increase
        if(updated_brightness_parent_bedroom<=0){
          updated_brightness_parent_bedroom=0
        }
        else if(updated_brightness_parent_bedroom>=1){
          updated_brightness_parent_bedroom=1
          let light_turn_off = document.getElementById("Light_parent bedroom")
          light_turn_off.style.opacity = "0";
        }
        let brightness_parent_bedroom = document.getElementById("Brightness_parent bedroom")
        brightness_parent_bedroom.style.opacity = updated_brightness_parent_bedroom.toString()


        let updated_brightness_laundry_room = this.state.brightness_laundry_room-value_to_increase
        if(updated_brightness_laundry_room<=0){
          updated_brightness_laundry_room=0
        }
        else if(updated_brightness_laundry_room>=1){
          updated_brightness_laundry_room=1
          let light_turn_off = document.getElementById("Light_laundry room")
          light_turn_off.style.opacity = "0";
        }
        let brightness_laundry_room = document.getElementById("Brightness_laundry room")
        brightness_laundry_room.style.opacity = updated_brightness_laundry_room.toString()

        this.setState({
          brightness_bathroom : updated_brightness_bathroom,
          brightness_children_bedroom : updated_brightness_children_bedroom,
          brightness_dining_room : updated_brightness_dining_room,
          brightness_kitchen : updated_brightness_kitchen,
          brightness_living_room : updated_brightness_living_room,
          brightness_office : updated_brightness_office,
          brightness_parent_bedroom : updated_brightness_parent_bedroom,
          brightness_laundry_room : updated_brightness_laundry_room
        }, function (){
          console.log("Brightness of every environment : ", this.state.brightness_bathroom, this.state.brightness_children_bedroom, this.state.brightness_dining_room, this.state.brightness_kitchen, this.state.brightness_living_room, this.state.brightness_office, this.state.brightness_parent_bedroom, this.state.brightness_laundry_room)
        })
      }
    }
  }

  recognizePause(isPause){
    if(macroDeviceList.includes("Television"))
      if(isPause) {
        let tv_pause = document.getElementById("Television_pause")
        tv_pause.style.opacity = "1"
      }
      else{
        let tv_pause = document.getElementById("Television_pause")
        tv_pause.style.opacity = "0"
      }
    else{
      console.log("There is not Television as device")
    }
  }

  recognizeChannel(number_channel){
    console.log("In recognizeChannel")
    if(macroDeviceList.includes("Television")){
      let number_television = 1
      if(number_channel>5){
        number_television=5
      }
      else{
        number_television = number_channel
      }
      let old_program = document.getElementById("Television_channel_"+this.state.television_channel.toString())
      old_program.style.opacity = "0"
      let new_program = document.getElementById("Television_channel_"+number_television.toString())
      new_program.style.opacity = "1"
      this.setState({
        television_channel:number_television
      })
    }
    if(macroDeviceList.includes("Radio")){
      let number_radio = 1
      if(number_channel>5){
        number_radio=5
      }
      else{
        number_radio = number_channel
      }
      let old_program = document.getElementById("Radio_channel_"+this.state.radio_channel.toString())
      old_program.style.opacity = "0"
      let new_program = document.getElementById("Radio_channel_"+number_radio.toString())
      new_program.style.opacity = "1"
      this.setState({
        radio_channel:number_radio
      })
    }
  }

  recognizeProgram(number_program){
    console.log("In recognizeProgram")
    if(macroDeviceList.includes("Washing machine")){
      let number_washing = 1
      if(number_program>3){
        number_washing=3
      }
      else{
        number_washing = number_program
      }
      console.log("second")
      console.log("this.state.washing_program.toString() : ", this.state.washing_program.toString())
      let old_program = document.getElementById("Washing_machine_program_"+this.state.washing_program.toString())
      old_program.style.opacity = "0"
      console.log("number_washing.toString() : ", number_washing.toString())
      let new_program = document.getElementById("Washing_machine_program_"+number_washing.toString())
      new_program.style.opacity = "1"
      this.setState({
        washing_program:number_washing
      })
    }
    if(macroDeviceList.includes("Air conditioner")){
      let number_air_conditioner = 1
      if(number_program>2){
        number_air_conditioner=2
      }
      else{
        number_air_conditioner = number_program
      }
      let old_program = document.getElementById("Air_conditioner_program_"+this.state.air_conditioner_program.toString())
      old_program.style.opacity = "0"
      let new_program = document.getElementById("Air_conditioner_program_"+number_air_conditioner.toString())
      new_program.style.opacity = "1"
      this.setState({
        air_conditioner_program:number_air_conditioner
      })
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
        "x": x-10,
        "y": y-120,
        "t": Date.now(),
      };
      tabFinal[stroke_id].push(objectCoord);
      this.ctx.current.moveTo(this.state.lastPosition.x-10, this.state.lastPosition.y-120);
      this.ctx.current.lineTo(x-10, y-120);
      this.ctx.current.closePath();
      this.ctx.current.stroke();
      this.setState({
        lastPosition:{x, y}
      });
    }
  }

  draw1(){
    const drawGesture = this.drawGesture.value.trim().toLowerCase();
    console.log("drawGesture : ", drawGesture)
    if(drawGesture === ''){
        console.log('Name cannot be blank');
    }
    else{
      this.gestureHandler.drawGesture(drawGesture)
    }

    this.ctx1.current.clearRect(0, 0, this.ctx1.current.canvas.width, this.ctx1.current.canvas.height)
  }

  draw2(drawGesture){
    if(drawGesture === ''){
        console.log('Name cannot be blank');
    }
    else{
      this.gestureHandler.drawGesture(drawGesture)
    }

    this.ctx1.current.clearRect(0, 0, this.ctx1.current.canvas.width, this.ctx1.current.canvas.height)
  }

  recognize_canvas(){
    console.log(nameListOfGesture)
    this.gestureHandler.registerGestures("dynamic", nameListOfGesture);
    if(tabFinal.length!==0) {
      gestureList.push(tabFinal)
      this.clearCanvas()
    }
    numberOfGestures = gestureList.length

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
    if(macroActionList!==[]){
      macroActionList=[]
      macroDeviceList=[]
      macroEnvironmentList=[]
      macroParameterList=[]
    }
    this.clear()
    stroke_id=0;

    this.setState({
      count:2,
      recognizedList: []
    })
  }

  checkInputsRecord(){
    const actionValue = this.action.value.trim();
    if(actionValue === ''){
        console.log('Action cannot be blank');
        this.clearCanvas()
    }
    else if(tabFinal.length===0){
        console.log( 'No Data');
        this.clearCanvas()
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
      this.clearCanvas()
      return dataStringRecord;
    }
  }

  checkMacroInputsRecord(){
    const macroValue = this.macro.value.trim();
    if(macroValue === ''){
        console.log(this.macro, 'Action cannot be blank');
        this.clearCanvas()
    }
    else if(tabFinal.length===0){
        console.log( 'No Data');
        this.clearCanvas()
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
      this.clearCanvas()
      return dataStringRecord;
    }
  }

  record(){
    var dataStringRecord = this.checkInputsRecord();
    if(typeof dataStringRecord!=='undefined'){
      const actionValue = this.action.value.trim();
      this.gestureHandler.addNewGesture(dataStringRecord, actionValue.toLowerCase());
      if(!checkListAssign.hasOwnProperty(actionValue.toUpperCase()) && !checkMacroListAssign.hasOwnProperty(actionValue.toUpperCase())) {
        if(!this.state.instructions[0] && !this.state.macros[0]){
          if(!checkList.includes(actionValue.toUpperCase())){
            checkList.push(actionValue.toUpperCase());
          }
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
          let cellInstruction = row.insertCell(5);
          cellInstruction.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Display</button>';
          cellInstruction.addEventListener("click", () => {this.draw2(item.nameGesture.toLowerCase())})
          row.appendChild(cellInstruction);
          let deleteGesture = row.insertCell(-1);
          deleteGesture.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Delete</button>';
          deleteGesture.addEventListener("click", () => {this.deleteGesture2(item.nameGesture.toLowerCase())})
          row.appendChild(deleteGesture);

          checkListAssign[actionValue.toUpperCase()] = tab;
          if(!checkList.includes(actionValue.toUpperCase()))
            checkList.push(actionValue.toUpperCase())
          console.log("checkList in record :", checkList)
          console.log("checkListAssign in record :", checkListAssign)
          this.setData()
          MacrosList=MacrosList.concat({label:actionValue.toUpperCase(),value:checkList.length})
        }
        else{
            if(!checkMacroList.includes(actionValue.toUpperCase())){
              checkMacroList.push(actionValue.toUpperCase());
            }
            tab = this.composedInstructions()
            if(tab[0]==="-" && tab[1]==="-" && tab[2]==="-" && tab[3]==="-" ){
              tab = []
            }
            for(var l in this.state.macros){
              tab=tab.concat(this.state.macros[l].label)
            }

            var i1=[]
            var i2=[]
            var i3=[]
            var i4=[]
            if(!checkList.includes(tab[0].toUpperCase())){

              var array = []
              for(var it in tab){
                if(tab[it]!=='-'){
                  array=array.concat(tab[it])
                }
              }
              tab=array
              console.log("tab 000 ",tab)
              var check=false
              if(!i1[0] && !check && typeof this.state.instructions[0]!== 'undefined'){
                i1=this.state.instructions[0].value
              }
              else if(!i1[0] && !check && typeof this.state.instructions[0]=== 'undefined'){
                i1=tab
                check=true
              }
              if(!i2[0] && !check && typeof this.state.instructions[1]!== 'undefined'){
                i2=this.state.instructions[1].value
              }
              else if(!i2[0] && !check && typeof this.state.instructions[1]=== 'undefined'){
                i2=tab
                check=true
              }

              if(!i3[0] && !check && typeof this.state.instructions[2]!== 'undefined'){
                i3=this.state.instructions[2].value
              }
              else if(!i3[0] && !check && typeof this.state.instructions[2]=== 'undefined'){
                i3=tab
                check=true
              }

              if(!i4[0] && !check && typeof this.state.instructions[3]!== 'undefined'){
                i4=this.state.instructions[3].value
              }
              else if(!i4[0] && !check && typeof this.state.instructions[3]=== 'undefined'){
                i4=tab
              }

            }
            else{
              for(let m in tab){
                check=false
                if(!i1[0] && !check && typeof this.state.instructions[0]!== 'undefined'){
                  i1=this.state.instructions[0].value
                }
                else if(!i1[0] && !check && typeof this.state.instructions[0]=== 'undefined'){
                  i1=tab[m]
                  check=true
                }
                if(!i2[0] && !check && typeof this.state.instructions[1]!== 'undefined'){
                  i2=this.state.instructions[1].value
                }
                else if(!i2[0] && !check && typeof this.state.instructions[1]=== 'undefined'){
                  i2=tab[m]
                  check=true
                }

                if(!i3[0] && !check && typeof this.state.instructions[2]!== 'undefined'){
                  i3=this.state.instructions[2].value
                }
                else if(!i3[0] && !check && typeof this.state.instructions[2]=== 'undefined'){
                  i3=tab[m]
                  check=true
                }

                if(!i4[0] && !check && typeof this.state.instructions[3]!== 'undefined'){
                  i4=this.state.instructions[3].value
                }
                else if(!i4[0] && !check && typeof this.state.instructions[3]=== 'undefined'){
                  i4=tab[m]
                }

              }
            }
            var isCorrect=true
            console.log(typeof i1 === "string" )
            console.log(i1 )
            if(typeof i1 === "string" && checkList.includes(i1.toUpperCase())){
              var recognizedMacro= checkListAssign[i1.toUpperCase()]
              if(recognizedMacro[0]==='-' || recognizedMacro[1]==='-'){
                isCorrect=false
              }
            }
            if(typeof i2 === "string" && checkList.includes(i2.toUpperCase())){
              recognizedMacro= checkListAssign[i2.toUpperCase()]
              if(recognizedMacro[0]==='-' || recognizedMacro[1]==='-'){
                isCorrect=false
              }
            }
            if(typeof i3 === "string" && checkList.includes(i3.toUpperCase())){
              recognizedMacro= checkListAssign[i3.toUpperCase()]
              if(recognizedMacro[0]==='-' || recognizedMacro[1]==='-'){
                isCorrect=false
              }
            }
            if(typeof i4 === "string" && checkList.includes(i4.toUpperCase())){
              recognizedMacro= checkListAssign[i4.toUpperCase()]
              if(recognizedMacro[0]==='-' || recognizedMacro[1]==='-'){
                isCorrect=false
              }
            }
            if(isCorrect){
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
              let cellInstruction = row.insertCell(5);
              cellInstruction.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Display</button>';
              cellInstruction.addEventListener("click", () => {this.draw2(item.nameGesture.toLowerCase())})
              row.appendChild(cellInstruction);
              let deleteGesture = row.insertCell(-1);
              deleteGesture.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Delete</button>';
              deleteGesture.addEventListener("click", () => {this.deleteMacroGesture(item.nameGesture.toLowerCase())})
              row.appendChild(deleteGesture);
              var bool = true

              if(i2.length===0){
                instruction2.innerHTML = '-';
                instruction3.innerHTML = '-';
                instruction4.innerHTML = '-';
                bool=false
              }
              else{
                instruction2.innerHTML = item.instruction2;
              }
              if(bool){
                if(i3.length===0){
                  instruction3.innerHTML = '-';
                  instruction4.innerHTML = '-';
                  bool=false
                }
                else{
                  instruction3.innerHTML = item.instruction3;
                }

              }
              if(bool){
                if(i4.length===0){
                  instruction4.innerHTML = '-';
                }
                else{
                  instruction4.innerHTML = item.instruction4;
                }
              }

              checkMacroListAssign[actionValue.toUpperCase()] = [i1,i2,i3,i4];
              if(!checkMacroList.includes(actionValue.toUpperCase()))
                checkMacroList.push(actionValue.toUpperCase())
              console.log("checkMacroListAssign in record :", checkMacroListAssign)
              console.log("checkMacroList in record :", checkMacroList)
              this.setMacroData()
              MacrosList=MacrosList.concat({label:actionValue.toUpperCase(),value:checkMacroList.length})
            }
            else{
              console.log('You have to choose an Action and a Device')
            }
        }
      }
      else{
        console.log("the name of the gesture already exists.")
      }
    }
    else{
      console.log("No Data")
    }

    this.setState({
      instructions:[]
    })
    nameListOfGesture = checkList.concat(checkMacroList)
    this.clearCanvas()
  }

  clearCanvas(){
    this.ctx.current.clearRect(0, 0, this.ctx.current.canvas.width, this.ctx.current.canvas.height)
    stroke_id = 0;
    tabFinal=[]
  }

  clear(){
    this.clearCanvas()
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

  deleteGesture(){
    var ListgestureDeleted=this.gestureDeleted.value.trim();
    ListgestureDeleted=ListgestureDeleted.split(',')
    for(let i in ListgestureDeleted){
      var gestureDeleted =ListgestureDeleted[i]
      console.log(gestureDeleted)
      this.gestureHandler.deleteGesture(gestureDeleted.toLowerCase());

      delete checkListAssign[gestureDeleted.toUpperCase()];
      var index=checkList.indexOf(gestureDeleted.toUpperCase());
      if(index>-1){
        checkList.splice(index,1)
      }
    }
    this.clear()
    this.setData()
    this.updateCheckListAssign()
  }

  deleteGesture2(gestureDeleted){
    console.log(gestureDeleted)
    this.gestureHandler.deleteGesture(gestureDeleted.toLowerCase());

    delete checkListAssign[gestureDeleted.toUpperCase()];
    var index=checkList.indexOf(gestureDeleted.toUpperCase());
    if(index>-1){
      checkList.splice(index,1)
    }
    this.clear()
    this.setData()

    let table = document.getElementById("target");
    table.innerHTML = ""
    let tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < 1; i++) {
      // creates a table row
      let row = document.createElement("tr");

      let cell1 = document.createElement("th");
      let cellText1 = document.createTextNode("Name of gesture");
      cell1.appendChild(cellText1);

      let cell2 = document.createElement("th");
      let cellText2 = document.createTextNode("Actions");
      cell2.appendChild(cellText2);

      let cell3 = document.createElement("th");
      let cellText3 = document.createTextNode("Devices");
      cell3.appendChild(cellText3);

      let cell4 = document.createElement("th");
      let cellText4 = document.createTextNode("Environments");
      cell4.appendChild(cellText4);

      let cell5 = document.createElement("th");
      let cellText5 = document.createTextNode("Parameters");
      cell5.appendChild(cellText5);

      let cell6 = document.createElement("th");
      let cellText6 = document.createTextNode("Display");
      cell6.appendChild(cellText6);

      let cell7 = document.createElement("th");
      let cellText7 = document.createTextNode("Delete");
      cell7.appendChild(cellText7);


      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      row.appendChild(cell6);
      row.appendChild(cell7);


      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
    this.updateCheckListAssign()
  }

  deleteMacroGesture(macrogestureDeleted){
    this.gestureHandler.deleteGesture(macrogestureDeleted.toLowerCase());
    delete checkMacroListAssign[macrogestureDeleted.toUpperCase()];
    const index=checkMacroList.indexOf(macrogestureDeleted.toUpperCase());
    if(index>-1){
      checkMacroList.splice(index,1)
    }
    this.clear()
    this.setMacroData()

    let table = document.getElementById("TableM");
    table.innerHTML = ""
    let tblBody = document.createElement("tbody");

    // creating all cells
    for (let i = 0; i < 1; i++) {
      // creates a table row
      let row = document.createElement("tr");

      let cell1 = document.createElement("th");
      let cellText1 = document.createTextNode("Name of composed instruction");
      cell1.appendChild(cellText1);

      let cell2 = document.createElement("th");
      let cellText2 = document.createTextNode("First instruction");
      cell2.appendChild(cellText2);

      let cell3 = document.createElement("th");
      let cellText3 = document.createTextNode("Second instruction");
      cell3.appendChild(cellText3);

      let cell4 = document.createElement("th");
      let cellText4 = document.createTextNode("Third instruction");
      cell4.appendChild(cellText4);

      let cell5 = document.createElement("th");
      let cellText5 = document.createTextNode("Fourth instruction");
      cell5.appendChild(cellText5);

      let cell6 = document.createElement("th");
      let cellText6 = document.createTextNode("Display");
      cell6.appendChild(cellText6);

      let cell7 = document.createElement("th");
      let cellText7 = document.createTextNode("Delete");
      cell7.appendChild(cellText7);


      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      row.appendChild(cell6);
      row.appendChild(cell7);


      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
    table.appendChild(tblBody);

    this.updateCheckMacroListAssign()
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
    for(let i in checkListAssign){
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
      let displayGesture = row.insertCell(5);
      displayGesture.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Display</button>';
      displayGesture.addEventListener("click", () => {this.draw2(item.nameGesture.toLowerCase())})
      row.appendChild(displayGesture);
      let deleteGesture = row.insertCell(-1);
      deleteGesture.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Delete</button>';
      deleteGesture.addEventListener("click", () => {this.deleteGesture2(item.nameGesture.toLowerCase())})
      row.appendChild(deleteGesture);
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
      let displayGesture = row.insertCell(5);
      displayGesture.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Display</button>';
      displayGesture.addEventListener("click", () => {console.log("item.nameGesture : ", item.nameGesture); this.draw2(item.nameGesture.toLowerCase())})
      row.appendChild(displayGesture);
      let deleteGesture = row.insertCell(-1);
      deleteGesture.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button">Delete</button>';
      deleteGesture.addEventListener("click", () => {this.deleteMacroGesture(item.nameGesture.toLowerCase())})
      row.appendChild(deleteGesture);

      if(item.instruction2===[]){
        instruction2.innerHTML = '-';
        instruction3.innerHTML = '-';
        instruction4.innerHTML = '-';
      }
      else{
        instruction2.innerHTML = item.instruction[1];
      }
        if(typeof item.instruction3==='undefined'){
          instruction3.innerHTML = '-';
        }
        else{
          instruction3.innerHTML = item.instruction[2];
        }

        if(typeof item.instruction4==='undefined'){
          instruction4.innerHTML = '-';
        }
        else{
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
    if(this.state.actions.length===0){
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
        if(event[i].label==="Increase" || event[i].label==="Decrease"){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Microwave" || label==="Fan" || label==="Washing machine" || label==="Air conditioner"){
              DevicesList[j].disabled=true
            }
          }
          for(let j=0;j<ParametersList.length;j++){
            let label=ParametersList[j].label
            if(label==="Brightness" || label==="Volume"){
              ParametersList[j].disabled=false
            }
            else{
              ParametersList[j].disabled=true
            }
          }
        }
        if(event[i].label==="Pause" || event[i].label==="Play"){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Computer" || label==="Microwave" || label==="Washing machine" || label==="Radio" || label==="Air conditioner" || label==="Fan" || label==="Light"){
              DevicesList[j].disabled=true
            }
          }
          for(let j=0;j<ParametersList.length;j++){
            let label =ParametersList[j].label
            if(label==="Time"){
              ParametersList[j].disabled=false
            }
            else{
              ParametersList[j].disabled=true
            }
          }
        }
        if(event[i].label==="Mute" || event[i].label==="Unmute"){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Washing machine" || label==="Air conditioner" || label==="Fan" || label==="Light" || label==="Microwave" ){
              DevicesList[j].disabled=true
            }
          }
          for(let j=0;j<ParametersList.length;j++){
            let label =ParametersList[j].label
            if(label==="Time"){
              ParametersList[j].disabled=false
            }
            else{
              ParametersList[j].disabled=true
            }
          }
        }
        if(event[i].label==="Next" ){
          for(let j=0;j<DevicesList.length;j++){
            let label =DevicesList[j].label
            if(label==="Microwave" || label==="Computer" || label==="Fan" || label==="Air conditioner" || label==="Light" || label==="Washing machine" ){
              DevicesList[j].disabled=true
            }
          }
          for(let j=0;j<ParametersList.length;j++){
            let label =ParametersList[j].label
            if(label==="Program" || label==="Channel" || label==="Time"){
              ParametersList[j].disabled=false
            }
            else{
              ParametersList[j].disabled=true
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

    for(let j=0;j<event.length;j++){
      let label =event[j].label
      if(event[j].disabled!==true){
        if(label==="Microwave"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Kitchen"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time") {
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
            }
          }
        }
        if(label==="Washing machine"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Laundry room"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time" || ParametersList[i].label==="Program"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
            }
          }
        }
        if(label==="Computer"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Office"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time" || ParametersList[i].label==="Volume"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off" || ActionsList[i].label==="Increase" || ActionsList[i].label==="Decrease" || ActionsList[i].label==="Mute" || ActionsList[i].label==="Unmute") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
            }
          }
        }
        if(label==="Television"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Living room"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time" || ParametersList[i].label==="Volume" || ParametersList[i].label==="Channel"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            ActionsList[i].disabled = false
          }
        }
        if(label==="Radio"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Parent bedroom"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time" || ParametersList[i].label==="Volume" || ParametersList[i].label==="Channel"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off" || ActionsList[i].label==="Increase" || ActionsList[i].label==="Decrease" || ActionsList[i].label==="Mute" || ActionsList[i].label==="Unmute" || ActionsList[i].label==="Next") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
            }
          }
        }
        if(label==="Air conditioner"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Children bedroom"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time" || ParametersList[i].label==="Program"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
            }
          }
        }
        if(label==="Fan"){
          for(let i=0;i<EnvironmentList.length;i++){
            if(EnvironmentList[i].label==="Living room"){
              EnvironmentList[i].disabled=false
            }
            else{
              EnvironmentList[i].disabled=true
            }
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
            }
          }
        }
        if(label==="Light"){
          for(let i=0;i<EnvironmentList.length;i++){
            EnvironmentList[i].disabled=false
          }
          for(let i=0;i<ParametersList.length;i++){
            if(ParametersList[i].label==="Time" || ParametersList[i].label==="Brightness"){
              ParametersList[i].disabled=false
            }
            else{
              ParametersList[i].disabled=true
            }
          }
          for(let i=0;i<ActionsList.length;i++){
            if(ActionsList[i].label==="Turn On" || ActionsList[i].label==="Turn Off" || ActionsList[i].label==="Increase" || ActionsList[i].label==="Decrease") {
              ActionsList[i].disabled = false
            }
            else{
              ActionsList[i].disabled = true
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
    let button = document.getElementById("buttonTableGestures")
    if (button.className==="arrow down"){
      button.className="arrow up";
    }
    else{
      button.className="arrow down";
    }
    var element= document.getElementById("TableOfGestures")
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  toggleCITable(){
    let button = document.getElementById("buttonComposed")
    if (button.className==="arrow down"){
      button.className="arrow up";
    }
    else{
      button.className="arrow down";
    }
    var element= document.getElementById("TableOfMacros")
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
  toggleCanvasgesture(){
    let button = document.getElementById("buttonDisplay")
    if (button.className==="arrow down"){
      button.className="arrow up";
    }
    else{
      button.className="arrow down";
    }
    var element= document.getElementById("Canvasgesture")
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
      var actionAndDevice=true

      var act = []
      var dev = []
      var macrosI =this.composedMacrosInstructions()
      for(const i in macrosI){
        console.log("macrosI[i] ",macrosI[i])
        if(checkList.includes(macrosI[i])){
          console.log("checkList in macroCommand : ", checkList)
          var instruct = checkListAssign[macrosI[i]]
          if( instruct[0]!=='-'){
            act=act.concat([instruct[0]])
          }
          if(instruct[1]!=='-'){
            dev=dev.concat([instruct[1]])
          }
        }
      }
      if(act.length===0 || dev.length===0 ){
        actionAndDevice=false
      }
      if(actionAndDevice){
        let macrosInstruction = []
        for(let j in macrosI){
          macrosInstruction= macrosInstruction.concat({value:macrosI[j]})
        }
        this.setState({
          instructions:this.state.instructions.concat(macrosInstruction)
        })
      }
      else{
        console.log('You have to choose an Action and a Device')
      }
    }

    this.setState({
      actions:[],
      devices:[],
      environment:[],
      parameters:[],
      macros:[]
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
    console.log("macro ",macro)
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
      if(recognized===(this.state.recognizedList.length-1).toString() && this.state.recognizedList[recognized]==='-'){
        break;
      }
      if(this.state.recognizedList[recognized]==='-'){
        list+="and "
      }
      else{
        list+=this.state.recognizedList[recognized]+" "
      }
    }
    return list;
  }

  render() {
    return (
      
      <div className="App">
        <h1 className={"h1"} style={{textAlign: "center"}}> EMERITI </h1>
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
            <img className="overlay" style={{opacity:"1"}} src={House} alt={"HOUSE"}/>
            <img className="overlay" style={{opacity:"0"}} src={Air_conditioner_program_1} id="Air_conditioner_program_1" alt={"Air_conditioner_cold"}/>
            <img className="overlay" style={{opacity:"0"}} src={Air_conditioner_program_2} id="Air_conditioner_program_2" alt={"Air_conditioner_hot"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_kitchen} id="Brightness_kitchen" alt={"Brightness_kitchen"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_bathroom} id="Brightness_bathroom" alt={"Brightness_bathroom"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_children_bedroom} id="Brightness_children bedroom" alt={"Brightness_children_bedroom"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_living_room} id="Brightness_living room" alt={"Brightness_living_room"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_dining_room} id="Brightness_dining room" alt={"Brightness_dining_room"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_parent_bedroom} id="Brightness_parent bedroom" alt={"Brightness_parent_bedroom"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_laundry_room} id="Brightness_laundry room" alt={"Brightness_laundry_room"}/>
            <img className="overlay" style={{opacity:"1"}} src={Brightness_office} id="Brightness_office" alt={"Brightness_office"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer} id="Computer" alt={"Computer"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer_volume_0} id="Computer_volume_0" alt={"Computer_volume_0"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer_volume_1} id="Computer_volume_1" alt={"Computer_volume_1"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer_volume_2} id="Computer_volume_2" alt={"Computer_volume_2"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer_volume_3} id="Computer_volume_3" alt={"Computer_volume_3"}/>
            <img className="overlay" style={{opacity:"0"}} src={Computer_muted} id="Computer_muted" alt={"Computer_muted"}/>
            <img className="overlay" style={{opacity:"0"}} src={Fan} id="Fan" alt={"Fan"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_bathroom} id="Light_bathroom" alt={"Light_bathroom"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_children_bedroom} id="Light_children bedroom" alt={"Light_children_bedroom"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_dining_room} id="Light_dining room" alt={"Light_dining_room"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_kitchen} id="Light_kitchen" alt={"Light_kitchen"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_laundry_room} id="Light_laundry room" alt={"Light_laundry_room"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_living_room} id="Light_living room" alt={"Light_living_room"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_office} id="Light_office" alt={"Light_office"}/>
            <img className="overlay" style={{opacity:"0"}} src={Light_parent_bedroom} id="Light_parent bedroom" alt={"Light_parent_bedroom"}/>
            <img className="overlay" style={{opacity:"0"}} src={Microwave} id="Microwave" alt={"Microwave"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio} id="Radio" alt={"Radio"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_channel_1} id="Radio_channel_1" alt={"Radio_channel_1"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_channel_2} id="Radio_channel_2" alt={"Radio_channel_2"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_channel_3} id="Radio_channel_3" alt={"Radio_channel_3"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_channel_4} id="Radio_channel_4" alt={"Radio_channel_4"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_channel_5} id="Radio_channel_5" alt={"Radio_channel_5"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_volume_0} id="Radio_volume_0" alt={"Radio_volume_0"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_volume_1} id="Radio_volume_1" alt={"Radio_volume_1"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_volume_2} id="Radio_volume_2" alt={"Radio_volume_2"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_volume_3} id="Radio_volume_3" alt={"Radio_volume_3"}/>
            <img className="overlay" style={{opacity:"0"}} src={Radio_muted} id="Radio_muted" alt={"Radio_muted"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television} id="Television_channel_1" alt={"Television"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_channel_2} id="Television_channel_2" alt={"Television_channel_2"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_channel_3} id="Television_channel_3" alt={"Television_channel_3"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_channel_4} id="Television_channel_4" alt={"Television_channel_4"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_channel_5} id="Television_channel_5" alt={"Television_channel_5"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_volume_0} id="Television_volume_0" alt={"Television_volume_0"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_volume_1} id="Television_volume_1" alt={"Television_volume_1"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_volume_2} id="Television_volume_2" alt={"Television_volume_2"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_volume_3} id="Television_volume_3" alt={"Television_volume_3"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_muted} id="Television_muted" alt={"Television_muted"}/>
            <img className="overlay" style={{opacity:"0"}} src={Television_pause} id="Television_pause" alt={"Television_pause"}/>
            <img className="overlay" style={{opacity:"0"}} src={Washing_machine} id="Washing machine" alt={"Washing_machine"}/>
            <img className="overlay" style={{opacity:"0"}} src={Washing_machine_program_1} id="Washing_machine_program_1" alt={"Washing_machine_program_1"}/>
            <img className="overlay" style={{opacity:"0"}} src={Washing_machine_program_2} id="Washing_machine_program_2" alt={"Washing_machine_program_2"}/>
            <img className="overlay" style={{opacity:"0"}} src={Washing_machine_program_3} id="Washing_machine_program_3" alt={"Washing_machine_program_3"}/>
          </div>
        </div>
        <div className={"instructions"}>  Instruction : {this.showInstructions()}</div> 
        <div className={"instructions"}>  Recognized Instruction : {this.showRecognizedInstructions()}</div> 
        <div className="container">
          <div className="box3">
            <div className={"time before next gesture"}>Timer : {this.fmt(this.state.count)}</div>

            <button className={"button"} onClick={this.recognize_canvas}>Recognize</button>
            <button className={"button"} onClick={this.clear}>Reset</button>
            <button className={"button"} onClick={this.add_instruction}>Add Instruction</button>
            <button className={"button"} onClick={this.clearDataSet}>Clear Dataset</button>

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
              {/* <div className={"box"}>
                <label className="custom-field one">
                  <input className={"textArea"} type="text" placeholder=" " id="macro"/>
                  <span className="placeholder">Name of the composed instruction</span>
                </label>
              </div> */}
              <div className={"list"}>
                <MultiSelect options={MacrosList}
                  value={this.state.macros}
                  onChange={this.ModifyMacrosList}
                  labelledBy="Macros"
                  isCreatable={true}
                  valueRenderer={MacroRenderer}
                  hasSelectAll={false}/>
              </div>
              {/* <button  type="button" className={"button"} onClick={this.macroCommand}>Create Macro-Command</button> */}
            </form>
          </div>
        </div>
          <div className="container2">
            <form >
              <div className="container2">
                <div className="box4">
                  <button id="buttonTableGestures" type="button" className={"arrow down"} onClick={this.toggleTable}></button>
                  <h1>Table of gestures</h1>
                  <div id ="TableOfGestures">
                    <table className={"content-table"} id={"target"}>
                      <tbody>
                        <tr>
                          <th>Name of gesture</th>
                          <th>Actions</th>
                          <th>Devices</th>
                          <th>Environments</th>
                          <th>Parameters</th>
                          <th>Display</th>
                          <th>Delete</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="box4">
                  <button id="buttonComposed" type="button" className={"arrow down"} onClick={this.toggleCITable}></button>
                  <h1>Table of composed instruction</h1>
                  <div id ="TableOfMacros">
                    <table className={"content-table"} id={"TableM"}>
                      <tbody>
                        <tr>
                          <th>Name of composed instruction</th>
                          <th>First instruction</th>
                          <th>Second instruction</th>
                          <th>Third instruction</th>
                          <th>Fourth instruction</th>
                          <th>Display</th>
                          <th>Delete</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="container">
            <div className="box2">
              <button id="buttonDisplay" type="button" className={"arrow down"} onClick={this.toggleCanvasgesture}></button>
              <h1>Draw a gesture</h1>
              <div id="Canvasgesture">
                <canvas id="myCanvas1" ref={this.canvasRef1}
                  style={{
                    border: "1px solid #000"}}
                    width={500}
                    height={500}>
                </canvas>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;


