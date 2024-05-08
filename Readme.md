### PLEASE KEEP THIS FILE UP TO DATE WITH YOUR PROGRESS AND UPDATES ON CODE FUNCTIONALITY.

NOTE: REMEMBER TO KEEP ALL 'CODE IN BRANCHES' AND 'NOT' TO APPROVE YOUR OWN MERGE REQUESTS...

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

## Frontend Progress Check:

1. Created the basic pages for login and register. Not yet setup yet with backend

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

## Backend Progress Check:

1. Created auth routes for login and register now frontend can query the backend for routes

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

## Notes for Frontend progress

1. Please store the auth token in the cookies and not the local storage for safety reasons. Because cookies can't be accessed by js injection and are destroyed if the page is refreshed or browser is closed.
2. Special string have been created for your ease which state if there is an issue with the auth request, please use the Alert custom react hook to display these errors. USABILITY of this hook has been defined in the file itself in components
3. Use Zustand or Redux for state management, I would recommend Zustand because it is new and easier and will be upcoming one in the industry (Atlassian moving to Zustand as well)
4. IMP: For frontend we need user info like images and prompts and name etc so please get all this info and then only request post register request to the backend, also please convert all the images to base64

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

## Notes for Backend progress

1. Auth token will be returned

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
