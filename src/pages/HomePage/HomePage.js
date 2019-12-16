import React from 'react'
import './HomePage.css'

const HomePage = (props) => {
    return (
        <div className='HomePage container'>
            <div className='section'>
                <h6>Welcome</h6>
                <div className='divider'></div>
                <p className='center'>Reviewer was built for movie buffs to review their favorite movies. Click the movies tab above to see movies and their reviews. Signup or Login above if you'd like to leave a review of your own!</p>
            </div>
        </div>
    )
}

export default HomePage