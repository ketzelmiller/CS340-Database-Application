// Citation for the following code:
// Date: 3/2/2026
// Copied and Expanded from Course Code
// Source URL: https://canvas.oregonstate.edu/courses/2031764/assignments/10323319?module_item_id=26243357
// Citation for calling stored procedures within routes
// Source URL: https://www.geeksforgeeks.org/node-js/how-to-create-and-use-stored-procedures-in-mysql-with-nodejs/
// Citation for SQL OUT parameters

// --------- NEW DB CONNECTOR CODE 2/24/26 ------------
const db = require('./db-connector');
const MY_ONID = "cs340_etzelmik";

// Express library used to create a web server that will listen and respond to API calls from the frontend
const express = require('express');

// Instantiate an express object to interact with the server
const app = express();

// Middleware to allow cross-origin requests
const cors = require('cors');

// Set a port in the range: 1024 < PORT < 65535
//const PORT = process.env.PORT || 28542;
const PORT = "http://localhost:3001"

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
app.get('/reset', async (req, res) => {
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
        const[rows] = await db.query('CALL sp_get_all_branches();')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch branches.' })
    }
});


// --- READ: ADVISORS ---
app.get('/advisors', async(req, res) => {
    try{
        const[rows] = await db.query('CALL sp_get_all_advisors();')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch advisors.' })
    }
});


// ---------- DROPDOWNS ----------
app.get('/dropdown/branches', async(req, res) => {
    try{
        const [rows] = await db.query('CALL sp_get_dropdown_branches();')
        res.send(rows[0])
    }catch(err){
        console.error(err)
        res.status(500).send({ error: "Failed to fetch branch dropdown." })
    }
});


// --- READ: CLIENTS ---
app.get('/clients', async(req, res) => {
    try{
        const[rows] = await db.query('CALL sp_get_all_clients();')
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch clients.' })
    }
});

// --- READ: SERVICE LEVELS ---
app.get('/serviceLevels', async(req, res) => {
    try{
        const[rows] = await db.query('CALL sp_get_all_service_levels();')
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
        const[rows] = await db.query(`CALL sp_get_all_assignments();`)
        res.send(rows)
    }catch(err){
        console.error(err)
        res.status(500).send({ error: 'Failed to fetch assignments.' })
    }
});

// --- DELETE BRANCH ---
app.delete('/branches/:branchID', async (req, res) => {
  try {
    // DEBUGGING
    console.log("DELETE /branches on ID", req.params.branchID)
    const branchID = parseInt(req.params.branchID, 10);
    if (Number.isNaN(branchID)) return res.status(400).send({ error: 'Invalid branchID' });

    await db.query('CALL sp_delete_branch(?);', [branchID]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to delete branch.' });
  }
});

// --- DELETE ADVISOR ---
app.delete('/advisors/:advisorID', async (req, res) => {
    //DEGUBBING
    console.log("DELETE /advisors on ID", req.params.advisorID)
  try {
    const advisorID = parseInt(req.params.advisorID, 10);
    if (Number.isNaN(advisorID)) return res.status(400).send({ error: 'Invalid advisorID' });

    await db.query('CALL sp_delete_advisor(?);', [advisorID]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to delete advisor.' });
  }
});

// --- DELETE CLIENTS ---
app.delete('/clients/:clientID', async (req, res) => {
    //DEGUBBING
    console.log("DELETE /clients on ID", req.params.clientID)
  try {
    const clientID = parseInt(req.params.clientID, 10);
    if (Number.isNaN(clientID)) return res.status(400).send({ error: 'Invalid clientID' });

    await db.query('CALL sp_delete_client(?);', [clientID]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to delete client.' });
  }
});

// --- DELETE SERVICE LEVEL ---
app.delete('/serviceLevels/:serviceLevelID', async (req, res) => {
    //DEGUBBING
    console.log("DELETE /serviceLevel on ID", req.params.serviceLevelID)
  try {
    const serviceLevelID = parseInt(req.params.serviceLevelID, 10);
    if (Number.isNaN(serviceLevelID)) return res.status(400).send({ error: 'Invalid serviceLevelID' });

    await db.query('CALL sp_delete_service_level(?);', [serviceLevelID]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to delete service level.' });
  }
});

// --- DELETE ASSIGNMENT ---
app.delete('/assignments/:assignmentID', async (req, res) => {
    //DEGUBBING
    console.log("DELETE /assignment on ID", req.params.assignmentID)
  try {
    const assignmentID = parseInt(req.params.assignmentID, 10);
    if (Number.isNaN(assignmentID)){
      return res.status(400).send({ error: 'Invalid assignmentID' });  
    } 

    await db.query('CALL sp_delete_assignment(?);', [assignmentID]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to delete assignment.' });
  }
});


// --- POST BRANCHES ---
app.post('/branches', async(req, res) =>{
    // DEBUGGING
    console.log("POST /branches", req.body)
    try{
        const { branchName, city, state } = req.body

        if(!branchName || !city || !state){
            return res.status(400).send({ error: "Error: Missing required fields." })
        }

        const rows = await db.query(
            // @new_id = dummy variable to store id in the procedure
            'CALL sp_create_branch(?, ?, ?, @new_id)', [branchName, city, state]
        )

        res.status(201).send({
            data: rows
        })

    } catch(err){
        console.error(err)
        res.status(500).send({ error: "Failed to create branch." })
    }
});

// --- POST ADVISORS ---
app.post('/advisors', async(req, res) =>{
    // DEBUGGING
    console.log("POST /advisors", req.body)
    try{
        const { firstName, lastName, email, branchID } = req.body

        if(!firstName || !lastName || !email || ! branchID ){
            return res.status(400).send({ error: "Error: Missing required fields." })
        }

        const rows = await db.query(
            // @new_id = dummy variable to store id in the procedure
            'CALL sp_create_advisor(?, ?, ?, ?, @new_id)', [firstName, lastName, email, branchID]
        )

        res.status(201).send({
            data: rows
        })

    } catch(err){
        console.error(err)
        res.status(500).send({ error: "Failed to create advisor." })
    }
});

// --- POST CLIENTS ---
app.post('/clients', async(req, res) =>{
    // DEBUGGING
    console.log("POST /clients", req.params.clientID)
    try{
        const { firstName, lastName, email, dateOfBirth } = req.body

        if(!firstName || !lastName || !email || ! dateOfBirth ){
            return res.status(400).send({ error: "Error: Missing required fields." })
        }

        const rows = await db.query(
            // @new_id = dummy variable to store id in the procedure
            'CALL sp_create_client(?, ?, ?, ?, @new_id)', [firstName, lastName, email, dateOfBirth]
        )

        res.status(201).send({
            data: rows
        })

    } catch(err){
        console.error(err)
        res.status(500).send({ error: "Failed to create client." })
    }
});

// --- POST SERVICE LEVEL ---
app.post('/serviceLevels', async(req, res) =>{
    // DEBUGGING
    console.log("POST /serviceLevels", req.params.serviceLevelID)
    try{
        const { serviceLevelName, description } = req.body

        if(!serviceLevelName || !description ){
            return res.status(400).send({ error: "Error: Missing required fields." })
        }

        const rows = await db.query(
            // @new_id = dummy variable to store id in the procedure
            'CALL sp_create_service_level(?, ?, @new_id)', [serviceLevelName, description]
        )

        res.status(201).send({
            data: rows
        })

    } catch(err){
        console.error(err)
        res.status(500).send({ error: "Failed to create service level." })
    }
});


// --- POST ASSIGNMENTS ---
app.post('/assignments', async(req, res) =>{
    // DEBUGGING
    console.log("POST /assignments", req.params.assignmentID)
    try{
        const { advisorID, clientID, serviceLevelID, startDate, endDate } = req.body

        if(!advisorID || !clientID || !serviceLevelID || ! startDate ){
            return res.status(400).send({ error: "Error: Missing required fields." })
        }

        const rows = await db.query(
            // @new_id = dummy variable to store id in the procedure
            'CALL sp_create_assignment(?, ?, ?, ?, ?, @new_id)', [advisorID, clientID, serviceLevelID, startDate, endDate || null]
        )

        res.status(201).send({
            data: rows
        })

    } catch(err){
        console.error(err)
        res.status(500).send({ error: "Failed to create assignment." })
    }
});

// --- UPDATE BRANCHES ---
app.put('/branches/:branchID', async(req, res) => {
    //DEBUGGING
    console.log("UPDATE /branches/:branchID", req.params.branchID)
    try{
        const branchID = req.params.branchID
        const { branchName, city, state } = req.body

        if(!branchName || !city || !state){
            return res.status(400).send({ error: "Error: Missing required fields." })
        }
        
        const rows = await db.query(
            'CALL sp_update_branch(?, ?, ?, ?)', 
            [branchID, branchName, city, state]
        )

        res.status(200).send({
            data: rows
        })

    }catch(err){
        console.log(err)
        res.status(500).send({ error: "Failed to update branch" })
    }
});



// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');   
});
    
    
    
    
    
    
    
    
    
    
    
    



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
