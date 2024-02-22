"use strict";
class modal{
    modalWindow= document.querySelector('.modal-window');
    constructor(){
    }

    addModalContent(content){
        this.modalWindow.querySelector('.modal-content').innerHTML=content;
    }

    addCloseListener(){
        document.querySelector('.modal-close').addEventListener('click',()=>{
            this.modalWindow.style.display='none';
        });
    }

    addOpenListener(){
        document.querySelector('.modal-open').addEventListener('click',()=>{
            this.modalWindow.style.display='flex';
        });
    }

    openModal(){
        this.modalWindow.style.display='flex';
    }    

}