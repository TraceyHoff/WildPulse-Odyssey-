let item = { price: 270 };
let tier = 3;
let itemPrice = item.price * tier * 2;
let sellPrice = Math.floor(itemPrice * 0.55);
console.log("tier", tier, "price", itemPrice, "sellPrice", sellPrice);
