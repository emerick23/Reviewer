import React, { Component } from 'react'
import ReviewCreateForm from '../../components/ReviewCreateForm/ReviewCreateForm'

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

    render() {
        let reviews = this.state.reviews.map((review, idx) => (
            <div>
                <p>{review.rating}</p>
                <p>{review.comment}</p>
            </div>
        ))
        let userReview = this.state.reviews.find(review => review.userId === this.props.userId)

        if (!userReview) {
            return (
                <div>
                    <div>
                        {reviews}
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
                {reviews}
            </div>
        )
    }
}

export default MovieDetailPage