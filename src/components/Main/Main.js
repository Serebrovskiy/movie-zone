import React from 'react'; //, { useEffect }
import { Route, Redirect, Switch } from 'react-router-dom';
import './Main.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Reviews from '../Reviews/Reviews'
import ReviewItemPage from '../Reviews/ReviewItemPage'
import Rating from '../Rating/Rating'
import Films from '../Films/Films'
import FilmsPage from '../Films/FilmsPage'
import Search from '../Search/Search'
import Admin from '../Admin/Admin'
import AdminFilms from '../Admin/AdminFilms'
import ViewedUser from '../ViewedUser/ViewedUser'
import Following from '../Following/Following'
import SettingProfile from '../SettingProfile/SettingProfile'
import RatingTop from '../RatingTop/RatingTop'

import { initialReviewItems } from '../../utils/utils';

function Main({
  onAddFilm,
  films,
  users,
  onRemoveFilm,
  onEditFilm,
  onOpenPopupAddCard,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard,
  notCheckedFilms,
  handleGetFilms,
  pathname,
  currentUser,
  loggedIn,
  isOpenLogin,
  onUserFollowings,
  followings,
  onUpdateAvatar,
  isUserAdmin,
  isLoading
}) {

  // useEffect(() => {
  //   console.log('useEffect')
  //   handleGetFilms();
  // }, [])

  // console.log(loggedIn)

  return (
    <div className="main">
      <Switch>
        <ProtectedRoute
          exact path="/rating"
          component={Rating}
          loggedIn={loggedIn}
          currentUser={currentUser}
          pathname={pathname}
          isOpenLogin={isOpenLogin}
          onOpenPopupAddCard={onOpenPopupAddCard}
          ratingCards={ratingCards}
          onRemoveRatingCard={onRemoveRatingCard}
          onUpRatingCard={onUpRatingCard}
          onDownRatingCard={onDownRatingCard}
        />
        <ProtectedRoute
          exact path="/following"
          component={Following}
          loggedIn={loggedIn}
          currentUser={currentUser}
          pathname={pathname}
          isOpenLogin={isOpenLogin}
          users={users}
          followings={followings}
        />
        <ProtectedRoute
          exact path="/setting-profile"
          component={SettingProfile}
          loggedIn={loggedIn}
          currentUser={currentUser}
          onUpdateAvatar={onUpdateAvatar}

        />
        <ProtectedRoute
          path="/admin"
          component={Admin}
          loggedIn={loggedIn}
          notCheckedFilms={notCheckedFilms}
        />

        <Route exact path="/">
          <Redirect from="/" to="/films" />
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
        <Route exact path="/films">
          <Films
            films={films}
            onRemoveFilm={onRemoveFilm}
            onOpenPopupAddCard={onOpenPopupAddCard}
            isUserAdmin={isUserAdmin}
            isLoading={isLoading}
          />
        </Route>
        {/* тут похоже проблемка */}
        <Route path="/films/:id">
          <FilmsPage
            films={films}
            users={users}
            handleGetFilms={handleGetFilms}
            currentUser={currentUser}
          />
        </Route>

        <Route path="/rating-top">
          <RatingTop
            films={films}
            pathname={pathname}
          />
        </Route>
        <Route path="/search">
          <Search films={films} />
        </Route>
        {/* <Route path="/admin">
          <Admin
            notCheckedFilms={notCheckedFilms}
          />
        </Route> */}
        <Route path="/admin-reviews">
        </Route>
        <Route path="/admin-films">
          <AdminFilms
            onOpenPopupAddCard={onOpenPopupAddCard}
            notCheckedFilms={notCheckedFilms}
          />
        </Route>
        {/* <Route path="/user">
        <Redirect from="/user" to="/user/:_id" />
      </Route> */}
        <Route path="/user/:_id">
          <ViewedUser
            users={users}
            ratingCards={ratingCards}
            onUserFollowings={onUserFollowings}
            followings={followings}
            loggedIn={loggedIn}
            isOpenLogin={isOpenLogin}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
