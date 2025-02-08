# BlogApp

**BlogApp** is a simple blogging platform that allows users to create, manage, and interact with blogs. This application provides authentication features, allowing users to sign up, sign in, and delete their accounts. It also allows users to add, edit, and remove blogs, as well as comment on others' blogs.

## Features

1. **Authentication**
   - Users can **sign up** by creating an account with a username, email, and password.
   - **Sign in** to access their personal blog dashboard and interact with blogs.
   - **Account deletion**: Users can delete their account, which will remove their blogs and comments from the platform.

2. **Blog Management**
   - **Add Blog**: Authenticated users can create new blogs with titles, cover images, and content.
   - **Edit Blog**: Users can edit their blogs after creation.
   - **Delete Blog**: Users can delete blogs they have created.
  
3. **Comment on Blogs**
   - Users can add comments to any blog, fostering interaction with other users.


## Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone git@github.com:Anujkulal/BlogApp.git
   cd BlogApp
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Set up environment variables:
   Create a `.env` file:
   ```env
   MONGO_URL=mongodb://localhost:27017/BlogApp
   PORT=****
   SECRET=your-jwt-secret
   ```

4. Start the application:
   ```bash
   npm start

    OR

   npm run dev
   ```

5. Open the application in your browser:
   Go to `http://localhost:PORT` to start using the app.


## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens) for session management
- **Frontend**: EJS templates, Bootstrap 5 for responsiveness
