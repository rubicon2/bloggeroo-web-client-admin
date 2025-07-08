# bloggeroo-web-client-admin

https://www.theodinproject.com/lessons/node-path-nodejs-blog-api

## Problems (or: how not to use react)

### Fetching and storing new access tokens

Well, I hadn't used react for a long time, but I remembered a lot of stuff and was perplexed by a lot of stuff. The main point of frustration is coming from the JWT authentication method. Server-side sessions make sense to me. The JWTs are nothing but a pain. I feel like I must not be understanding how to use them properly.

In the JWT flow - as I currently understand it - the user has a refresh token and an access token. The refresh token is to be stored in some secure manner (I ended up using httpOnly, secure, sameSite strict cookies) and the access token is short lived and is stored in memory or in sessionStorage. I ended up storing the access token in a react ref. When the client requests a protected resource, the server will check their credentials. If this fails, the server will return a 401 (unauthorised), which will prompt the client to do another fetch, this time to try and obtain a fresh access token. Once a new access token has been acquired, the original fetch request will run again and try to return the requested resource to the user.

#### Session Storage (collosal failure)

At first, I tried storing the access token in sessionStorage as suggested (with the useSessionStorage hook), but this didn't work properly. When the user logged in, not all components using the item from sessionStorage got re-rendered with the new values. I guess this was because every time a component used the useSessionStorage hook, it received a unique set function, so only triggered the re-render of the function which used that unique set function, not any other components that used the hook and received their own unique set functions. So I decided that the access token should be stored in react state, so all components using that value can update when it has been updated.

#### Context and Reducer (nope, still bad)

I moved over to a context and reducer setup, so the state and dispatch from useReducer are instantiated at the root of the app, and passed to some contexts, and any component no matter how deep can use the state or dispatch, and will be re-rendered when the state or dispatch is updated. Sounds great!

Although now I am reading this over, it is obvious we don't actually want anything to re-render if the access token is updated. We just want the access token to be the same value everywhere in the application, so that when a component sends a fetch request, it has the latest access token - which may have been the result of a fetch request from anywhere else within the app.

#### Automating the authentication process with a react hook (lesson: don't make everything a hook for no reason)

Now, the whole process of failing a fetch with a certain code, checking it, fetching an access token, then doing the original fetch again, is begging to be automated. How boring it would be to write this code out over and over again. So I initially wrote a react hook to do this. It worked well, grabbing the user state and dispatch, and automatically updating the access token for the whole app if a fetch failed. However, writing it as a hook turned out to be a bad idea. It worked fine for get requests, but when it comes to put, post, or delete? We don't want to trigger those operations multiple times by accident, if a component keeps getting re-rendered, etc. they should happen after a user interaction only once. Besides, hooks can't be called from event handlers. So this approach was dead in the water.

#### Replacing the hook with an "external" function (nearly there)

So, I wrote what I called an external function (because it exists entirely outside of react) which was kind of the same as the hook I wrote - except since the state and dispatch exist inside of react, those cannot be updated as part of the function. Instead, the access token has to be provided as a parameter, and if the token is out of date and replaced with a new one, that will be returned along with the http response and any fetch errors. So this function can be called from event handlers, like onClick or onSubmit or whatever.

However, the code for these got very verbose. A component that wants to use it has to use UserStateContext, UserDispatchContext in order to provide the access token and then manually update the access token if one is returned by the external function, as well as setting any returned errors in state. Every single time it is used in a component. It was basically horrible to use as a result.

#### Refs (took you long enough...)

Anyway, then I realised that situations like this are exactly what react refs are for. The end.

In the final client, the access tokens are stored as refs and do not trigger a re-render of anything. The refresh token is stored externally from react as an httpOnly secure cookie and js does not have access to it. However there are times when we might want to use the login status to conditionally render something, but js has no way of knowing with the refresh cookie alone, as it cannot be accessed or even checked if it exists. In the end I modified the back end to set an additional cookie upon login, which reflects the user's login state, which expires at the same time as the refresh token and is cleared if the user logs out. Unlike the refresh token, this is not sensitive information and doesn't need to be httpOnly - so js can access this cookie to check the login state, and it persists across sessions.

## Using styled-components properly

As a rule of thumb to increase code reusability: if a component performs a purely stylistic function, create a styled-component and export that, instead of incorporating the style into a standard react component! That way it can be extended with ```styled(myStyledComponent)`my extended styles...```.

## Media queries and styled-components

As styled-components define their styles with template literals/template strings, you can easily include some text that has been imported from another file. Therefore, the device breakpoints (and any other media queries) are in a js file and exported as an object. It has been easy to ensure there is a single source of truth for the breakpoints. I decided that the responsiveness of the components was to be entirely contained within the styled components and not in pure css. In fact, I think it is generally a good idea to reduce the use of css in an app that uses styled-components as much as possible. Perhaps use css for a reset, or for essential styling of basic elements, but that's it.

I also created some styled-components whose sole purpose is to set ```display: none``` depending on a particular media query. This has been very nice and readable within the react components. Certainly it is a lot nicer than previous react projects I worked on with responsive styling, where I was still thinking too much in terms of standard css and ended up with a hodge podge of media queries in css files and styled-components.

```js
// src/mediaQueries.js
// Put in a separate file in case other components need to use them.
const devices = {
  phone: '(min-width: 375px)',
  tablet: '(min-width: 768px)',
  laptop: '(min-width: 1024px)',
  desktop: '(min-width: 2560px)',
};

// src/components/styles/mediaQueries.js
const MediaMobileOnly = styled.div`
  @media ${devices.tablet} {
    display: none;
  }
`;

// src/components/navBar.jsx
export default function NavBar() {
  return (
    <Nav>
      <ContainerNoPadding>
        <MediaMobileOnly>
          <PrimaryNavListMobile />
        </MediaMobileOnly>
        <MediaTabletAndLarger>
          <PrimaryNavListDesktop />
        </MediaTabletAndLarger>
      </ContainerNoPadding>
    </Nav>
  );
}
```

Using this method, it is easy to understand what will be displayed in each different situation without even looking at the styles or css.
