import React from 'react'
import Layout from '../components/layout/Layout'
import { BiSupport, BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { IoMdContacts } from "react-icons/io"

const contact = () => {
    return (
        <Layout title={"contact us"}>
            <div className='row contactus' id="conta">
                <div className='col-md-6'>
                    {/* images */}
                    <img src='/images/contactus.jpg' alt="contactus" style={{ width: "100%", height: "90%" }}></img>
                </div>
                <div className='col-md-5' >
                    <h1 className='bg-dark p-2 text-white text-center'><IoMdContacts /> Contact Page</h1>
                    <p className='text-justify mt-2'>
                        any query and info about product feel free to call anytime we 24x7 available
                    </p>
                    <p className='mt-3'> <BiMailSend /> : www.helpcommerceapp.com</p>
                    <p className='mt-3'> <BiPhoneCall /> : 026-1545420</p>
                    <p className='mt-3'> <BiSupport /> : 1800-2400-0202(toll free)</p>
                </div>
            </div>
        </Layout>


    )
}

export default contact
