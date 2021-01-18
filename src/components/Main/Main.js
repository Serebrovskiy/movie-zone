import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './Main.css';
import Reviews from '../Reviews/Reviews'
import ReviewItemPage from '../Reviews/ReviewItemPage'
import Rating from '../Rating/Rating'
import Premieres from '../Premieres/Premieres'
import PremieresItemPage from '../Premieres/PremieresItemPage'
import Search from '../Search/Search'
import Admin from '../Admin/Admin'
import { initialPremieresItems, initialReviewItems } from '../../utils/utils';

function Main({
  onAddPremieres,
  premieres,
  onRemovePremier,
  onOpenPopupRating,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard
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
        />
      </Route>
      <Route exact path="/premieres">
        <Premieres
          data={initialPremieresItems}
          premieres={premieres}
          onRemovePremier={onRemovePremier}
        />
      </Route>
      <Route path="/premieres/:id">
        <PremieresItemPage
          data={initialPremieresItems}
          premieres={premieres}
        />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/admin">
        <Admin onAddPremieres={onAddPremieres} />
      </Route>
    </div>
  );
}

export default Main;
