### Swagger UI

https://job-applications-website-v1-bd784586a4a7.herokuapp.com/api-docs/

Can also be hosted using this template: https://github.com/peter-evans/swagger-github-pages -> https://ayazhankadessova.github.io/job-search-swagger/#/

#### Setup

```bash
npm install && npm start
```

## REST API

- Use `Prod_URL` -> `https://job-applications-website-v1-bd784586a4a7.herokuapp.com` or `https://localhost:3000`

1. Register a User

`POST /api/v1/auth/register`

## Body 

```
{
    "name": "YerkezhanK",
    "email": "kadessovayerkezhan2@gmail.com",
    "password": "yerkekadessova"
}
```

### Response

```
{
    "user": {
        "name": "YerkezhanK"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGY4NWUzYzFjNTQzMzAwMDI3ZDRkYjEiLCJuYW1lIjoiWWVya2V6aGFuSyIsImlhdCI6MTY5Mzk5ODY1MiwiZXhwIjoxNjk2NTkwNjUyfQ.xyw-xwilrroVnhS3qorqqpJJD0prNzhfn5W71l7sPTc"
}
```

```
    HTTP/1.1 201 CREATED
    Date: Thu, 7 Sep 2023 12:36:30 GMT
    Status: 201 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
```

2. Login a User

`POST /api/v1/auth/login`

### Body 

```
{
    "email": "kadessovayerkezhan2@gmail.com",
    "password": "yerkekadessova"
}
```

### Response 

```
{
    "user": {
        "name": "YerkezhanK"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGY4NWUzYzFjNTQzMzAwMDI3ZDRkYjEiLCJuYW1lIjoiWWVya2V6aGFuSyIsImlhdCI6MTY5Mzk5ODc0NSwiZXhwIjoxNjk2NTkwNzQ1fQ.plh8KvMKlAfvnTt1bTmuESmo7gvXmWGM_10sR2Vjyo0"
}
```

```
    HTTP/1.1 200 OK
    Date: Thu, 7 Sep 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
```

### Tests

```
const jsonData = pm.response.json()
pm.globals.set("accessToken", jsonData.token);
```

4. Create a Job

`POST /api/v1/jobs` 

### Auth 

- Type:Bearer Token
- Token: {{accessToken}}

### Body

```
{
    "company": "Pfizer",
    "position": "Business Solutions Analyst"
}
```

### Response

```
{
    "newJob": {
        "status": "pending",
        "_id": "64f85f281c543300027d4db7",
        "company": "Pfizer",
        "position": "Business Solutions Analyst 2",
        "createdBy": "64f85e3c1c543300027d4db1",
        "createdAt": "2023-09-06T11:14:48.150Z",
        "updatedAt": "2023-09-06T11:14:48.150Z",
        "__v": 0
    }
}
```

```
    HTTP/1.1 201 CREATED
    Date: Thu, 7 Sep 2023 12:36:30 GMT
    Status: 201 CREATED
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
```

4. Get All Jobs

`GET /api/v1/jobs`

### Auth 

- Type:Bearer Token
- Token: {{accessToken}}

### Response

```
{
    "jobs": [
        {
            "status": "pending",
            "_id": "64f85eeb1c543300027d4db5",
            "company": "Pfizer",
            "position": "Business Solutions Analyst",
            "createdBy": "64f85e3c1c543300027d4db1",
            "createdAt": "2023-09-06T11:13:47.665Z",
            "updatedAt": "2023-09-06T11:13:47.665Z",
            "__v": 0
        },
        {
            "status": "pending",
            "_id": "64f85f281c543300027d4db7",
            "company": "Pfizer",
            "position": "Business Solutions Analyst 2",
            "createdBy": "64f85e3c1c543300027d4db1",
            "createdAt": "2023-09-06T11:14:48.150Z",
            "updatedAt": "2023-09-06T11:14:48.150Z",
            "__v": 0
        }
    ],
    "count": 2
}
```

```
    HTTP/1.1 200 OK
    Date: Thu, 7 Sep 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
```

5. Get Single Job

`GET /api/v1/jobs/64f85eeb1c543300027d4db5`

### Auth

- Type: Bearer Token
- Token: {{accessToken}}

### Body

```
{
    "job": {
        "status": "pending",
        "_id": "64f85eeb1c543300027d4db5",
        "company": "Pfizer",
        "position": "Business Solutions Analyst",
        "createdBy": "64f85e3c1c543300027d4db1",
        "createdAt": "2023-09-06T11:13:47.665Z",
        "updatedAt": "2023-09-06T11:13:47.665Z",
        "__v": 0
    }
}
```

```
    HTTP/1.1 200 OK
    Date: Thu, 7 Sep 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
```

6. Update a Job

`PATCH /api/v1/jobs/64f85eeb1c543300027d4db5`

### Auth 

- Type:Bearer Token
- Token: {{accessToken}}

### Body

```
{ "company" : "Pfizer Kz", "position": "Site Reliability Engineer"}
```

### Response

```
{
    "job": {
        "status": "pending",
        "_id": "64f85eeb1c543300027d4db5",
        "company": "Pfizer Kz",
        "position": "Site Reliability Engineer",
        "createdBy": "64f85e3c1c543300027d4db1",
        "createdAt": "2023-09-06T11:13:47.665Z",
        "updatedAt": "2023-09-06T11:18:18.830Z",
        "__v": 0
    }
}
```

```
    HTTP/1.1 200 OK
    Date: Thu, 7 Sep 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
```

7. Delete a Single Job

`DELETE /api/v1/jobs/64f85eeb1c543300027d4db5`

### Auth 

- Type:Bearer Token
- Token: {{accessToken}}


## Ste-By-Step Workflow

## Task

1. bootstrap - done
2. Add dummy controllers - done
3. Add Routes - done
4. Check if routes work - done
5. Connect db works - done
6. Create user model - done

   - Email validation :

   ```regex
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   ```

   - Add unique indexing for email

7. Register Route

   1. Validate - name, email, password - with mongoose - done
   2. Hash password (with bcryptjs) - done
   3. Create Token in controller - done
   4. Create Token , move to Schema instance method - done
   5. Generate token for JWT_Secret & set lifetime as env var - done
   6. Send response with token if valid - done

8. Login router

   1. In controller: get email & password (do not need a name) - done
   2. If no email or password -> throw BadRequestError - done
   3. Find User through email bc it is key - done
   4. Compare Passwords using bcrypt & instance method in User model - done
   5. If user not found or password does not match the one in db -> throw UnauthenticatedError - done
   6. If there is user & password matches, generate Token using instance method - done
   7. Send Response with Token - done

9. Think about expiresIn -> set in .env - done

10. Auth middleware:

    1. Get user id - done
    2. Pass it along to the jobs route - done
    3. Test : register user -> get token -> put the token in the header, authorization -> will return userId, name - done

11. Jobs Model:

    1. Make a schema for a jobs - done
    2. Set type as an ObjectID (so you may reference `User` as the creator of `Job`) - done

12. Create Job Route

    1. We need to pass Authorization Header, company, position - done
    2. Get the userId -> tie it as createdBy -> so you cannot modify others work/others cannot modify your work. - done

13. Pass the token dynamically

    1. Set global variable in PostMan: - done

    - Login user -> Tests

    ```
    const jsonData = pm.response.json()
    pm.globals.set("accessToken", jsonData.token);
    ```

    - Now it is a global variable

    2. Use it in create job - done

    - Authorization -> Bearer -> {{accessToken}}

    3. Use it in Get all jobs as well - done

    4. [Test] -> Register User -> Login User -> Create a Job -> Get all Jobs

14. Create a Job / Get a Job / Update a Job / Delete a Job controllers - All Done

    1. https://mongoosejs.com/docs/tutorials/findoneandupdate.html

15. Test all Job controllers - done

16. Work on Mongoose Errors [ will reuse in later projects] - done

    1. Validation Errors - done

    ```
    [
      ValidatorError: Please provide password
          at validate (/Users/ayazhan/Documents/GitHub/job-search-website/node_modules/mongoose/lib/schematype.js:1270:13)
          at /Users/ayazhan/Documents/GitHub/job-search-website/node_modules/mongoose/lib/schematype.js:1253:7
          at Array.forEach (<anonymous>)
          at SchemaType.doValidate (/Users/ayazhan/Documents/GitHub/job-search-website/node_modules/mongoose/lib/schematype.js:1198:14)
          at /Users/ayazhan/Documents/GitHub/job-search-website/node_modules/mongoose/lib/document.js:2542:18
          at process.processTicksAndRejections (node:internal/process/task_queues:77:11) {
        properties: {
          validator: [Function (anonymous)],
          message: 'Please provide password',
          type: 'required',
          path: 'password',
          value: undefined
        },
        kind: 'required',
        path: 'password',
        value: undefined,
        reason: undefined,
        [Symbol(mongoose:validatorError)]: true
      }
    ]
    ```

    - Idea -> get error messages and separate them for more user-friendliness.

    2. Duplicate (Email) - done

    - Idea -> template string using values.

    3. Cast Error [id syntax does not match exactly to what the mongoose is looking for] - done

    - We don't get it in the `Auth`, but get it in the `Jobs`.
    - Earlier, when we could not find job that matches the job id that was passed through the parameters, we threw the `NotFoundError`, but it can also be the case that the syntax does not match whatever the database is looking for.

    ```
    {
        "err": {
            "stringValue": "\"64d83f72066651201e65f8634\"",
            "valueType": "string",
            "kind": "ObjectId",
            "value": "64d83f72066651201e65f8634",
            "path": "_id",
            "reason": {},
            "name": "CastError",
            "message": "Cast to ObjectId failed for value \"64d83f72066651201e65f8634\" (type string) at path \"_id\" for model \"Job\""
        }
    }
    ```

17. get the front & connect with front

18. [Security] Protect API from attacks

- remark : we cannot protect everything, since the user can still store the token in a prone to attacks environment.

  1. helmet

  - sets different http header to prevent numerous attacks.
  - used in many other packages as a dependency

  2. cors

  - ensures our api is accessible from a different domain
  - make api accessible for the public

  3. xss-clean library

  - sanitizes user input in `req.body`, `req.query`, `req.params` -> protects from cross-site scripting attacks, where the attacker tries to inject some malicious code.

  4. express-rate-limit

  - https://www.npmjs.com/package/express-rate-limit

  - minimizes the amount of requests a user can make

## Deploy to Heroku

- Deploy via UI: https://medium.com/featurepreneur/how-to-connect-github-to-heroku-be6ff27419d3

1. Sign Up
2. Git
3. Heroku CLI

https://www.google.com/search?client=safari&rls=en&q=heroku+cli&ie=UTF-8&oe=UTF-8

```
brew tap heroku/brew && brew install heroku

```

> heroku -v

4. Make MongoDB access from all ports
5. duplicate project to desktop
6. Delete any git repositories
   > rm -rf .git
7. Check if you have port ready for prod:
   > const port = process.env.PORT || 3000
8. Check if app works

```
app.get('/', (req, res) =>{
  res.send('jobs api')
})

```

9. Follow the steps here : [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
10. Specify node version

> node -v
> v18.16.1

11. Change start script

```
  "scripts": {
    "start": "nodemon app.js"
  }
```

12. Make [Procfile](https://devcenter.heroku.com/articles/procfile)

To determine how to start your app, Heroku first looks for a Procfile. If no Procfile exists for a Node.js app, we attempt to start a default web process via the start script in your package.json.

The command in a web process type must bind to the port number specified in the PORT environment variable. If it doesn’t, the dyno doesn’t start.

13. Deploying to Heroku via git

> git init
> git add .
> git commit -m "initial commit"
> heroku login
> heroku create job-applications-website-v1
> git remote -v # check if git remote is pointing to the actual repo

- Env Variables [ 2 ways of setting up env vars]

> heroku config:set JWT*LIFETIME=\_VALUE HERE*

- via GUI:

> Dashboard -> app -> Settings -> Reveal Env Vars -> add Mongo_URI and JWT_SECRET
> git push heroku master

- restart all dynos
- Add prod_url as a global to postman -> `https://job-applications-website-1623c2b4d4e9.herokuapp.com/api/v1`
- try `login` & `jobs` routes

14. Create Swagger Docs

- Use Postamn docs & third part library to automate the process
- Clone existing heroku app so you can keep the app on the cloud

  > cd desktop
  > heroku git:clone -a job-applications-website

- Export Postman collection

15. APIMatic

- Sign Up for https://www.apimatic.io
- Import Postman Collection

16. Edit API

- Change name
- Change URL `https://job-applications-website-v1-bd784586a4a7.herokuapp.com/api/v1`
- Save config
- Change folders

  1. Auth: Login, register
  2. Jobs

- Export -> OpenAPI v3 , YAML

17. Test in Swagger Editor https://editor.swagger.io

- Remove tags for Misc
- `/jobs/{id}`, in: path, name: id, type: string.

18. Add Swagger integration to `app.js`

```
const SwaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./job-app-swagger.yaml')
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDoc))
```

## changes

1. Use mongoose validator instead of manual validation, to get more meaningful messages

- Previous way:

```

const { name, email, password } = req.body
console.log(name, email, password)
if (!name || !email || !password) {
throw new BadRequestError('Either Name, Email, or Password is missing.')
}

```

2. Do not store password in db directly -> hash

- data of any size -> bit string of fixed size
- use bcryptjs

```

const register = async (req, res) => {
// check if any of name, email, password is missing

// // const { name, email, password } = req.body
// // console.log(name, email, password)
// // if (!name || !email || !password) {
// // throw new BadRequestError('Either Name, Email, or Password is missing.')
// // }
// // .. -> pass as single arguments -> good for validation

const { name, email, password } = req.body

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

const tempUser = { name, email, password: hashedPassword }

// spread user attributes
const newUser = await User.create({ ...tempUser })
res.status(StatusCodes.CREATED).json(newUser)

}

```

- Even if someone breaks into the database, they will not get the password, but only hashed password, which prevents them from easily reusing later
- Never store passwords as strings
- more bytes:

```

// random bytes
const salt = await bcrypt.genSalt(10)

```

- more processing power.

## Knowledge Base

1. What to send when we create a token?

- Depends on the needs of the front-end. However, if you have created a token, definitely send back the token because it will help the user access resources on the server later on.

2. Spread Operator (...)

In the code snippet you provided, the spread operator (`...`) is used to pass the properties of the `req.body` object as individual arguments to the `create()` method.

The `create()` method is likely a function or method that expects multiple arguments instead of a single object. By using the spread operator, the properties of `req.body` are spread out as separate arguments to the `create()` method.

Here's an example to illustrate the usage of the spread operator:

```javascript
const userObject = {
  name: 'John Doe',
  age: 25,
  email: 'johndoe@example.com',
}

// Without spread operator
const user = User.create(userObject)

// With spread operator
const user = User.create(...userObject)
```

In the first case, `userObject` is passed as a single argument to the `create()` method. In the second case, the spread operator is used to spread out the properties of `userObject` as separate arguments to the `create()` method.

It's important to note that the usage of the spread operator depends on how the `create()` method is defined and what arguments it expects. If the `create()` method expects a single object argument, then the spread operator may not be necessary. However, if it expects individual arguments, then the spread operator can be used to pass the properties of an object as separate arguments.

3. Instance Methods for models

- https://mongoosejs.com/docs/guide.html#methods

Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods.

```
UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

UserSchema.methods.comparePassword = async function (givenPassword) {
  const isMatch = bcrypt.compare(givenPassword, this.password) // true
  return isMatch
}
```

- how to use the method?

```
  const token = newUser.createJWT()
```

4. About jsonwebtoken

- Expires in :

> check out the docs here: https://www.npmjs.com/package/jsonwebtoken

- key generators: allkeysgenerator.com OR https://generate-random.org/encryption-key-generator

> Store it in .env as JWT_SECRET

5. AuthMiddleware -> I can only see my job, others can only see their jobs

```
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('No Token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // attach the user to the job routes
    req.user = { userId: decoded.userId, name: decoded.name }

    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication failed')
  }
}
```

- add to all jobs routes

```
app.use('/api/v1/jobs', authenticateUser, jobsRouter)
```

6. Set type as an ObjectID

- To set type as an ObjectId (so you may reference author as the author of book, for example), you may do like:

```
const Book = mongoose.model('Book', {
  author: {
    type: mongoose.Schema.Types.ObjectId, // here you set the author ID
                                          // from the Author colection,
                                          // so you can reference it
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
```

## Global Variables

1. Set global variables in PostMan

   1. Set global variable in PostMan:

   - Login user -> Tests

   ```
   const jsonData = pm.response.json()
   pm.globals.set("accessToken", jsonData.token);
   ```

   - Now it is a global variable

   2. Use it in create job

   - Authorization -> Bearer -> {{accessToken}}

   3. Use it in Get all jobs as well

## Heroku for Students

- Authenticate via Github

## Next

1. Deploy on netlify with Frontend
