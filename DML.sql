-- Queries for Branches
    -- Get query to populate dropdown
    SELECT branchID, branchName FROM Branches;
    -- Get query to list all branches
    SELECT branchID, branchName, city, state FROM Branches;
    -- Insert query
    INSERT INTO Branches (branchName, city, state) 
    VALUES (p_branchName, p_city, p_state);
    -- Update query
    UPDATE Branches 
    SET branchName = p_branchName, city = p_city, state = p_state
    WHERE branchID = p_branchIDFromForm;
    -- Delete query
    DELETE FROM Branches WHERE branchID = p_branchIDFromForm;

-- Queries for Advisors
    -- Get query to populate dropdown (Using firstName+lastName since the combination must be unique)
    SELECT advisorID, CONCAT(firstName, ' ', lastName) FROM Advisors;
    -- Get query to list all advisors
    SELECT Advisors.advisorID, Advisors.firstName, Advisors.lastName, Advisors.email, Branches.branchName 
    FROM Advisors 
    INNER JOIN Branches ON Advisors.branchID = Branches.branchID;
    -- Insert query
    INSERT INTO Advisors (firstName, lastName, email, branchID) 
    VALUES (p_firstName, p_lastName, p_email, p_branchIDFromDropdown);
    -- Update query
    UPDATE Advisors 
    SET firstName = p_firstName, lastName = p_lastName, email = p_email, branchID = p_branchIDFromDropdown
    WHERE advisorID = p_advisorIDFromForm;
    -- Delete query
    DELETE FROM Advisors WHERE advisorID = p_advisorIDFromForm;

-- Queries for Clients
    -- Get query to populate dropdown (Using firstName+lastName since the combination must be unique)
    SELECT clientID, CONCAT(firstName, ' ', lastName) FROM Clients;
    -- Get query to list all clients
    SELECT clientID, firstName, lastName, email, dateOfBirth FROM Clients;
    -- Insert query
    INSERT INTO Clients (firstName, lastName, email, dateOfBirth) 
    VALUES (p_firstName, p_lastName, p_email, p_dateOfBirth);
    -- Update query
    UPDATE Clients 
    SET firstName = p_firstName, lastName = p_lastName, email = p_email, dateOfBirth = p_dateOfBirth
    WHERE clientID = p_clientIDFromForm;
    -- Delete query
    DELETE FROM Clients WHERE clientID = p_clientIDFromForm;

-- Queries for Service Levels
    -- Get query to populate dropdown
    SELECT serviceLevelID, serviceLevelName FROM ServiceLevels;
    -- Get query to list all service levels
    SELECT serviceLevelID, serviceLevelName, description FROM ServiceLevels;
    -- Insert query
    INSERT INTO ServiceLevels (serviceLevelName, description) 
    VALUES (p_serviceLevelName, p_description);
    -- Update query
    UPDATE ServiceLevels 
    SET serviceLevelName = p_serviceLevelName, description = p_description
    WHERE serviceLevelID = p_serviceLevelIDFromForm;
    -- Delete query
    DELETE FROM ServiceLevels WHERE serviceLevelID = p_serviceLevelIDFromForm;

-- Queries for Assignments
    -- Get query to list all assignments
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
    -- Insert query
    INSERT INTO AdvisorClientAssignments (advisorID, clientID, serviceLevelID, relationshipStartDate, relationshipEndDate) 
    VALUES (p_advisorIDFromForm, p_clientIDFromForm, p_serviceLevelIDFromForm, p_relationshipStartDate, p_relationshipEndDate);
    -- Update query
    UPDATE AdvisorClientAssignments 
    SET advisorID = p_advisorIDFromForm, clientID = p_clientIDFromForm, serviceLevelID = p_serviceLevelIDFromForm, relationshipStartDate = p_relationshipStartDate, relationshipEndDate = p_relationshipEndDate
    WHERE assignmentID = p_assignmentIDFromForm;
    -- Delete query
    DELETE FROM AdvisorClientAssignments WHERE assignmentID = p_assignmentIDFromForm;