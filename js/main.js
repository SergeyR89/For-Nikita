function mathEx() {
  const headInp = document.querySelector(".js-exmp");
  const headBtn = document.querySelector(".js__btn");  
  const endBtn = document.querySelector(".js-end__btn");
  const main = document.querySelector(".main");
  const resultError = document.querySelector(".result__error");
  

  let arrExmp = [];
  let exmpel = [];
  const rand = (n) => Math.floor(Math.random() * n + 1);
  const generetEx = () => {
    const objEx = {
      1: [sum, "+"],
      2: [subtract, "-"],
      3: [multi, "*"],
      4: [separ, "/"],
      5: [sum, "увеличить на"],
      6: [subtract, "уменьшить на"],
      7: [multi, "увеличить в"],
      8: [separ, "уменьшить в"]
    };

    // let n = 4;
    let n = rand(8);
    let a = 0;
    let b = 0;
    let res = 0;
        
    if (n == 1 || n == 5) {
      do {
        a = rand(100);
        b = rand(100);       
      } while (a + b > 100);
    }
    if (n == 2 || n == 6) {
      do {
        a = rand(100);
        b = rand(100);        
      } while (a < b);
    }
    if (n == 3 || n == 7) {
      a = rand(10);
      b = rand(10);
    }
    if (n == 4 || n == 8) {
      do {
        a = rand(82);
        b = rand(10);        
      } while (!Number.isInteger(a / b));
    }

    res = objEx[n][0](a,b)
    arrExmp.push([a,b,objEx[n][1]])
    exmpel.push(res)
  };

  const render = (arr,teg) => {
   let str = '';
   arr.forEach(([a,b,s]) => str +=`<section class="main__body">
        <div class="main__body_content">
        <p class="main__body-titel">${a} ${s} ${b} =</p>
        <input type="text" class="exmp test__exmp">
        </div>
        <div class="main__body__img"></div>
      </section>`
      )
   teg.innerHTML = str;
   resultError.textContent = 0;   
 };

  const test = (arr) =>{
    let count = 0;
    const testInp = main.querySelectorAll(".test__exmp")    
      testInp.forEach((it,i) =>{        
        if (+it.value == arr[i]){
          it.parentNode.nextElementSibling.classList.remove('error')
          it.parentNode.nextElementSibling.classList.add('ok')
          count++;
        } 
        else it.parentNode.nextElementSibling.classList.add('error')          
      }) 
      resultError.textContent = arr.length - count;           
  }


  headInp.addEventListener('focus',() => headInp.value = '')

  headBtn.addEventListener('click',() =>{ 
   arrExmp = [];   
    exmpel = [];   
    for (let i = 0; i < +headInp.value; i++) {
      generetEx()      
    }
  render(arrExmp,main)  
  })

  main.addEventListener('click', autoFocus)

  endBtn.addEventListener('click', () => test(exmpel))

}

function autoFocus (event){
  const target = event.target.closest('.main__body');
  if(target)target.querySelector('input').focus()
}

const sum = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multi = (a,b) => a * b;
const separ = (a,b) => a / b;

mathEx();

