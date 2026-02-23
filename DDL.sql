/*Group 26 Lucca Truitt/Kyle Etzelmiller*/

DROP PROCEDURE IF EXISTS sp_create_database;
DELIMITER //
CREATE PROCEDURE sp_create_database()
BEGIN

-- Disable Commits and Foreign Key Checks
    SET FOREIGN_KEY_CHECKS=0;

    -- Create Branches Table
    CREATE OR REPLACE TABLE Branches (
        branchID int NOT NULL AUTO_INCREMENT,
        branchName varchar(100) NOT NULL UNIQUE,
        city varchar(100) NOT NULL,
        state char(2) NOT NULL,
        PRIMARY KEY (branchID)
    );

    -- Create Advisor Table
    CREATE OR REPLACE TABLE Advisors (
        advisorID int NOT NULL AUTO_INCREMENT,
        firstName varchar(30) NOT NULL,
        lastName varchar(30) NOT NULL,
        email varchar(100) UNIQUE NOT NULL,
        branchID int,
        PRIMARY KEY (advisorID),
        FOREIGN KEY (branchID) REFERENCES Branches(branchID) ON DELETE SET NULL, -- When branch is deleted, advisor branchID is set to NULL
        CONSTRAINT fullName UNIQUE (firstName, lastName)
    );

    -- Create Clients Table
    CREATE OR REPLACE TABLE Clients (
        clientID int NOT NULL AUTO_INCREMENT,
        firstName varchar(30) NOT NULL,
        lastName varchar(30) NOT NULL,
        email varchar(100) UNIQUE NOT NULL,
        dateOfBirth date NOT NULL,
        PRIMARY KEY (clientID),
        CONSTRAINT fullName UNIQUE (firstName, lastName)
    );

    -- Create ServiceLevels Table
    CREATE OR REPLACE TABLE ServiceLevels (
        serviceLevelID int NOT NULL AUTO_INCREMENT,
        serviceLevelName varchar(50) UNIQUE NOT NULL,
        description varchar(255) NOT NULL,
        PRIMARY KEY (serviceLevelID)
    );


    -- Create AdvisorClientAssignments Table
    CREATE OR REPLACE TABLE AdvisorClientAssignments (
        assignmentID int NOT NULL AUTO_INCREMENT,
        advisorID int NOT NULL,
        clientID int NOT NULL,
        serviceLevelID int NOT NULL,
        relationshipStartDate date NOT NULL,
        relationshipEndDate date,
        PRIMARY KEY (assignmentID),
        FOREIGN KEY (advisorID) REFERENCES Advisors(advisorID) ON DELETE CASCADE,
        FOREIGN KEY (clientID) REFERENCES Clients(clientID) ON DELETE CASCADE,
        FOREIGN KEY (serviceLevelID) REFERENCES ServiceLevels(serviceLevelID) ON DELETE CASCADE
    );

    -- Insert Data Into Branches Table
    INSERT INTO Branches (branchName, city, state) VALUES 
    ('Hawaii Branch',        'Honolulu',      'HI'), -- Branch has no advisors
    ('Massachusetts Branch', 'Boston',        'MA'), -- Branch has two advisor
    ('Oregon Branch',        'Salem',         'OR'), -- Branch has one advisor
    ('New York Branch',      'New York City', 'NY'); -- Branch has three advisor

    -- Insert Data Into Advisors Table
    INSERT INTO Advisors (firstName, lastName, email, BranchID) VALUES
    ('James',    'Kirk',    'jamestkirk@gmail.com',     (SELECT branchID FROM Branches WHERE branchName = 'Massachusetts Branch')),
    ('Jean-Luc', 'Picard',  'jeanlucpicard@gmail.com',  (SELECT branchID FROM Branches WHERE branchName = 'Oregon Branch')),
    ('Benjamin', 'Sisko',   'bensisko@gmail.com',       (SELECT branchID FROM Branches WHERE branchName = 'New York Branch')),
    ('Kathryn',  'Janeway', 'kathrynjaneway@gmail.com', (SELECT branchID FROM Branches WHERE branchName = 'Massachusetts Branch')),
    ('Jonathan', 'Archer',  'jonathanarcher@gmail.com', (SELECT branchID FROM Branches WHERE branchName = 'New York Branch')),
    ('Elim',     'Garak',   'elimgarak@gmail.com',      (SELECT branchID FROM Branches WHERE branchName = 'New York Branch')); -- Has no clients

    -- Insert Data Into Clients Table
    INSERT INTO Clients (firstName, lastName, email, dateOfBirth) VALUES
    ('Montgomery', 'Scott',    'montgomeryscott@gmail.com', 19200303),
    ('Hikaru',     'Sulu',     'hikarusulu@gmail.com',      19370420),
    ('Pavel',      'Chekov',   'pavelchekov@gmail.com',     19360914),

    ('William',    'Riker',    'williamtriker@gmail.com',   19520819),
    ('Deanna',     'Troi',     'deannatroi@gmail.com',      19550329),
    ('Geordi',     'La Forge', 'geordilaforge@gmail.com',   19570216),

    ('Jadzia',     'Dax',      'jadziadax@gmail.com',       19631119),
    ('Kira',       'Nerys',    'kiranerys@gmail.com',       19570726),

    ('Thomas',     'Paris',    'tomparis@gmail.com',        19641109),
    ('Harry',      'Kim',      'harrykim@gmail.com',        19681215),

    ('Charles',    'Tucker',   'charlestucker@gmail.com',   19690319),
    ('Hoshi',      'Sato',     'hoshisato@gmail.com',       19780709),

    ('Ro',         'Laren',    'rolaren@gmail.com',         19650108), -- Has no advisors
    ('Winn',       'Adami',    'winnadami@gmail.com',       19340722); -- Has no advisors

    -- Insert Data Into ServiceLevels Table
    INSERT INTO ServiceLevels (serviceLevelName, description) VALUES
    ('Planning Only',        'Low-Level planning guidance. Advisors assist in creating estate plans, developing tax-advantaged investment vehicles, and the creation of new accounts.'),
    ('Managed Portfolio',    'High-Level portfolio management. Assets are controlled by the advisor who makes decisions and takes action on the clients'' behalf to maximize either rate of return, income, or protection of principal.'),
    ('Rebalancing Guidance', 'Intermediate-level portfolio overviews. Advisors discuss portfolio weights and assist clients in adjusting their asset mixes based on risk tolerance and prevailing market conditions.');

    -- Insert Data Into AdvisorClientAssignments Table
    INSERT INTO AdvisorClientAssignments (advisorID, clientID, serviceLevelID, relationshipStartDate, relationshipEndDate) VALUES
    ( -- James Kirk -> Montgomery Scott
        (SELECT advisorID FROM Advisors WHERE firstName = 'James' AND lastName = 'Kirk'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Montgomery' AND lastName = 'Scott'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Planning Only'), 
        20250127, 
        NULL
    ),
    ( -- Benjamin Sisko -> Montgomery Scott
        (SELECT advisorID FROM Advisors WHERE firstName = 'Benjamin' AND lastName = 'Sisko'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Montgomery' AND lastName = 'Scott'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Managed Portfolio'), 
        20250423, 
        20250712
    ),
    ( -- James Kirk -> Hikaru Sulu
        (SELECT advisorID FROM Advisors WHERE firstName = 'James' AND lastName = 'Kirk'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Hikaru' AND lastName = 'Sulu'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Planning Only'), 
        20250321, 
        20250718
    ),
    ( -- James Kirk -> Pavel Chekov
        (SELECT advisorID FROM Advisors WHERE firstName = 'James' AND lastName = 'Kirk'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Pavel' AND lastName = 'Chekov'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Managed Portfolio'), 
        20250312, 
        NULL
    ),

    ( -- Jean-Luc Picard -> William Riker
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jean-Luc' AND lastName = 'Picard'), 
        (SELECT clientID FROM Clients WHERE firstName = 'William' AND lastName = 'Riker'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Planning Only'), 
        20250422, 
        NULL
    ),
    ( -- Jean-Luc Picard -> Deanna Troi
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jean-Luc' AND lastName = 'Picard'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Deanna' AND lastName = 'Troi'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Rebalancing Guidance'), 
        20250819, 
        NULL
    ),
    ( -- Jean-Luc Picard -> Geordi La Forge
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jean-Luc' AND lastName = 'Picard'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Geordi' AND lastName = 'La Forge'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Managed Portfolio'), 
        20250903, 
        NULL
    ),
    ( -- Jonathan Archer -> Geordi La Forge
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jonathan' AND lastName = 'Archer'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Geordi' AND lastName = 'La Forge'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Rebalancing Guidance'), 
        20251204, 
        NULL
    ),

    ( -- Benjamin Sisko -> Jadzia Dax
        (SELECT advisorID FROM Advisors WHERE firstName = 'Benjamin' AND lastName = 'Sisko'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Jadzia' AND lastName = 'Dax'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Rebalancing Guidance'), 
        20250604, 
        20250607
    ),
    ( -- Benjamin Sisko -> Kira Nerys
        (SELECT advisorID FROM Advisors WHERE firstName = 'Benjamin' AND lastName = 'Sisko'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Kira' AND lastName = 'Nerys'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Planning Only'), 
        20250725, 
        20251029
    ),

    ( -- Kathryn Janeway -> Thomas Paris
        (SELECT advisorID FROM Advisors WHERE firstName = 'Kathryn' AND lastName = 'Janeway'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Thomas' AND lastName = 'Paris'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Managed Portfolio'), 
        20250117, 
        20250410
    ),
    ( -- Kathryn Janeway -> Harry Kim
        (SELECT advisorID FROM Advisors WHERE firstName = 'Kathryn' AND lastName = 'Janeway'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Harry' AND lastName = 'Kim'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Planning Only'), 
        20250403, 
        20250916
    ),
    ( -- James Kirk -> Thomas Paris
        (SELECT advisorID FROM Advisors WHERE firstName = 'James' AND lastName = 'Kirk'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Thomas' AND lastName = 'Paris'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Rebalancing Guidance'), 
        20250408, 
        NULL
    ),
    ( -- James Kirk -> Harry Kim
        (SELECT advisorID FROM Advisors WHERE firstName = 'James' AND lastName = 'Kirk'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Harry' AND lastName = 'Kim'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Managed Portfolio'), 
        20250809, 
        NULL
    ),

    ( -- Jonathan Archer -> Charles Tucker
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jonathan' AND lastName = 'Archer'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Charles' AND lastName = 'Tucker'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Planning Only'), 
        20250213, 
        NULL
    ),
    ( -- Jonathan Archer -> Hoshi Sato
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jonathan' AND lastName = 'Archer'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Hoshi' AND lastName = 'Sato'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Rebalancing Guidance'), 
        20250409, 
        NULL
    ),
    ( -- Jean-Luc Picard -> Hoshi Sato
        (SELECT advisorID FROM Advisors WHERE firstName = 'Jean-Luc' AND lastName = 'Picard'), 
        (SELECT clientID FROM Clients WHERE firstName = 'Hoshi' AND lastName = 'Sato'), 
        (SELECT serviceLevelID FROM ServiceLevels WHERE serviceLevelName = 'Rebalancing Guidance'), 
        20250405, 
        20250409
    );

    -- Enable Commits and Foreign Key Checks
    SET FOREIGN_KEY_CHECKS=1;
END //

DELIMITER ;
