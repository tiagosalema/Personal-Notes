Outside Authorization is the "Login with Google" / Facebook / Github / etc. thing.

There are 2 types of implementing it: on the server or on the client side (i.e. using JS on the browser).

# Google OAuth

1. Create a new project in [console.developers.google.com](https://console.developers.google.com/apis/dashboard?project=twitchy-247214&angularJsUrl=)
2. `Credentials` > `OAuth consent screen` > Change `Application Name` > `Save`
3. Create credentials > OAuth Client ID
4. Copy `ClientID` and save it for later
5. Paste it in the `GoogleAuth` component. Details to how to set up the script can be found [here](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md) and [here](https://developers.google.com/identity/sign-in/web/reference#authentication)
6. 

