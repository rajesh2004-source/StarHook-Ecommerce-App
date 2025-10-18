import React from 'react'
import Layout from '../components/layout/Layout'
import { MdPrivacyTip } from 'react-icons/md'

const policy = () => {
    return (
        <Layout title={"privacy policy"} >
            <div className='row contactus' id="conta">
                <div className='col-md-6'>
                    {/* images */}
                    <img src='/images/privacy.jpg' alt="contactus" style={{ width: "100%", height: "100%" }}></img>
                </div>
                <div className='col-md-5' >
                    <h1 className='bg-dark p-2 text-white text-center'> <MdPrivacyTip /> Privacy Policy Page</h1>
                    <p className='text-justify mt-2'>
                        A privacy policy for an ecommerce website is a document that tells customers what data you collect from them, how you use it, and how you protect it1234. It is a contract between you and your website visitors that helps to create trust and avoid legal issues123. It is required by data privacy laws like the GDPR if you collect any personal or sensitive information from your customers3. It should be accessible from your website, usually at the bottom5.
                    </p>


                </div>
            </div>
        </Layout>
    )
}

export default policy
