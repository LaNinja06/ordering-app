import { menuArray } from './data.js'
const paymentModal = document.getElementById("payment-modal")

// where to store the orders 

let menuOrder = []

// function to iterate though menuArray and storing it into feedHtml  

function getMenu(){
    let feedHtml = ""
    menuArray.forEach(function(menu){
        feedHtml += 
        `
            <div class="menu-item">
                <p class="emoji">${menu.emoji}</p>
                <div class="menu">
                    <p class="menu-name">${menu.name}</p>
                    <p class="menu-ingredients">${menu.ingredients}</p>
                    <p class="menu-price">$ ${menu.price}</p>
                </div>
                    <button class="add-button" id="add-button" data-add="${menu.id}">+</button>
            </div>        

            <div class="border">
                <!-- border  -->
            </div>
    
        `
    })
    return feedHtml 
}     

// calling function getMenu to render out menu in the menu-area

function renderGetMenu(){
    document.getElementById('menu-area').innerHTML = getMenu()
    
} 
renderGetMenu()

// function to show orders in the order area

function showOrder(){
    let addedOrder = ` `
    let prices = ""
    let sum = 0
    
    menuOrder.forEach(function(order){
        addedOrder += 
         `
            <div class="order-area">
                <div class="order-name"> 
                    <span>${order.name}</span>
                    
                    <button 
                        class="remove-btn" id="remove-btn" data-remove="${order.name}"> 
                        remove
                    </button>
                </div>
                <div class="order-price">
                    <span>$${order.price}</span> 
                </div>
            </div>
         `
    })  
    
    document.getElementById("order-area").classList.remove("hidden")
    document.getElementById("order-area").innerHTML = `<h2> Here is your Order:</h2>` + addedOrder  
        
    menuOrder.forEach(function(price){
        sum = sum + Number(price.price)      
        prices = 
        `
        <div class ="total-price">
            <h2> Your total price:</h2>
            <h2 class="sum">$${sum}</h2>
        </div>
        `
    }) 

    document.getElementById("total-price").innerHTML = prices
    document.getElementById("confirm-order").classList.remove("hidden")
} 

// listeners for the buttons 

document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        handleAddButton(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        handleRemoveButton(e.target.dataset.remove)
    } else if (e.target.id === "confirm-btn"){
        handleConfirmButton(e.target.id === "confirm-btn")
            handleConfirmButton()
    }
})

// functions how to handle buttons 

function handleAddButton(item){
     
    const orderAdded = menuArray.filter(function(menu){
        return menu.id.toString() === item
    }) [0]
    menuOrder.push({
      name: `${orderAdded.name}`,
      price: `${orderAdded.price}`,
      id: `${orderAdded.id}`
    })
    showOrder()
}

function handleRemoveButton(item){
    
    const orderRemoved = menuArray.filter(function(menu){
        return menu.name === item
    })[0] 
    menuOrder.pop(orderRemoved)
    showOrder()
    
    if (menuOrder.length === 0) {
        document.getElementById("order-area").classList.add("hidden")
        document.getElementById("confirm-order").classList.add("hidden")    
    }
}

function handleConfirmButton(){
    
    paymentModal.addEventListener("click", function(e){
        e.preventDefault()
        const name = new FormData(document.getElementById("payment-modal-form")) 
        const nameFull = name.get("fullName")
        
        if (e.target.dataset.pay){
                setTimeout(function(){
                    document.getElementById("payment-modal").classList.add("hidden")
                }, 1000)
                
                setTimeout(function(){
                    document.getElementById("thanks-area").classList.remove("hidden")
                }, 1300)
                                    
              
                    document.getElementById("thanks-area").innerHTML = 
                    `<h3>Thanks, ${nameFull}! Your order is on its way!</h3>`
                
                
                document.getElementById("total-price").classList.add("hidden")           
                document.getElementById("confirm-order").classList.add("hidden")  
                document.getElementById("order-area").classList.add("hidden")
                
                
                
                                

        } else if (e.target.dataset.cancel){
            setTimeout(function(){
                document.getElementById("payment-modal").classList.add("hidden")
                document.getElementById("total-price").classList.add("hidden")           
                document.getElementById("confirm-order").classList.add("hidden")  
                document.getElementById("order-area").classList.add("hidden")
            }, 500)
        }
    })
     document.getElementById("payment-modal").classList.remove("hidden")    
} 