function timeOut(num,toRemove,time){
  setTimeout(()=> {
    $('.grid').eq(num).removeClass(toRemove);
  },time);
}
function CalcRandom(){
  return  Math.floor(Math.random()*$('div').length);
}
//let time = $('.select').find(':selected').val();
let score = 0;

function addRandomMole(){
  const mole = CalcRandom();
  $('.grid').eq(mole).addClass('mole');
  //Mole måste va i randomMole för att hoistas till rätt tillfälle
  timeOut(mole,'mole',2000);
}

function addRandomTree(){
  const tree = CalcRandom();
  ($('.grid').hasClass('mole')) ? $('.grid').eq(tree).addClass('tree') : console.log('dont work');
  timeOut(tree,'tree',1000);
}

function addRandomBad(){
  const bad = CalcRandom();
  ($('.grid').hasClass('tree')) ? $('.grid').eq(bad).addClass('bad') : console.log('bad dont work');

  timeOut(bad,'bad',1750);
}
$(()=>{
//  let time = 15;
  let time = parseInt($('select option:selected').val());

  const $board = $('#container');
  const $activeScore = $('.score');
  const $startBtn = $('.play');
  const $reset = $('.reset');
  const $timer = $('.time');
  const $instructions = $('.Instructions');
  const $how= $('.how');
  const $cash = $('.cash');
  //const $grid = $('.grid'); funkar ej av någon konstig anledning

  $reset.hide();

  function removeGrid(){
    $startBtn.removeClass('grid');
    $timer.removeClass('grid');
    $instructions.removeClass('grid');
    $reset.removeClass('grid');
    $how.removeClass('grid');
  }

  function createBoard(){
    $startBtn.hide();
    for(let i=0;i<30;i++){
      $board.append('<div>');
      $('div').addClass('grid');
      removeGrid();
    }
  }

  function upDateScore(){
    $activeScore.text(score);
  }

  function targeter (e,target,scoretoAdd){
    if($(e.target).hasClass(target)){
      $(e.target).removeClass(target);
      score+=scoretoAdd;
      playSound();
      console.log('works');
    }
  }
  function playSound() {
    $cash.trigger('play');
  }


  function start(){
    time = parseInt($('select option:selected').val());
    const timeId = setInterval(()=>{
      addRandomMole();
      upDateScore();
      $('.displayTime').text(time);
    },500);

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
    },time*1000+500);

  }
  

  $instructions.click(()=>{
    $how.show();
    $how.click(()=>{
      $how.hide();
      console.log(parseInt($('select option:selected').val()));
    });
  });

  $reset.click(()=>{
    $reset.hide();
    $('.grid').removeClass('mole');
    score = 0;
    time = parseInt($('select option:selected').val());
    $activeScore.text(score);
    start();
  });

  $startBtn.click(function gameTime(){
    createBoard();
    setTimeout(()=>{
      start();
    },500);
    $('.grid').click((e)=>{
      targeter(e,'mole',1);
    });
    $('.grid').click((e)=>{
      targeter(e,'tree',2);
    });
    $('.grid').click((e)=>{
      targeter(e,'bad',-1);
    });

  });
});
