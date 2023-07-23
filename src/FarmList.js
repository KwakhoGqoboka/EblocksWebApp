import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FarmList = ({farmcentrals, title}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
    }, []);




    return (
        <div className="farmcentral-list">
          <h2>{title}</h2>
          {farmcentrals.map((farmcentral) => (
            <div className="farmcentral-preview" key={farmcentral.id}>
              <Link to={`/farmcentrals/${farmcentral.id}`}>
                <h2>{farmcentral.email}</h2>
                <p>FARMER {farmcentral.fullname}</p>
                <p>PASSWORD {farmcentral.password}</p>
              </Link>
              {/* Display the products for this farmer */}
              <ul>
                {products
                  .filter((product) => product.id === farmcentral.productid)
                  .map((product) => (
                    <li key={product.productid}>
                      {product.productName} - Price: {product.productPrice}, Quantity: {product.productQuantity}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      );
    };
 
export default FarmList;