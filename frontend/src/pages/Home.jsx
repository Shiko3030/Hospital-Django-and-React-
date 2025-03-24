import React from 'react';

const Home = () => {
    return (
        
                <section
                    className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
                    style={{ backgroundImage: `url('/photo_3.jpg')`, backgroundSize: 'cover' }}
                >
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                Welcome to Center  Hospital
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Center  Hospital is a comprehensive medical center that offers advanced healthcare services across various specialties, with a team of expert doctors and state-of-the-art equipment to ensure exceptional patient care.
                </p>
            </div>
        </section>
    )
}

export default Home;
