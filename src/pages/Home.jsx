import React from 'react'
import { useNavigate } from 'react-router-dom'
import LandingMockup from "../assets/landing_mockup.png"

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
    <main>
        <section>
            <img src={LandingMockup} alt="Render of the app on phone" />
        </section>
        <section>
            <button onClick={() => navigate('/routes')}>
                View Routes
            </button>
        </section>
        <section>
            <button onClick={() => navigate('/addroute')}>
                Add New Route
            </button>
        </section>
    </main>
    </>
  )
}

export default Home