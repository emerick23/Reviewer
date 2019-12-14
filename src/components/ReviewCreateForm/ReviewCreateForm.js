import React, { Component } from 'react'
import reviewService from '../../utils/reviewService'

class ReviewCreateForm extends Component {
    state = {
        rating: '',
        comment: '',
        userId: this.props.userId
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        console.log(this.props.movieId, this.state)
        let review = await reviewService.reviewCreate(this.props.movieId, this.state)
        this.props.handleAddReview(review)
    }

    render() {
        return (
            <div>
                <form className='col s12' onSubmit={this.handleSubmit} autoComplete='off'>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='rating' onChange={this.handleChange} type='number' name='rating' value={this.state.rating}></input>
                            <label htmlFor='rating'>Movie Rating</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='comment' onChange={this.handleChange} type='text' name='comment' value={this.state.comment}></input>
                            <label htmlFor='comment'>Movie Comment</label>
                        </div>
                    </div>
                    <button className='btn' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default ReviewCreateForm