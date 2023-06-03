import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="flex items-center  h-[10vh] text-md font-bold justify-between px-7 shadow-md">
        <figure>
            <figcaption>
                <Link to="/home">
                     Logo
                </Link></figcaption>
        </figure>
        
        <nav>
            <div className="flex w-[15vw] gap-10 text-[10 px] pr[]">
            <Link to="/add">Add Data</Link>
          
            <Link to="/view">View Data</Link>            </div>
        </nav>
          
      
    </header>
  );
};

export default Navbar
