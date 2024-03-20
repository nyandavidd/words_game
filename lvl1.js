class level1 extends game{
    words=[[{id:1,word:"Собака"},
    {id:2,word:"Кошка"},
    {id:3,word:"Лошадь"},
    {id:4,word:"Курица"},
    {id:5,word:"Корова"},
    {id:1,word:"Щенок"},
    {id:2,word:"Котенок"},
    {id:3,word:"Жеребенок"},
    {id:4,word:"Цыпленок"},
    {id:5,word:"Теленок"},
],
[{id:1,word:"Стол"},
    {id:2,word:"Лестница"},
    {id:3,word:"Окно"},
    {id:4,word:"Кастрюля"},
    {id:5,word:"Люстра"},
    {id:1,word:"Ножка"},
    {id:2,word:"Ступень"},
    {id:3,word:"Рама"},
    {id:4,word:"Ручка"},
    {id:5,word:"Лампочка"},
],
[{id:1,word:"Цирюльня"},
    {id:2,word:"Чахотка"},
    {id:3,word:"Пароход"},
    {id:4,word:"Очи"},
    {id:5,word:"Крейсер"},
    {id:1,word:"Барбершоп"},
    {id:2,word:"Туберкулез"},
    {id:3,word:"Паровоз"},
    {id:4,word:"Глаза"},
    {id:5,word:"Фрегат"},
],];
    wordSpawn = document.querySelector(".words-spawn")
    wordTargetContainer =document.querySelector(".words-place");
    progres = document.querySelector(".count");
    currentDraggElement = null;
    isDragging = false;
    
    rightAnswer = 0;
    constructor(){
        super();
        this.setWords();
        this.setWordsTarget();
        super.setStartModal("В этой игре вы должны соединять подходящие слова. Нажмите сначала на первое слово, потом на второе");
        this.setSpawnTarget(this.wordSpawn);
    }
    setWords(){
        this.shuffle(this.words);
        this.shuffle(this.words[0]);
        this.words[0].forEach(e=>{
            let block = document.createElement("div");
            block.innerHTML=e.word;
            block.id=e.id;
            block.classList.add("words-block");
            this.addDraggable(block);
            this.wordSpawn.append(block);
        });
    }
    setWordsTarget(){
        for(let i=0;i<5;i++){
            let wordTarget = document.createElement("div");
            wordTarget.classList.add("target-block-container");
            wordTarget.innerHTML=`<div class="target-block"> </div>
            <div class="target-block"> </div>`;
            wordTarget.correct=false;
            this.setTargetBlock(wordTarget);
            this.wordTargetContainer.append(wordTarget);
        }
    }

    addDraggable(element){
        element.draggable = true;
        element.addEventListener('dragstart',(event)=>{
            this.currentDraggElement=event.target;
            this.isDragging = true;
        })
        element.addEventListener('dragend',(event)=>{
        })
    }

    setTargetBlock(dragTarget){
    
        dragTarget.addEventListener('dragover',(e)=>{
            e.preventDefault();
        })
        
        dragTarget.addEventListener('drop',(event)=>{
            if(!(event.target.className=="target-block-container" || event.target.textContent!==' ')){
            if(this.currentDraggElement.parentNode.className!=="words-spawn words-block"){
                let wordTarget = document.createElement("div");
                wordTarget.classList.add("target-block");
                wordTarget.innerHTML=" ";
                console.log(this.currentDraggElement.parentNode.children);
                if(this.currentDraggElement.parentNode.children[0]==this.currentDraggElement){
                    this.currentDraggElement.parentNode.prepend(wordTarget);
                }else{
                    this.currentDraggElement.parentNode.append(wordTarget);
                }
                
            }
            let parrent = event.target.parentNode;
            console.log(event.target.parentNode.children);
            console.log(event.target.parentNode.children[0]);
            console.log(event.target.parentNode.children[1]);

            if(event.target==event.target.parentNode.children[0]){
                console.log(1);
                parrent.prepend(this.currentDraggElement);
            }else{
                console.log(2);
                parrent.append(this.currentDraggElement);
            }
            event.target.remove();
           
            
            if(parrent.children[0].id==parrent.children[1].id){
                parrent.correct=true;
                parrent.children[0].draggable=false;
                parrent.children[0].classList.add("right-word");
                parrent.children[1].draggable=false;
                parrent.children[1].classList.add("right-word");
                this.rightAnswer++;
                this.progres.innerHTML=`Найдено пар ${this.rightAnswer}/5`
                if(this.rightAnswer==5){
                    
                    this.isWin=true;
                    super.endGame(2);
                }
            }
            }
            
        })
    }

    setSpawnTarget(dragTarget){
        dragTarget.addEventListener('dragover',(e)=>{
            e.preventDefault();
        })
        
        dragTarget.addEventListener('drop',(event)=>{
            if(!(event.target.className=='words-block')){
            event.target.parentNode.lastChild.remove();
            }
            let wordTarget = document.createElement("div");
            wordTarget.classList.add("target-block");
            wordTarget.innerHTML=" ";
            this.currentDraggElement.parentNode.append(wordTarget);
            this.wordSpawn.append(this.currentDraggElement);
        })
    }

    startGame(){
        this.wordSpawn.innerHTML="";
        this.wordTargetContainer.innerHTML="";
        this.currentDraggElement = null;
        this.isDragging = false;
        this.rightAnswer = 0;
        this.setWords();
        this.setWordsTarget();
        let difficultSelect = document.querySelector('#difficult-select');
        this.difficult = difficultSelect.options[difficultSelect.selectedIndex].value;
        super.startTimer(this.difficult,()=>{
            super.endGame(2);
            document.querySelector('#start-game').addEventListener('click',()=>{
                this.startGame();
            });
        } );
    }
    
    
}