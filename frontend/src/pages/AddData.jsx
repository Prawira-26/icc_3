import Navbar from "../components/navbar";
import axios from "axios";
import  { useForm } from "react-hook-form";
import { useNavigate, Link} from "react-router-dom";

function AddData() {

    const {register, handleSubmit, formState: {errors}, }
     = useForm ({
        defaultValues: {
        nama : "",
        kelas : "",
        prodi : "",
     },        
        mode : "onBlur",
     }
    );

    const navigate = useNavigate ();

    const addSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:9000/create", data,
            navigate (),
            {
                headers: {
                   "Content-Type" : "application/json",
                },
                withCredentials: false,
            }
            );
            console.log(response);
            navigate ("/view");
        } catch (error) {
            console.error(error);
        }
    }; 


    return (
        <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit(addSubmit)} className="flex flex-col items-center justify-center h-[80vh] w-[50vw] shadow-md
        border-2 text-lg gap-4 ">
            <h1 className="my-6">Add Data</h1>
            {/*nama */}
            <div className="flex flex-col">
                <label htmlFor="nama" className="px-[10px]">Nama</label>
                <input type="text" id="nama" placeholder="masukkan nama" className="px-4 py-3 border-2 bg-slate-200 rounded-2xl"
                {...register("nama", {required: "nama harus di isi"})} 
                />
                {errors.nama && (
                <span className="text-red-500 px-10">{errors.nama.message}</span>
                )}
            </div>
             {/*Kelas */}
             <div className="flex flex-col">
                <label htmlFor="Kelas" className="px-[10px]">Kelas</label>
                <input type="text" id="Kelas" placeholder="masukkan Kelas" className="px-4 py-3 border-2 bg-slate-200 rounded-2xl"
                {...register("Kelas", {required: "Kelas harus di isi"})} 
                />
                {errors.Kelas && (
                <span className="text-red-500 px-10">{errors.Kelas.message}</span>
                )}
            </div>
             {/*Prodi */}
             <div className="flex flex-col">
                <label htmlFor="Prodi" className="px-[10px]">Prodi</label>
                <input type="text" id="Prodi" placeholder="masukkan Prodi" className="px-4 py-3 border-2 bg-slate-200 rounded-2xl"
                {...register("Prodi", {required: "Prodi harus di isi"})} 
                />
                {errors.Prodi && (
                <span className="text-red-500 px-10">{errors.Prodi.message}</span>
                )}
            </div>
            <button className="bg-blue-500 text-white font-semibold mt-2 hover:bg-blue-800  rounded-lg w-[10vw]" >submit answer</button>
            
        </form>
    </div>
    </>
    );
}
  
  export default AddData
  