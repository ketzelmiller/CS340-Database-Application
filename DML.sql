-- Queries for Branches
    -- Get query to populate dropdown
    SELECT branchID, branchName FROM Branches;
    -- Get query to list all branches
    SELECT branchID, branchName, city, state FROM Branches;
    -- Insert query
    INSERT INTO Branches (branchName, city, state) 
    VALUES (@branchName, @city, @state);
    -- Update query
    UPDATE Branches 
    SET branchName = @branchName, city = @city, state = @state
    WHERE branchID = @branchIDFromForm;
    -- Delete query
    DELETE FROM Branches WHERE branchID = @branchIDFromForm;

-- Queries for Advisors
    -- Get query to populate dropdown (Using firstName+lastName since the combination must be unique)
    SELECT advisorID, CONCAT(firstName, ' ', lastName) FROM Advisors;
    -- Get query to list all advisors
    SELECT Advisors.advisorID, Advisors.firstName, Advisors.lastName, Advisors.email, Branches.branchName 
    FROM Advisors 
    INNER JOIN Branches ON Advisors.branchID = Branches.branchID;
    -- Insert query
    INSERT INTO Advisors (firstName, lastName, email, branchID) 
    VALUES (@firstName, @lastName, @email, @branchIDFromDropdown);
    -- Update query
    UPDATE Advisors 
    SET firstName = @firstName, lastName = @lastName, email = @email, branchID = @branchIDFromDropdown
    WHERE advisorID = @advisorIDFromForm;
    -- Delete query
    DELETE FROM Advisors WHERE advisorID = @advisorIDFromForm;

-- Queries for Clients
    -- Get query to populate dropdown (Using firstName+lastName since the combination must be unique)
    SELECT clientID, CONCAT(firstName, ' ', lastName) FROM Clients;
    -- Get query to list all clients
    SELECT clientID, firstName, lastName, email, dateOfBirth FROM Clients;
    -- Insert query
    INSERT INTO Clients (firstName, lastName, email, dateOfBirth) 
    VALUES (@firstName, @lastName, @email, @dateOfBirth);
    -- Update query
    UPDATE Clients 
    SET firstName = @firstName, lastName = @lastName, email = @email, dateOfBirth = @dateOfBirth
    WHERE clientID = @clientIDFromForm;
    -- Delete query
    DELETE FROM Clients WHERE clientID = @clientIDFromForm;

-- Queries for Service Levels
    -- Get query to populate dropdown
    SELECT serviceLevelID, serviceLevelName FROM ServiceLevels;
    -- Get query to list all service levels
    SELECT serviceLevelID, serviceLevelName, description FROM ServiceLevels;
    -- Insert query
    INSERT INTO ServiceLevels (serviceLevelName, description) 
    VALUES (@serviceLevelName, @description);
    -- Update query
    UPDATE ServiceLevels 
    SET serviceLevelName = @serviceLevelName, description = @description
    WHERE serviceLevelID = @serviceLevelIDFromForm;
    -- Delete query
    DELETE FROM ServiceLevels WHERE serviceLevelID = @serviceLevelIDFromForm;

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
    ORDER BY Advisors.firstName ASC;
    -- Insert query
    INSERT INTO AdvisorClientAssignments (advisorID, clientID, serviceLevelID, relationshipStartDate, relationshipEndDate) 
    VALUES (@advisorIDFromForm, @clientIDFromForm, @serviceLevelIDFromForm, @relationshipStartDate, @relationshipEndDate);
    -- Update query
    UPDATE AdvisorClientAssignments 
    SET advisorID = @advisorIDFromForm, clientID = @clientIDFromForm, serviceLevelID = @serviceLevelIDFromForm, relationshipStartDate = @relationshipStartDate, relationshipEndDate = @relationshipEndDate
    WHERE assignmentID = @assignmentIDFromForm;
    -- Delete query
    DELETE FROM AdvisorClientAssignments WHERE assignmentID = @assignmentIDFromForm;