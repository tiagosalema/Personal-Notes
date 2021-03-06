import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user i.e. all the queries in the url of any page is accessible via props
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    // props available by means of withData()
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        {/* <ApolloProvider> injects the apollo client, containing the backend queries */}
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
