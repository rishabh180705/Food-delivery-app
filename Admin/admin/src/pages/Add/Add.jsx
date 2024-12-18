import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [vegitarian, setVeg] = useState(true);
  const [data, setFormData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
    
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("veg",vegitarian);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setFormData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
        
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Name"
          />
          <div className="veg-toggle">
            <p>{vegitarian ? "Veg" : "Non-Veg"}</p>
            <div
              className={`toggle-btn ${vegitarian ? "veg" : "non-veg"}`}
              onClick={() => setVeg(!vegitarian)}
>
              <div className="toggle-circle"></div>
            </div>
          </div>
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            type="text"
            name="description"
            rows="6"
            placeholder="write description"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <div className="add-product-name flex-col">
              <p>Product category</p>
              <select
                onChange={onChangeHandler}
                value={data.category}
                name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="Number"
                name="price"
                placeholder="$20"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
