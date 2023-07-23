import React, { useState, useEffect } from "react";

const Products = () => {
  const [farmcentrals, setFarmcentrals] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/farmcentrals")
      .then((response) => response.json())
      .then((data) => setFarmcentrals(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFarmerSelect = (e) => {
    setSelectedFarmer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new product object with the entered data
    const newProduct = {
      farmerId: selectedFarmer,
      productName,
      productPrice: Number(productPrice), // Convert to number
      productQuantity: Number(productQuantity), // Convert to number
    };

    // Send a POST request to save the product to the server
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Product added:", data);
        // Fetch the updated list of farmcentrals after saving the new product
        fetch("http://localhost:8000/farmcentrals")
          .then((response) => response.json())
          .then((data) => setFarmcentrals(data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error adding product:", error));

    // Reset the form fields after submission
    setSelectedFarmer("");
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
  };

  return (
    <div className="products">
      <h2>Products</h2>

      {/* Select a farmer */}
      <div>
        <label>Select a Farmer:</label>
        <select value={selectedFarmer} onChange={handleFarmerSelect}>
          <option value="">Select a Farmer</option>
          {farmcentrals.map((farmcentral) => (
            <option key={farmcentral.id} value={farmcentral.id}>
              {farmcentral.fullname}
            </option>
          ))}
        </select>
      </div>

      {/* Add product details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Products;
