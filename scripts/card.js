//On Loading for the page - don't put in html anymore, put here
function pageInit()  
{
  loadState();
  createModal();
}


function newCard() {
 
    //array goes here
    boxes=Boxes;

    //randomize array
    shuffle(boxes)
    
	for(var i=0; i < 24; i++) { 
		setSquare(i,boxes[i], "bingo");
	}

  document.getElementById('squarefree').classList.remove('score');

  saveState();

  doFit();
}


function setSquare(thisSquare,boxtext, css) {
	var currSquare = "square"+thisSquare;
	
	document.getElementById(currSquare).textContent = boxtext;
  document.getElementById(currSquare).className = "";
  document.getElementById(currSquare).classList.add(...(css.split(" ")));
}



function saveState()
{
  var bingoBoardState = {};
  for(var i=0; i < 24; i++) { 
    bingoBoardState[i] = getSquare(i);
  }
    
  const recentSunday = getSundayOfCurrentWeek();

  const cookieJson = {};
  cookieJson["tiles"] = bingoBoardState;
  cookieJson["recentSunday"] = recentSunday;

  document.cookie = "data = " + JSON.stringify(cookieJson);
  
  // console.log(document.cookie);
  // console.log("data = " + JSON.stringify(cookieJson));
}



function getSundayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay();

  const sunday = new Date(today.setDate(first));
  sunday.setHours(0,0,0,0);

  return sunday;

}

function wkReset(cookie){
  var cookieJson = JSON.parse(cookie);

  var cookieSunday = cookieJson["recentSunday"];
  var cookieSaturday = cookieSunday + 6;
  var currentDate = new Date();

  if (currentDate > cookieSunday && currentDate < cookieSaturday) {
    alert('Correct Date')
  }
  else{
    alert('Outside of Range')
  }

  console.log(document.cookie)

}


function getSquare(i)
{
  var currSquare = "square"+i;
  var json = {};
  json['text'] = document.getElementById(currSquare).textContent;
  json['css'] = document.getElementById(currSquare).classList.value;
  return (json);
}

function loadState() {
  var cookie = getCookie("data");
  if(cookie == "" || wkReset(cookie)) //if there's not a cookie OR if wkReset = true
  {
    newCard();
  }
  

  else{
    // console.log( JSON.parse(getCookie("data")));

    var bingoJSON = JSON.parse(getCookie("data"));

    console.log(bingoJSON);

    for(var i=0; i < 24; i++) { 
      console.log(bingoJSON[i]);

      setSquare(i, bingoJSON.tiles[i].text, bingoJSON.tiles[i].css);
    }

  }
}


//A function to get a cookie from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


//text resizing stuff below https://github.com/STRML/textFit#implementation-details
function doFit(){
  textFit(document.getElementsByClassName('bingo'), {maxFontSize: 22, alignHoriz: true, alignVert: true, multiLine: true });
}


//Bingo Tile Highlight By Click
function press(element){

  document.getElementById(element.id).classList.toggle('score');
  doFit();
  saveState();
}


//Suggestion Form
function SubForm (){
  $.ajax({
    url:"https://api.apispreadsheets.com/data/Rkm38o0zN04pqvHd/",
    type:"post",
    data:$("#myForm").serializeArray(),
    success: function(){
      alert("Suggestion Submitted :D")
    },
    error: function(){
      alert("There was an error :(")
    }
  });

  document.getElementById('comment').value = '';
}


//Modal modal modal
function createModal(){
  let modalBtn = document.getElementById("modal-btn")
  
  let modal = document.querySelector(".modal")
  
  let closeBtn = document.querySelector(".close-btn")
  
    modalBtn.onclick = function(){
      modal.style.display = "block"
    }
  
    closeBtn.onclick = function(){
      modal.style.display = "none"
    }
  
    window.onclick = function(e){
      if(e.target == modal){
        modal.style.display = "none"
      }
    }
}




//idea sources: https://www.reddit.com/r/labrats/comments/v3velv/made_a_bingo_any_suggestions/
Boxes=[
  "Forgot negative control",
  "Used calculator for basic math",
  "Western blots... >:(",
  "Beer in cold room",
  "Not enough sample material to start the experiment",
  "Did I pipette this well already?",
  "Received a passive aggressive email",
  "Lab journal isn't up to date",
  "Made dry ice Eppendorf bombs",
  "Wait...the experiment actually worked? :O",
  "That's how you're supposed to do it, but we're doing it this way",
  "Data looks dodgy", 
  "Fubared equipment",
  "Used wrong media",
  "Maybe it works this time",
  "Wrote a passive aggressive email",
  "Working on weekends",
  "\"Reading\"",
  "Forgot how to science in front of supervisor",
  "\"I'll plot the data tomorrow\"(forgets about the data to plot)",
  "Lost my samples",
  "Experiment just stopped working",
  "Your cells seem to hate you",
  "Something went wrong on a Friday evening",
  "Necessary reagents are backordered for an undetermined amount of time",
  "Crying in the cold room",
  "Torn nitrile glove",
  "Dripped bleach on shoes/pants",
  "Snacks in the breakroom",
  "Powerpoint just don't work",
  "Contaminated culture",
  "Slamming random buttons to stop the beeping",
  "Chemical in one big hard lump",
  "N=1",
  "No sterile bottles left",

];


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


//Leaderboard - Insert Name
// function SubScore (){
//   $.ajax({
//     url:"https://api.apispreadsheets.com/data/TPb4Q7f3ROuHnRus/",
//     type:"post",
//     data:$("#scoreForm").serializeArray(),
//     success: function(){
//       alert("Name Submitted :D")
//     },
//     error: function(){
//       alert("There was an error :(")
//     }
//   });

//   document.getElementById('name').value = '';
// }


//Leaderboard - Update Score

// fetch("https://api.apispreadsheets.com/data/TPb4Q7f3ROuHnRus/", {
// 	method: "POST",
// 	body: JSON.stringify({"data": {"name":"value","bingo-score":"value"}, "query": "select*from26439wherename='value'"}),
// }).then(res =>{
// 	if (res.status === 201){
// 		// SUCCESS
// 	}
// 	else{
// 		// ERROR
// 	}
// })


//Leaderboard - Read Name and Score

  // fetch("https://api.apispreadsheets.com/data/TPb4Q7f3ROuHnRus/").then(res=>{
  //   if (res.status === 200){
  //     // SUCCESS
  //     res.json().then(data=>{
  //       const yourData = data
  //     }).catch(err => console.log(err))
  //   }
  //   else{
  //     // ERROR
  //   }
  // })

 
 
 
//Function to set name and greeting as cookie
  // function checkCookie() {
  //   let username = getCookie("username");
  //   if (username != "") {
  //    alert("Welcome again " + username);
  //   } else {
  //     username = prompt("Please enter your name:", "");
  //     if (username != "" && username != null) {
  //       setCookie("username", username, 365);
  //     }
  //   }
  // }
