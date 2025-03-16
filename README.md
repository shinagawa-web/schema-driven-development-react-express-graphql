# **Project Overview**

This project follows a **monorepo structure** using **Turborepo**, integrating a **GraphQL API backend** built with **Express.js and Apollo Server**, and a **React frontend** using **Vite**. The GraphQL schema is shared between the backend and frontend through a centralized `packages/graphql` directory.

---

## **Project Structure**
```
.
├── apps
│   ├── backend          # Backend application (GraphQL API with Express + Apollo Server)
│   │   ├── dist         # Compiled TypeScript files
│   │   ├── src          # Source code
│   │   │   ├── graphql  # GraphQL resolvers and type definitions
│   │   │   ├── index.ts # Entry point for the backend server
│   │   ├── package.json # Backend dependencies
│   │   ├── tsconfig.json # TypeScript configuration
│   ├── frontend         # Frontend application (React + Vite)
│   │   ├── config       # Configuration files
│   │   ├── generated    # TypeScript types generated from GraphQL schema
│   │   ├── public       # Static assets
│   │   ├── src          # Frontend source code
│   │   │   ├── App.tsx  # Main React component
│   │   │   ├── main.tsx # React application entry point
│   │   │   ├── service.ts # API service for GraphQL queries
│   │   ├── package.json # Frontend dependencies
│   │   ├── vite.config.ts # Vite configuration
│   └── packages         # Shared packages
│       └── graphql      # Centralized GraphQL schema and queries
│           ├── operations
│           │   ├── getPost.graphql # GraphQL query for fetching posts
│           ├── schema
│           │   ├── post.graphql    # GraphQL schema for Posts
│           │   ├── recipe.graphql  # GraphQL schema for Recipes
├── package.json         # Root dependencies
├── turbo.json           # Turborepo configuration
```

---

## **Setup & Installation**
### **1️⃣ Install Dependencies**
```sh
npm install
```

### **2️⃣ Start the Full Project (Backend + Frontend)**
```sh
npm run dev
```
This starts both the **GraphQL server (`http://localhost:4000/graphql`)** and the **frontend (`http://localhost:5173`)** using Turborepo.

---

## **GraphQL API Overview**
### **GraphQL Schema Example (post.graphql)**
```graphql
type Post {
  id: ID!
  title: String!
  author: Author
}

type Author {
  id: Int!
  firstName: String!
  lastName: String!
}

type Query {
  posts: [Post]
  post(id: ID!): Post
}
```

### **GraphQL Query Example (GetPosts)**
```graphql
query GetPosts {
  posts {
    id
    title
    author {
      firstName
      lastName
    }
  }
}
```

### **Test GraphQL API using `curl`**
```sh
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ posts { id title author { firstName lastName } } }"}' | jq
```

---

## **Generating TypeScript Types from GraphQL Schema**
This project uses **GraphQL Code Generator** to automatically generate TypeScript types from the schema.

### **Run GraphQL Codegen (Inside Frontend Directory)**
```sh
cd apps/frontend
npm run generate
```
This will update `apps/frontend/generated/graphql.ts` with the latest TypeScript types.

---

## **Development Workflow**
### **1️⃣ Define the GraphQL Schema**
- Modify the `.graphql` files in `packages/graphql/schema/`

### **2️⃣ Implement Resolvers (Backend)**
- Update `apps/backend/src/graphql/resolvers.ts` to handle new queries or mutations.

### **3️⃣ Generate TypeScript Types**
- Run `cd apps/frontend && npm run generate` to update frontend types.

### **4️⃣ Use GraphQL Queries in the Frontend**
- Modify `.graphql` queries in `packages/graphql/operations/`
- Use generated hooks (`useQuery`, `useMutation`) in React components.

---

## **Deployment**
### **1️⃣ Build the Full Project**
```sh
npm run build
```

### **2️⃣ Start the Production Server**
```sh
npm run start
```

---

## **Contributing**
1. **Fork the repository** and clone it locally.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your branch and create a **Pull Request**.

---

## **License**
This project is licensed under the **MIT License**.

