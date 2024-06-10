# travel-log

Application for tracking your trips in one place, add trips, places, your favourtie places, track your budget for a given trip and your expenses, explore restaurants and attractions !

## Table of Contents

| Backend documentation             | Frontend documentation                     |
| :-------------------------------- | :----------------------------------------- |
| [About](#about)                   | [About](#about)                            |
| [Technologies](#technologies)     | [Technologies](#technologies)              |
| [Database](#database)             | [Run Locally](#run-locally)                |
| [Run Locally](#run-locally)       | [Challenges](#challenges)                  |
| [API routes](#api-routes)         | [Future app possibilities](#possibilities) |
| [What I learned](#what-i-learned) | [Screenshots](#screenshots)                |

## Frontend

## About
Frontend part was created using Vite and React. I used many packages that are listed below for better user experience.
<br/>
The application allows user to track their trips in one place. The can add places to it, budget, expenses and create their own itinerary. What is more, the website provides map for searching new places: hotels, restaurants and attractions for chosen location.

## Technologies

- React
- Vite
- CSS / Tailwind CSS / Material UI
- dayjs
- leaflet
- react-loader-spinner
- react-router-dom

`API used`:
1. Geoapify - autocomplete & map tiles
2. Travel Advisor - searching places based on categories.

## About

Backend was created using Express.js. I used jwt token for the user authentication and personal data security, bcrypt for hashing the user password.

## Technologies

- Node.js
- Express.js
- MongoDb
- mongoose
- validator
- jwt
- bcrypt

## Database

   <br>
      <img src="/backend/public/images/database.png" width="800" height="700">

## Run Locally

1. Clone the project `git clone https://link-to-project`
2. Go to the project directory `cd backend`
3. Install packages `npm install`
4. Create `.env` file and include your `ATLAS_URI`, optionally include `PORT`, `SALT_ROUNDS`, and `JWT_SECRET`.
5. Run with node.js `nodemon server`
   - or `node server`
6. In browser `http://localhost:8080/` or `http://localhost:3000/`

## API routes

- **GET** / -- Logging connection to API.

  - **GET** /api/users -- Get user with given id.
  - **PUT** /api/users/:id -- Update user with given id.
  - **DELETE** /api/users/:id -- Detele user with given id.

  - **POST** /api/trips -- Create a trip.
    - **GET** /api/trips/trip/:tripId -- Get single trip.
    - **GET** /api/trips/:userId -- Get all trips for specific user.
    - **PUT** /api/trips/:id -- Update the trip with given id.
    - **DELETE** /api/posts/:id -- Delete the trip with given id.
      - **GET** /api/trips/:id/expenses -- Get all expenses for given trip.
      - **GET** /api/trips/:id/places -- Get all places for given trip.
      - **GET** /api/trips/:id/places/:date -- Get all places for a given itinerary day.

  - **POST** /api/places -- Create a place.
    - **PUT** /api/places/:id -- Update the place.
    - **DELETE** /api/places/:id -- Delete the place.
      - **PUT** /api/places/:id/favorites -- Update the favorite property for the place.
      - **GET** /api/places/favorites/:userId -- Get favorites places for specific user.

  - **POST** /api/expenses -- Create expense.
    - **PUT** /api/expenses/:id -- Update expense.
    - **DELETE** /api/expenses/:id -- Delete expense.

  - **POST** /login -- Login an exisiting user.
  - **POST** /signup -- Create a new user.

## What I learned

1. How to use reference to other documents in mongoose Schema.
2. How to use JWT token:
Token contains three parts:
`Header` - which contains type of token and the siging version of algorithm used.
`Payload` - which is information about user(but not password!)
`Signature` - created using encoded header, encoded payload and secret
3. How to use bcrypt package to hash password using salt rounds.

