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
  //const $grid = $('.grid'); funkar ej av någon konstig anledning

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

  function upDateScore(){
    $activeScore.text(score);
  }

  function CalcRandom(){
    return  Math.floor(Math.random()*$('div').length);
  }

  function addRandomMole(){
    const mole = CalcRandom();
    $('.grid').eq(mole).addClass('mole');
    //Mole måste va i randomMole för att hoistas till rätt tillfälle
    setTimeout(()=>{
      $('.grid').eq(mole).removeClass('mole');
    },2000);
  }

  function addRandomTree(){
    const tree = CalcRandom();
    ($('.grid').hasClass('mole')) ? $('.grid').eq(tree).addClass('tree') : console.log('dont work');

    setTimeout(()=>{
      $('.grid').eq(tree).removeClass('tree');
    },1000);
  }

  function addRandomBad(){
    const bad = CalcRandom();
    ($('.grid').hasClass('tree')) ? $('.grid').eq(bad).addClass('bad') : console.log('bad dont work');

    setTimeout(()=> {
      $('.grid').eq(bad).removeClass('bad');
    },1750);
  }


  function start(){
    const timeId = setInterval(()=>{
      addRandomMole();
      upDateScore();
      $('.displayTime').text(time);
    },330);
    const tidId = setInterval(()=>{
      time--;
      addRandomTree();
      addRandomBad();
    },1000);
    setTimeout(()=>{
      clearInterval(timeId);
      clearInterval(tidId);
      $reset.show();
      $('.grid').removeClass('mole');
    },11000);

  }


  $reset.click(()=>{
    $reset.hide();
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
    $('.grid').click((e)=>{
      if($(e.target).hasClass('tree')){
        $(e.target).removeClass('tree');
        score+=2;
      }
    });
    $('.grid').click((e)=>{
      if($(e.target).hasClass('bad')){
        $(e.target).removeClass('bad');
        score--;
      }
    });

  });
});
