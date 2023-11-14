# TRAVEL JOURNAL APP

Capture your travel adventures with the Travel Journal App! Record memorable moments, add photos, and revisit your experiences from around the world.

## Features:

- **Add an Entry:** Document your day with a description, date, and an image.
- **View Cities:** Explore all the cities where you've added entries.
- **City Entries:** Dive into the entries for a specific city to relive your experiences.
- **Delete Entries and Cities:** Easily remove entries or entire cities, automatically deleting associated entries.

  ​

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `mvp`
- Add a (or verify) a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=mvp
  DB_PASS=root
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create two tables, one called 'cities' and one called 'entries' in your database.

- Make sure you understand how each table is constructed. In your MySQL console, you can run `use mvp;` and then `describe cities;` or `describe entries;` to see the structure of the tables.

- The tables have a one to many relationship. One city can have multiple entries, but an entry can only be from one city.

### Usage

- Once the development server and client are running, open your browser and navigate to http://localhost:5173 to access the Travel Journal App.

## Adding a New Entry

1. Select a City:
   Choose a city from the dropdown menu or add a new city if doesn't exist.

2. Provide entry details:
   Fill in the description, date and image URL.

3. Submit your entry:
   Click the Submit button to add your entry to the journal

## Viewing Cities and Entries

- View Cities:
  Click the "Cities" button to see all the cities where you've added entries.

- View Entries:
  On the "Cities" section, click on a city to see detailed entries for that location.

## Deleting Cities and Entries

- Delete a City:
  In the "Cities" view, click the delete buttom to remove that city. Deleting a city will automatically remove all associated entries.

- Delete an Entry:
  In the "Entries" view, use the delete button to remove especific entries.

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
