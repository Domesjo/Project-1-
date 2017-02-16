var gam = gam || {};
gam.CalcRandom= function(){
  return  Math.floor(Math.random()*$('div').length);
};
//let time = $('.select').find(':selected').val();
gam.score = 0;

// const highscore = localStorage.getItem('highscore');

//BIND DENNA FUNKTION
gam.setUp= function (){
  console.log('hey');
//  let time = 15;
  gam.$grid;
  gam.tidId;
  gam.time = parseInt($('select option:selected').val());
  gam.difficulty = 2;
  gam.timeId;
  gam.$timer = $('.time');
  gam.$scoo = $('.scoo');
  gam.hiScore4 = localStorage.getItem('hiScore4');
  gam.hiScore3 = localStorage.getItem('hiScore3');
  gam.hiScore2 = localStorage.getItem('hiScore2');
  gam.hiScore = localStorage.getItem('hiScore');
  gam.$board = $('#container');
  gam.$activeScore = $('.score');
  gam.$startBtn = $('.play');
  gam.$reset = $('.reset');
  gam.$highScore =$('.highScore');
  gam.$HS = $('.HSbtn');
  gam.$instructions = $('.Instructions');
  gam.$how= $('.how');
  gam.$cash = $('.cash');


  gam.checkHighScore = function(){
    $('#1').text(localStorage.getItem('hiScore'));
    $('#2').text(localStorage.getItem('hiScore2'));
    $('#3').text(localStorage.getItem('hiScore3'));
    $('#4').text(localStorage.getItem('hiScore4'));
  };


  gam.slide = function(elem,elem2){
    elem.toggle().animate({right: '0px'}, 'slow');
    elem2.toggle().animate({right: '0px'}, 'slow');
  };



  gam.createBoard = function(){
    this.$startBtn.hide();
    for(let i=0;i<30;i++){
      this.$board.append($('<div/>', { class: 'grid' }));
      this.$grid = $('.grid');
    }
  };

  gam.upDateScore=function(){
    this.$activeScore.text(this.score);
  };

  gam.scores = {
    mole: 1,
    tree: 2,
    'mole tree': 3,
    'tree mole': 3,
    bad: -1,
    'grid': 0,
    'mole bad': 0,
    'bad mole': 0
  };


  gam.targeter = function (e){
    const targetClass = $(e.target).attr('class').replace(/^grid /, '');
    if(targetClass==='tree'||targetClass==='mole'|| targetClass ==='bad')

      $(e.target).removeClass(targetClass);
    const scoreToAdd = gam.scores[targetClass];
    console.log(scoreToAdd);
    this.score += scoreToAdd;
    this.playSound();
  };

  gam.playSound = function() {
    this.$cash.trigger('play');
  };

  gam.isHighScore = function(prevHiscore,presentHiscore,hiScoreToSet){
    if(this.score < prevHiscore && this.score > presentHiscore) localStorage.setItem(hiScoreToSet, this.score);
  };

  gam.highScore = function(){
    if(this.hiScore !== null) {
      if(this.score > this.hiScore ) localStorage.setItem('hiScore', this.score);
      this.isHighScore(this.hiScore,this.hiScore3,'hiScore2');
      this.isHighScore(this.hiScore2,this.hiScore3,'hiScore3');
      this.isHighScore(this.hiScore3,this.hiScore4,'hiScore4');
    }
  };

  gam.moleGenerator = function(){
    this.timeId = setInterval(()=>{
      this.addRandomMole();
      this.upDateScore();
      $('.displayTime').text(this.time);
      return this.timeId;
    },333);
  };
  gam.timeCounter = function(){
    this.tidId = setInterval(()=>{
      this.time--;
      this.addRandomTree();
      this.addRandomBad();
      return this.tidId;
    },1000);
  };

  gam.DisplayScore = function (){
    this.$board.append($('<div/>', { class: 'final' }));
    const $star = $('.final');
    $star.fadeIn(400);
    $star.append($('<p/>',{ class: 'finalPara'}));
    const $para = $('.finalPara');
    $para.text(this.score);

    setTimeout(()=>{
      $star.fadeOut(400);

    },2000);
  };
  gam.timeOut = function(num,toRemove,time){
    setTimeout(()=> {
      this.$grid.eq(num).removeClass(toRemove);
    },time);
  };


  gam.finish = function(){
    setTimeout(()=>{
      clearInterval(this.timeId);
      clearInterval(this.tidId);
      this.DisplayScore();
      this.$reset.show();
      this.$grid.removeClass('grid');
      this.highScore();
      localStorage.getItem('hiScore');
    },this.time*1000+500);
  };

  gam.start = function(){
    this.slide(this.$scoo,this.$timer);
    this.difficulty = parseInt($('#difficultySelector option:selected').val());
    this.time = parseInt($('#selector option:selected').val());
    this.moleGenerator();
    this.timeCounter();
    this.finish();
  };



  gam.addRandomMole = function(){
    const num = this.CalcRandom();
    this.$grid.eq(num).addClass('mole');
    this.timeOut(num,'mole',this.difficulty *1000 );
  };

  gam.addRandomTree = function(){
    const num = this.CalcRandom();
    ($('div').hasClass('grid')) ? this.$grid.eq(num).addClass('tree'): console.log('wood');
    this.timeOut(num,'tree',this.difficulty*1000/2);
  };

  gam.addRandomBad = function(){
    const num = this.CalcRandom();
    ($('div').hasClass('grid')) ? this.$grid.eq(num).addClass('bad') : console.log('bad dont work');
    this.timeOut(num,'bad',this.difficulty*1000 +500);
  };

  gam.star = function(){
    this.$highScore.toggle().animate({left: '-10px'}, '3500');
  };



  gam.toggleHelp = function(){
    this.$instructions.hide();
    this.$how.toggle().animate({left: '0px'}, '3500');

    this.$how.click(this.hideHelp.bind(this));
  };

  gam.hideHelp = function(){
    gam.$how.hide();
    gam.$instructions.fadeIn(400);
  };



  gam.resetScore = function(){
    this.score = 0;
    this.$activeScore.text(this.score);
  };

  gam.playAgain = function(){
    this.time = parseInt($('#selector option:selected').val());
    this.$reset.hide();
    this.resetScore();
    this.createBoard();
    this.slide(this.$scoo,this.$timer);
    this.start();
    this.$grid.click(this.targeter.bind(this));
  };
  gam.gameTime = function(){
    this.createBoard();
    setTimeout(()=>{
      this.start();
    },500);
    this.$grid.click(this.targeter.bind(this));
  };
  this.$timer.hide();
  this.$scoo.hide();
  this.$highScore.hide();
  this.$reset.hide();
  this.checkHighScore();
  this.$HS.click(this.star.bind(this));
  this.$reset.click(this.playAgain.bind(this));
  this.$instructions.click(this.toggleHelp.bind(this));
  this.$startBtn.click(this.gameTime.bind(this));



};
$(gam.setUp.bind(gam));
