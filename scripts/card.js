//On Loading for the page - don't put in html anymore, put here
function pageInit()  
{
  loadState();
  doFit();
  // createModal();
  
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

  localStorage.setItem('data', JSON.stringify(cookieJson))
}



function getSundayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay();

  const sunday = new Date(today.setDate(first));
  sunday.setHours(0,0,0,0);

  return sunday;

}

//function to compare current date to the dates saved in the cookie, weekly reset
function wkReset(storedDataJson){

  // The division by 86400000 turns the date into days instead of milliseconds
  var cookieSunday = parseInt(Date.parse(storedDataJson["recentSunday"]) / 86400000);
  var cookieSaturday = cookieSunday + 6;
  var currentDate = parseInt(Date.now()/ 86400000);

  console.log(cookieSunday + "  |  " + currentDate + "  |  " + cookieSaturday);

  if (currentDate >= cookieSunday && currentDate < cookieSaturday) {
    console.log("Data is valid");
    return(false);
  }
  else{
    console.log("Data is old");
    return(true);
  }

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
  var storedData = JSON.parse(localStorage.getItem('data'));
  // console.log(storedData);
  if(storedData === null || wkReset(storedData)) //if there's not a cookie OR if wkReset = true
  {
    newCard();
  }
  

  else{

    for(var i=0; i < 24; i++) { 
      // console.log(storedData["tiles"][i].text);
      setSquare(i, storedData["tiles"][i].text, storedData["tiles"][i].css);
    }
  }
}



//text resizing stuff below https://github.com/STRML/textFit#implementation-details
function doFit(){
  textFit(document.getElementsByClassName('bingo'), {maxFontSize: 10, alignHoriz:true, alignVert:true});
}


//Bingo Tile Highlight By Click
function press(element){

  document.getElementById(element.id).classList.toggle('score');
  doFit();
  saveState();

  checkWin();
}

//Bingo win check
function checkWin(){
  if(
    //horizontal lines
    (document.getElementById('square0').classList.contains("score") &&
    document.getElementById('square1').classList.contains("score") &&
    document.getElementById('square2').classList.contains("score") &&
    document.getElementById('square3').classList.contains("score") &&
    document.getElementById('square4').classList.contains("score"))
    ||
    (document.getElementById('square5').classList.contains("score") &&
    document.getElementById('square6').classList.contains("score") &&
    document.getElementById('square7').classList.contains("score") &&
    document.getElementById('square8').classList.contains("score") &&
    document.getElementById('square9').classList.contains("score"))
    ||
    (document.getElementById('square10').classList.contains("score") &&
    document.getElementById('square11').classList.contains("score") &&
    document.getElementById('squarefree').classList.contains("score") &&
    document.getElementById('square12').classList.contains("score") &&
    document.getElementById('square13').classList.contains("score"))
    ||
    (document.getElementById('square14').classList.contains("score") &&
    document.getElementById('square15').classList.contains("score") &&
    document.getElementById('square16').classList.contains("score") &&
    document.getElementById('square17').classList.contains("score") &&
    document.getElementById('square18').classList.contains("score"))
    ||
    (document.getElementById('square19').classList.contains("score") &&
    document.getElementById('square20').classList.contains("score") &&
    document.getElementById('square21').classList.contains("score") &&
    document.getElementById('square22').classList.contains("score") &&
    document.getElementById('square23').classList.contains("score"))
    ||
    //vertical lines
    (document.getElementById('square0').classList.contains("score") &&
    document.getElementById('square5').classList.contains("score") &&
    document.getElementById('square10').classList.contains("score") &&
    document.getElementById('square14').classList.contains("score") &&
    document.getElementById('square19').classList.contains("score"))
    ||
    (document.getElementById('square1').classList.contains("score") &&
    document.getElementById('square6').classList.contains("score") &&
    document.getElementById('square11').classList.contains("score") &&
    document.getElementById('square15').classList.contains("score") &&
    document.getElementById('square20').classList.contains("score"))
    ||
    (document.getElementById('square2').classList.contains("score") &&
    document.getElementById('square7').classList.contains("score") &&
    document.getElementById('squarefree').classList.contains("score") &&
    document.getElementById('square16').classList.contains("score") &&
    document.getElementById('square21').classList.contains("score"))
    ||
    (document.getElementById('square3').classList.contains("score") &&
    document.getElementById('square8').classList.contains("score") &&
    document.getElementById('square12').classList.contains("score") &&
    document.getElementById('square17').classList.contains("score") &&
    document.getElementById('square22').classList.contains("score"))
    ||
    (document.getElementById('square4').classList.contains("score") &&
    document.getElementById('square9').classList.contains("score") &&
    document.getElementById('square13').classList.contains("score") &&
    document.getElementById('square18').classList.contains("score") &&
    document.getElementById('square23').classList.contains("score"))
    ||
    //diagonals
    (document.getElementById('square0').classList.contains("score") &&
    document.getElementById('square6').classList.contains("score") &&
    document.getElementById('squarefree').classList.contains("score") &&
    document.getElementById('square17').classList.contains("score") &&
    document.getElementById('square23').classList.contains("score"))
    ||
    (document.getElementById('square4').classList.contains("score") &&
    document.getElementById('square8').classList.contains("score") &&
    document.getElementById('squarefree').classList.contains("score") &&
    document.getElementById('square15').classList.contains("score") &&
    document.getElementById('square19').classList.contains("score"))

   ){
    
    // for starting the confetti 
    const start = () => {
      setTimeout(function() {
          confetti.start()
      }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
  };

  //  for stopping the confetti 
  const stop = () => {
      setTimeout(function() {
          confetti.stop()
      }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
  };

  start();
  stop();

   }

 

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
