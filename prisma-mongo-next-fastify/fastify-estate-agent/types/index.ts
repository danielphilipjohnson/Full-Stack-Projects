import * as fastify from "fastify";

import { HouseType, HouseStatus } from "../../prisma-estate-agent/node_modules/.prisma/client";

export * from "../../prisma-estate-agent/node_modules/.prisma/client";
export interface SearchHousePrismaQuery {
  price: {
    lt: number;
    gt: number;
  };
  beds: {
    gte: number;
  };
  baths: {
    gte: number;
  };
  status: {
    equals: HouseStatus;
  };
  address?: {
    city: {
      equals: string;
    };
  };
  houseType?: {
    equals: HouseType;
  };
}
export interface SearchQueryString {
  housetype: HouseType;
  status: HouseStatus | "";
  minprice: number;
  maxprice: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
}

export interface HouseQueryPagination {
  page: number;
  limit: number;
}


export const houseParamJsonSchema: fastify.RouteShorthandOptions = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" }
      }
    }
  }
};

export const housesByTypeParamJsonSchema: fastify.RouteShorthandOptions = {
  schema: {
    params: {
      type: "object",
      properties: {
        houseType: { type: "string" }
      }
    }
  }
};