import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorid?: string;
}
export default async function getReservations(param: IParams) {
  try {
    const { listingId, userId, authorid } = param;
    const query: any = {};
    if (listingId) {
      query.listingId = listingId;
    } else if (userId) {
      query.userId = userId;
    } else if (authorid) {
      query.listing = { userId: authorid };
    }
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeReservations = reservations?.map((reservation) => ({
      ...reservation,
      createdAt: reservation?.createdAt?.toISOString(),
      startDate: reservation?.startDate?.toISOString(),
      endDate: reservation?.endDate?.toISOString(),
      listing: {
        ...reservation?.listing,
        createdAt: reservation?.listing?.createdAt?.toISOString(),
      },
    }));
    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
}
