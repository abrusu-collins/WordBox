//Selectors

let input = document.getElementById("textinput");
let select = document.getElementById("select");
let button = document.getElementById("btn");
let speedgauge = document.getElementById("speed");
let pitchgauge = document.getElementById("pitch");
let speedval = document.getElementById("speedval");
let pitchval = document.getElementById("pitchval");
let table = document.getElementById("table");
let play = document.getElementById("play");
pitchgauge.addEventListener("input", pitchincrease, true);
speedgauge.addEventListener("input", speedincrease, true);

function speedincrease(e) {
  speedval.textContent = speedgauge.value;
}

function pitchincrease(e) {
  pitchval.textContent = pitchgauge.value;
}

var synth = window.speechSynthesis;
function allvoices() {
  window.voices = synth.getVoices();
  for (var i = 0; i <= voices.length - 1; i++) {
    let option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    select.appendChild(option);
  }
}

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = allvoices;
}

function speak(e) {
  e.preventDefault();
  if (input.value == "") {
    input.value = "the lazy fox jumped over the brown dog";
  }

  let r = JSON.parse(localStorage.getItem("texts"));
  if (r === null) {
    let r = [];
    r.push(input.value);
    localStorage.setItem("texts", JSON.stringify(r));
  } else {
    let r = JSON.parse(localStorage.getItem("texts"));

    r.push(input.value);
    localStorage.setItem("texts", JSON.stringify(r));
  }

  var utterThis = new SpeechSynthesisUtterance(input.value);
  var selectedOption = select.selectedOptions[0].getAttribute("data-name");
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  utterThis.pitch = pitchgauge.value;
  utterThis.rate = speedgauge.value;
  synth.speak(utterThis);

  input.blur();

  if (r.includes(input.value) !== true) {
    let tbody = document.createElement("tbody");
    tbody.innerHTML = `<tr class="table-primary">
    <th scope="row">${input.value}</th>
    <td id="play">Play</td>
    <td id="deleted">Delete</td>
    
  </tr>`;
    table.appendChild(tbody);
  }

  if(table.firstElementChild.id=="no"){
   
    let nohistory= document.getElementById("no");
    nohistory.remove();
  }
}

button.addEventListener("click", speak, true);

//window load
window.onload = function (e) {
  let r = JSON.parse(localStorage.getItem("texts"));
  let set = new Set(r);
  let arr = Array.from(set);
  for (var i = 0; i <= arr.length - 1; i++) {
    let tbody = document.createElement("tbody");
    tbody.innerHTML = `<tr class="table-primary">
      <th scope="row">${arr[i]}</th>
      <td id="play">Play</td>
      <td id="deleted">Delete</td>
      
    </tr>`;
    table.appendChild(tbody);
  }
  synth.cancel();

  if(table.childElementCount==0){
    let nohistory=document.createElement("h5");
    nohistory.innerText=`There is no history`;
    nohistory.setAttribute("id","no");
    table.appendChild(nohistory);
  }
  
};

table.addEventListener("click", player, true);
function player(e) {
  if (e.target.id == "play") {
    var utterThis = new SpeechSynthesisUtterance(
      e.target.parentElement.firstElementChild.textContent
    );
    var selectedOption = select.selectedOptions[0].getAttribute("data-name");
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }

    utterThis.pitch = pitchgauge.value;
    utterThis.rate = speedgauge.value;
    synth.speak(utterThis);

    input.blur();
  }
}

table.addEventListener("click", deleter, true);
function deleter(e) {
  if (e.target.id == "deleted") {
    e.target.parentElement.parentElement.remove();
    let r = JSON.parse(localStorage.getItem("texts"));
    let j = [];
    r.filter((rones) => {
      if (rones !== e.target.parentElement.firstElementChild.textContent) {
        j.push(rones);
        synth.cancel();
      }
    });
    localStorage.setItem("texts", JSON.stringify(j));
 console.log(table.textContent);
    if( JSON.parse(localStorage.getItem("texts")).length==0 && !(table.textContent.includes("There is no history"))){
   
      let nohistory=document.createElement("h5");
      nohistory.innerText=`There is no history`;
      nohistory.setAttribute("id","no");
      table.appendChild(nohistory);
    
  }}

 
}

//pause,resume and stop

let a=document.getElementById("a")
let b=document.getElementById("b")
let c=document.getElementById("c")

  a.addEventListener("click",(e)=>{
    synth.pause();
  })

  b.addEventListener("click",(e)=>{
    synth.resume();
  })


 c.addEventListener("click",(e)=>{
    synth.cancel();
    
  })