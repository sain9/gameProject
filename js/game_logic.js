for (let i = 1; i < 9; i++) {
  document.write('<tr><th class="k">' + i + '</th>');
  for (var j = 1; j < 9 ; j++) {
    if ((i + j) % 2 == 0) {
      document.write('<td style="background-color: transparent;"></td>');
    } else {
      document.write('<td style="background-color: transparent;"></td>');
    }
  }
  document.write('<th class="k">' + i + '</th></tr>');
}
//for getting the index and changing the color  
let tdList = document.getElementsByTagName("td");
for (let i = 0; i < tdList.length; i++) {
  tdList[i].addEventListener("click", function() {
    let row = this.parentElement.rowIndex;
    let col = this.cellIndex ;
    // console.log("Clicked on row,Y:  " + row + " and column, X: " + col);

    

    //setting point X and Y
    var pointX = col;
    var pointY = row;
    console.log("x: "+pointX+" y: "+pointY);

    //converting pointX to letter(alphabet)
    const switchedX = convertToLetter(pointX); 
    //  console.log(switchedX);

    //switched current position
    var currentPosition = switchedX + "," + pointY;
    // console.log("current position: ",currentPosition);

    //switched treasure position
    var treasurePosition = convertToLetter(xAxisTreasurePoint) + "," + yAxisTreasurePoint;
    console.log("Treasure position: ",treasurePosition);

    //Hint Logic  
    var hintx = 0;
    if (pointX > xAxisTreasurePoint ) {
        hintx = pointX - xAxisTreasurePoint; 
    }
    else {
        hintx = xAxisTreasurePoint - pointX;
    }
    // document.getElementById("hintx").innerHTML = hintx;
     //Hint Logic yAxis
     var hinty = 0;
    if (pointY > yAxisTreasurePoint ) {
        hinty = pointY - yAxisTreasurePoint; 
    }
    else {
        hinty = yAxisTreasurePoint - pointY;
    }
    // document.getElementById("hinty").innerHTML = hinty;

    // for hint and stepsAway
    var stepsAway = hintx + hinty ;
    
      
    
     if(gameOver !== true)
    document.getElementById("stepsAway").innerHTML = "> you are at {" + currentPosition + "} and " + stepsAway + " steps away from the Treasure";
    else if (gameOver === true)
    document.getElementById("stepsAway").innerHTML = `GAME OVER! You Already Found Treasure at {${treasurePosition}} `;
   //to generate new messages
    // var msg = "> you are at {" + currentPosition + "} and " + stepsAway + " steps away from the Treasure";
    // console.log(msg);
    // var messageDiv = document.createElement("div");
    // var messageText = document.createTextNode(msg);
    // messageDiv.appendChild(messageText);
    // document.getElementById("hint").appendChild(messageDiv);
    // document.getElementById("hint").appendChild(document.createElement("br"));

    // changin the colour of the coordinate point
    if(pointX == xAxisTreasurePoint && pointY == yAxisTreasurePoint){
        console.log("Yay ! you found the treasure...");
        //  this.style.backgroundColor = "green"; 
          //  this.style.backgroundColor = "red"; 
          this.style.backgroundImage = "url('./images/Treasure.png' )";
          this.style.backgroundSize = "cover";
         
    }
    else { 
      if (gameOver) {
        this.style.backgroundImage = "url('./images/gameover.png')";
        this.style.backgroundSize = "99%";
        // this.style.backgroundSize = "contain";
        // this.style.backgroundSize = "cover";
        this.style.backgroundPosition = "center";
        this.style.backgroundRepeat = "no-repeat"; 
        // this.style.backgroundColor="white"
      } else {
        //  this.style.backgroundColor = "red"; 
        this.style.backgroundImage = "url('./images/Hole_in_Ground.png')";
        this.style.backgroundSize = "cover";
        this.style.position = "relative"; // add relative position to the element
      
        // create the pseudo-element for the text layer
        let textLayer = document.createElement("div");
        textLayer.classList.add("text-layer");
        textLayer.innerText = `${stepsAway}`;
        // textLayer.style.fontSize = "1em";
        
        // append the pseudo-element to the element
        this.appendChild(textLayer);
      }
      

    }

      //to make hint div visible
      // if (pointY && stepsAway !== 0) {
      //   const myDiv = document.getElementById("hint");
      //   myDiv.style.display = "block";
      // }

      //when treasure is found
      if (stepsAway === 0 ) {
        
        gameOver =true  
        // hide foundTreasure div
        const myDiv2 = document.getElementById("hint");
        myDiv2.style.display = "none";

        showResultModal();
        
      }

   
   
    //count
      count++;
      console.log("count : "+count);
      if (stepsAway ===0 && count > 2) {
        document.getElementById("count").innerHTML = ` {Number of attempts made : ${count}} Great. Now, can you find the treasure in ${count - 1} attempts ?`;
      } else {
        if( stepsAway === 0 && count === 1) {
          document.getElementById("count").innerHTML = ` Awesome, you went God mode and in just one click you found the treasure `;
           }
        else if( stepsAway === 0 && count === 2) {
          document.getElementById("count").innerHTML = `{Number of attempts made : ${count}} Wow, can you find the treasure in one click ?`;
        }
      
      }

     

    
      //logic for refreshing when treasure is found and again clicked on the board
      if(stepsAway === 0) {
        treasureFound =  true;
        treasureFoundAt = count;
        console.log("game over");
        gameOver = true;
      }
      console.log("treasureFound : "+treasureFound +"\ntreasureFoundAt : "+treasureFoundAt);
      if(gameOver && count > treasureFoundAt){
       
      }
   
     
  });
}

//count should be define outside the even listener and should be used inside it.
let count = 0;
let treasureFound = false;
let treasureFoundAt = 0;
let gameOver = false;
document.getElementById("stepsAway").innerHTML = "> click on the board to start";

 var convertToLetter = (pointX) => {
 const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
 return alphabet[pointX - 1];

 }

 //  treasure co-ordinates
 // Function to generate random number
var randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
   return  Math.floor(Math.random() * (max - min + 1)) + min;
}

  //setting the coordinates for treasure point
  var xAxisTreasurePoint = randomNumber(1, 8);
  var yAxisTreasurePoint = randomNumber(1, 8);
  console.log("xAxisTreasurePoint : ",xAxisTreasurePoint,"yAxisTreasurePoint : ",yAxisTreasurePoint);

  // ##########################################################
// promt model
function showResultModal() {
  document.querySelector('.result-modal').style.display = "block";
}

