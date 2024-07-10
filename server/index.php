<?php
include_once "./classes/products.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
$products = new Products();
echo $products->getProducts();
