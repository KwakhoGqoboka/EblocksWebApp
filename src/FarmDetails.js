import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const FarmDetails = () => {
    const { id } = useParams();
    const { data: farmcentral, error, isPending } = useFetch('http://localhost:8000/farmcentrals/' + id);
    const history = useHistory();
    const { data: products, error: productError, isPending: productIsPending } = useFetch('http://localhost:8000/products');

    const handleClick= () => {
        fetch('http://localhost:8000/farmcentrals/' + farmcentral.id, {
            method: "DELETE"
        }).then(() => {
            history.push('/');
        })
    }

    

    // Check if products data is available before filtering
    const filteredProducts = products && products.filter((product) => product.productid === id);

    return (
        <div className="farm-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {farmcentral && (
                <article>
                    <h2>{farmcentral.email}</h2>
                    <p>FARMER, {farmcentral.fullname}</p>
                    <div>PASSWORD, {farmcentral.password}</div>

                    <button onClick={handleClick}>DELETE</button>

                    
                </article>
            )}
        </div>
    );
}
 
export default FarmDetails;