For setup prisma project with postgresql follow this,

```javascript
npm install
npm init -y
npx tsc --init
npx prisma init

```


#### And find the tsconfig file where have rootDir and outDir.set the rootDir for

```
"rootDir": "./src"

and

"outDir": "./dist"

```

connect the project with database in env file

1. your name
2. password
   3.project name

### Generate random secret key

```
node
require('crypto').randomBytes(64).toString('hex')
```
##Authentication 
### **1. User Registration**

- **Endpoint:** **`POST /api/register`**
- **Request Body:**

```json
{
  "password": "123456",
  "user": {
    "email": "abir@gmail.com",
    "username": "abir"
  }
}

```

- **Response** (Response should not include the password):

```json
{
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}
```

### **2. User Login**

- **Endpoint:** **`POST /api/login`**
- **Request Body:**

```json
{
    "email": "john@example.com",
    "password": "password"
}
```

- **Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "<JWT token>",
    }
}
```



If you want to use my API then you might be got the error 
```json
{
    "success": false,
    "message": "Can't reach database server at `aws-0-ap-southeast-1.pooler.supabase.com`:`5432`\n\nPlease make sure your database server is running at `aws-0-ap-southeast-1.pooler.supabase.com`:`5432`.",
    "error": {
        "name": "PrismaClientInitializationError",
        "clientVersion": "5.11.0",
        "errorCode": "P1001"
    }
}
```
Because the project has deployed supabase in a free version that's why the database will be closed after 15 days. If you fetch the problem then send me an email in mmehedihasanjov@gmail.com
subject: Turn on your spare room on supabase




