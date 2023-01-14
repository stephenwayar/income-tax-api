Starting the server:

  -Install packages with the 'npm install' command
  -Type 'npm run dev' on the terminal to start the server on development  
  -When deployed to a cloud server, the Procfile has the command to start the server (add env vars on the server to make it work)
  -MongoDB's cloud database is used. Starting the server will automatically connect to the remote DB (internet required)

Running tests:

  -Jest testing library is used to write integration and unit tests
  -Run tests by typing 'npm run test'
  -Running tests will force and exit at 100000ms. Integration test may appear to 'hang' (take time) but dont fret, everything will exit at 100000ms
  -Run each test individually by adding Jest's 'test.only()' function (running all test at once will cause fails in some of them. For example: Run the register user test suite before running the login user test suit)

----
----
----

Authentication:

  -I made provisions for user authentication
  -Only get() request endpoints are not protected. All other endpoints requires the user to login
  -Registering a user is also possible
  -Making requests is simple, add the token retrieved after successfull login to the Authorisation body of your request
  
  ***Please check the assets folder for screen grab examples

Controller actions: 

  -To make the API easily upscaleable, I made provisions for adding minimum wage values for other countries
  -A default Wage document exists in the database 👇 that holds Nigeria's minimum wage tax

  Screenshot 2023-01-14 at 5.32.57 PM.png

  {
    "_id":{"$oid":"63c2ca422584a5bef5675606"},
    "name":"ng","minimum_wage":{"$numberInt":"300000"},
    "createdAt":{"$date":{"$numberLong":"1673710146398"}},
    "updatedAt":{"$date":{"$numberLong":"1673710146398"}},
    "__v":{"$numberInt":"0"}
  }

  -WageController.js holds controller actions that can update this document and others like wise
  -Use the ID above to make put, delete and get (single resource) requests
  -Adding of new Wage document to hold a different country's minimum wage value is also available. However this will require a unique Income Tax controller set to be built to match the new feature