import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
        <Navbar />
        <div className="flex justify-center items-center h-screen underline">
        <h1 className="font-bold text-9xl">
            CRUD FULLSTACK
        </h1>
    </div>
    </>
  );
};

export default Home
