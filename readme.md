# Airbnb Clone

This project is a clone of the popular vacation rental platform, Airbnb. It aims to replicate the core functionalities of Airbnb, including property listings, user authentication, booking, and reviews.

## Features

- User Authentication: Sign up, log in, and log out functionality.
- Property Listings: Users can view and search for properties.
- Property Details: Detailed view of each property with images, descriptions, and amenities.
- Booking: Users can book properties for specific dates.
- Reviews: Users can leave reviews and ratings for properties.

## Technologies Used

- Frontend: React, Redux, HTML, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sudeeepprajapati/airbnb-clone.git
    ```
2. Navigate to the project directory:
    ```bash
    cd airbnb-clone
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory and add the following:
        ```
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        ```

## Usage

1. Start the backend server:
    ```bash
    npm run server
    ```
2. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

For any questions or feedback, please contact [sudeep.mint@gmail.com](mailto:sudeep.mint@gmail.com]).
