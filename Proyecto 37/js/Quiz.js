class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();
    //escribe aquí el código para cambiar el color de fondo 
    background("#0000FF");
    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    fill("#00ff00");
    textSize(25);
    text("La respuesta correcta es 2", 300, 200);
    //llama aquí a getContestantInfo( )
    contestant.getContestantInfo();

    //escribe la condición para comprobar si contestantInfor no está indefinido 
    if (allContestants !== undefined) {
    //escribe aquí el código para agregar una nota
    fill("yellow");
    textSize(20);
    var note = text("NOTA: ¡El jugador que respondió correctamente está resaltado en verde!", 130, 230);
    }
    //escribe el código para resaltar al concursante que respondió correctamente
    for (var plr in allContestants) {
      if (allContestants[plr].name == "null") {
        fill("blue");
      }
      var correctAns = "2";
      if (allContestants[plr].answer === correctAns) {
        fill("#00FF00");
      }
      else {
        fill("red");
      }
      text(allContestants[plr].name + " : " + allContestants[plr].answer, 200, pos);
      pos += 30;
    }
    if (pos >= 330) {
      pos = 300;
    }
  }

}
