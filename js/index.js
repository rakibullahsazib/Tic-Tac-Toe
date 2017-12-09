console.log("JS file is working");
/*
4 | 9 | 2
3 | 5 | 7
8 | 1 | 6
*/
/*$(document).ready(function(){
  console.log("document is ready");
});*/

$(document).ready(function(){
  if ($(window).width() < 320) {
    $("body").css("background-size", "auto");
  }else{$("body").css("background-size", "cover");}
});

$(window).resize(function() {

  if ($(window).width() < 480) {
    $("body").css("background-size", "auto");
  }else{$("body").css("background-size", "cover");}

  var turn1 = document.getElementById('turn1');
  turn1.style.position = "absolute";
  turn1.style.top = $("#btn1").position().top + 20 + 'px';
  if (player1Name === "You") {
    turn1.style.top = $("#btn4").position().top + 'px';
  }
  turn1.style.left = $("#playing-field").position().left + 'px';

  var turn2 = document.getElementById('turn2');
  turn2.style.position = "absolute";
  turn2.style.top = $("#btn3").position().top + 'px';
  turn2.style.left = $("#btn3").position().left + 80 + 'px';
});

var playerNum, sign1, sign2, player1, player2, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, step;
var btn1Player, btn2Player, btn3Player, btn4Player, btn5Player, btn6Player, btn7Player, btn8Player, btn9Player;

var player1Name, player2Name, player1Score, player2Score;

var masterStep1, masterStep3;

var btnValues = [null, 4, 9, 2, 3, 5, 7, 8, 1, 6];
var occupiedByplayer1 = [];
var occupiedByplayer2 = [];

$("#one-player").click(function() {
  $("#player-number").attr("hidden", "hidden");
  $("#difficulty").removeAttr("hidden");
});

$("#two-player").click(function() {
  $("#player-number").attr("hidden", "hidden");
  $("#sign-text").html("Sign of Player 1");
  $("#sign-choice").removeAttr("hidden");
});

$("#baby,#matured,#master").click(function() {
  $("#difficulty").attr("hidden", "hidden");
  $("#sign-text").html("Choose your Sign");
  $("#sign-choice").removeAttr("hidden");
});

$("#round,#cross").click(function() {
  $("#sign-choice").attr("hidden", "hidden");
  $("#playing-field").removeAttr("hidden");
  $("#reset-all").removeAttr("hidden");

});

/*Variables are assigned here*/
step = 1;
player1Score = 0;
player2Score = 0;
$("#one-player").click(function() {
  playerNum = 1;
  player1 = true;
  player2 = false;
  player1Name = "You";
  player2Name = "Computer";

});
$("#two-player").click(function() {
  playerNum = 2;
  player1Name = "Player 1";
  player2Name = "Player 2";
  player1 = true;
  player2 = false;

});

$("#baby").click(function() {
  difficulty = "baby";
});
$("#matured").click(function() {
  difficulty = "matured";
});
$("#master").click(function() {
  difficulty = "master";
});

$("#round").click(function() {
  sign1 = "o";
  sign2 = "x";
});
$("#cross").click(function() {
  sign1 = "x";
  sign2 = "o";
});

$("#round,#cross").click(function() {

  //console.log(typeof positionBtn1.top);
  //console.log(positionBtn1.top,positionBtn1.left);
  //$("#result").css('top',positionBtn5.top.toString()+'px');
  var turn1 = document.getElementById('turn1');
  turn1.style.position = "absolute";
  turn1.style.top = $("#btn1").position().top + 'px';
  if (player1Name === "You") {
    turn1.style.top = $("#btn4").position().top + 20 + 'px';
  }
  turn1.style.left = $("#playing-field").position().left + 'px';

  $("#turn1").html(player1Name).removeAttr("hidden");
  $("#turn2").html(player2Name);
  $("#score").removeAttr("hidden");
  $("#player1-name").html(player1Name);
  $("#player2-name").html(player2Name);
  $("#player1-score").html(player1Score);
  $("#player2-score").html(player2Score);
});




/*btnInfoArr saves btn properties
It has length 10,first element is empty

btnInfoArr[1]-btnInfoArr[9] represents each button

btnInfoArr[2][0] can have true or false value which represents whether btn2 is occupied or not

btnInfoArr[2][1] can have value 1 or 2 which represents whether btn2 is occupied by player1 or player2*/
var btnInfoArr = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
];
var unoccupiedBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/*
IMPORTANT
occupiedByplayer1-2 saves the values of each button which sums up to zero vertically,horizontally,diagonally

*/


function randomRange(myMin, myMax) {

  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin; // Change this line

}


/*For computer in the case of defeat player=2
in the case of defend player=1
*/
function defeatORDefendF(player) {

  console.log("player1", occupiedByplayer1);
  console.log("player2", occupiedByplayer2);

  if (player === 1) {
    for (var j1 = 0; j1 < occupiedByplayer1.length - 1; j1++) {
      for (var j2 = j1 + 1; j2 < occupiedByplayer1.length; j2++) {
        var checker = occupiedByplayer1[j1] + occupiedByplayer1[j2];
        //console.log("defendchecker=",checker);
        if (checker > 5 && checker < 15) {
          for (var i = 1; i < btnValues.length; i++) {
            //console.log(i);
            if (btnValues[i] === 15 - checker && btnInfoArr[i][0] !== true) {
              //console.log("click btn", i);
              return i;
            }
          }
        }
      }
    }
  } else if (player === 2) {
    for (var k1 = 0; k1 < occupiedByplayer2.length - 1; k1++) {
      for (var k2 = k1 + 1; k2 < occupiedByplayer2.length; k2++) {
        var checker = occupiedByplayer2[k1] + occupiedByplayer2[k2];
        //console.log("defeatchecker=",checker);
        if (checker > 5 && checker < 15) {
          for (var i = 1; i < btnValues.length; i++) {
            if (btnValues[i] === 15 - checker && btnInfoArr[i][0] !== true) {
              //console.log("click btn", i);
              return i;
            }
          }
        }
      }
    }
  }


}

function computerF() {


  var rand;

  if (difficulty === "baby" && unoccupiedBtns.length >= 1) {
    $(".play-btn").attr("disabled", "disabled");
    setTimeout(function() {
      rand = randomRange(0, unoccupiedBtns.length - 1);
      btnClickF(unoccupiedBtns[rand]);
      $(".play-btn").removeAttr("disabled");

    }, 1500);

  } else if (difficulty === "matured" && unoccupiedBtns.length >= 1) {
    //console.log("inside matured");
    $(".play-btn").attr("disabled", "disabled");
    setTimeout(function() {
      if (step === 1) {
        console.log("step1 matured");
        var arr1 = [1, 3, 5, 7, 9];
        rand = randomRange(0, arr1.length - 1);
        btnClickF(arr1[rand]);
      } else if (step === 2) {
        console.log("step2 matured");
        /*if btn5 is occupied*/
        if (btnInfoArr[5][0] === true) {
          var arr2 = [1, 3, 7, 9];
          rand = randomRange(0, arr2.length - 1);
          btnClickF(arr2[rand]);
        } else {
          btnClickF(5);
        }

      } else if (step === 3) {

        rand = randomRange(0, unoccupiedBtns.length - 1);
        btnClickF(unoccupiedBtns[rand]);
      } else if (step === 4) {
        console.log("step4 matured");
        //try to defend
        if (Number.isInteger(defeatORDefendF(1))) {
          btnClickF(defeatORDefendF(1));
        }

        if (player2 === true) {
          rand = randomRange(0, unoccupiedBtns.length - 1);
          //console.log("rand", unoccupiedBtns[rand]);
          btnClickF(unoccupiedBtns[rand]);
        }
      } else {
        console.log("step>4 matured");
        //try to win
        if (Number.isInteger(defeatORDefendF(2))) {
          btnClickF(defeatORDefendF(2));
        }
        //try to defend
        if (player2 === true) {
          if (Number.isInteger(defeatORDefendF(1))) {
            btnClickF(defeatORDefendF(1));
          }
        }
        if (player2 === true) {
          rand = randomRange(0, unoccupiedBtns.length - 1);
          //console.log("rand", unoccupiedBtns[rand]);
          btnClickF(unoccupiedBtns[rand]);
        }
      }


      $(".play-btn").removeAttr("disabled");

    }, 1500);

  } else if (difficulty === "master" && unoccupiedBtns.length >= 1) {



    $(".play-btn").attr("disabled", "disabled");
    setTimeout(function() {


      if (step === 1) {
        console.log("step1 master");
        masterStep1 = randomRange(1, 9);
        //console.log("masterStep1=",masterStep1);
        btnClickF(masterStep1);
      } else if (step === 2) {
        console.log("step2 master");
        /*if btn5 is occupied*/
        if (btnInfoArr[5][0] === true) {
          var arr2 = [1, 3, 7, 9];
          rand = randomRange(0, arr2.length - 1);
          btnClickF(arr2[rand]);
        } else {
          btnClickF(5);
        }

      } else if (step === 3) {
        //console.log("masterStep1=",masterStep1);
        console.log("step3 master");
        if (btnInfoArr[5][0] !== true) {
          //console.log("btn5 is not occupied, click btn5");
          btnClickF(5);
        } else {
          //console.log("btn5 is occupied");
          if (btnInfoArr[1][1] === 2) {
            var arr = [6, 8, 9];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[2][1] === 2) {
            var arr = [4, 6, 7, 9];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[3][1] === 2) {
            var arr = [4, 7, 8];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[4][1] === 2) {
            var arr = [2, 3, 8, 9];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[5][1] === 2) {
            //console.log("masterStep1=== 5");
            if (btnInfoArr[1][1] === 1) {
              btnClickF(9);
            } else if (btnInfoArr[9][1] === 1) {
              btnClickF(1);
            } else if (btnInfoArr[7][1] === 1) {
              btnClickF(3);
            } else if (btnInfoArr[3][1] === 1) {
              btnClickF(7);
            } else if (btnInfoArr[2][1] === 1 || btnInfoArr[4][1] === 1 || btnInfoArr[6][1] === 1 || btnInfoArr[8][1] === 1) {
              var arr = [1, 3, 7, 9];
              rand = randomRange(0, arr.length - 1);
              btnClickF(arr[rand]);
            }
          } else if (btnInfoArr[6][1]===2) {
            var arr = [1, 2, 7, 8];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[7][1]===2) {
            var arr = [2, 3, 6];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[8][1]===2) {
            var arr = [1, 3, 4, 6];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[9][1]===2) {
            var arr = [1, 2, 4];
            rand = randomRange(0, arr.length - 1);
            //console.log("click btn",arr[rand]);
            btnClickF(arr[rand]);
          }
        }


      } else if (step === 4) {
        console.log("step4 master");
        //try to defend
        if (Number.isInteger(defeatORDefendF(1))) {
          btnClickF(defeatORDefendF(1));
        }

        if (player2 === true) {

          if (btnInfoArr[5][1] === 1) {
            if (occupiedByplayer1[0] + occupiedByplayer2[0] + occupiedByplayer1[1] === 15) {
              if (btnInfoArr[1][1] === 1 || btnInfoArr[9][1] === 1) {
                btnClickF(3);
              } else {
                btnClickF(9);
              }
            }

          } else if (btnInfoArr[1][1] === 1 && btnInfoArr[9][1] === 1) {
            var arr = [2, 4, 6, 8];
            rand = randomRange(0, arr.length - 1);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[3][1] === 1 && btnInfoArr[7][1] === 1) {
            var arr = [2, 4, 6, 8];
            rand = randomRange(0, arr.length - 1);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[2][1] === 1 && btnInfoArr[8][1] === 1) {
            var arr = [1, 3, 7, 9];
            rand = randomRange(0, arr.length - 1);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[4][1] === 1 && btnInfoArr[6][1] === 1) {
            var arr = [1, 3, 7, 9];
            rand = randomRange(0, arr.length - 1);
            btnClickF(arr[rand]);
          } else if (btnInfoArr[1][1] === 1 && btnInfoArr[6][1] === 1) {
            btnClickF(3);
          } else if (btnInfoArr[3][1] === 1 && btnInfoArr[8][1] === 1) {
            btnClickF(9);
          } else if (btnInfoArr[9][1] === 1 && btnInfoArr[4][1] === 1) {
            btnClickF(7);
          } else if (btnInfoArr[7][1] === 1 && btnInfoArr[2][1] === 1) {
            btnClickF(1);
          } else if (btnInfoArr[2][1] === 1 && btnInfoArr[6][1] === 1) {
            btnClickF(3);
          } else if (btnInfoArr[6][1] === 1 && btnInfoArr[8][1] === 1) {
            btnClickF(9);
          } else if (btnInfoArr[4][1] === 1 && btnInfoArr[8][1] === 1) {
            btnClickF(7);
          } else if (btnInfoArr[2][1] === 1 && btnInfoArr[4][1] === 1) {
            btnClickF(1);
          } else if (btnInfoArr[2][1] === 1 && btnInfoArr[9][1] === 1) {
            btnClickF(4);
          } else if (btnInfoArr[6][1] === 1 && btnInfoArr[7][1] === 1) {
            btnClickF(2);
          } else if (btnInfoArr[8][1] === 1 && btnInfoArr[1][1] === 1) {
            btnClickF(6);
          } else if (btnInfoArr[4][1] === 1 && btnInfoArr[3][1] === 1) {
            btnClickF(8);
          } else {
            rand = randomRange(0, unoccupiedBtns.length - 1);
            //console.log("rand", unoccupiedBtns[rand]);
            btnClickF(unoccupiedBtns[rand]);
          }
        }
      } else if (step === 5) {
        console.log("step5 master");
        if (Number.isInteger(defeatORDefendF(2))) {
          btnClickF(defeatORDefendF(2));
        }
        //try to defend
        if (player2 === true) {
          if (Number.isInteger(defeatORDefendF(1))) {
            btnClickF(defeatORDefendF(1));
          }
        }
        if (player2 === true) {

          if (btnInfoArr[5][1] === 2) {
            if (btnInfoArr[9][1] === 2 && btnInfoArr[1][1] === 1) {
              if (btnInfoArr[6][0] !== true) {
                btnClickF(6);
              } else {
                btnClickF(8);
              }
            } else if (btnInfoArr[1][1] === 2 && btnInfoArr[9][1] === 1) {
              if (btnInfoArr[2][0] !== true) {
                btnClickF(2);
              } else {
                btnClickF(4);
              }
            } else if (btnInfoArr[3][1] === 2 && btnInfoArr[7][1] === 1) {
              if (btnInfoArr[6][0] !== true) {
                btnClickF(6);
              } else {
                btnClickF(2);
              }
            } else if (btnInfoArr[7][1] === 2 && btnInfoArr[3][1] === 1) {
              if (btnInfoArr[4][0] !== true) {
                btnClickF(4);
              } else {
                btnClickF(6);
              }
            }
          }

          if (btnInfoArr[1][1] === 2 && btnInfoArr[9][1] === 2 && btnInfoArr[3][0] !== true) {
            btnClickF(3);
          }
          if (btnInfoArr[3][1] === 2 && btnInfoArr[7][1] === 2 && btnInfoArr[9][0] !== true) {
            btnClickF(9);
          }

          if (btnInfoArr[1][1] === 2 && btnInfoArr[6][1] === 2 && btnInfoArr[3][0] !== true) {
            btnClickF(3);
          }
          if (btnInfoArr[3][1] === 2 && btnInfoArr[8][1] === 2 && btnInfoArr[9][0] !== true) {
            btnClickF(9);
          }
          if (btnInfoArr[9][1] === 2 && btnInfoArr[4][1] === 2 && btnInfoArr[7][0] !== true) {
            btnClickF(7);
          }
          if (btnInfoArr[7][1] === 2 && btnInfoArr[2][1] === 2 && btnInfoArr[1][0] !== true) {
            btnClickF(1);
          }

          if (btnInfoArr[2][1] === 2 && btnInfoArr[9][1] === 2 && btnInfoArr[3][0] !== true) {
            btnClickF(3);
          }
          if (btnInfoArr[6][1] === 2 && btnInfoArr[7][1] === 2 && btnInfoArr[9][0] !== true) {
            btnClickF(9);
          }
          if (btnInfoArr[1][1] === 2 && btnInfoArr[8][1] === 2 && btnInfoArr[7][0] !== true) {
            btnClickF(7);
          }
          if (btnInfoArr[4][1] === 2 && btnInfoArr[3][1] === 2 && btnInfoArr[1][0] !== true) {
            btnClickF(1);
          }

          if (btnInfoArr[2][1] === 2 && btnInfoArr[6][1] === 2 && btnInfoArr[3][0] !== true) {
            btnClickF(3);
          }
          if (btnInfoArr[6][1] === 2 && btnInfoArr[8][1] === 2 && btnInfoArr[9][0] !== true) {
            btnClickF(9);
          }
          if (btnInfoArr[8][1] === 2 && btnInfoArr[4][1] === 2 && btnInfoArr[7][0] !== true) {
            btnClickF(7);
          }
          if (btnInfoArr[4][1] === 2 && btnInfoArr[2][1] === 2 && btnInfoArr[1][0] !== true) {
            btnClickF(1);
          }

        }
        if (player2 === true) {
          rand = randomRange(0, unoccupiedBtns.length - 1);
          //console.log("rand", unoccupiedBtns[rand]);
          btnClickF(unoccupiedBtns[rand]);
        }
      } else {
        //console.log("step>5 master");
        //try to win
        if (Number.isInteger(defeatORDefendF(2))) {
          btnClickF(defeatORDefendF(2));
        }
        //try to defend
        if (player2 === true) {
          if (Number.isInteger(defeatORDefendF(1))) {
            btnClickF(defeatORDefendF(1));
          }
        }
        if (player2 === true) {
          rand = randomRange(0, unoccupiedBtns.length - 1);
          //console.log("rand", unoccupiedBtns[rand]);
          btnClickF(unoccupiedBtns[rand]);
        }
      }


      $(".play-btn").removeAttr("disabled");

    }, 700);
  }
}

function btnClickF(btnnumber) {
  if (btnInfoArr[btnnumber][0] !== true) {
    btnInfoArr[btnnumber].push(true);
    /*Filtering the occupied btn */
    unoccupiedBtns = unoccupiedBtns.filter(function(val) {
      return val !== btnnumber;
    });
    //console.log(unoccupiedBtns);
    if (player1 === true) {
      console.log("step=", step, "player1 sign=", sign1, "btn", btnnumber);

      if (sign1 === "o") {
        document.getElementById("round-audio").play();
      } else {
        document.getElementById("cross-audio").play();
      }

      occupiedByplayer1.push(btnValues[btnnumber]);
      console.log("step", step, "player1:", player1, sign1, player2Name, ":", player2, sign2);
      $("#btn" + btnnumber.toString()).html(sign1);

      var turn2 = document.getElementById('turn2');
      turn2.style.position = "absolute";
      turn2.style.top = $("#btn3").position().top + 'px';
      turn2.style.left = $("#btn3").position().left + 80 + 'px';
      $("#turn1").attr("hidden", "hidden");
      $("#turn2").removeAttr("hidden");

      btnInfoArr[btnnumber].push(1);
      var checkWinFReturn = checkWinF(1);
      player1 = false;
      player2 = true;
      step++;
      /*if we have found a winner we don't want to call computer*/
      if (checkWinFReturn !== 1 && playerNum === 1) {
        computerF();
      }
    } else {

      console.log("step=", step, "player2 sign=", sign1, "btn", btnnumber);

      if (sign2 === "o") {
        document.getElementById("round-audio").play();
      } else {
        document.getElementById("cross-audio").play();
      }

      occupiedByplayer2.push(btnValues[btnnumber]);

      //console.log("step", step, "player1:", player1, sign1, player2Name, ":", player2, sign2);
      $("#btn" + btnnumber.toString()).html(sign2);

      var turn1 = document.getElementById('turn1');
      turn1.style.position = "absolute";
      turn1.style.top = $("#btn1").position().top + 'px';
      if (player1Name === "You") {
        turn1.style.top = $("#btn4").position().top + 'px';
      }
      turn1.style.left = $("#playing-field").position().left + 'px';
      $("#turn2").attr("hidden", "hidden");
      $("#turn1").removeAttr("hidden");

      btnInfoArr[btnnumber].push(2);
      checkWinF(2);
      player2 = false;
      player1 = true;
      step++;
    }


  }
}

function clearFieldF() {
  step = 1;
  $(".play-btn").html("");
  btnInfoArr = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  unoccupiedBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  occupiedByplayer1 = [];
  occupiedByplayer2 = [];

}

function checkWinF(whichPlayer) {

  var winner = 0;

  if (step >= 5) {


    if (btnInfoArr[5][1] === whichPlayer) {
      //console.log(btnInfoArr[5][1], whichPlayer);

      if (btnInfoArr[1][1] === whichPlayer && btnInfoArr[9][1] === whichPlayer) {
        winner = whichPlayer;
      }
      if (btnInfoArr[3][1] === whichPlayer && btnInfoArr[7][1] === whichPlayer) {
        winner = whichPlayer;
      }
      if (btnInfoArr[4][1] === whichPlayer && btnInfoArr[6][1] === whichPlayer) {
        winner = whichPlayer;
      }
      if (btnInfoArr[2][1] === whichPlayer && btnInfoArr[8][1] === whichPlayer) {
        winner = whichPlayer;
      }
    }

    if (btnInfoArr[1][1] === whichPlayer) {

      if (btnInfoArr[2][1] === whichPlayer && btnInfoArr[3][1] === whichPlayer) {
        winner = whichPlayer;
      }
      if (btnInfoArr[4][1] === whichPlayer && btnInfoArr[7][1] === whichPlayer) {
        winner = whichPlayer;
      }

    }

    if (btnInfoArr[9][1] === whichPlayer) {

      if (btnInfoArr[3][1] === whichPlayer && btnInfoArr[6][1] === whichPlayer) {
        winner = whichPlayer;
      }
      if (btnInfoArr[7][1] === whichPlayer && btnInfoArr[8][1] === whichPlayer) {
        winner = whichPlayer;
      }

    }
  }


  /* IF an winner is found*/
  if (winner !== 0) {

    if (playerNum === 1) {
      if (winner === 1) {
        var positionBtn1 = $("#btn1").position();
        //console.log(typeof positionBtn1.top);
        //console.log(positionBtn1.top,positionBtn1.left);
        //$("#result").css('top',positionBtn5.top.toString()+'px');
        var result = document.getElementById('result');
        result.style.position = "absolute";
        result.style.top = positionBtn1.top + 'px';
        result.style.left = positionBtn1.left + 'px';
        //var positionResult=$("#result").position();
        //console.log(positionResult.top);

        document.getElementById("win-audio").play();

        $(".play-btn").attr("disabled", "disabled");

        setTimeout(function() {
          $("#result").removeAttr("hidden").html("You win !");
        }, 1500);

        setTimeout(function() {
          clearFieldF();
          $("#result").attr("hidden", "hidden");
          player1Score++;
          $("#player1-score").html(player1Score.toString());

          computerF();

          setTimeout(function() {

            $(".play-btn").removeAttr("disabled");
          }, 3000);


        }, 4000);

        return 1;

      } else if (winner === 2) {
        var positionBtn1 = $("#btn1").position();
        //console.log(typeof positionBtn1.top);
        //console.log(positionBtn1.top,positionBtn1.left);
        //$("#result").css('top',positionBtn5.top.toString()+'px');
        var result = document.getElementById('result');
        result.style.position = "absolute";
        result.style.top = positionBtn1.top + 'px';
        result.style.left = positionBtn1.left + 'px';

        document.getElementById("lose-audio").play();

        $(".play-btn").attr("disabled", "disabled");

        setTimeout(function() {
          $("#result").removeAttr("hidden").html("You lose !");
        }, 1500);

        setTimeout(function() {
          clearFieldF();
          $("#result").attr("hidden", "hidden");
          player2Score++;
          $("#player2-score").html(player2Score.toString());
          $(".play-btn").removeAttr("disabled");


        }, 4000);

        return 2;
      }
    } else if (playerNum === 2) {
      if (winner === 1) {
        var positionBtn1 = $("#btn1").position();
        //console.log(typeof positionBtn1.top);
        //console.log(positionBtn1.top,positionBtn1.left);
        //$("#result").css('top',positionBtn5.top.toString()+'px');
        var result = document.getElementById('result');
        result.style.position = "absolute";
        result.style.top = positionBtn1.top + 'px';
        result.style.left = positionBtn1.left + 'px';

        document.getElementById("win-audio").play();

        $(".play-btn").attr("disabled", "disabled");

        setTimeout(function() {
          $("#result").removeAttr("hidden").html(player1Name + " wins !");
        }, 1500);

        setTimeout(function() {
          clearFieldF();
          $("#result").attr("hidden", "hidden");
          player1Score++;
          $("#player1-score").html(player1Score.toString());
          $(".play-btn").removeAttr("disabled");

        }, 4000);
      } else if (winner === 2) {
        var positionBtn1 = $("#btn1").position();
        //console.log(typeof positionBtn1.top);
        //console.log(positionBtn1.top,positionBtn1.left);
        //$("#result").css('top',positionBtn5.top.toString()+'px');
        var result = document.getElementById('result');
        result.style.position = "absolute";
        result.style.top = positionBtn1.top + 'px';
        result.style.left = positionBtn1.left + 'px';

        document.getElementById("win-audio").play();

        $(".play-btn").attr("disabled", "disabled");

        setTimeout(function() {
          $("#result").removeAttr("hidden").html(player2Name + " wins !");
        }, 1500);

        setTimeout(function() {
          clearFieldF();
          $("#result").attr("hidden", "hidden");
          player2Score++;
          $("#player2-score").html(player2Score.toString());
          $(".play-btn").removeAttr("disabled");

        }, 4000);
      }
    }

  } else if (step === 9) {
    var positionBtn1 = $("#btn1").position();
    //console.log(typeof positionBtn1.top);
    //console.log(positionBtn1.top,positionBtn1.left);
    //$("#result").css('top',positionBtn5.top.toString()+'px');
    var result = document.getElementById('result');
    result.style.position = "absolute";
    result.style.top = positionBtn1.top + 'px';
    result.style.left = positionBtn1.left + 'px';
    $("#result").removeAttr("hidden").html("Draw !");

    setTimeout(function() {
      clearFieldF();
      $("#result").attr("hidden", "hidden");
      if (playerNum === 1 && player2 === true) {
        computerF();
      }
    }, 2000);

  }
}

$("#btn1").click(function() {
  btnClickF(1);
});

$("#btn2").click(function() {
  btnClickF(2);
});

$("#btn3").click(function() {
  btnClickF(3);
});
$("#btn4").click(function() {
  btnClickF(4);
});

$("#btn5").click(function() {
  btnClickF(5);
});

$("#btn6").click(function() {
  btnClickF(6);
});
$("#btn7").click(function() {
  btnClickF(7);
});

$("#btn8").click(function() {
  btnClickF(8);
});

$("#btn9").click(function() {
  btnClickF(9);
});

$("#reset-all").click(function() {
  clearFieldF();
  player1Score = 0;
  player2Score = 0;
  $("#playing-field").attr("hidden", "hidden");
  $("#score,#turn1,#turn2,#result").attr("hidden", "hidden");
  $("#reset-all").attr("hidden", "hidden");
  $("#player-number").removeAttr("hidden");

});
