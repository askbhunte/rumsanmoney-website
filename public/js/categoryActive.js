//const myParam = new URLSearchParams(window.location.search).get('type');
let loanListBtns = document.getElementsByClassName('loan-list');  
let buttons = loanListBtns[0].querySelectorAll("button"); 
 
 if(!type){    
  buttons.forEach((el) =>{
    if (el.innerHTML.trim() === 'Home Loan'){
      el.classList.add('active');
    }
    else if(el.innerHTML.trim() === 'Kids Savings'){
      el.classList.add('active');
    }
    else if(el.innerHTML.trim() === 'Life Insurance'){
      el.classList.add('active');
    }
  })
 }
 else{  
  buttons.forEach((el) =>{
    if (el.innerHTML.trim() === type){
      el.classList.add('active');
    }
  }) 
  
 }