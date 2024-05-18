# travel-log

Application for tracking your trips in one place, add trips, places, your favourtie places, track your budget for a given trip and your expenses, explore restaurants and attractions !

## Table of Contents

- Backend documentation (#backend-documentation) 
- [About](#about) 
- [Technologies](#technologies) 
- [Database](#database) 
- [Run Locally](#run-locally) 
- [API routes](#API-routes) 
- [Challanges/What I learned](#challenges/what-I-learner)

- Frontend documentation (#frontend-documentation) 
- [About](#about) 
- [Technologies](#technologies) 
- [Database](#database) 
- [Run Locally](#run-locally) 
- [API routes](#API-routes) 
- [API examples](#API-examples) 
- [Template views](#template-views) 
- [Screenshots](#screenshots)

## About

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
      <img src="/public/images/database.png" width="700" height="500">

## Run Locally

1. Clone the project `git clone https://link-to-project`
2. Go to the project directory `cd backend`
3. Install packages `npm install`
4. Create `.env` file and include your `ATLAS_URI`, optionally incluce `PORT`, `SALT_ROUNDS`, and `JWT_SECRET`.
5. Run with node.js `nodemon server`
   - or `npm run dev`
6. In browser `http://localhost:3000/`

## API routes

- **GET** / -- Logging connection to API.
  - **GET** /api/users -- Get all users.
    - **GET** /api/users/:id -- Get user with given id.
    - **PUT** /api/users/:id -- Update user with given id.
    - **DELETE** /api/users/:id -- Detele user with given id.
  - **GET** /api/trips/:userId -- Get all trips for specific. user.
    - **POST** /api/trips -- Create a trip.
    - **PUT** /api/tirps/:id -- Update the trip with given id.
    - **DELETE** /api/posts/:id -- Delete the trip with given id.
      - **GET** /api/trips/:id/expenses -- Get all expenses for given trip.
      - **GET** /api/trips/:id/places -- Get all places for given trip.
  - **POST** /api/places -- Create a place.
    - **PUT** /api/places/:id -- Update the place.
    - **DELETE** /api/places/:id -- Delete the place.
      - **PUT** /api/places/:id/favorites -- Update the favorite property for the place.
      - **GET** /api/places/favorites -- Get favorites places.
      - **GET** /api/places/:date/ -- Get place with given date.
  - **POST** /api/expenses/ -- Create expense.
    - **PUT** /api/expenses/:id -- Update expense.
    - **DELETE** /api/expenses/:id -- Delete expense.
  - **POST** /login -- Login an exisiting user.
  - **POST** /signup -- Create a new user.
