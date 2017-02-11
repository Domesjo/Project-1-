$(()=>{

//Fix reset
//fix addRandomMole
  console.log('JS loaded');
  const $board = $('#container');
  const $activeScore = $('.score');
  //const $targets = $('div');
  let time = 10;
  let score = 0;
  const $startBtn = $('.play');
  const $reset = $('.reset');
  const $timer = $('.time');
  $reset.hide();
  function createBoard(){
    $startBtn.hide();
    for(let i=0;i<30;i++){
      $board.append('<div>');
      $('div').addClass('grid');
      $startBtn.removeClass('grid');
      $timer.removeClass('grid');

    }
  }


  function addRandomMole(){
    const mole = Math.floor(Math.random()*$('div').length);
    $('.grid').eq(mole).addClass('mole');
    //Mole måste va i randomMole för att hoistas till rätt tillfälle
  }

  function start(){
    const timeId = setInterval(()=>{
      for (let i=0;i<3;i++){
        addRandomMole();
      }
      time--;
      upDateScore();
      $('.displayTime').text(time);
    },1000);
    setTimeout(()=>{
      clearInterval(timeId);
      $reset.show();
    },10000);

  }


  $reset.click(()=>{
    $('.grid').removeClass('mole');
    start();
    score = 0;
    time = 10;
    $activeScore.text(score);
    console.log('hey');
  });

  $startBtn.click(function gameTime(){
    createBoard();
    start();
    $('.grid').click((e)=>{
      if($(e.target).hasClass('mole')){
        $(e.target).removeClass('mole');
        score++;
        console.log(score);
      }
    });
  });

  function upDateScore(){
    $activeScore.text(score);
  }

});
