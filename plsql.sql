-- Citation for the following get dropdown functions:
-- Date: 2/27/2026
-- Adapted from
-- Source URL: https://stackoverflow.com/questions/8307939/how-to-retrieve-multiple-rows-from-stored-procedure-in-mysql
-- ---------------- --
-- Dropdown Queries --
-- ---------------- --
-- Get Dropdown Branches
DROP PROCEDURE IF EXISTS sp_get_dropdown_branches;
DELIMITER //
CREATE PROCEDURE sp_get_dropdown_branches(

)
BEGIN
    SELECT branchID, branchName from Branches;

    -- Example of how to get the necessary information for a dropdown of branches:
        -- CALL sp_get_dropdown_branches();
END //
DELIMITER ;

-- Get Dropdown Advisors
DROP PROCEDURE IF EXISTS sp_get_dropdown_advisors;
DELIMITER //
CREATE PROCEDURE sp_get_dropdown_advisors(

)
BEGIN
    SELECT advisorID, CONCAT(firstName, ' ', lastName) FROM Advisors;

    -- Example of how to get the necessary information for a dropdown of advisors:
        -- CALL sp_get_dropdown_advisors();
END //
DELIMITER ;

-- Get Dropdown Clients
DROP PROCEDURE IF EXISTS sp_get_dropdown_clients;
DELIMITER //
CREATE PROCEDURE sp_get_dropdown_clients(

)
BEGIN
    SELECT clientID, CONCAT(firstName, ' ', lastName) FROM Clients;

    -- Example of how to get the necessary information for a dropdown of clients:
        -- CALL sp_get_dropdown_clients();
END //
DELIMITER ;

-- Get Dropdown Clients
DROP PROCEDURE IF EXISTS sp_get_dropdown_service_levels;
DELIMITER //
CREATE PROCEDURE sp_get_dropdown_service_levels(

)
BEGIN
    SELECT serviceLevelID, serviceLevelName FROM ServiceLevels;

    -- Example of how to get the necessary information for a dropdown of service levels:
        -- CALL sp_get_dropdown_service_levels();
END //
DELIMITER ;



-- Citation for the following get dropdown functions:
-- Date: 2/27/2026
-- Adapted from
-- Source URL: https://stackoverflow.com/questions/8307939/how-to-retrieve-multiple-rows-from-stored-procedure-in-mysql
-- --------------- --
-- Get All Queries --
-- --------------- --
-- Get All from Branches
DROP PROCEDURE IF EXISTS sp_get_all_branches;
DELIMITER //
CREATE PROCEDURE sp_get_all_branches(

)
BEGIN
    SELECT branchID, branchName, city, state FROM Branches;

    -- Example of how to get all data from branches:
        -- CALL sp_get_all_branches();
END //
DELIMITER ;

-- Get All from Advisors
DROP PROCEDURE IF EXISTS sp_get_all_advisors;
DELIMITER //
CREATE PROCEDURE sp_get_all_advisors(

)
BEGIN
    SELECT Advisors.advisorID, Advisors.firstName, Advisors.lastName, Advisors.email, Branches.branchName 
    FROM Advisors 
    INNER JOIN Branches ON Advisors.branchID = Branches.branchID;

    -- Example of how to get all data from advisors:
        -- CALL sp_get_all_advisors();
END //
DELIMITER ;

-- Get All from Clients
DROP PROCEDURE IF EXISTS sp_get_all_clients;
DELIMITER //
CREATE PROCEDURE sp_get_all_clients(

)
BEGIN
    SELECT clientID, firstName, lastName, email, dateOfBirth FROM Clients;

    -- Example of how to get all data from clients:
        -- CALL sp_get_all_clients();
END //
DELIMITER ;

-- Get All from Clients
DROP PROCEDURE IF EXISTS sp_get_all_service_levels;
DELIMITER //
CREATE PROCEDURE sp_get_all_service_levels(

)
BEGIN
    SELECT serviceLevelID, serviceLevelName, description FROM ServiceLevels;

    -- Example of how to get all data from service levels:
        -- CALL sp_get_all_service_levels();
END //
DELIMITER ;

-- Get All from Assignments
DROP PROCEDURE IF EXISTS sp_get_all_assignments;
DELIMITER //
CREATE PROCEDURE sp_get_all_assignments(

)
BEGIN
    SELECT
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
    ORDER BY AdvisorClientAssignments.assignmentID ASC;

    -- Example of how to get all data from assignments:
        -- CALL sp_get_all_assignments();
END //
DELIMITER ;



-- Citation for the following insert stored procedures:
-- Date: 2/22/2026
-- Adapted from
-- Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
-- -------------- --
-- Insert Queries --
-- -------------- --
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



-- Citation for the following update stored procedures:
-- Date: 2/27/2026
-- Original Work
-- -------------- --
-- Update Queries --
-- -------------- --
-- Update Branch
DROP PROCEDURE IF EXISTS sp_update_branch;
DELIMITER //
CREATE PROCEDURE sp_update_branch(
    IN p_branchID INT,
    IN p_branchName VARCHAR(255), 
    IN p_city VARCHAR(255), 
    IN p_state CHAR(2))
BEGIN
    UPDATE Branches 
    SET branchName = p_branchName, city = p_city, state = p_state
    WHERE branchID = p_branchID;

    -- Example of how to update a specific branch
        -- CALL sp_update_branch(5, 'Texas Branch', 'Houston', 'TX');
END //
DELIMITER ;

-- Update Advisor
DROP PROCEDURE IF EXISTS sp_update_advisor;
DELIMITER //
CREATE PROCEDURE sp_update_advisor(
    IN p_advisorID INT,
    IN p_firstName VARCHAR(255), 
    IN p_lastName VARCHAR(255), 
    IN p_email VARCHAR(255), 
    IN p_branchID INT)
BEGIN
    UPDATE Advisors 
    SET firstName = p_firstName, lastName = p_lastName, email = p_email, branchID = p_branchID
    WHERE advisorID = p_advisorID;

    -- Example of how to update a specific advisor:
        -- CALL sp_update_advisor(3, 'Gul', 'Dukat', 'guldukat@gmail.com', 3);
END //
DELIMITER ;

-- Update Client
DROP PROCEDURE IF EXISTS sp_update_client;
DELIMITER //
CREATE PROCEDURE sp_update_client(
    IN p_clientID INT,
    IN p_firstName VARCHAR(255), 
    IN p_lastName VARCHAR(255), 
    IN p_email VARCHAR(255), 
    IN p_dateOfBirth DATE)
BEGIN
    UPDATE Clients 
    SET firstName = p_firstName, lastName = p_lastName, email = p_email, dateOfBirth = p_dateOfBirth
    WHERE clientID = p_clientID;

    -- Example of how to update a specific client:
        -- CALL sp_update_client(1, 'Leonard', 'McCoy', 'leonardmccoy@gmail.com', 19990120);
        
END //
DELIMITER ;

-- Update Service Level
DROP PROCEDURE IF EXISTS sp_update_service_level;
DELIMITER //
CREATE PROCEDURE sp_update_service_level(
    IN p_serviceLevelID INT,
    IN p_serviceLevelName VARCHAR(255), 
    IN p_description VARCHAR(255))
BEGIN
    UPDATE ServiceLevels 
    SET serviceLevelName = p_serviceLevelName, description = p_description
    WHERE serviceLevelID = p_serviceLevelID;

    -- Example of how to update a specific service level:
        -- CALL sp_update_service_level(1, 'Example Service Level Title', 'This service level does things');
END //
DELIMITER ;

-- Update Assignment
DROP PROCEDURE IF EXISTS sp_update_assignment;
DELIMITER //
CREATE PROCEDURE sp_update_assignment(
    IN p_assignmentID INT,
    IN p_advisorID INT,
    IN p_clientID INT,
    IN p_serviceLevelID INT,
    IN p_relationshipStartDate DATE,
    IN p_relationshipEndDate DATE)
BEGIN
    UPDATE AdvisorClientAssignments 
    SET advisorID = p_advisorID, clientID = p_clientID, serviceLevelID = p_serviceLevelID, relationshipStartDate = p_relationshipStartDate, relationshipEndDate = p_relationshipEndDate
    WHERE assignmentID = p_assignmentID;

    -- Example of how to update a specific assignment:
        -- CALL sp_update_assignment(1, 1, 1, 2, 20250127, NULL);
END //
DELIMITER ;



-- Citation for the following delete stored procedures:
-- Date: 2/27/2026
-- Original Work
-- -------------- --
-- Delete Queries --
-- -------------- --
-- Delete Branch
DROP PROCEDURE IF EXISTS sp_delete_branch;
DELIMITER //
CREATE PROCEDURE sp_delete_branch(
    IN p_branchID INT)
BEGIN
    DELETE FROM Branches WHERE branchID = p_branchID;

    -- Example of how to delete a specific branch
        -- CALL sp_delete_branch(3);
END //
DELIMITER ;

-- Delete Advisor
DROP PROCEDURE IF EXISTS sp_delete_advisor;
DELIMITER //
CREATE PROCEDURE sp_delete_advisor(
    IN p_advisorID INT)
BEGIN
    DELETE FROM Advisors WHERE advisorID = p_advisorID;

    -- Example of how to delete a specific advisor:
        -- CALL sp_delete_advisor(2);
END //
DELIMITER ;

-- Delete Client
DROP PROCEDURE IF EXISTS sp_delete_client;
DELIMITER //
CREATE PROCEDURE sp_delete_client(
    IN p_clientID INT)
BEGIN
    DELETE FROM Clients WHERE clientID = p_clientID;

    -- Example of how to delete a specific client:
        -- CALL sp_delete_client(2);
        
END //
DELIMITER ;

-- Delete Service Level
DROP PROCEDURE IF EXISTS sp_delete_service_level;
DELIMITER //
CREATE PROCEDURE sp_delete_service_level(
    IN p_serviceLevelID INT)
BEGIN
    DELETE FROM ServiceLevels WHERE serviceLevelID = p_serviceLevelID;

    -- Example of how to delete a specific service level:
        -- CALL sp_delete_service_level(3);
END //
DELIMITER ;

-- Delete Assignment
DROP PROCEDURE IF EXISTS sp_delete_assignment;
DELIMITER //
CREATE PROCEDURE sp_delete_assignment(
    IN p_assignmentID INT)
BEGIN
    DELETE FROM AdvisorClientAssignments WHERE assignmentID = p_assignmentID;

    -- Example of how to delete a specific assignment:
        -- CALL sp_delete_assignment(2);
END //
DELIMITER ;