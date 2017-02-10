$(()=>{

//Fix reset
//fix addRandomMole
  console.log('JS loaded');
  const $board = $('#container');

  //const $targets = $('div');
  let score = 0;
  const $startBtn = $('.play');

  function createBoard(){
    for(let i=0;i<30;i++){
      $board.append('<div>');
      $('div').addClass('grid');
      $startBtn.removeClass('grid');
    }
  }


  function addRandomMole(){
    const mole = Math.floor(Math.random()*$('div').length);
    $('.grid').eq(mole).addClass('mole');
    //Mole måste va i randomMole för att hoistas till rätt tillfälle
    $('.mole').click((e)=>{
      $(e.target).removeClass('mole');
      score++;
      console.log(score);
    });

  }

  function start(){
    const timeId = setInterval(()=>{
      for (let i=0;i<3;i++){
        addRandomMole();
      }
    },1000);
    setTimeout(()=>{
      clearInterval(timeId);
    },10000);

  }



  $startBtn.click(function gameTime(){
    createBoard();
    start();

  });

});
