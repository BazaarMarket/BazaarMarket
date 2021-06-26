import React, { useEffect } from 'react';
import { Switch, Route } from 'wouter';
import SplashPage from '../SplashPage';
import AboutPage from '../About';
import AccountPage from '../Account';
import CreateNonFungiblePage from '../CreateNonFungiblePage';
import CollectionsCatalog from '../Collections/Catalog';
import CollectionDisplay from '../Collections/Catalog/CollectionDisplay';
import CollectionsTokenDetail from '../Collections/TokenDetail';
import MarketplaceCatalog from '../Marketplace/Catalog';
import DropsPage from '../Drops';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Flex } from '@chakra-ui/react';
import Notifications from '../common/Notifications';
import { useSelector, useDispatch } from '../../reducer';
import { reconnectWallet } from '../../reducer/async/wallet';
import { getMarketplaceNftsQuery } from '../../reducer/async/queries';
import WertPage from '../Wert';
import UserPage from '../UserPage';

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector(s => s);

  let walletReconnectAttempted = state.system.walletReconnectAttempted;

// // This causes excessive resource consumption as *all* marketplace data
  // // loads when the app is mounted, even if the user has not landed or will
  // // not land on the `/marketplace` view
  //
  // useEffect(() => {
  //   dispatch(getMarketplaceNftsQuery(state.marketplace.marketplace.address));
  // }, [state.marketplace.marketplace.address, dispatch]);

  useEffect(() => {
    if (!walletReconnectAttempted) {
      dispatch(reconnectWallet());
    }
  }, [walletReconnectAttempted, dispatch]);

  return (
    <Flex pos="absolute" w="100%" h="100%">
      <Flex justifyContent="space-between" width="100%" flexDir="column">
        <Header />
        <Switch>
          <Route path="/">
            <SplashPage />
          </Route>
          <Route path="/create">
            <CreateNonFungiblePage />
          </Route>
          <Route path="/collections">
            <CollectionsCatalog />
          </Route>
          <Route path="/marketplace">
            <MarketplaceCatalog />
          </Route>
          <Route path="/drops">
            <DropsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
          <Route path="/wert">
            <WertPage />
          </Route>
          <Route path="/collection/:contractAddress">
            {({ contractAddress }) => (
              <CollectionDisplay address={contractAddress} ownedOnly={false} />
            )}
          </Route>
          <Route path="/u/:userAddress">
            {({ userAddress }) => (
              <UserPage address={userAddress} />
            )}
          </Route>
          <Route path="/collection/:contractAddress/token/:tokenId">
            {({ contractAddress, tokenId }) => (
              <CollectionsTokenDetail
                contractAddress={contractAddress}
                tokenId={parseInt(tokenId)}
              />
            )}
          </Route>
        </Switch>
        <Footer/>
        <Notifications />
      </Flex>
    </Flex>
  );
}
