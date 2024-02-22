class level3 extends game{
texts1=['У нашего петуха красный гребешок. Ночью, как только куры усядутся на насест, он берет свой гребешок и расчесывает свой разноцветный хвост. Вот почему хвост у него такой пышный. Расчешет хвост и кладет гребешок на голову. А днем ходит, распустив хвост.',
'На зиму комары попрятались в разные щёлки, в старые дупла. Они и рядом с нами зимуют. Заберутся в подвал или погреб, много их там в углу соберётся. Прицепятся комары своими длинными лапками к потолку, к стенкам и спят всю зиму.',]

texts2=['Зима. Замёрзло лесное озеро. В зеркальном блеске озера отражаются берёзки, которые стоят вокруг. По вечерам в серебре снежинок от света луны здесь оживает сказка. В снежных шубах стоят сосны. Это стражи лесного озера. А вот сугроб. На кого же он похож?',
'О волшебная пенка! Как можно забыть тебя, необычайно ароматную и вкусную! Кто из нас не пролезал когда-то под маминой рукой к блестящему медному тазу, чтобы зачерпнуть ложкой этот земляничный нектар и, обжигаясь, насладиться им в соседней комнате! Далекая, милая, незабываемая пенка…',]

texts3=[
    'Бегала Алёнка по льду. Падали снежинки. Будто плыли в воздухе. Одна снежинка опустилась на Аленкин рукав. Смотрит Алёнка на пушистую снежинку. Шестиконечная звёздочка, такая красивая, блестящая. Словно сказочный мастер вырезал её из серебряной пластиночки. Наклонила Алёнка лицо к снежинке. Смотрит, любуется ею. И вдруг случилось чудо: снежинка стала капелькой воды.',
    'А снег всё падал и падал. И лес был такой пушистый, такой лохматый и меховой, что Ёжику захотелось вдруг сделать что-то совсем необыкновенное: ну, скажем, взобраться на небо и принести звезду. И он стал себе представлять, как он со звездой опускается на Большую поляну и дарит Ослику и Медвежонку звезду.'
]
words=['дума',
'директор',
'понятие',
'машина',
'проект',
'требование',
'сосед',
'артист',
'текст',
'больница',];
     text = document.querySelector(".text")
     progres = document.querySelector(".count");
    rightAnswer = 0;
    constructor(){
        super();
        super.setStartModal("В этой игре вы должны соединять подходящие слова. Нажмите сначала на первое слово, потом на второе");
    }
    setText(){
        let texts;
        switch(this.difficult){
            case '30':
                texts = this.texts1;
                break;
            case '20':
                texts = this.texts2;
                break;
            case '15':
                texts = this.texts3;
            break;
        }
       super.shuffle(texts);
       super.shuffle(this.words);
       let textArr = texts[0].split(' ');
       let randomNumber=[];
       for(let i=0;i<5;i++){
        randomNumber.push(super.getRandomNumber(0,textArr.length-1));
       }
       let k=0;
       for(let j=0;j<textArr.length;j++){
        let word = document.createElement("span");
        word.innerHTML=textArr[j]+" ";
        this.setIncorrectClick(word);
        this.text.append(word);
        if(randomNumber.find(e=>e==j)!==undefined){
            let word = document.createElement("span");
            word.innerHTML=this.words[k++]+" ";
            this.setClick(word);
            this.text.append(word);
        }
       }
       
    }
    setIncorrectClick(element){
        element.addEventListener("click",(e)=>{
            e.target.classList.add("wrong-word");
            e.target.style.pointerEvents="none";
        });
    }
    setClick(element){
        element.addEventListener("click",(e)=>{
            e.target.classList.add("correct-word");
            e.target.style.pointerEvents="none";
            this.rightAnswer++;
            this.progres.innerHTML = `Найдено слов: ${this.rightAnswer}`;
            if(this.rightAnswer==5){
                this.isWin=true;
                super.endGame(4);
            }
        });
    }
    startGame(){
        this.rightAnswer = 0;
        this.text.innerHTML='';
        
        let difficultSelect = document.querySelector('#difficult-select');
        this.difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
        this.setText();
        super.startTimer(this.difficult,()=>{
            super.endGame(4);
            document.querySelector('#start-game').addEventListener('click',()=>{
                this.startGame();
            });
        } );
    }
    
    
}