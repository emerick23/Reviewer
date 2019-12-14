import React, { Component } from 'react'
import './MovieEditForm.css'
import movieService from '../../utils/movieService'

class MovieEditForm extends Component {

    state = {
        posterImg: this.props.editFormMovie.posterImg,
        name: this.props.editFormMovie.name,
        description: this.props.editFormMovie.description
    }

    handleChange = (event) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let movie = await movieService.movieEdit(this.state, this.props.editFormMovie._id)
        this.props.handleEditMovie(movie, this.props.editFormMovieIdx)
    }

    render() {
        return (
            <div className={this.props.editFormClassName}>
                <form className='col s12' onSubmit={this.handleSubmit} autoComplete='off'>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='posterImg' onChange={this.handleChange} type='text' name='posterImg' value={this.state.posterImg}></input>
                            <label id='active' htmlFor='posterImg'>Poster Image</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='name' onChange={this.handleChange} type='text' name='name' value={this.state.name}></input>
                            <label id='active' htmlFor='name'>Movie Name</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='description' onChange={this.handleChange} type='text' name='description' value={this.state.description}></input>
                            <label id='active' htmlFor='description'>Movie Description</label>
                        </div>
                    </div>
                    <button className='btn' type='submit'>Submit</button>
                    <p className='btn btnMarg' onClick={this.props.handleEditForm}>Cancel</p>
                </form>
            </div>
        )
    }
}

export default MovieEditForm