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

// const highscore = localStorage.getItem('highscore');


$(()=>{
//  let time = 15;
  let time = parseInt($('select option:selected').val());
  let difficulty = 2;

  const hiScore4 = localStorage.getItem('hiScore4');
  const hiScore3 = localStorage.getItem('hiScore3');
  const hiScore2 = localStorage.getItem('hiScore2');
  const hiScore = localStorage.getItem('hiScore');
  const $board = $('#container');
  const $activeScore = $('.score');
  const $startBtn = $('.play');
  const $reset = $('.reset');
  const $timer = $('.time');
  const $instructions = $('.Instructions');
  const $how= $('.how');
  const $cash = $('.cash');

  $('#1').text(localStorage.getItem('hiScore'));
  $('#2').text(localStorage.getItem('hiScore2'));
  $('#3').text(localStorage.getItem('hiScore3'));
  $('#4').text(localStorage.getItem('hiScore4'));
  $reset.hide();

  function removeGrid(){
    $startBtn.removeClass('grid');
    $timer.removeClass('grid');
    $instructions.removeClass('grid');
    $reset.removeClass('grid');
    $how.removeClass('grid');
    $('.highScore').removeClass('grid');
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

  function highScore(){
    if(hiScore !== null) {
      if(score > hiScore ) localStorage.setItem('hiScore', score);

      else if(hiScore2 !== null){
        if(score < hiScore && score > hiScore3) localStorage.setItem('hiScore2',score);
      } else if(hiScore3 !== null){
        if(score < hiScore2 && score > hiScore3) localStorage.setItem('hiScore3',score);
      }else if(hiScore4 !== null){
        if(score < hiScore3 && score > hiScore4) localStorage.setItem('hiScore4',score);
      }
    }
  }
  function start(){
    difficulty = parseInt($('#difficultySelector option:selected').val());
    time = parseInt($('#selector option:selected').val());
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
      highScore();
      localStorage.getItem('hiScore');
    },time*1000+500);

  }

  function addRandomMole(){
    const mole = CalcRandom();
    $('.grid').eq(mole).addClass('mole');
    //Mole måste va i randomMole för att hoistas till rätt tillfälle
    timeOut(mole,'mole',difficulty *1000 );
  }

  function addRandomTree(){
    const tree = CalcRandom();
    ($('.grid').hasClass('mole')) ? $('.grid').eq(tree).addClass('tree') : console.log('dont work');
    timeOut(tree,'tree',difficulty*1000/2);
  }

  function addRandomBad(){
    const bad = CalcRandom();
    ($('.grid').hasClass('tree')) ? $('.grid').eq(bad).addClass('bad') : console.log('bad dont work');

    timeOut(bad,'bad',difficulty*1000 +500);
  }

  $instructions.click(()=>{
    $how.show();
    $how.click(()=>{
      $how.hide();
      console.log(parseInt($('#difficultySelector option:selected').val()));
    });
  });

  $reset.click(()=>{
    $reset.hide();
    $('.grid').removeClass('mole');
    score = 0;
    time = parseInt($('#selector option:selected').val());
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
