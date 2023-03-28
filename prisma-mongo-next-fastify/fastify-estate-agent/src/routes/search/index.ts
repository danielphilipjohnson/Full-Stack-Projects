import { FastifyInstance, FastifyPluginAsync } from "fastify";
import * as fastify from "fastify";
import fp from "fastify-plugin";
import { searchHouses } from "../../controller/search";
import { SearchQuery } from "../../../types";


const querySearchJsonSchema: fastify.RouteShorthandOptions = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        minprice: { type: "integer", default: 0 },
        maxprice: { type: "integer", default: 100000000 },
        bedrooms: { type: "integer", default: 0 },
        bathrooms: { type: "integer", default: 0 },
        status: { type: "string", default: "SALE" },
        housetype: { type: "string", default: "ALL" }
      }
    }
  }
};

const SearchRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
  // http://127.0.0.1:8080/search?housetype=flat&status=rent&maxprice=1000&bedrooms=4&bathrooms=4&location=new york
  server.get<{ Querystring: SearchQuery }>(
    "/search",
    querySearchJsonSchema,
    async (request, _) => {
      try {
        const houses = await searchHouses(request.query);
        return {
          response: 200,
          data: houses
        };
      } catch (error) {
        return {
          response: 500,
          data: error
        };
      }
    }
  );
};
export default fp(SearchRoute);
