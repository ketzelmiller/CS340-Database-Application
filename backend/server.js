
// --------- NEW DB CONNECTOR CODE 2/24/26 ------------
const db = require('./db-connector');
const MY_ONID = "etzelmik";



// Express library used to create a web server that will listen and respond to API calls from the frontend
const express = require('express');

// Instantiate an express object to interact with the server
const app = express();

// Middleware to allow cross-origin requests
const cors = require('cors');

// Set a port in the range: 1024 < PORT < 65535
const PORT = 4881;


// If on FLIP or classwork, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173
// EX (FLIP/classwork) http://classwork.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests, good thing to know

// --- ROUTE HANDLER --- 
app.get('/', async (req, res) => {
    try {
        // Define queries
        const query1 = 'DROP TABLE IF EXISTS diagnostic;';
        const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        const query3 = `INSERT INTO diagnostic (text) VALUES ("MySQL and React is working for ${MY_ONID}!")`;
        const query4 = 'SELECT * FROM diagnostic;';

        // Execute the queries
        await db.query(query1);
        await db.query(query2);
        await db.query(query3);

        // Get the results
        const [rows] = await db.query(query4);

        // Send back the results in JSON
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// --- RESET ROUTE ---
app.post('/reset', async (req, res) => {
    try{
        await db.query('CALL sp_create_database();')
        res.send({ message: 'Database reset successful' })
    } catch(err){
        console.error(err)
        res.status(500).send({ error: 'Reset Failed.' })
    }
});

// --- READ: BRANCHES ---
app.get('/branches', async(req, res) => {
    try{
        const[rows] = await db.query('SELECT branchID, branchName, city, state FROM Branches;')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch branches.' })
    }
});


// --- READ: ADVISORS ---
app.get('/advisors', async(req, res) => {
    try{
        const[rows] = await db.query('SELECT Advisors.advisorID, Advisors.firstName, Advisors.lastName, Advisors.email, Branches.branchName FROM Advisors INNER JOIN Branches ON Advisors.branchID = Branches.branchID;')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch advisors.' })
    }
});

// --- READ: CLIENTS ---
app.get('/clients', async(req, res) => {
    try{
        const[rows] = await db.query('SELECT clientID, firstName, lastName, email, dateOfBirth FROM Clients;')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch clients.' })
    }
});

// --- READ: SERVICE LEVELS ---
app.get('/serviceLevels', async(req, res) => {
    try{
        const[rows] = await db.query('SELECT serviceLevelID, serviceLevelName, description FROM ServiceLevels;')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch Service Levels.' })
    }
});

// NOTE FOR FUTURE SELF - Remember multi-line queries must use `` instead of ''
// --- READ: ASSIGNMENTS ---
app.get('/assignments', async(req, res) => {
    try{
        const[rows] = await db.query(`SELECT
        AdvisorClientAssignments.assignmentID AS "Assignment ID",
        CONCAT(Advisors.firstName, ' ', Advisors.lastName) AS 'Advisor Name', 
        CONCAT(Clients.firstName, ' ', Clients.lastName) AS 'Client Name', 
        ServiceLevels.serviceLevelName AS 'Service Level', 
        AdvisorClientAssignments.relationshipStartDate AS 'Start Date', 
        IFNULL(AdvisorClientAssignments.relationshipEndDate, 'Ongoing') AS 'End Date'
        FROM AdvisorClientAssignments
        INNER JOIN Advisors ON AdvisorClientAssignments.advisorID = Advisors.advisorID
        INNER JOIN Clients ON AdvisorClientAssignments.clientID = Clients.ClientID
        INNER JOIN ServiceLevels ON AdvisorClientAssignments.serviceLevelID = ServiceLevels.serviceLevelID
        ORDER BY Advisors.firstName ASC;`)
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch assignments.' })
    }
});


// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    



    /* ----------------- OLD CODE --------------------
    // ########################################
    // ########## SETUP
    
    // Database
    const db = require('./database/db-connector');
    
    // Express
    const express = require('express');
    const app = express();
    
    // Middleware
    const cors = require('cors');
    app.use(cors({ credentials: true, origin: "*" }));
    app.use(express.json()); // this is needed for post requests
    
    
    const PORT = 4881;
    
    // ########################################
    // ########## ROUTE HANDLERS
    
    // READ ROUTES
    app.get('/bsg-people', async (req, res) => {
        try {
            // Create and execute our queries
            // In query1, we use a JOIN clause to display the names of the homeworlds
            const query1 = `SELECT bsg_people.id, bsg_people.fname, bsg_people.lname, \
                bsg_planets.name AS 'homeworld', bsg_people.age FROM bsg_people \
                LEFT JOIN bsg_planets ON bsg_people.homeworld = bsg_planets.id;`;
            const query2 = 'SELECT * FROM bsg_planets;';
            const [people] = await db.query(query1);
            const [homeworlds] = await db.query(query2);
        
            res.status(200).json({ people, homeworlds });  // Send the results to the frontend
    
        } catch (error) {
            console.error("Error executing queries:", error);
            // Send a generic error message to the browser
            res.status(500).send("An error occurred while executing the database queries.");
        }
        
    });
    
    // ########################################
    // ########## LISTENER
    
    app.listen(PORT, function () {
        console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
    });
    */
});