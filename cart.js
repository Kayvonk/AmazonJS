function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems)
    })
}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-amount").innerText = numeral(totalCost).format('$0,0.00');
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().quantity > 0) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId) {
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center border-b border-gray-200 py-6">
                        <div class="cart-item-image w-40 h-24 bg-white p4 rounded-lg">
                            <img class="w-full h-full object-contain" src="${item.image}">
                        </div>
                        <div class="cart-item-details flex-grow">
                            <div class=" cart-item-title font-bold text-sm text-gray-600">
                                ${item.price}
                            </div>
                            <div class="cart-item-brand text-sm text-gray-400">
                                ${item.name}
                            </div>
                        </div>
                        <div class="cart-item-counter w-48 flex items-center">
                            <div
                                data-id="${item.name}" class="cart-item-decrease cursor-pointer text-gray-500 bg-gray-100 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <h4 class="text-gray-500 mx-1">x${item.quantity}</h4>
                            <div
                                data-id="${item.name}" class="cart-item-increase cursor-pointer text-gray-500 bg-gray-100 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                        <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                             ${numeral(item.price * item.quantity).format('$0,0.00')}
                        </div>
                        <div
                            data-id="${item.id}" class="cart-item-delete w-14 text-gray-400 cursor-pointer bg-white p-4 hover:bg-gray-100 rounded-full active:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");
    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function () {
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function () {
            increaseCount(button.dataset.id)
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            deleteItem(button.dataset.id)
        })
    })

}



getCartItems();