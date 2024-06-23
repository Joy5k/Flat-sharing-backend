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

- **Endpoint:** **`POST /user/create-user`**
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

- **Response**:

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

- **Endpoint:** **`POST /auth/login`**
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
   "statuscode":200,
    "message": "Logged in successfully!",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaXIyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwidXNlcklkIjoiMTUzYmMyMDYtMTY2ZC00NTA5LTg5YjQtMDM5OTJkYWRhYWZiIiwiaWF0IjoxNzE5MTcwMzc5LCJleHAiOjE3MjA0NjYzNzl9.3GJrDLp6f8Hl1MwL2TshOAi7Q8ZU0-m-O0Gvwvs1P2A",
        "needPasswordChange": true
    }
}
```
- **If password mismatch**
- **Response**
```json
{
    "success": false,
    "message": "Password incorrect!",
    "error": {
        "statusCode": 401
    }
}
```

### **1. Forgot-Password

- **Endpoint:** **`POST /auth/forgot-password`**
- **Request Body:**

```json

{
  "email": "mmehedihasanjoyv@gmail.com"
}

```
after entering the email, the email will get a verification URL

- **Response**
- 
```json
{
    "success": true,
    "message": "Check your email!"
}

```
### **1. Edit-Profile

- **Endpoint:** **`POST /user/editProfile`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "name":"Mehedi Hasan"
}
```

- **Response**
- 
```json
{
    "success": true,
    "message": "profile updated!",
    "data": {
        "id": "153bc206-166d-4509-89b4-03992dadaafb",
        "username": "abir",
        "email": "abir2@gmail.com",
        "profilePhoto": null,
        "role": "USER",
        "needPasswordChange": true,
        "status": "ACTIVE",
        "createdAt": "2024-06-23T19:17:39.266Z",
        "updatedAt": "2024-06-23T19:17:39.266Z"
    }
}

```

### **User Managment**
- **Endpoint:** **GET `/user?page=1&limit=4`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`


- **Response:**
 ```json
  {
    "success": true,
    "message": "Users data fetched!",
    "meta": {
        "page": 1,
        "limit": 4,
        "total": 10
    },
    "data": [
        {
            "id": "153bc206-166d-4509-89b4-03992dadaafb",
            "email": "abir2@gmail.com",
            "username": "abir",
            "role": "USER",
            "needPasswordChange": true,
            "status": "ACTIVE",
            "createdAt": "2024-06-23T19:17:39.266Z",
            "updatedAt": "2024-06-23T19:17:39.266Z",
            "admin": null
        }
        .......
    ]
}
```




### **3. Add a Flat**

- **Endpoint:** **`POST /api/create-flat`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
  "location": "123 Main St, Springfield",
  "description": "A cozy two-bedroom apartment in the city center.",
  "rentAmount": 1200.0,
  "bedrooms": 2,
  "amenities": ["Wi-Fi", "Air Conditioning", "Heating", "Washer/Dryer"],
  
    "photos": [
      {
        "id": "c1d1e1f1-1111-1111-1111-111111111111",
        "imageUrl": "https://example.com/photo1.jpg"
      },
      {
        "id": "d2e2f2g2-2222-2222-2222-222222222222",
        "imageUrl": "https://example.com/photo2.jpg"
      }
    ]
  
}

```

- **Response:**

```json
{
    "success": true,
   "statuscode":200,
    "message": "Flat created successfully",
    "data": {
        "id": "ab19159a-5af5-45d1-ad41-49b033454942",
        "location": "123 Main St, Springfield",
        "description": "A cozy two-bedroom apartment in the city center.",
        "rentAmount": 1200,
        "bedrooms": 2,
        "amenities": [
            "Wi-Fi",
            "Air Conditioning",
            "Heating",
            "Washer/Dryer"
        ],
        "createdAt": "2024-06-23T19:29:05.097Z",
        "updatedAt": "2024-06-23T19:29:05.097Z",
        "userId": "153bc206-166d-4509-89b4-03992dadaafb",
        "photos": [
            {
                "id": "b0ed987e-aede-4eb2-9912-cd5eb876d3a9",
                "imageUrl": "https://example.com/photo1.jpg",
                "flatId": "ab19159a-5af5-45d1-ad41-49b033454942"
            },
            {
                "id": "ffce852a-cffd-4f48-bf8d-626b5fe3d5eb",
                "imageUrl": "https://example.com/photo2.jpg",
                "flatId": "ab19159a-5af5-45d1-ad41-49b033454942"
            }
        ]
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




