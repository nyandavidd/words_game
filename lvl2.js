class level2 extends game{
    words=[[{isRight:false,word:"Собака"},
    {isRight:false,word:"Кошка"},
    {isRight:false,word:"Лошадь"},
    {isRight:false,word:"Курица"},
    {isRight:false,word:"Корова"},
    {isRight:false,word:"Щенок"},
    {isRight:false,word:"Котенок"},
    {isRight:false,word:"Жеребенок"},
    {isRight:true,word:"Камаз"},
    ],[{isRight:false,word:"Учитель"},
    {isRight:false,word:"Строитель"},
    {isRight:false,word:"Врач"},
    {isRight:false,word:"Парикмахер"},
    {isRight:false,word:"Фермер"},
    {isRight:false,word:"Кассир"},
    {isRight:false,word:"Директор"},
    {isRight:false,word:"Администратор"},
    {isRight:true,word:"Чебурек"},
    ],[{isRight:false,word:"Борщ"},
    {isRight:false,word:"Спагетти"},
    {isRight:false,word:"Котлеты"},
    {isRight:false,word:"Курица"},
    {isRight:false,word:"Салат"},
    {isRight:false,word:"Рис"},
    {isRight:false,word:"Гуляш"},
    {isRight:false,word:"Солянка"},
    {isRight:true,word:"Ложка"},
    ],[{isRight:false,word:"Учитель"},
    {isRight:false,word:"Строитель"},
    {isRight:false,word:"Врач"},
    {isRight:false,word:"Парикмахер"},
    {isRight:false,word:"Фермер"},
    {isRight:false,word:"Кассир"},
    {isRight:false,word:"Директор"},
    {isRight:false,word:"Администратор"},
    {isRight:true,word:"Татра"},
    ],[{isRight:false,word:"Собака"},
    {isRight:false,word:"Кошка"},
    {isRight:false,word:"Лошадь"},
    {isRight:false,word:"Курица"},
    {isRight:false,word:"Корова"},
    {isRight:false,word:"Щенок"},
    {isRight:false,word:"Котенок"},
    {isRight:false,word:"Жеребенок"},
    {isRight:true,word:"Газель"},
    ],];
     wordSpawn = document.querySelector(".word-field")
    // wordTargetContainer =document.querySelector(".words-place");
     progres = document.querySelector(".count");
    rightAnswer = 0;
    gameCount=0;
    blocks = Array.from(document.querySelectorAll(".word"));
    constructor(){
        super();
        super.setStartModal("В этой игре вы должны соединять подходящие слова. Нажмите сначала на первое слово, потом на второе");
    }
    setWords(i){
        this.shuffle(this.words[i]);
        this.words[i].forEach(e=>{
            let block = document.createElement("div");
            block.innerHTML=e.word;
            block.isRight =e.isRight;
            this.addClick(block);
            block.classList.add("word");
            console.log(this.difficult<=20)
            if(this.difficult==20){
            this.setFlicker(block)
            }
            if(this.difficult==15){
                this.setRandomMove(block)
                }
            this.wordSpawn.append(block);
            this.setWordToRandomCords(block);
        });
        this.blocks = Array.from(document.querySelectorAll(".word"));
    }

    addClick(block){

        block.addEventListener("click",(e)=>{
            if(e.target.isRight){
                this.rightAnswer++;
                this.progres.innerHTML = `Найдено слов: ${this.rightAnswer}`;
                this.wordSpawn.innerHTML="";
                this.setWords(this.gameCount++);
                
                if(this.rightAnswer==5){
                    this.isWin=true;
                    super.endGame(3);
                }
            }else{
                e.target.classList.add("incorrect-word");
            }
        });

    }
    setFlicker(word){
        switch(this.getRandomNumber(0,2)){
            case 0:
                word.classList.add("word-anim1")
                break;
            case 1:
                word.classList.add("word-anim2")
                break;
            case 2:
                word.classList.add("word-anim3")
                break;
        }
        
    }
    setWordToRandomCords(word) {
        let areaRect = this.wordSpawn.getBoundingClientRect();
        let width = word.getBoundingClientRect().width;
        let height = word.getBoundingClientRect().height;
        word.style.left = `${Math.random() * (areaRect.width - width - 125 ) + 75}px`;
        word.style.top = `${Math.random() * (areaRect.height - height - 125) + 75}px`;
    }
    setRandomMove(word){
        switch(this.getRandomNumber(0,2)){
            case 0:
                word.classList.add("word-fly1")
                break;
            case 1:
                word.classList.add("word-fly2")
                break;
            case 2:
                word.classList.add("word-fly3")
                break;
        }
    }
    startGame(){
        this.wordSpawn.innerHTML="";
        this.gameCount=0;
        this.rightAnswer=0;
        
        
        this.shuffle(this.words);
        let difficultSelect = document.querySelector('#difficult-select');
        this.difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
        this.setWords(this.gameCount);
        super.startTimer(this.difficult,()=>{
            super.endGame(3);
            document.querySelector('#start-game').addEventListener('click',()=>{
                this.startGame();
            });
        } );
    }
    
    
}