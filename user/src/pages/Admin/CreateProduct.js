import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");


    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.getcat);
            }

        } catch (error) {
            console.log(error);
            toast.error("wrong category");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    //create product f..
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)



            const { data } = axios.post(`${process.env.REACT_APP_ACT}/api/v1/product/create-product`, productData);
            if (data?.success) {
                toast.error("something went wrong");

            }
            else {

                toast.success("successfully created product");
                navigate("/dashboard/admin/products");
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }

    return (
        <>
            <Layout title={'Dashboard - Create  Product'}>
                <div className='container-fluid m-3 p-3 dashboard'>

                    <div className="row">
                        <div className="col-md-3"> <AdminMenu /></div>

                        <div className="col-md-9">
                            <h1>Create  Product</h1>

                            <div className='m-1 w-75'>
                                <Select bordered={false}
                                    placeholder=" select a category" size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => { setCategory(value); }}>
                                    {categories?.map(c => (
                                        <Option key={c._id} value={c._id}  > {c.name} </Option>
                                    ))};

                                </Select>

                                <div className='mb-3'>
                                    <label
                                        className='btn btn-outline-secondary col-md-12'>
                                        {photo ? photo.name : "upload photo"}

                                        <input type='file' name='photo'
                                            accept='image/*'
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            hidden />

                                    </label>
                                </div>
                                <div className='mb-3'>
                                    {photo && (
                                        <div className='text-center'>
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'}
                                                className="img img-responsive" />
                                        </div>
                                    )}
                                </div>

                                <div className='mb-3'>
                                    <input type="text"
                                        placeholder="Write a name"
                                        value={name}
                                        className='form-control'
                                        onChange={(e) => setName(e.target.value)} />

                                </div>
                                <div className='mb-3'>
                                    <input type="text"
                                        placeholder="Write a description"
                                        value={description}
                                        className='form-control'
                                        onChange={(e) => setDescription(e.target.value)} />

                                </div>
                                <div className='mb-3'>
                                    <input type="number"
                                        placeholder="Write a price"
                                        value={price}
                                        className='form-control'
                                        onChange={(e) => setPrice(e.target.value)} />

                                </div>
                                <div className='mb-3'>
                                    <input type="number"
                                        placeholder="Write a Quantity"
                                        value={quantity}
                                        className='form-control'
                                        onChange={(e) => setQuantity(e.target.value)} />

                                </div>
                                <div className='mb-3'>
                                    <Select bordered={false}
                                        placeholder="Write a shipping"

                                        onChange={(value) => setShipping(value)}
                                        size='large'
                                        showSearch
                                        className='foem-select mb-3'
                                    >

                                        <Option value="0">NO</Option>
                                        <Option value="1">YES</Option>

                                    </Select>
                                </div>
                                <div className='mb-3'>
                                    <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateProduct
