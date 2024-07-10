<?php
include_once "db.php";
class Products extends Db
{

    public function getProducts()
    {
        $sql = "SELECT * FROM products";
        $stmt = $this->connect()->query($sql);

        return json_encode($stmt->fetchAll());
    }
    public function setProduct($product)
    {

        $sql = "SELECT * FROM products WHERE sku=?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([
            $product["sku"]
        ]);
        if (sizeof($stmt->fetchAll()) > 0)
        return false;
        $sql = "INSERT INTO products (sku,name,price,type,type_value) values (?,?,?,?,?)";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([
            $product["sku"], $product["name"], $product["price"], $product["type"], $product[$product["type"]]

        ]);
        return true;
    }
    public function deleteProducts($products)
    {
        foreach ($products as $key => $value) {
            $sql = "DELETE FROM products WHERE products.id = ?";
            $stmt = $this->connect()->prepare($sql);
            $stmt->execute([$value]);
        }
    }
}
