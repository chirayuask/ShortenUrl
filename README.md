



Sign up API ---------------->
1. POST http://localhost:3000/api/v1/habuild/SignUp 
body ----------------->
{
    "email": "chirayu.varshney@gmail.com",
    "firstName": "chirayu",
    "lastName": "varshney",
    "password": "5273849203"
}

Login API to get the access token
2. POST http://localhost:3000/api/v1/habuild/loginUser
body ------------------->
{
    "email": "chirayu.varshney@gmail.com",
    "password": "5273849203"
}

3. POST http://localhost:3000/api/v1/habuild/login/createTables
body ------------------->
{
    "topicsName" : "RRR",
    "rankings" : "90"
}

4.GET http://localhost:3000/api/v1/habuild/login/getAllTables


5. POST http://localhost:3000/api/v1/habuild/login/generateUrlShortner
body ------------------->
{
    "fullURL": "https://www.netflix.com/browse"
}

