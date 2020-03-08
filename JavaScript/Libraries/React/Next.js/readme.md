<h1 style="position: absolute; right:0px">Next.js</h1>

Next.js is a framework for React that brings some advantages, among which:

+ render on the server

#  Start a Next.js project

1. In the frontend folder of the project:

```sh
npm init -y
npm i react react-dom next
mkdir pages
```

2. Add the following scripts to `package.json:`

```json
    "dev": "next",
    "build": "next build",
    "start": "next start"
```

3. Run `npm run dev` to start the dev server. The project will open in `http://localhost:3000/`. An error page will open because none is created yet.
4. In the `pages` folder, create a component (stateless functional or not) as index.js(x) and this will be the one rendered now!

# Create a component that is equal for all pages

Create the following file under the `pages` folder named `_app.js:`

```jsx
import App, { Container } from 'next/app';

class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <p>Hey I'm in all pages!</p>
        <Component />
      </Container>
    );
  }
}

export default MyApp;
```

This component will always be rendered (including, naturally, the ones it comprises). The component `Component` is what would otherwise be rendered if there was no `_app.`

For the sake of organization, let's create the component `Page` that will basically be the common content of the website and render `<Component />` as its child:

```jsx
import Page from '../components/Page';

return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    )
```

Now we can render the `Page` component how we want and, in it, invoke `{this.props.children}` to render `index.js` wherever we want.

# Styled components

It is in the `Page` component that is convenient to define all the CSS variables that will be used in other components, since these components are embedded in it. For so:

```jsx
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
    red: "#F00",	// with quotes!
    var2: "val2" 
}

return (
    <ThemeProvider theme={theme}>
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    </ThemeProvider>
    )
```

The values within `theme` are accessible by doing `${props => props.theme.var}`.

```jsx
const StyledPage = styled.div`
	color: ${props => props.theme.red};
`;
```



The css features of the styles components are rendered on the client side, whereas the components themselves are rendered on the server side (which, remember, is one of the advantages of Next.js for search optimization, among others). This has the inconvenience of showing a not styled page for a split second, once it is refreshed. To overcome this, one must include the `_document.js` file (available [here](https://github.com/zeit/next.js#custom-document) - if it stops working, use [this one](https://github.com/wesbos/Advanced-React/blob/master/finished-application/frontend/pages/_document.js) instead) in the `pages` folder (don't forget to restart the server to see it working if the styled components were already applied).

# Progress bar

Save the `NProgress` [css file](https://github.com/rstacruz/nprogress/blob/master/nprogress.css) to a folder in the project (usually `src/static`) and reference it in the meta files (the ones in the beginning of the html file). I guess that's enough. If it is not, do also `npm i nprogress`.

```jsx
import Router from 'next/router'
import NProgress from 'nprogress'
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
```

# Connection to Apollo



