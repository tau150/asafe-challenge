# Live Demo

https://asafe-challenge.vercel.app/

<br>


## Approach

The idea was to keep the structure as simple as possible while considering potential future growth. That’s why I divided the project into more reusable UI components and more specific components for immediate needs.
I also defined a domain and services folder to keep things organized. For this project, that was enough since the functionality wasn’t too extensive. However, for a larger project, it would be better to organize everything by modules and keep these folders scoped to their respective modules to make the overall structure more understandable.


<br>


## Data fetching and database

As an example database, I used Supabase. The main idea was to call our API routes from the services layer (you’ll find a comment there) to avoid tight coupling and to add a middle layer for managing data and errors. However, I ran into an issue: I couldn’t retrieve the session on the server side in the API routes, for reasons I couldn’t figure out.
I’m using the latest version of Next Auth, and I suspect there might be some incompatibility. Because of this, you’ll notice that the services interact directly with Supabase.

I tried to keep most components server-side and utilized data streaming to make the application as user-friendly as possible.


<br>

## Auth

The plan was to implement OAuth login with GitHub, as well as user registration and login with email and password. You’ll see that the forms for these features are already created in the components. However, I ran into several issues here: while I was able to create users, I couldn’t generate a session to keep them authenticated.
I might have made a mistake since I’m new to these libraries, or it could be an issue with the libraries themselves. The latest version of Next Auth is in beta, and the Supabase adapter isn’t official.


<br>

## Styles

I used Tailwind CSS, as required, and implemented two themes that users can toggle between at any time. This is a basic implementation – for a production-ready product, the themes would need to be more defined and comprehensive.

<br>


## Testing

Due to time constraints, I only added unit tests for the Button component as an example. I used Vitest and React Testing Library. In my daily work, I typically use Jest along with React Testing Library.

Regarding end-to-end (e2e) testing, I didn’t have time to include it, and it’s not something I work with regularly. However, I have done e2e testing in my personal projects using Cypress and Playwright. You can check out some examples here:

https://github.com/tau150/taxes_challenge
https://github.com/tau150/iot-dashboard
https://github.com/tau150/crypto_payment


<br>


## Some considerations

Although I’ve done some testing with Next.js in the past, this was my first time using version 15. It was also my first time working with Next Auth and Supabase, so I had to do a fair amount of research, and there are likely areas for improvement.

