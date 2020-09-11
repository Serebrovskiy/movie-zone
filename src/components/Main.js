import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Main.css';
import NavBar from './NavBar';
import InfoBlock from './InfoBlock'
import Reviews from './Reviews/Reviews'
import ReviewItemPage from './Reviews/ReviewItemPage'
import Rating from './Rating'
import Premieres from './Premieres/Premieres'
import PremieresItemPage from './Premieres/PremieresItemPage'
import Search from './Search'
import { initialPremieresItems, initialReviewItems } from '../utils/utils';

function Main() {
  return (
    <div className="main">
      <NavBar />
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
          />
        </Route>
        <Route path="/premieres/:id">
          <PremieresItemPage
            data={initialPremieresItems}
          />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
      <InfoBlock />
    </div>
  );
}

export default Main;