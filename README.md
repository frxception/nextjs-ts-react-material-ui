# Super Cheap Budget Hotel App

## Getting Started

Install dependencies
```sh
npm install
```

##
## Running the application
```sh
npm run dev 

or

npm run start
```
```
Open application in browser http://localhost:3000
```

## Test the application
```
npm run test

or

npm run test:coverage
```

# Project

Stack:
- Typescript
- React
- NextJS
- Node
- Material UI

# Features
- SSR for data using NextJS
- Supports Static Page for SEO
- Direct dynamic rendering of Page by URL params (i.e. http://localhost:3000/hotel/<hotel id>)
- Consumable Local API provider 
- Search and data Filters
- Persisted user settings using storage and cookies (retrieve previous settings when page reload)
- API test case coverages using Jest

# API


## Mock endpoints to use are:

### Main 
- Static data: https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo

### Prices:
- USD: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/USD
- SGD: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/SGD
- CNY: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/CNY
- KRW: http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/KRW


## New Endpoints

get all hotel list with the default profile settings
 *  /api/hotels 

server side hotel list will use the params
 *  /api/hotels?partnerId=1&currency=SGD 

 static rendered hotel view will use the provided params and arguments
 *  /api/hotels/<hotel_id>?partnerId=1&currency=SGD

 static rendered hotel view will use default or existing profile settings
 *  /api/hotels/<hotel id> 
 
