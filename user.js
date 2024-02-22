"use strict"

class userHelper{
    setCurrentUser(name){
        let score = this.getScoreObject();
        score.currentUser = name;
        localStorage.setItem("user-score",JSON.stringify(score))
    }
    getCurrentUser(){
        let score = this.getScoreObject();
        return score.currentUser;
    }
    getScoreObject(){
        let score = localStorage.getItem('user-score');
        var obj = JSON.parse(score);
        return obj;
    }
    initialScore(){
        if(localStorage.getItem("user-score")==null){
            let score ={
                currentUser:null,
                userList:[]
            }
            localStorage.setItem("user-score",JSON.stringify(score))
        }
    }
    saveScore(name, level,scoreValue){
        
        let score = this.getScoreObject();
        if(score.userList.findIndex(e=>e.name==name)==-1){
            let user={
                name:name,
                level1:0,
                level2:0,
                level3:0
            }
            score.userList.push(user);
            switch(level){
                case 1:
                    if(score.userList[score.userList.length-1].level1<scoreValue){
                        score.userList[score.userList.length-1].level1=scoreValue;
                    }
                    
                    break;
                case 2:
                    if(score.userList[score.userList.length-1].level2<scoreValue){
                        score.userList[score.userList.length-1].level2=scoreValue;
                    }
                    break;
                case 3:
                    if(score.userList[score.userList.length-1].level3<scoreValue){
                        score.userList[score.userList.length-1].level3=scoreValue;
                    }
                    break;
            }
        }else{
            switch(level){
                case 1:
                    if(score.userList[score.userList.findIndex(e=>e.name==name)].level1<scoreValue){
                        score.userList[score.userList.findIndex(e=>e.name==name)].level1=scoreValue;
                    }
                    
                    break;
                case 2:
                    if(score.userList[score.userList.findIndex(e=>e.name==name)].level2<scoreValue){
                        score.userList[score.userList.findIndex(e=>e.name==name)].level2=scoreValue;
                    }
                    break;
                case 3:
                    if(score.userList[score.userList.findIndex(e=>e.name==name)].level3<scoreValue){
                        score.userList[score.userList.findIndex(e=>e.name==name)].level3=scoreValue;
                    }
                    break;
            }
            
        }
        localStorage.setItem("user-score",JSON.stringify(score));
    }
}