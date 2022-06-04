function newCard() {
    //array goes here
    boxes=Boxes;

    //randomize array
    shuffle(boxes)
    
	for(var i=0; i < 24; i++) { 
		setSquare(i,boxes[i]);
	}
}


function setSquare(thisSquare,boxtext) {
	var currSquare = "square"+thisSquare;
	
	document.getElementById(currSquare).innerHTML = boxtext;
}


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