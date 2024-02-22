class menu{
    loginButton=document.querySelector(".login");
    userHelper= new userHelper();
    currentUser= document.querySelector(".current-user");
    score =document.querySelector(".score-content");
    modal=new modal();
    
    constructor(){
        this.loginButton.addEventListener('click',this.setUserNameFromInput);
        this.userHelper.initialScore();
        document.querySelector(".current-user").innerHTML=this.userHelper.getCurrentUser();
        this.getScore();
        this.setModal();
    }
    getScore(){
        let userScore= this.userHelper.getScoreObject().userList;
        console.log(userScore)
        userScore.forEach(e => {
            console.log(e.level3);
            let user = document.createElement("p");
            user.innerHTML=`${e.name} ${e.level1+e.level2+e.level3}`
            this.score.append(user);
        });
    }
    setUserNameFromInput(){
        let name = document.querySelector(".name-input").value;
        new userHelper().setCurrentUser(name);
        document.querySelector(".current-user").innerHTML=new userHelper().getCurrentUser();
    }

    setModal(){
        this.modal.addModalContent(`<div class="menu">
         <button id="level1" class="menu-button level-button">Уровень 1</button>
         <button id="level2" class="menu-button level-button">Уровень 2</button>
         <button id="level3" class="menu-button level-button">Уровень 3</button>
         <button class="menu-button level-button modal-close">Назад</button>
         </div>`);
         this.modal.addCloseListener();
         this.modal.addOpenListener();
         document.querySelector('#level1').addEventListener('click',()=>{
                 window.location.href='level1/level1.html';
             });
             document.querySelector('#level2').addEventListener('click',()=>{
                 window.location.href='level2/level2.html?name='+this.userHelper.getCurrentUser();
             });
             document.querySelector('#level3').addEventListener('click',()=>{
                 window.location.href='level3/level3.html?name='+this.userHelper.getCurrentUser();
             });
    }
    

}