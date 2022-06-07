import "./App.css";
import React from "react";
import axios from "axios";

function App() {
  const [success, setSuccess] = React.useState(false);

  const [formData, setFormData] = React.useState({
    category: "",
    location: "",
    con: "",
    brand: "",
    model: "",
    title: "",
    description: "",
    price: "",
    phone: "",
    images: "",
  });

  function handleChange(e) {
    const { value, name, files } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: name === "images" ? files : value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const formDatas = new FormData();

    formDatas.append("images", formData.images);
    formDatas.append("category", formData.category);
    formDatas.append("location", formData.location);
    formDatas.append("con", formData.con);
    formDatas.append("brand", formData.brand);
    formDatas.append("model", formData.model);
    formDatas.append("title", formData.title);
    formDatas.append("description", formData.description);
    formDatas.append("price", formData.price);
    formDatas.append("phone", formData.phone);

    console.log(formData);
    await axios
      .post("http://localhost:5000/addPost", formDatas)
      .then(() => setSuccess(true));
  }
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <div className="category-select-box">
          <h1 htmlFor="category">Category</h1>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option> --Choose-- </option>
            <option>Mobile Phones</option>
            <option>Computer Accessories</option>
            <option>Furniture</option>
            <option>Tv, Cameras</option>
            <option>Game</option>
            <option>Electronics</option>
          </select>
        </div>

        <br />

        <input
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="condition"
          name="con"
          value={formData.con}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="text"
        />

        <br />

        <input
          placeholder="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="number"
        />

        <br />
        <label htmlFor="choose-file" className="label-title">
          Upload pictures of your product
        </label>

        <br />

        <input
          type="file"
          id="choose-file"
          size={100}
          name="images"
          multiple
          onChange={handleChange}
        />
        <br />
        <button>Post Add</button>

        {success && (
          <h4 style={{ color: "green" }}>Post Added Successfully!</h4>
        )}
      </form>
    </div>
  );
}

export default App;
