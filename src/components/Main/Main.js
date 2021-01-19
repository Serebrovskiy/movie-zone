import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './Main.css';
import Reviews from '../Reviews/Reviews'
import ReviewItemPage from '../Reviews/ReviewItemPage'
import Rating from '../Rating/Rating'
import Films from '../Films/Films'
import FilmsPage from '../Films/FilmsPage'
import Search from '../Search/Search'
import Admin from '../Admin/Admin'
import { initialReviewItems } from '../../utils/utils';

function Main({
  onAddFilm,
  films,
  onRemovePremier,
  onOpenPopupRating,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard
}) {

  return (
    <div className="main">
      <Route exact path="/">
        <Redirect from="/" to="/reviews" />
      </Route>
      <Route exact path="/reviews">
        <Reviews
          data={initialReviewItems}
        />
      </Route>

      <Route path="/reviews/:id">
        <ReviewItemPage
          data={initialReviewItems}
        />
      </Route>
      <Route path="/rating">
        <Rating
          onOpenPopupRating={onOpenPopupRating}
          ratingCards={ratingCards}
          onRemoveRatingCard={onRemoveRatingCard}
          onUpRatingCard={onUpRatingCard}
          onDownRatingCard={onDownRatingCard}
        />
      </Route>
      <Route exact path="/films">
        <Films
          films={films}
          onRemovePremier={onRemovePremier}
        />
      </Route>
      <Route path="/films/:id">
        <FilmsPage
          films={films}
        />
      </Route>
      <Route path="/search">
        <Search films={films} />
      </Route>
      <Route path="/admin">
        <Admin onAddFilm={onAddFilm} />
      </Route>
    </div>
  );
}

export default Main;
