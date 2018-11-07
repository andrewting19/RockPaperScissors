var feedback = document.getElementById("feedback");
var feedback_message = document.getElementById("feedback_message");
var winner_text;
var explanation_text;


//rules button
makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));

//enter name button
//makeToggable(document.getElementById("enter_name_button"), document.getElementById("enter_name"));
var player_name = localStorage.getItem('player_name');
console.log(player_name);

var enter_name_button = document.getElementById("enter_name_button");
enter_name_button.addEventListener("click", function() {
  var input = document.getElementById("name").value;
  player_name = localStorage.setItem('player_name', input);
  console.log(player_name);
  document.getElementById("enter_name").classList.remove("visible");
  document.getElementById("enter_name").classList.add("hidden");
  document.getElementById("throw_choice").classList.remove("hidden");
  document.getElementById("throw_choice").classList.add("visible");
  feedback_message.innerHTML = "Congratulations, you have a name.";
  feedback.classList.add("positive");
  feedback.classList.remove("negative");

  player_name=localStorage.getItem('player_name');
  updateMessage("display_name", "Ready to bust some moves "+player_name+" ?");
});

//show stats button
localStorage.setItem("Total Games", 0);
localStorage.setItem("Total Wins", 0);
localStorage.setItem("Winrate", 0);
var player_losses = 0;
var player_ties = 0;
var player_throws = [0, 0, 0, 0, 0,0,0];
var computer_throws = [0, 0, 0, 0,0,0,0];
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));

//rock paper scissors choices buttons
var throw_choice;
throwChoice();

//reset buttons
document.getElementById("reset").addEventListener("click", function() {
  $("select").each(function() { this.selectedIndex = 0 });
});


//enter name button and stuff
if(!player_name){
  document.getElementById("enter_name").classList.remove("hidden");
  document.getElementById("enter_name").classList.add("visible");
  document.getElementById("throw_choice").classList.remove("visible");
  document.getElementById("throw_choice").classList.add("hidden");

  //make play_game Hidden
  //show enter Name
  feedback_message.innerHTML = "ENTER A NAME... or exit the premises.";
  feedback.classList.add("negative");
  feedback.classList.remove("positive");
  console.log("enter ya poopin name");
} else {
  //showOrNot(name_div, false);
  //showOrNot(document.getElementsById("feedback"), true);
  console.log(player_name);
  player_name=localStorage.getItem('player_name');
  updateMessage("display_name", "Ready to bust some moves "+player_name+" ?");
  document.getElementById("throw_choice").classList.remove("hidden");
  document.getElementById("throw_choice").classList.add("visible");
  feedback_message.innerHTML = "I remember you! ...or do I? Who is 'I' anyways?";
  feedback.classList.add("positive");
  feedback.classList.remove("negative");
}



function makeToggable(button_element, div_element) {
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
    console.log(div_element)
  });
}

function rpsLogic(rpsButton, game_results) {
  rpsButton.addEventListener("click",function() {
    //LOCAL STORAGE +1 TO TOTAL GAMES
    //localStorage.setItem("Total Games", parseInt(localStorage.getItem('Total Games'))+1);
    var computer_throw = Math.floor(Math.random()*3)+1;
    var throw_choice = dropdown_options[dropdown_options.selectedIndex].value;

    if(computer_throw==1) {computer_throw_text="Rock";}
    else if(computer_throw==2) {computer_throw_text="Paper";}
    else if(computer_throw==3){computer_throw_text="Scissors";}

    winner_text = document.getElementById("winner");
    explanation_text = document.getElementById("explanation");
    var throw_text;



    console.log("Player throw: "+throw_choice);
    console.log("Computer throw: " +computer_throw);
    if(throw_choice==0) { //IF DID NOT SELECT A THROW
      feedback_message.innerHTML = "Choose your throw choice. Or else...";
      feedback.classList.add("negative");
      feedback.classList.remove("positive");
    } else {
      feedback_message.innerHTML = "Good choice!";
      feedback.classList.add("positive");
      feedback.classList.remove("negative");
      localStorage.setItem("Total Games", parseInt(localStorage.getItem("Total Games"))+1);

      if(throw_choice==3) { //IF PLAYER THROWS SCISSORS
        throw_text = "Scissors";
        if(computer_throw==1) {
          console.log("Computer win: scissors < rock");
          winner_text.innerHTML = "Not you ;c";
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" loses to "+computer_throw_text+".";
        } else if(throw_choice>computer_throw) {
          console.log("Player win: scissors > paper");
          winner_text.innerHTML = player_name;
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" wins against "+computer_throw_text+".";
        } else {
          console.log("Tie: scissors = scissors");
          winner_text.innerHTML = "Everyone! It's a tie! :D";
          explanation_text.innerHTML = "You both chose "+throw_text+" and as a result decide to be friends.";
        }
      } else if(throw_choice==2) { //IF PLAYER THROWS PAPER
        throw_text = "Paper";
        if(computer_throw>throw_choice) {
          console.log("Computer win: paper < scissors");
          winner_text.innerHTML = "Not you ;c";
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" loses to "+computer_throw_text+".";
        } else if(throw_choice>computer_throw) {
          console.log("Player win: paper > rock");
          winner_text.innerHTML = player_name;
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" wins against "+computer_throw_text+".";
        } else {
          console.log("Tie: paper = paper");
          winner_text.innerHTML = "Everyone! It's a tie! :D";
          explanation_text.innerHTML = "You both chose "+throw_text+", and as a result decide to be friends.";
        }
      } else { //IF PLAYER THROWS ROCK
        throw_text = "Rock";
        if(computer_throw==3) {
          console.log("Player win: rock > scissors");
          winner_text.innerHTML = player_name;
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" wins against "+computer_throw_text+".";
        } else if(throw_choice<computer_throw) {
          console.log("Computer win: rock < paper");
          winner_text.innerHTML = "Not you ;c";
          explanation_text.innerHTML = "You chose "+throw_text+". B(r)owser chose "+computer_throw_text+". "+throw_text+" loses to "+computer_throw_text+".";
        } else {
          console.log("Tie: rock = rock");
          winner_text.innerHTML = "Everyone! It's a tie! :D";
          explanation_text.innerHTML = "You both chose "+throw_text+", and as a result decide to be friends.";
        }
      }

      $("#player_img").attr("src", "images/player"+throw_text+".jpg");
      $("#computer_img").attr("src", "images/computer"+computer_throw_text+".jpg");
      player_throws[throw_choice]+=1;
      console.log(player_throws);

      computer_throws[computer_throw]+=1;
      console.log(computer_throws);

      if(winner_text.innerHTML==player_name) {
        localStorage.setItem("Total Wins", parseInt(localStorage.getItem("Total Wins"))+1);
      } else if (winner_text.innerHTML=="Not you ;c") {
        player_losses+=1;
      } else { player_ties+=1; }
      localStorage.setItem("Winrate", 100*parseInt(localStorage.getItem("Total Wins"))/(parseInt(localStorage.getItem("Total Wins"))+player_losses));

      updateStats();

      if(game_results.classList.contains("hidden")) {
        game_results.classList.remove("hidden");
        game_results.classList.add("visible");
      }

    } //still inside ELSE statement

  }); //end of button pressed function
}

function throwChoice() {
  shoot_button = document.getElementById("throw_choice_button");
  dropdown_options = document.getElementById("dropdown");
  console.log(throw_choice);

  rpsLogic(throw_choice_button, document.getElementById("game_results"));

}


function updateMessage(text_element, message) {
  document.getElementById(text_element).textContent = message;
}

function updateStats() {
  var games = parseInt(localStorage.getItem("Total Games"));
  var wins = parseInt(localStorage.getItem("Total Wins"));
  player_throws[0]=player_throws[1]+player_throws[2]+player_throws[3]; //FIND PERCENT
  player_throws[4]=100*player_throws[1]/player_throws[0].toFixed(2);
  player_throws[5]=100*player_throws[2]/player_throws[0].toFixed(2);
  player_throws[6]=100*player_throws[3]/player_throws[0].toFixed(2);
  computer_throws[0]=computer_throws[1]+computer_throws[2]+computer_throws[3]; //SAME
  computer_throws[4]=100*computer_throws[1]/computer_throws[0];
  computer_throws[5]=100*computer_throws[2]/computer_throws[0];
  computer_throws[6]=100*computer_throws[3]/computer_throws[0];

  document.getElementById("total_games").innerHTML="Games Played: "+games;
  document.getElementById("winrate").innerHTML="Winrate: "+parseInt(localStorage.getItem("Winrate")).toFixed(2)+"%";
  document.getElementById("total_wins").innerHTML="Wins: "+wins;
  document.getElementById("total_losses").innerHTML="Losses: "+player_losses;
  document.getElementById("total_ties").innerHTML="Ties: "+ player_ties;
  document.getElementById("player_rocks").innerHTML="Rocks played: "+ player_throws[1] + " ("+player_throws[4].toFixed(2)+"%)";
  document.getElementById("player_papers").innerHTML="Papers played: "+ player_throws[2] + " ("+player_throws[5].toFixed(2)+"%)";
  document.getElementById("player_scissors").innerHTML="Scissors played: "+ player_throws[3] + " ("+player_throws[6].toFixed(2)+"%)";
  document.getElementById("computer_rocks").innerHTML="Rocks played: "+ computer_throws[1] + " ("+computer_throws[4].toFixed(2)+"%)";
  document.getElementById("computer_papers").innerHTML="Papers played: "+ computer_throws[2] + " ("+computer_throws[5].toFixed(2)+"%)";
  document.getElementById("computer_scissors").innerHTML="Scissors played: "+ computer_throws[3] + " ("+computer_throws[6].toFixed(2)+"%)";
}
