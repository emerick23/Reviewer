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
        let review = await reviewService.reviewCreate(this.props.movieId, this.state)
        this.props.handleAddReview(review)
    }

    isFormInvalid() {
        return !(this.state.rating && this.state.comment);
      }

    render() {
        return (
            <div>
                <form className='col s12' onSubmit={this.handleSubmit} autoComplete='off'>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='rating' onChange={this.handleChange} type='number' min='1' max='5' name='rating' value={this.state.rating}></input>
                            <label htmlFor='rating'>Movie Rating (From 1 to 5 Stars)</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input id='comment' onChange={this.handleChange} type='text' name='comment' value={this.state.comment}></input>
                            <label htmlFor='comment'>Comment</label>
                        </div>
                    </div>
                    <button className='btn' disabled={this.isFormInvalid()} type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default ReviewCreateForm