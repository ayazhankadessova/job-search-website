#### Setup

```bash
npm install && npm start
```

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

14. Create a Job / Get a Job / Update a Job / Delete a Job controllers

    1. https://mongoosejs.com/docs/tutorials/findoneandupdate.html

    - All Done

15. get the front & connect with front

---

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

  // //   const { name, email, password } = req.body
  // //   console.log(name, email, password)
  // //   if (!name || !email || !password) {
  // //     throw new BadRequestError('Either Name, Email, or Password is missing.')
  // //   }
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

---

1. `POST` /jobs

- Example req.body

```
{
    "company": "JP Morgan",
    "position": "Software Engineer"
}
```

- Example Output

```
{
    "newJob": {
        "status": "pending",
        "_id": "64d83f72066651201e65f863",
        "company": "JP Morgan",
        "position": "Software Engineer",
        "createdBy": "64d72d60e29e4b51b8f93afb",
        "createdAt": "2023-08-13T02:26:58.783Z",
        "updatedAt": "2023-08-13T02:26:58.783Z",
        "__v": 0
    }
}
```

2. Set global valriables in PostMan

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
