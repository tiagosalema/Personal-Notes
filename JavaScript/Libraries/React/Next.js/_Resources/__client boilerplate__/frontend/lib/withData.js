import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";

const productionEndpoint = "";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : productionEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleNavbar(_, variables, { cache }) {
            const { navbarOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            const data = {
              data: { navbarOpen: !navbarOpen }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        navbarOpen: false
      }
    }
  });
}

export default withApollo(createClient);
