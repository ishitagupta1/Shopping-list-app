import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; //app
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; //database

const appSettings={
    databaseURL:"https://playground-7a510-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}

const app = initializeApp(appSettings); 
const database = getDatabase(app);
const ShoppingListInDB = ref(database,"shoppingList");

const input=document.getElementById("input-field");
const addToCartBtn = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addToCartBtn.addEventListener("click",function(){
    let inputFieldValue = input.value;
    
    push(ShoppingListInDB,inputFieldValue);
    clearInputField();
});

onValue(ShoppingListInDB,function(snapshot) {
    
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());// entries: [key,value]
    
        clearShoppingListEl();

        for (let i=0;i<itemsArray.length;i++){
        let currentItem = itemsArray[i];//id and value
        let currentItemId = currentItem[0];
        let currentItemValue = currentItem[1];
        addListItems(currentItem);
        }
    
    } else{
        shoppingListEl.innerHTML = "No items here...yet"
    }
});


function clearShoppingListEl(){
    shoppingListEl.innerHTML = "";
}


function clearInputField(){
    input.value = "";
}

function addListItems(item){
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener("dblclick",function(){
        let exactLocationOfItemInDb=ref(database,`shoppingList/${itemID}`);
        remove(exactLocationOfItemInDb);
    })
    shoppingListEl.append(newEl);
} 

