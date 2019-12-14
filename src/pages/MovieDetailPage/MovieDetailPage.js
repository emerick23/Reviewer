import React, { Component } from 'react'
import ReviewCreateForm from '../../components/ReviewCreateForm/ReviewCreateForm'
import reviewService from '../../utils/reviewService'

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
            <div key={idx}>
                <p>{review.rating}</p>
                <p>{review.comment}</p>
            </div>
        ))

        if (!this.props.userId) {
            return (
                <div>
                    {otherReviews}
                </div>
            )
        }

        if (!userReview) {
            return (
                <div>
                    <div>
                        {otherReviews}
                    </div>
                    <ReviewCreateForm
                        {...this.props}
                        movieId={this.props.movies[this.props.match.params.idx]._id}
                        handleAddReview={this.handleAddReview}
                    />
                </div>
            )
        }
        return (
            <div>
                <div>
                    <p>{userReview.rating}</p>
                    <p>{userReview.comment}</p>
                    <button onClick={() => this.handleDeleteReview(userReviewIdx)}>Delete Review</button>
                </div>
                {otherReviews}
            </div>
        )
    }
}

export default MovieDetailPage