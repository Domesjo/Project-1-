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
  let $grid;
  let tidId;
  let time = parseInt($('select option:selected').val());
  let difficulty = 2;
  let timeId;
  const hiScore4 = localStorage.getItem('hiScore4');
  const hiScore3 = localStorage.getItem('hiScore3');
  const hiScore2 = localStorage.getItem('hiScore2');
  const hiScore = localStorage.getItem('hiScore');
  const $board = $('#container');
  const $activeScore = $('.score');
  const $startBtn = $('.play');
  const $reset = $('.reset');
  //const $timer = $('.time');
  const $instructions = $('.Instructions');
  const $how= $('.how');
  const $cash = $('.cash');

  function checkHighScore(){
    $('#1').text(localStorage.getItem('hiScore'));
    $('#2').text(localStorage.getItem('hiScore2'));
    $('#3').text(localStorage.getItem('hiScore3'));
    $('#4').text(localStorage.getItem('hiScore4'));
  }
  //$how.slideUp(400);
  $reset.hide();
  checkHighScore();

  function createBoard(){
    $startBtn.hide();
    for(let i=0;i<30;i++){
      $board.append($('<div/>', { class: 'grid' }));
      $grid = $('.grid');
    }
  }

  function upDateScore(){
    $activeScore.text(score);
  }

  const scores = {
    mole: 1,
    tree: 2,
    'mole tree': 3,
    'tree mole': 3,
    bad: -1,
    'grid': 0,
    'mole bad': 0,
    'bad mole': 0
  };

  function targeter (e){
    const targetClass = $(e.target).attr('class').replace(/^grid /, '');
    console.log(targetClass);
    const scoreToAdd = scores[targetClass];
    if(targetClass==='tree'||targetClass==='mole'|| targetClass ==='bad')
      $(e.target).removeClass(targetClass);
    score += scoreToAdd;
    playSound();
  }
  function playSound() {
    $cash.trigger('play');
  }

  function isHighScore(prevHiscore,presentHiscore,hiScoreToSet){
    if(score < prevHiscore && score > presentHiscore) localStorage.setItem(hiScoreToSet, score);
  }

  function highScore(){
    if(hiScore !== null) {
      if(score > hiScore ) localStorage.setItem('hiScore', score);
      isHighScore(hiScore,hiScore3,'hiScore2');
      isHighScore(hiScore2,hiScore3,'hiScore3');
      isHighScore(hiScore3,hiScore4,'hiScore4');
    }
  }

  function moleGenerator(){
    timeId = setInterval(()=>{
      addRandomMole();
      upDateScore();
      $('.displayTime').text(time);
      return timeId;
    },500);
  }
  function timeCounter(){
    tidId = setInterval(()=>{
      time--;
      addRandomTree();
      addRandomBad();
      return tidId;
    },1000);
  }
  function finish(){
    setTimeout(()=>{
      clearInterval(timeId);
      clearInterval(tidId);
      $reset.show();
      $('.grid').removeClass('mole');
      highScore();
      localStorage.getItem('hiScore');
    },time*1000+500);
  }

  function start(){
    difficulty = parseInt($('#difficultySelector option:selected').val());
    time = parseInt($('#selector option:selected').val());
    moleGenerator();
    timeCounter();
    finish();
  }



  function addRandomMole(){
    const num = CalcRandom();
    $grid.eq(num).addClass('mole');
    timeOut(num,'mole',difficulty *1000 );
  }

  function addRandomTree(){
    const num = CalcRandom();
    ($('div').hasClass('grid')) ? $grid.eq(num).addClass('tree'): console.log('wood');
    timeOut(num,'tree',difficulty*1000/2);
  }

  function addRandomBad(){
    const num = CalcRandom();
    ($('div').hasClass('grid')) ? $grid.eq(num).addClass('bad') : console.log('bad dont work');
    timeOut(num,'bad',difficulty*1000 +500);
  }

  $instructions.click(()=>{
    $how.slideToggle(400);
    $how.click(()=>{
      $how.slideToggle(400);
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
    $('.grid').click(targeter);
  });



});
