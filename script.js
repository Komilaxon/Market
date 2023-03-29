import {fruits} from "./main.js";

const elFruits_box = document.querySelector(".fruits");
const elKorzinka = document.querySelector(".korzinka");
const box = document.querySelector(".box")

let card = [];

const render = () => {
    elFruits_box.innerHTML =  fruits.map((el) => {

        const check = card.find((item) => item.id == el.id)

        return `
        <div class="fruits__card">
            <div class="img_box">
                <img src=${el.img} alt="img" />
            </div>
            <div class="text__box">
                <h2>${el.title}</h2>
                <p class="price">1 kg - ${el.price}$</p>
                <p class="price">${el.count > 0 ? el.count : "Bu turdagi meva qolmadi"}</p>
              <button id="${el.id}" class="${check ? "remove" : "add"}"> ${check ? "Remove" :"Add"}</button>
            </div>
        </div>
        `
    }).join("") 
};

render(elFruits_box, elKorzinka)

const renderCard = () =>{
    elKorzinka.innerHTML =  card.map((el) => (el.userCount > 0 ? `
    <div class="fruits__card">
        <div class="img_box">
            <img src=${el.img} alt="img"/>
        </div> 
        <div class="text__box">
            <h2>${el.title}</h2>
            <p class="price">1 kg - ${el.price}$, Jami: ${el.userPrice}$</p>
          <button id="${el.id}" class="inc">+ </button>
          <span>${el.userCount}</span>
          <button id="${el.id}" class="dec">-</button>
        </div>
    </div>
    ` : "")
       ).join("")
};

box.addEventListener('click',(evt) =>{
    evt.preventDefault()
    const {id, className} = evt.target
    for(let i of fruits){
        if(className == "add"){
            if(i.id == id){
             const check = card.find((item => item.id == id))
                if(!check){
                i.count -= 1;
                card.push({...i, userPrice: i.price, userCount: 1} )
             } 
            };
        }
        localStorage.setItem("card", JSON.stringify(card))
        if(i.id == id){
            if(i.count > 0 && className == "inc"){
                i.count -= 1;
                for(let cardItem of card){
                    if(cardItem.id == id){
                        cardItem.userCount += 1
                        cardItem.userPrice = cardItem.price * cardItem.userCount

                        };

                    };

            }else if(className == "dec" ) {
                for(let cardItem of card){
                    if(cardItem.id == id && cardItem.userCount > 0 ){
                        i.count += 1;
                        cardItem.userCount -= 1
                        cardItem.userPrice = cardItem.price * cardItem.userCount
                    }else if(cardItem.userCount == 0){
                            
                        }
                        card = card.filter((el) => el.userCount > 0)
                };
            };
        };
    };
  
    if(className == "remove"){
        let cardRemove;
        card = card.filter((item) => {

            if(item.id == id){
                cardRemove += item.userCount
            }else{
                return item
            }
        });

        for(let i of fruits){
                 if(i.id == id){
                i.count == cardRemove
            }
        }       
    }
   
    render()
    renderCard(card, elKorzinka)
});




  














