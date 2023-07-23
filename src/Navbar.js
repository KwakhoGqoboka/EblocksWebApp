import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>FARMCENTRAL</h1>
            <div className="links"></div>
            <Link to="/">HOME</Link>
            <Link to="/create" style={{
                    color: "white",
                    backgroundColor:'#4408ec',
                    borderRadius: '8px'
            }}>NEW FARMER</Link>
            <Link to="/products" style={{
                    color: "white",
                    backgroundColor:'#4408ec',
                    borderRadius: '8px'
            }}>NEW PRODUCTS</Link>
        </nav>
     );
}
 
export default Navbar;