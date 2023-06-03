import Navbar from "../components/navbar";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";

function EditData() {


  const { register, handleSubmit,setValue, formState: { errors } } = useForm({
    defaultValues: {
      nama: "",
      kelas: "",
      prodi: "",
    },
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/read/${id}`);
      console.log(response.data.data);

        setValue("nama", response.data.data.nama)
        setValue("kelas", response.data.data.kelas)
        setValue("prodi", response.data.data.prodi)
    } catch (error) {
      console.error(error);
    }
  };

  const editSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      console.log(response);
      navigate("/view");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(editSubmit)}
          className="flex flex-col items-center justify-center h-[80vh] w-[50vw] shadow-md border-2 text-lg gap-4"
        >
          <h1 className="my-6">Edit Data</h1>
          {/* Nama */}
          <div className="flex flex-col">
            <label htmlFor="nama" className="px-[10px]">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              placeholder="masukkan nama"
              className="px-4 py-3 border-2 bg-slate-200 rounded-2xl"
              {...register("nama", { required: "Nama harus diisi" })}
            />
            {errors.nama && (
              <span className="text-red-500 px-10">{errors.nama.message}</span>
            )}
          </div>
          {/* Kelas */}
          <div className="flex flex-col">
            <label htmlFor="kelas" className="px-[10px]">
              Kelas
            </label>
            <input
              type="text"
              id="kelas"
              placeholder="masukkan kelas"
              className="px-4 py-3 border-2 bg-slate-200 rounded-2xl"
              {...register("kelas", { required: "Kelas harus diisi" })}
            />
            {errors.kelas && (
              <span className="text-red-500 px-10">{errors.kelas.message}</span>
            )}
          </div>
          {/* Prodi */}
          <div className="flex flex-col">
            <label htmlFor="prodi" className="px-[10px]">
              Prodi
            </label>
            <input
              type="text"
              id="prodi"
              placeholder="masukkan prodi"
              className="px-4 py-3 border-2 bg-slate-200 rounded-2xl"
              {...register("prodi", { required: "Prodi harus diisi" })}
            />
            {errors.prodi && (
              <span className="text-red-500 px-10">{errors.prodi.message}</span>
            )}
          </div>
          <button className="bg-blue-500 text-white font-semibold mt-2 hover:bg-blue-800 rounded-lg w-[10vw]">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditData;
