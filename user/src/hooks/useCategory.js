import { useState, useEffect } from "react";
import axios from "axios";


export default function useCategory() {
    const [categories, setCategories] = useState([]);


    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/category/get-category`);
            setCategories(data?.getcat);
            if (data?.success) {
                setCategories(data?.getcat);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    return categories;
}

