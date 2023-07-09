import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });
  if (!currentUser)
    return <EmptyState title="Unauthorised" subtitle="Please login" />;
  if (reservations?.length === 0) {
    return (
      <EmptyState
        title="No Trips Found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
