import { HouseType } from "../../../prisma-estate-agent/node_modules/.prisma/client";
import { prisma } from "../helper/utils";

const MAX_LIMIT = 100;

/**
 * @description Returns a list of houses
 * @returns 
 */
export const getAllHouses = async () => {
  const allHouses = await prisma.property.findMany({
    take: MAX_LIMIT
  });
  return allHouses;
};


/**
 * @description Returns a house via its id
 * @returns 
 */
export const getHouse = async (id: string) => {
  const allHouses: object | null = await prisma.property.findUnique({
    where: {
      id: id
    },
    include: {
      address: true,
      features: true
    }
  });
  return allHouses;
};

/**
 * @description Allows pagination of houses
 * @param page 
 * @param limit 
 * @returns 
 */
export const paginateHouses = async (page = 0, limit = 5) => {
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  const houses = await prisma.property.findMany({
    skip: Number(page),
    take: Number(limit),
    include: {
      contact: true,
      address: true
    }
  });
  return houses;
};

/**
 * @description Fetches houses based on its house type
 * @param houseType 
 * @returns 
 */
export const getHouseByType = async (houseType: HouseType) => {
  const allHousesByType: object | null = await prisma.property.findMany({
    take: MAX_LIMIT,
    where: {
      houseType: houseType
    },
    include: {
      address: true,
      features: true
    }
  });
  return allHousesByType;
};

/**
 * @description Fetches houses that have been flagged as newly listed
 * @returns 
 */
export const getNewListedHouses = async () => {
  const newlyListedHouses: object | null = await prisma.property.findMany({
    take: MAX_LIMIT,
    where: {
      isNewListing: true
    },
    include: {
      address: true,
      features: true
    }
  });
  return newlyListedHouses;
};

/**
 * @description Fetches houses that have been flagged as showcased
 * @returns 
 */
export const getShowcasedHouses = async () => {
  const showcasedHouses: object | null = await prisma.property.findMany({
    take: MAX_LIMIT,
    where: {
      isShowcase: true
    },
    include: {
      address: true,
      features: true
    }
  });
  return showcasedHouses;
};
