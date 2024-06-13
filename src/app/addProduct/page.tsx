"use client";
import { BreadCrumb } from "@/components/BreadCrumb/BreadCrumb";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type TFormValues = {
  title: string;
  description: string;
  price: string;
  image: string;
  category: `men's clothing` | `women's clothing` | `jewelery` | `electronics`;
};

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormValues>();

  const categories = [
    `men's clothing`,
    `women's clothing`,
    `jewelery`,
    `electronics`,
  ];

  const onSubmit = (data: TFormValues) => {
    const { title, description, price, category, image } = data;
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        price,
        description,
        image,
        category,
      }),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Product added successfully!🥳");
        reset();
      } else {
        console.log(res);
      }
    });
  };

  return (
    <>
      <BreadCrumb children={["addProduct"]} />
      <section className="lg:w-1/2 w-[90%] mx-auto my-10 border border-gray-200 shadow rounded-xl py-4">
        <h2 className="text-xl font-semibold flex justify-center items-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            {...register("title", { required: true })}
            placeholder="Title*"
            className="input"
          />
          {errors.title && (
            <span className="error">This field is required</span>
          )}

          <input
            {...register("description", { required: true })}
            placeholder="Description*"
            className="input"
          />
          {errors.description && (
            <span className="error">This field is required</span>
          )}
          <input
            type="number"
            {...register("price", { required: true, min: 0, max: 1000 })}
            placeholder="Price*"
            className="input"
          />
          {errors.price && (
            <span className="error">This field is required</span>
          )}

          <select {...register("category")} className="input">
            {categories.map((cat) => (
              <option key={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
          <input
            {...register("image", {
              required: true,
              pattern: /^(?:\w+:)?\/\/([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/,
            })}
            placeholder="Image URL*"
            className="input"
          />
          {errors.image && (
            <span className="error">Please enter a valid URL!</span>
          )}

          <div className="w-9/12 mx-auto flex justify-around items-center my-2">
            <button
              className="py-2 px-10 rounded-lg bg-blue-500 text-xl text-white flex items-center justify-center hover:opacity-75"
              type="submit"
            >
              Add
            </button>
            <button
              className="py-2 px-10 rounded-lg bg-gray-400 text-xl text-white flex items-center justify-center hover:opacity-75"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProduct;
