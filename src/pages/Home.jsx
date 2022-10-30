import React from 'react'
import { useNavigate } from 'react-router-dom'
import LandingMockup from "../assets/landing_mockup.png"

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
    <main className='main_home'>
        <section className='main_mockup'>
            <img src={LandingMockup} alt="Render of the app on phone" />
        </section>
        <section className='main_navigation'>
            <button className='action_button' onClick={() => navigate('/routes')}>
                View Routes
            </button>
            <button className='action_button' onClick={() => navigate('/addroute')}>
                Add New Route
            </button>
        </section>
    </main>
    </>
  )
}

export default Home