import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListing from "../actions/getFavouriteListing";
import FavouritesClient from "./FavouritesClient";
import ListingCard from "../components/listings/ListingCard";
const FavouritesPage = async () => {
  const listings = await getFavouriteListing();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <div>
        <EmptyState
          title="No favourites found"
          subtitle="looks like you have no favourite listing"
        />
      </div>
    );
  }
  return <FavouritesClient listings={listings} currentUser={currentUser} />;
};

export default FavouritesPage;
