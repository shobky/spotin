# spotin
A fullstack web app build with MERN stack [mongo, express, react, node]

still under development demo will be available soon. 

## FEATURES 
* Secure Authentication
* Hashed password
* CRUD 
1. items
2. cart
3. orders

## INSTALLATION 
 use you package manager npm, yarn to install the packages, (i use npm)
 
// first clone the github repo to you local machine
// open cmd and create an empty folder named "spotin"
```
git clone https://github.com/shobky/spotin.git
```
wait for it to clone then download the packages for the server and the client 

// open backend folder

```
cd backend
```

// install packages with npm 
```
npm i
```

// open front end 
```
cd frontend 
```
```
npm i 
```
now every thing should be ready all you need to do is start the app 

// in the backend folder start the node server. you can find the scripts in the package.json file
```
npm start
```
// will start on port 5000 by default


// same for frontend to start the react app
```
npm start
```
// will start on port 3000 by default

## usage
Final steps is to create a new file in the backend folder root directory should be just on top of app.js file
then you will add 
1- your mongodb first user password
2- the jwt secret key 

// inside .env file
```
MONGODB_PASSWORORD = th1s_should_be_y0ur_pa55word
JWT_SECRET_KEY = th1s_should_be_y0ur_Secr3t_KeY
```

then open app.js file and change the mangoDB uri to you own 
```
// app.js
mongoose
  .connect(
  
  // change this string
    `mongodb+srv://shobky:${process.env.MONGODB_PASSWORORD}@cluster0.nfwqewl.mongodb.net/?retryWrites=true&w=majority`
  )
```
you can find you own string by going to mongodb website, create a cluster then click connect and choose connect to an app.
now every thing should be working.. 

DEMO WILL BE AVAIBLE SOON WHEN PROJECT IS FINISHED
