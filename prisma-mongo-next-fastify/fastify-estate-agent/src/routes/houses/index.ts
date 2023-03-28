import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { HouseType } from "../../../../prisma-estate-agent/node_modules/.prisma/client";
import { houseParamJsonSchema, HouseQueryPagination, housesByTypeParamJsonSchema } from "../../../types";

import {
  getHouse,
  getHouseByType,
  getNewListedHouses,
  getShowcasedHouses,
  paginateHouses
} from "../../controller/houses";

const HOUSE_LIMIT = 20;
const MAX_LIMIT = 100;

const SearchRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
  // houses?limit=10&page=0
  server.get<{ Querystring: HouseQueryPagination }>(
    "/houses",
    async (request, _) => {
      try {
        
        const limit = request.query.limit
          ? Number(request.query.limit) > MAX_LIMIT
            ? MAX_LIMIT
            : Number(request.query.limit)
          : HOUSE_LIMIT;
        const page = request.query.page ? Number(request.query.page) : 1;
        const houses = await paginateHouses(page, limit);

        return {
          status: 200,
          data: houses
        };
      } catch (error) {
        return {
          status: 500,
          data: error
        };
      }
    }
  );

  server.get<{ Params: { id: string } }>(
    "/houses/:id",
    houseParamJsonSchema,
    async (request, _) => {
      const id = request.params.id;
      try {
        const houses = await getHouse(id);
        return {
          status: 200,
          data: houses
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          data: error
        };
      }
    }
  );

  server.get<{
    Params: {
      houseType: HouseType;
    };
  }>(
    "/houses/type/:houseType",
    housesByTypeParamJsonSchema,
    async (request, _) => {
      const houseType = request.params.houseType;
      try {
        const houses = await getHouseByType(houseType);
        return {
          status: 200,
          data: houses
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          data: error
        };
      }
    }
  );

  server.get<{ Querystring: HouseQueryPagination }>(
    "/houses/showcase",
    async (request, _) => {
      try {
        const houses = await getShowcasedHouses();
        return {
          status: 200,
          data: houses
        };
      } catch (error) {
        return {
          status: 500,
          data: error
        };
      }
    }
  );
  server.get<{ Querystring: HouseQueryPagination }>(
    "/houses/new-listings",
    async (__, _) => {
      try {
        const houses = await getNewListedHouses();
        return {
          status: 200,
          data: houses
        };
      } catch (error) {
        return {
          status: 500,
          data: error
        };
      }
    }
  );
};
export default fp(SearchRoute);
