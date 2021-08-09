function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                price: doc.data().price,
                undiscounted: doc.data().undiscounted,
                rating: doc.data().rating,
                stars: doc.data().stars
            })
            console.log(items)
        });
        generateItems(items)
    });
}

function addToCart(item) {
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                name: item.name,
                make: item.make,
                price: item.price,
                undiscounted: item.undiscounted,
                rating: item.rating,
                stars: item.stars,
                quantity: 1
            })
        }
    })
}


function generateItems(items) {
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5", "mt-6")
        doc.innerHTML = `
        <div class="product-image w-52 h-52 bg-white rounded-lg">
                                <img class="w-full h-full object-contain p-4" src="${item.image}">
                            </div>
                            <div class="product-make text-gray-700 font-bold">
                                ${item.name}
                            </div>
                            <div class="product-make text-green-700 font-bold">
                                ${item.make}
                            </div>
                            <div class="product-rating flex items-center">
                                <img class="w-30 h-6" src="${item.stars}">
                                <span class="mt-1 ml-1 text-yellow-500 font-bold">${item.rating}</span>
                            </div>
                            <div class="flex">
                                <div class="product-price font-bold text-gray-700">
                                     ${numeral(item.price).format('$0,0.00')}
                                        </div>
                                <div class="product-price ml-3 font-bold text-gray-400 line-through">
                                     ${numeral(item.undiscounted).format('$0,0.00')}
                                        </div>
                            </div>
                            </div>
        `
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("add-to-cart", "flex", "items-center", "justify-center", "h-8", "w-28", "rounded", "text-white", "cursor-pointer", "bg-gradient-to-b", "from-yellow-300", "to-yellow-500", "focus:outline-none", "hover:from-yellow-400")
        addToCartEl.innerText = "Add to cart";
        addToCartEl.addEventListener("click", function () {
            addToCart(item)
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".main-section-products").appendChild(doc);
    })
}


getItems();