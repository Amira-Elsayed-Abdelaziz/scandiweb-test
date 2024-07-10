<?php
include_once "./classes/products.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
$products = new Products();
$products->deleteProducts(json_decode(file_get_contents('php://input'), true));
echo json_encode(["msg"=>"suc"]);