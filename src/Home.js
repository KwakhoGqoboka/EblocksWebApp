import FarmList from "./FarmList";
import useFetch from "./useFetch";

const Home = () => {
    const { data: farmcentrals, isPending, error} = useFetch('http://localhost:8000/farmcentrals');

   

       

    return ( 
        <div className="home">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading......</div>}
          {farmcentrals && <FarmList farmcentrals={farmcentrals} title="All FARMERS" />}
         
        </div>
     );
}
 
export default Home;
