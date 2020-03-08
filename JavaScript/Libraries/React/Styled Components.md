With styled components it is possible to assign a style to a specific component by doing:

```jsx
import styled from 'styled-components';

const MyStyledComponent = styled.div`
	* CSS goes here *
`;

<MyStyledComonent> This is a styled div. </MyStyledComonent>
```

```jsx
const x = styled.div{
    p {
        This style will only apply to the <p>s contained inside x
    }
}
```

# Assign global CSS

```jsx
import styled, { injectGlobal } from 'styled-components';

const theme = {...};

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
```

