import React, { Component } from 'react'
import ReviewCreateForm from '../../components/ReviewCreateForm/ReviewCreateForm'
import reviewService from '../../utils/reviewService'
import './MovieDetailPage.css'

class MovieDetailPage extends Component {

    state = {
        reviews: [...this.props.movies[this.props.match.params.idx].reviews],
    }

    handleAddReview = (review) => {
        let updatedReviews = [...this.state.reviews, review]
        this.setState({
            reviews: updatedReviews
        })
        this.props.handleUpdateReviews(this.props.match.params.idx, updatedReviews)
    }

    handleDeleteReview = async (reviewIdx) => {
        const movieId = this.props.movies[this.props.match.params.idx]
        const updatedReviews = await reviewService.reviewDelete(movieId, reviewIdx)
        this.setState({
            reviews: updatedReviews
        })
        this.props.handleUpdateReviews(this.props.match.params.idx, updatedReviews)
    }

    render() {
        let userReview = this.state.reviews.find(review => review.userId === this.props.userId)
        let userReviewIdx = this.state.reviews.indexOf(userReview)
        let otherReviews = this.state.reviews.filter((review) => review.userId !== this.props.userId).map((review, idx) => (
            <div className='reviewContainer valign-wrapper' key={idx}>
                <p style={{ marginLeft: '10px' }}>{review.rating} Stars - {review.comment}</p>
            </div>
        ))
        let ratingsArray = this.state.reviews.map(review => review.rating)
        let avgRating = (ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length).toFixed(1)
        if (!this.props.userId) {
            return (
                <div className='MovieDetailPage container'>
                    <div className='section'>
                        <h3>{this.props.movies[this.props.match.params.idx].name}</h3>
                        <div className='divider divideLine'></div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h5 style={{ textDecoration: 'underline' }}>Description</h5>
                            <p>{this.props.movies[this.props.match.params.idx].description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h5 style={{ textDecoration: 'underline' }}>Reviews</h5>
                            <div className='row'>
                                <div className='col s12'>
                                    <h6 style={{ marginBottom: '10px' }}>Average Rating: {avgRating ? `${avgRating} Stars` : 'No Reviews Yet'}</h6>
                                    {otherReviews}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (!userReview) {
            return (
                <div className='MovieDetailPage container'>
                    <div className='section'>
                        <h3>{this.props.movies[this.props.match.params.idx].name}</h3>
                        <div className='divider divideLine'></div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h5 style={{ textDecoration: 'underline' }}>Description</h5>
                            <div className='row'>
                                <div className='col s12'>
                                    <p>{this.props.movies[this.props.match.params.idx].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h5 style={{ textDecoration: 'underline' }}>Reviews</h5>
                            <div className='row'>
                                <div className='col s12'>
                                    <h6 style={{ marginBottom: '10px' }}>Average Rating: {avgRating ? `${avgRating} Stars` : 'No Reviews Yet'}</h6>
                                    {otherReviews}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12'>
                            <h5 style={{ textDecoration: 'underline' }}>Add Review</h5>
                            <div className='row'>
                                <div className='col s12'>
                                    <ReviewCreateForm
                                        {...this.props}
                                        movieId={this.props.movies[this.props.match.params.idx]._id}
                                        handleAddReview={this.handleAddReview}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='MovieDetailPage container'>
                <div className='section'>
                    <h3>{this.props.movies[this.props.match.params.idx].name}</h3>
                    <div className='divider divideLine'></div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5 style={{ textDecoration: 'underline' }}>Description</h5>
                        <p>{this.props.movies[this.props.match.params.idx].description}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5 style={{ textDecoration: 'underline' }}>Reviews</h5>
                        <div className='row'>
                            <div className='col s12'>
                                <h6 style={{ marginBottom: '20px' }}>Average Rating: {avgRating ? `${avgRating} Stars` : 'No Reviews Yet'}</h6>
                                <div className='reviewContainer valign-wrapper'>
                                    <p style={{ marginLeft: '10px' }}>{userReview.rating} Stars - {userReview.comment}</p>
                                    <button style={{ marginLeft: 'auto' }} className='btn-floating btn-small red' onClick={() => this.handleDeleteReview(userReviewIdx)}><i className="material-icons">delete</i></button>
                                </div>
                                {otherReviews}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetailPage