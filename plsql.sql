-- Citation for the following function:
-- Date: 2/22/2026
-- Adapted from
-- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436


-- Create Branch
DROP PROCEDURE IF EXISTS sp_create_branch;
DELIMITER //
CREATE PROCEDURE sp_create_branch(
    IN p_branchName VARCHAR(255), 
    IN p_city VARCHAR(255), 
    IN p_state CHAR(2), 
    OUT p_branchID INT)
BEGIN
    INSERT INTO Branches (branchName, city, state) 
    VALUES (p_branchName, p_city, p_state);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_branchID;
    -- Display the ID of the last inserted branch.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created branch:
        -- CALL sp_create_branch('Texas Branch', 'Austin', 'TX', @new_id);
        -- SELECT @new_id AS 'New Branch ID';
END //
DELIMITER ;

-- Create Advisor
DROP PROCEDURE IF EXISTS sp_create_advisor;
DELIMITER //
CREATE PROCEDURE sp_create_advisor(
    IN p_firstName VARCHAR(255), 
    IN p_lastName VARCHAR(255), 
    IN p_email VARCHAR(255), 
    IN p_branchID INT,
    OUT p_advisorID INT)
BEGIN
    INSERT INTO Advisors (firstName, lastName, email, branchID) 
    VALUES (p_firstName, p_lastName, p_email, p_branchID);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_advisorID;
    -- Display the ID of the last inserted advisor.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created advisor:
        -- CALL sp_create_advisor('Lucca', 'Truitt', 'lt@gmail.com', 1, @new_id);
        -- SELECT @new_id AS 'New Advisor ID';
END //
DELIMITER ;

-- Create Client
DROP PROCEDURE IF EXISTS sp_create_client;
DELIMITER //
CREATE PROCEDURE sp_create_client(
    IN p_firstName VARCHAR(255), 
    IN p_lastName VARCHAR(255), 
    IN p_email VARCHAR(255), 
    IN p_dateOfBirth DATE,
    OUT p_clientID INT)
BEGIN
    INSERT INTO Clients (firstName, lastName, email, dateOfBirth) 
    VALUES (p_firstName, p_lastName, p_email, p_dateOfBirth);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_clientID;
    -- Display the ID of the last inserted client.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created client:
        -- CALL sp_create_client('Lucca', 'Truitt', 'lt@gmail.com', 20030627, @new_id);
        -- SELECT @new_id AS 'New Client ID';
END //
DELIMITER ;

-- Create Service Level
DROP PROCEDURE IF EXISTS sp_create_service_level;
DELIMITER //
CREATE PROCEDURE sp_create_service_level(
    IN p_serviceLevelName VARCHAR(255), 
    IN p_description VARCHAR(255),
    OUT p_serviceLevelID INT)
BEGIN
    INSERT INTO ServiceLevels (serviceLevelName, description) 
    VALUES (p_serviceLevelName, p_description);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_serviceLevelID;
    -- Display the ID of the last inserted service level.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created service level:
        -- CALL sp_create_service_level('Example Service Level Title', 'This service level does things', @new_id);
        -- SELECT @new_id AS 'New Service Level ID';
END //
DELIMITER ;

-- Create Assignment
DROP PROCEDURE IF EXISTS sp_create_assignment;
DELIMITER //
CREATE PROCEDURE sp_create_assignment(
    IN p_advisorID INT,
    IN p_clientID INT,
    IN p_serviceLevelID INT,
    IN p_relationshipStartDate DATE,
    IN p_relationshipEndDate DATE,
    OUT p_assignmentID INT)
BEGIN
    INSERT INTO AdvisorClientAssignments (advisorID, clientID, serviceLevelID, relationshipStartDate, relationshipEndDate) 
    VALUES (p_advisorID, p_clientID, p_serviceLevelID, p_relationshipStartDate, p_relationshipEndDate);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_assignmentID;
    -- Display the ID of the last inserted assignment.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created assignment:
        -- CALL sp_create_assignment(1, 3, 2, 20250725, 20251029, @new_id);
        -- SELECT @new_id AS 'New Assignment ID';
END //
DELIMITER ;