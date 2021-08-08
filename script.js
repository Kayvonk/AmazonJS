function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        let items=[];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                price: doc.data().price,
                undiscounted: doc.data().undiscounted,
                rating: doc.data().rating
            })  
            console.log(items)
        });
     generateItems(items)
    });
}

function generateItems(items){
    let itemsHTML ="";
    items.forEach((item) => {
        itemsHTML += `
               <div class="main-product">
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
                                <img class="w-6 h-6" src="star.png">
                                <img class="w-6 h-6" src="star.png">
                                <img class="w-6 h-6" src="star.png">
                                <img class="w-6 h-6" src="star.png">
                                <img class="w-6 h-6" src="star.png">
                                <span class="mt-1 ml-1 text-yellow-500 font-bold">${item.rating}</span>
                            </div>
                            <div class="flex">
                                <div class="product-price font-bold text-gray-700">
                                    ${item.price}
                                </div>
                                <div class="product-price ml-3 font-bold text-gray-400 line-through">
                                    ${item.undiscounted}
                                </div>
                            </div>
                            <div
                                class="add-to-cart flex items-center justify-center h-8 w-28 rounded text-white cursor-pointer bg-gradient-to-b from-yellow-300 to-yellow-500 focus:outline-none hover:from-yellow-400">
                                Add to cart
                            </div>
                        </div>
        `
    })
    
    document.querySelector(".main-section-products").innerHTML = itemsHTML;
}


getItems();