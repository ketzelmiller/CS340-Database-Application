// Citation for the following code:
// Date: 3/2/2026
// Copied from
// Source URL: https://canvas.oregonstate.edu/courses/2031764/assignments/10323319?module_item_id=26243357

// Get an instance of mysql we can use in the app
const mysql = require("mysql2");

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_etzelmik', // example: cs340_MyOnidIsBilboBaggins
    password: '9346', // last 4 of your OSU ID number
    database: 'cs340_etzelmik' // should be same as user
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;
