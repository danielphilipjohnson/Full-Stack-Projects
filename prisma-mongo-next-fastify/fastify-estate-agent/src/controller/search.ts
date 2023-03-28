import { prisma } from "../helper/utils";
import { HouseType, SearchHousePrismaQuery, SearchQuery, HouseStatus } from "../../types";


export const searchHouses = async (searchTerms: SearchQuery) => {
  const houseStatus: HouseStatus = validateHouseStatus(searchTerms.status)
    ? (searchTerms.status.toUpperCase() as HouseStatus)
    : "SALE";

  const searchQuery: SearchHousePrismaQuery = {
    price: {
      lt: searchTerms.maxprice,
      gt: searchTerms.minprice
    },
    beds: {
      gte: searchTerms.bedrooms
    },
    baths: {
      gte: searchTerms.bathrooms
    },
    status: {
      equals: houseStatus
    }
  };

  /**
   * @description Only add a location if one has been provided
   */
  if (searchTerms.location) {
    searchQuery.address = {
      city: {
        equals: searchTerms.location
      }
    };
  }

  /**
   * @description Only add a house type if one has been provided and is valid
   */
  if (validateHouseType(searchTerms.housetype.toUpperCase())) {
    searchQuery.houseType = {
      equals: searchTerms.housetype.toUpperCase() as HouseType
    };
  }

  const houses = await prisma.property.findMany({
    where: searchQuery,

    skip: Number(0),
    take: Number(20),
    orderBy: {
      listDate: "desc"
    },
    include: {
      address: true
    } 
  });

  return houses;
};

const validateHouseType = (status: HouseType | string) => {
  if (
    status.toUpperCase() === "COTTAGE" ||
    status.toUpperCase() === "RANCH" ||
    status.toUpperCase() === "VILLA" ||
    status.toUpperCase() === "CARAVAN" ||
    status.toUpperCase() === "SEAHOUSE" ||
    status.toUpperCase() === "BUNGALOW" ||
    status.toUpperCase() === "FLAT" ||
    status.toUpperCase() === "APARTMENT" ||
    status.toUpperCase() === "HOUSE" ||
    status.toUpperCase() === "MEWS" ||
    status.toUpperCase() === "PENTHOUSE" ||
    status.toUpperCase() === "STUDIO"
  ) {
    return true;
  }
  return false;
};

const validateHouseStatus = (status: HouseStatus | string) => {
  if (status.toUpperCase() === "SALE" || status.toUpperCase() === "RENT")
    return true;
  return false;
};
