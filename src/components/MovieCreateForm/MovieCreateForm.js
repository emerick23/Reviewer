import React, { Component } from 'react'
import movieService from '../../utils/movieService'

class MovieCreateForm extends Component {
    
    state = {
        posterImg: '',
        name: '',
        description: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let movie = await movieService.movieCreate(this.state)
        this.props.handleAddMovie(movie)
        this.setState({posterImg: '', name: '', description: ''})
    }

    isFormInvalid() {
        return !(this.state.posterImg && this.state.name && this.state.description);
      }

    render() {
        return (
            <div className={this.props.createFormClassName}>
                <form className='col s12' onSubmit={this.handleSubmit} autoComplete='off'>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='posterImg' onChange={this.handleChange} type='text' name='posterImg' value={this.state.posterImg}></input>
                            <label htmlFor='posterImg'>Image Url</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='name' onChange={this.handleChange} type='text' name='name' value={this.state.name}></input>
                            <label htmlFor='name'>Movie Name</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='description' onChange={this.handleChange} type='text' name='description' value={this.state.description}></input>
                            <label htmlFor='description'>Movie Description</label>
                        </div>
                    </div>
                    <button className='btn' disabled={this.isFormInvalid()} type='submit'>Submit</button>
                    <p className='btn btnMarg' onClick={this.props.handleCreateForm}>Cancel</p>
                </form>
            </div>
        )
    }
}

export default MovieCreateForm