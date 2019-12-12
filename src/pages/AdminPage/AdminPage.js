import React from 'react'
import MovieCreateForm from '../../components/MovieCreateForm/MovieCreateForm'

const AdminPage = (props) => {
    return (
        <div>
            <MovieCreateForm
            {...props}
            />
        </div>
    )
}

export default AdminPage