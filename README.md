# Merge Music Streaming Web App

This project is a web-based music streaming application called **Merge**. It allows users to search for music, manage their playlists, and interact with a music library. The project uses modern web technologies and a responsive design, making it suitable for various device sizes.

## Features

1. **User Authentication**: Users can sign up, log in, and manage their accounts. 
2. **Music Search**: Search functionality allows users to find songs and artists within the app.
3. **Playlist Management**: Users can create, update, and manage their music playlists.
4. **Responsive Design**: The app is fully responsive, adapting to various screen sizes.
5. **Multimedia**: Users can listen to music and interact with playlists seamlessly.

## Tech Stack

- **Frontend**:
  - HTML, CSS (including responsive styles)
  - JavaScript for interactivity
  - EJS templating engine for dynamic HTML rendering
  
- **Backend**:
  - Node.js and Express for server-side logic
  - MongoDB for data storage and retrieval (user accounts, playlists, etc.)
  - Sessions for user authentication and account management

## Project Structure

- **Frontend**:
  - `index.html`: The main page that provides access to various features like searching for music and playlist management.
  - CSS files (e.g., `Stylesheet_main.css`, `primary page responsive.css`, `Single Playlist Screen Styles.css`) are used to style the web pages, ensuring responsive and aesthetic designs.
  - JavaScript files handle frontend interactivity, such as search functionality and playlist management.
  
- **Backend**:
  - `index.js`: The main server file that connects to MongoDB, serves web pages, and handles user requests (sign up, login, playlist management).
  - MongoDB integration for managing users, playlists, and songs.
  
- **Views**:
  - EJS files (`login.ejs`, `signup.ejs`, `member.ejs`) are used for rendering dynamic pages for user authentication and interaction with the system.

## Installation

### Prerequisites
- Node.js
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Steps to Run Locally

1. **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/merge-music-app.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure MongoDB**:
    In the `index.js` file, update the MongoDB connection URI with your credentials:
    ```javascript
    const uri = "mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority";
    ```

4. **Run the server**:
    ```bash
    npm start
    ```

5. **Access the application**:
    Open your browser and go to `http://localhost:3000`.

## How to Use

- **Sign up**: Create an account by navigating to the `/signup` page.
- **Login**: Use your credentials to log in at `/login`.
- **Playlists**: Once logged in, you can create and manage your playlists.
- **Search**: Use the search bar to find your favorite songs and add them to your playlist.

## Future Enhancements

- **Integration with Spotify API**: Allow users to sync playlists with Spotify.
- **Improved Recommendations**: Implement an algorithm to suggest songs based on user preferences.
- **Social Features**: Allow users to follow each other and share playlists.

## License

This project is licensed under the MIT License.
