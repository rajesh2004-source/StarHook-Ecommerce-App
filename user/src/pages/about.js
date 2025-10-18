import React from 'react'
import Layout from '../components/layout/Layout'
import { FcAbout } from 'react-icons/fc'

const about = () => {
    return (
        <Layout title={"about us - Ecommerce app"}>
            <div className='row contactus' id="conta">
                <div className='col-md-6'>

                    <img src='/images/aboutus.jpg' alt="aboutus" style={{ width: "100%", height: "90%" }}></img>
                </div>
                <div className='col-md-5' >
                    <h1 className='bg-dark p-2 text-white text-center'><FcAbout /> About us Page</h1>
                    <p className='text-justify mt-2'>
                        An ecommerce app is a piece of software that allows customers to browse and purchase items from an online store123. Ecommerce apps are beneficial for both businesses and customers, as they can provide better engagement, loyalty, and convenience12. Ecommerce apps can be created using platforms like Shopify and Ecwid by Lightspeed14. Some examples of ecommerce apps are Sephora, ASOS, Boxed, and Glasses by Warby Parker5. Ecommerce apps are different from social commerce, which is selling or shopping via social media1
                    </p>
                </div>
            </div>

        </Layout>
    )
}

export default about
