import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Main.css';
import Reviews from '../Reviews/Reviews'
import ReviewItemPage from '../Reviews/ReviewItemPage'
import Rating from '../Rating/Rating'
import Premieres from '../Premieres/Premieres'
import PremieresItemPage from '../Premieres/PremieresItemPage'
import Search from '../Search/Search'
import Admin from '../Admin/Admin'
import { initialPremieresItems, initialReviewItems } from '../../utils/utils';

function Main({ onAddPremieres, premieres }) {

  return (
    <div className="main">
      <Switch>
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
          <Rating />
        </Route>
        <Route exact path="/premieres">
          <Premieres
            data={initialPremieresItems}
            premieres={premieres}
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
      </Switch>
    </div>
  );
}

export default Main;
