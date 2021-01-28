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
import AdminFilms from '../Admin/AdminFilms'
import { initialReviewItems } from '../../utils/utils';

function Main({
  onAddFilm,
  films,
  onRemoveFilm,
  onOpenPopupAddCard,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard,
  notCheckedFilms,
}) {
  // console.log(films)

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
          onOpenPopupAddCard={onOpenPopupAddCard}
          ratingCards={ratingCards}
          onRemoveRatingCard={onRemoveRatingCard}
          onUpRatingCard={onUpRatingCard}
          onDownRatingCard={onDownRatingCard}
        />
      </Route>
      <Route exact path="/films">
        <Films
          films={films}
          onRemoveFilm={onRemoveFilm}
        />
      </Route>
      {/* тут похоже проблемка */}
      <Route path="/films/:id">
        <FilmsPage
          films={films}
        />
      </Route>
      <Route path="/search">
        <Search films={films} />
      </Route>
      <Route path="/admin">
        <Admin
          notCheckedFilms={notCheckedFilms}
        />
      </Route>
      <Route path="/admin-reviews">

      </Route>
      <Route path="/admin-films">
        <AdminFilms
          onOpenPopupAddCard={onOpenPopupAddCard}
          notCheckedFilms={notCheckedFilms}
        />
      </Route>
    </div>
  );
}

export default Main;
