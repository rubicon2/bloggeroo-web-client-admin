# bloggeroo-web-client-admin

https://www.theodinproject.com/lessons/node-path-nodejs-blog-api

## Problems, wow so many problems

Well, I haven't used react for a long time, but I remembered a lot of stuff and am perplexed by a lot of stuff. The main point of frustration is coming from the JWT authentication method. Server-side sessions make sense to me. The JWTs are nothing but a pain. I feel like I must not be understanding how to use them properly.

In the JWT flow - as I currently understand it - the user has a refresh token and an access token. The refresh token is to be stored in some secure manner (I ended up using httpOnly, secure, sameSite strict cookies) and the access token is short lived and is stored in memory or in sessionStorage. When the client requests a protected resource, the server will check their credentials. If this fails, the server will return a 401 (unauthorised), which will prompt the client to do another fetch, this time to try and obtain a fresh access token. Once a new access token has been acquired, the original fetch request will run again and try to return the requested resource to the user.

At first, I tried storing the access token in sessionStorage as suggested, but this didn't work properly. When the user logged in, not all components using the item from sessionStorage got re-rendered with the new values. I guess this was because every time a component used the useSessionStorage hook, it had a separate set function, so only triggered the re-render of the function which used the set function, not any others. So the access token should be stored in react state, so all components using that value can update when it has been updated.

So then I moved over to a context and reducer setup, so the state and dispatch from useReducer are instantiated at the root of the app, and passed to some contexts, and any component no matter how deep can use the state or dispatch, and will be re-rendered when the state or dispatch is updated. Sounds great!

Although now I am reading this over, we don't actually want anything to re-render if the access token is updated. We just want the access token to be the same value everywhere in the application, so that when a component sends a fetch request, it has the latest access token that may have been the result of a fetch request from anywhere else within the app.

Now, the whole process of failing a fetch with a certain code, checking it, fetching an access token, then doing the original fetch again, is begging to be automated. How boring it would be to write this code out over and over again. So I initially wrote a react hook to do this. It worked well, grabbing the user state and dispatch, and automatically updating the access token for the whole app if a fetch failed. However, writing it as a hook turned out to be a bad idea. It worked fine for get requests, but when it comes to put, post, or delete? We don't want to trigger those operations multiple times by accident, if a component keeps getting re-rendered, etc. they should happen after a user interaction only once. Besides, hooks can't be called from event handlers. So this approach was dead in the water.

So, I wrote what I called an external function (because it exists entirely outside of react) which was kind of the same as the hook I wrote - except since the state and dispatch exist inside of react, so those cannot be updated as part of the function. Instead, the access token has to be provided as a parameter, and if the token is out of date and replaced with a new one, that will be returned along with the http response and any fetch errors. So this function can be called from event handlers, like onClick or onSubmit or whatever.

However, the code for these is all very verbose now. A component that wants to use it has to use UserStateContext, UserDispatchContext in order to provide the access token and then manually update the access token if one is returned by the external function, as well as setting any returned errors in state. Every single time it is used in a component. It is basically horrible to use as a result.

That's without talking about how every server response, I have to check whether the json status is 'success', 'fail' or 'error', every single time. It is incredibly tiresome to use. I keep trying to think of ways to simplify it and stop all this duplication, but I can't find it. I must be approaching react in the wrong way. There's no way people are putting up with this in production applications.

So anyway, using fetch in react seems to be crap, basically. It would be less crap if not for the JWT stuff, and it would be less crap without the fetch resource fail > fetch access token > fetch resource success flow to worry about.

Once this is over I am going to look deeply into how to fetch with react, because this just seems too clunky and verbose to be the correct way to do it, but I haven't found any examples online about how to automate the JWT flow as I have described. The hook worked well and was easy to use, but unfortunately couldn't be used for anything other than get requests. It would be really nice to stop having to get the access tokens and set them in every component that uses fetch, but I can't see any way around it.

I am equating the prescence of an access token with being logged in. As a result, I need components to update when the access token is updated, e.g. so the navbar button changes from 'log in' to 'log out'. Maybe this was a mistake. After all, we don't actually want anything to re-render if the access code changes. We just want a new code in order to fetch stuff from the backend.

How else are we supposed to store the log-in state on the client? Just have a bool called loggedIn that is set when the client logs in or logs out? It sounds stupid, but that way we could update components like the navBar when the user logs in or out, and avoid re-rendering anything when the access code is updated, but still have it accessible throughout the application.
