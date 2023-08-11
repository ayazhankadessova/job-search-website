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

   1. Validate - name, email, password - with mongoose
   2. Hash password (with bcryptjs)
   3. Create Token
   4. Send response with token if valid

8. get the front & connect with front
