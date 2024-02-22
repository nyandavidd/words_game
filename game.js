class game{
    timerElement = document.querySelector(".timer");
    timerWork =true;
    isWin=false;
    modal= new modal();
    userHelper= new userHelper();
    difficult = 30;
    constructor(){
        this.toMenu();
        this.userHelper.initialScore();
    }
    toMenu(){
        document.querySelector('#to-menu').addEventListener('click',()=>{
            window.location.href='../index.html';
        })
    }
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex > 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
    startTimer(seconds,callback){
        
        this.timerWork=true;
            let self =this;
            let time = seconds;
            let timerId = setTimeout(function tick() {
                if(time<=0 || !self.timerWork){
                    self.timerElement.innerHTML='Оставшееся время:'+time+"c";
                    callback();
                }else{
                    self.timerElement.textContent='Оставшееся время:'+time+"c";
                    time--;
                    timerId = setTimeout(tick, 1000, seconds,time,callback,self);
                }
                 
              }, 1000,seconds,time,callback,self);
        
    }
    stopTimer(){
        this.timerWork=false;
    }
    endGame(level){
        let self = this;
        self.stopTimer();
    if(self.isWin){
        let gameScore=0;
        console.log(this.difficult);
        switch(this.difficult){
            case '30':
                gameScore=33;
                console.log(gameScore);
                break;
            case 20:
                gameScore=66;
                break;
            case 20:
                gameScore=100;
            break;
        }
        console.log(gameScore);
        this.userHelper.saveScore(this.userHelper.getCurrentUser(),level-1,gameScore)
        self.modal.addModalContent(`
        <p class="modal-text">Вы выиграли</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "30">легкий</option>
                    <option value = "20">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
                <button id="next-level" class="modal-close ui-modal-element">Следующий уровень</button>
            </div>
        `);
        if(level==4){
            level=3;
        }
        document.querySelector('#next-level').addEventListener('click',()=>{
            window.location.href=`../level${level}/level${level}.html`;
        });
        
    }else{
        self.modal.addModalContent(`
        <p class="modal-text">Вы проиграли, попробуйте снова</p>
            <div class="ui-modal">
                <select id="difficult-select" class="ui-modal-element">
                    <option value = "30">легкий</option>
                    <option value = "20">средний</option>
                    <option value = "15">сложный</option>
                </select>
                <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
            </div>
        `);
        
    }
    self.modal.openModal();
        
        self.modal.addCloseListener();
}
setStartModal(text){
    this.modal.openModal();
    //addOpenListener();
    this.modal.addModalContent(`
    <p class="modal-text">${text}</p>
        <div class="ui-modal">
            <select id="difficult-select" class="ui-modal-element">
                <option value = "30">легкий</option>
                <option value = "20">средний</option>
                <option value = "15">сложный</option>
            </select>
            <button id="start-game" class="modal-close ui-modal-element">начать игру</button>
        </div>
    `);
    this.modal.addCloseListener();
    document.querySelector("#start-game").addEventListener('click',()=>{
        this.startGame();
    })
}
 getRandomNumber(min, max) {
         return Math.round(Math.random() * (max - min) + min)
       }
}