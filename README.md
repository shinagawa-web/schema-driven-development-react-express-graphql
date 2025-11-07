# schema-driven-development-react-express-graphql

A full-stack starter for Schema-Driven Development (SDD) using React (Vite) + Express + GraphQL in a monorepo setup.
Designed to demonstrate how to unify schema, backend, and frontend types for maintainable and scalable applications.

🔗 [Schema-Driven Development with React + Express + GraphQL](https://shinagawa-web.com/blogs/schema-driven-development-react-express-graphql)

## Why

In many projects, front-end and back-end drift apart:

- API contracts are defined in one place, but implemented differently elsewhere
- Type safety is lost at the boundary between schema and client code
- Monorepo / multiple packages / GraphQL code generation add complexity

This project shows how to:

- Define the API schema once (GraphQL schema files) and share it across backend and frontend
- Use code generation (GraphQL Code Generator) to maintain type safety
- Manage a monorepo with Turborepo so both frontend and backend evolve together
- Reduce friction in implementation, reviews, and maintenance

## Features

- Mono-repo using Turborepo (`apps/frontend`, `apps/backend`, `packages/graphql`) 
GitHub
- Shared GraphQL schema directory (`packages/graphql/schema`)
- Automatic TypeScript type generation from schema and queries (`generated/graphql.ts`)
- Frontend: React + Vite, GraphQL client
- Backend: Express + Apollo Server, GraphQL API
- Example queries / resolvers included (e.g., `Post`, `Author`) 
- Configured for parallel development of frontend & backend with strong contract enforcement


## Setup & Installation
### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start the Full Project (Backend + Frontend)
```sh
npm run dev
```
This starts both the GraphQL server (`http://localhost:4000/graphql`) and the frontend (`http://localhost:5173`) using Turborepo.

---

## GraphQL API Overview
### GraphQL Schema Example (post.graphql)
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

### GraphQL Query Example (GetPosts)
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

### Test GraphQL API using `curl`
```sh
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ posts { id title author { firstName lastName } } }"}' | jq
```


## Project Structure
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


## Generating TypeScript Types from GraphQL Schema
This project uses GraphQL Code Generator to automatically generate TypeScript types from the schema.

### Run GraphQL Codegen (Inside Frontend Directory)
```sh
cd apps/frontend
npm run generate
```
This will update `apps/frontend/generated/graphql.ts` with the latest TypeScript types.

---

## Development Workflow
### 1️⃣ Define the GraphQL Schema
- Modify the `.graphql` files in `packages/graphql/schema/`

### 2️⃣ Implement Resolvers (Backend)
- Update `apps/backend/src/graphql/resolvers.ts` to handle new queries or mutations.

### 3️⃣ Generate TypeScript Types
- Run `cd apps/frontend && npm run generate` to update frontend types.

### 4️⃣ Use GraphQL Queries in the Frontend
- Modify `.graphql` queries in `packages/graphql/operations/`
- Use generated hooks (`useQuery`, `useMutation`) in React components.

---

## Deployment
### 1️⃣ Build the Full Project
```sh
npm run build
```

### 2️⃣ Start the Production Server
```sh
npm run start
```


## For Teams / Production Use

- Pin tool versions (Turborepo, GraphQL Code Generator, etc) to reduce drift
- Use CI workflows to enforce schema-to-implementation alignment
- Document schema changes and reviews—this repository shows the pattern rather than just code
- Consider adding e2e or contract tests between frontend and backend to guard against breaking schema changes

## License
This project is licensed under the MIT License.

