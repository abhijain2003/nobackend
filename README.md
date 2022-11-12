
# BACKPRESS

BACKPRESS.com is platform that allow you to create your own custom api, database without having coding or backend development knowledge which you can use in your web or app to generate your own product in 5 mins.


## How it works
1. you go to the website, 
2. create your account.
3. you create your custom schema for your api.
4. the website will generate an api and unique key for your custom api.
5. now you can use that api to run CRUD operations in your website or application.
6. Not even this, On website you can easily manage all the data that has been posted by your user.

## API CALL UNDERSTANDING

### GET REQUEST- your_API/

### DELETE REQUEST- your_API/unique_id_of_single_document

### PUT REQUEST- your_API/unique_id_of_single_document

### GET SINGLE DOCUMENT REQUEST - your_API/unique_id_of_single_document


## API PUT/POST REQUEST UNDERSTANDING
when you send a POST/PUT request to your api you should follow a website policy and structure.
-> 1. you need to wrap your schema object inside "CustomSchemaData" array<object>[] with keys of 
      label and value.
-> 2. you also need to add two more parameters "ownerid" your api end unique point and "ownername" your unique name 
      
      for eg. let say your api has 3 parameters such name, email and password of String data type.
      then your body of POST/PUT request should be.
      { 
        "CustomSchemaData": [
            {
               "label": "name",
               "value": "hello world"
            },
            {
               "label": "email",
               "value": "world@2022.com"
            },
            {
               "label": "password",
               "value": "password_world"
            }
        ],
        "ownerid": endpoint of your_api/${endpoint},
        "ownername": by_default_generated_by_website_on_database_page
      }


## Tech Stack

**Server:** Node, Express, Typescript, Mongoose, Mongodb


## Authors

- [@abhijain2003](https://github.com/abhijain2003)


## How it works
1. you go to the website, 
2. create your account.
3. you create your custom schema for your api.
4. the website will generate an api and unique key for your custom api.
5. now you can use that api to run CRUD operations in your website or application.
6. Not even this, On website you can easily manage all the data that has been posted by your user.

## Tech Stack

**Server:** Node, Express, Typescript, Mongoose, Mongodb


## Authors

- [@abhijain2003](https://github.com/abhijain2003)


## Screenshots


![App Screenshot](./src/Assets/s1.png)
![App Screenshot](./src/Assets/s2.png)


