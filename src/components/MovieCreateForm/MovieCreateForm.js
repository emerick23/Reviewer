import React, { Component } from 'react'
import movieService from '../../utils/movieService'

class MovieCreateForm extends Component {
    
    state = {
        posterImg: '',
        description: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let movie = await movieService.movieCreate(this.state)
        console.log(movie)
        this.props.history.push('/movies') 
    }

    render() {
        return (
            <div className='row'>
                <form className='col s12' onSubmit={this.handleSubmit} autoComplete='off'>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='posterImg' onChange={this.handleChange} type='text' name='posterImg' value={this.state.posterImg}></input>
                            <label htmlFor='posterImg'>Poster Image</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='description' onChange={this.handleChange} type='text' name='description' value={this.state.description}></input>
                            <label htmlFor='description'>Movie Description</label>
                        </div>
                    </div>
                    <button className='btn' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default MovieCreateForm