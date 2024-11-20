let express = require('express');
let cors = require('cors');
// const { resolve } = require('path');

let app = express();
app.use(cors());

const port = 3000;

// app.use(express.static('static'));
//server-side values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2points per $1

function calculateCartTotal(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  //let result = newItemPrice + cartTotal;
  res.send(calculateCartTotal(newItemPrice, cartTotal).toString());
});

function calculateMembershipDiscount(cartTotal, isMember) {
  if (isMember === 'true') {
    return cartTotal - cartTotal * (discountPercentage / 100);
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(calculateMembershipDiscount(cartTotal, isMember).toString());
});

function calculateTaxAmount(cartTotal) {
  return cartTotal * (taxRate / 100);
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTaxAmount(cartTotal).toString());
});

function estimateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    return distance / 50;
  } else if (shippingMethod === 'express') {
    return distance / 100;
  } else {
    return 'No valid shipping option is selected';
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDeliveryTime(shippingMethod, distance).toString());
});

function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * 2;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
