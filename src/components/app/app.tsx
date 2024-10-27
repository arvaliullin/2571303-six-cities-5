import {Route, Routes, BrowserRouter} from 'react-router-dom';

import MainPage from '../../pages/main/main-page';
import {AppRoute} from '../../consts.ts';
import {Place} from '../../types/place.ts';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login-page';
import FavoritesPage from '../../pages/favorites/favorites-page';
import OfferPage from '../../pages/offer/offer-page';
import {offersData} from '../../store/place-data/place-data';

type AppProps = {
  places : Place[];
}

function App({places}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage places={places}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage/>}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage places={offersData}/>}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
