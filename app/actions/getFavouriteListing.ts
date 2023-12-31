import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
export default async function getFavouriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }
    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    const safeFavourites = favourites.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeFavourites;
  } catch (err: any) {
    throw new Error(err);
  }
}
