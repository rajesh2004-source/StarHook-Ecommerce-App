import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import Categoryform from '../../components/form/Categoryform';
import { Modal } from 'antd';


const CreateCatagory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateName, setUpdateName] = useState('');;


    //handlesubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_ACT}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success("category is created");
                getAllCategory();
            }
            else {
                toast.error("Something went wrong in form");

            }


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    }

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

    //update cat
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_ACT}/api/v1/category/update-category/${selected._id}`, { name: updateName });
            if (data.success) {
                toast.success("category is updated");
                setSelected(null)
                setUpdateName("")
                setVisible(false)
                getAllCategory();
            }
            else {
                toast.error("Something went wrong in update");

            }


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in update");
        }
    }


    //delete cat
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_ACT}/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success("category is deleted");

                getAllCategory();
            }
            else {
                toast.error("Something went wrong in delete");

            }


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in delete");
        }
    }


    useEffect(() => {
        getAllCategory();
    }, [])

    return (
        <Layout title={'Dashboard - Create  Catagory'}>
            <div className='container-fluid m-3 p-3 dashboard'>

                <div className="row">
                    <div className="col-md-3"> <AdminMenu /></div>
                    <div className="col-md-9">
                        <h1>Manage Catagory</h1>
                        <div className='p-3 w-50'>
                            <Categoryform handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td><button className='btn btn-primary ms-2' onClick={() => {
                                                    setVisible(true);
                                                    setUpdateName(c.name);
                                                    setSelected(c);
                                                }}>Edit</button>
                                                </td>

                                                <td><button className='btn btn-danger ms-2' onClick={() => {
                                                    handleDelete(c._id)
                                                }}>Delete</button></td>



                                            </tr>
                                        </>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <Categoryform value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} /> </Modal>

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CreateCatagory
