import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Reviews from '../Reviews/Reviews'
import ReviewItemPage from '../Reviews/ReviewItemPage'
import Rating from '../Rating/Rating'
import Films from '../Films/Films'
import FilmsPage from '../Films/FilmsPage'
import Search from '../Search/Search'
import Admin from '../Admin/Admin'
import AdminFilms from '../Admin/AdminFilms'
import AdminUsers from '../Admin/AdminUsers'
import ViewedUser from '../ViewedUser/ViewedUser'
import Following from '../Following/Following'
import SettingProfile from '../SettingProfile/SettingProfile'
import RatingTop from '../RatingTop/RatingTop'
import { initialReviewItems } from '../../utils/utils';
import './Main.css';

function Main({
  films,
  users,
  onRemoveFilm,
  onOpenPopupAddCard,
  onOpenPopupUserInfo,
  ratingCards,
  onRemoveRatingCard,
  onUpRatingCard,
  onDownRatingCard,
  notCheckedFilms,
  handleGetFilms,
  pathname,
  loggedIn,
  isOpenLogin,
  onUserFollowings,
  followings,
  onUpdateAvatar,
  onUpdateSocialLinks,
  isUserAdmin,
  isLoading,
  onInfoTooltip
}) {

  return (
    <div className="main">
      <Switch>
        <ProtectedRoute
          exact path="/rating"
          component={Rating}
          loggedIn={loggedIn}
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
          pathname={pathname}
          isOpenLogin={isOpenLogin}
          users={users}
          followings={followings}
        />
        <ProtectedRoute
          exact path="/setting-profile"
          component={SettingProfile}
          loggedIn={loggedIn}
          onUpdateAvatar={onUpdateAvatar}
          onUpdateSocialLinks={onUpdateSocialLinks}
          onInfoTooltip={onInfoTooltip}
        />
        <ProtectedRoute
          path="/admin"
          component={Admin}
          loggedIn={loggedIn}
          notCheckedFilms={notCheckedFilms}
          users={users}
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
        <Route path="/films/:id">
          <FilmsPage
            films={films}
            users={users}
            handleGetFilms={handleGetFilms}
            pathname={pathname}
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
        <Route path="/admin-reviews">
        </Route>
        <Route path="/admin-films">
          <AdminFilms
            onOpenPopupAddCard={onOpenPopupAddCard}
            notCheckedFilms={notCheckedFilms}
          />
        </Route>
        <Route path="/admin-users">
          <AdminUsers
            users={users}
            onOpenPopupUserInfo={onOpenPopupUserInfo}
          />
        </Route>
        <Route path="/user/:_id">
          <ViewedUser
            users={users}
            ratingCards={ratingCards}
            onUserFollowings={onUserFollowings}
            followings={followings}
            loggedIn={loggedIn}
            isOpenLogin={isOpenLogin}
            pathname={pathname}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
