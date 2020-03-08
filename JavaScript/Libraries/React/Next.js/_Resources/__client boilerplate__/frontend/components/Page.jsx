import React, { Component } from "react";
import Meta from "./Meta";
import Header from "./Header.jsx";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

const theme = {
  // black: "#393939",
  // red: "#FF0000",
  // maxWidth: "1000px",
  // bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
  // These are the variables for the styled components
};

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
`;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black}; /* This is how we invoke a variable*/
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
