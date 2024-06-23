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
    "statusCode": 200,
    "message": "User Created successfully!",
    "data": {
        "id": "153bc206-166d-4509-89b4-03992dadaafb",
        "username": "abir",
        "email": "abir2@gmail.com",
        "password": "$2b$12$JS21qEIUMbSKKjSDaudpUeSAiIuUuyJaTkcBLCvEukxCn6ToQWxCu",
        "profilePhoto": null,
        "role": "USER",
        "needPasswordChange": true,
        "status": "ACTIVE",
        "createdAt": "2024-06-23T19:17:39.266Z",
        "updatedAt": "2024-06-23T19:17:39.266Z"
    }
}
}
```

### **2. User Login**

- **Endpoint:** **`POST /api/login`**
- **Request Body:**

```json
 {
  "email": "abir2@gmail.com",
  "password": "123456"
}

```

- **Response:**

```json
{
    "success": true,
statuscode:200,
    "message": "Logged in successfully!",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaXIyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwidXNlcklkIjoiMTUzYmMyMDYtMTY2ZC00NTA5LTg5YjQtMDM5OTJkYWRhYWZiIiwiaWF0IjoxNzE5MTcwMzc5LCJleHAiOjE3MjA0NjYzNzl9.3GJrDLp6f8Hl1MwL2TshOAi7Q8ZU0-m-O0Gvwvs1P2A",
        "needPasswordChange": true
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




