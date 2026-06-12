import React, { useEffect, useState, useCallback } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url }) => {

  const [list, setList] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", price: "", category: "" });
  const [editImage, setEditImage] = useState(false);

  const fetchList = useCallback(async () => {
    const response = await axios.get(`${url}/api/food/list`)

    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }, [url]);

  const removefood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }

  const handleEditClick = (item) => {
    setEditingFood(item);
    setEditData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category
    });
    setEditImage(false);
  }

  const handleEditChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEditData(data => ({ ...data, [name]: value }))
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", editingFood._id);
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("price", Number(editData.price));
    formData.append("category", editData.category);
    if (editImage) {
      formData.append("image", editImage);
    }

    const response = await axios.post(`${url}/api/food/edit`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setEditingFood(null);
      fetchList();
    } else {
      toast.error("Error updating food");
    }
  }

  useEffect(() => {
    const loadList = async () => {
      await fetchList();
    }
    loadList();
  }, [fetchList])
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Rating</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p>{item.averageRating ? `${item.averageRating.toFixed(1)} ★` : "No rating"}</p>
              <div className='list-action'>
                <p onClick={() => handleEditClick(item)} className='cursor edit-btn'>Edit</p>
                <p onClick={() => removefood(item._id)} className='cursor'>X</p>
              </div>
            </div>
          )
        })}
      </div>

      {editingFood && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <span className="close" onClick={() => setEditingFood(null)}>&times;</span>
            <h2>Edit Food</h2>
            <form className='flex-col' onSubmit={handleEditSubmit}>
              <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="edit-image">
                  <img src={editImage ? URL.createObjectURL(editImage) : `${url}/images/${editingFood.image}`} alt="" />
                </label>
                <input onChange={(e) => setEditImage(e.target.files[0])} type="file" id='edit-image' hidden />
              </div>

              <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={handleEditChange} value={editData.name} type="text" name='name' placeholder='Type here' required />
              </div>

              <div className='add-product-description flex-col'>
                <p>Product description</p>
                <textarea onChange={handleEditChange} value={editData.description} name="description" rows="6" placeholder='Write content here' required></textarea>
              </div>

              <div className="add-category-price">
                <div className="add-category flex-col">
                  <p>Product category</p>
                  <select onChange={handleEditChange} value={editData.category} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure veg">Pure veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                  </select>
                </div>

                <div className="add-price flex-col">
                  <p>Product price</p>
                  <input onChange={handleEditChange} value={editData.price} type="number" name='price' placeholder='₹20' required />
                </div>
              </div>
              <button type='submit' className='add-btn'>UPDATE</button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default List
