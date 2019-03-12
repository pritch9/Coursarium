-- This script is designed to test inserting data to the database
-- First, we insert a new school.  This will always work, because the fields are all not null, and there are no server-side checks to see if this school exists
-- We will manually accept schools for now.  

INSERT INTO `ClassHub-Development`.`School` (School_Name, School_Address, School_City, State, School_Zip_Code) 
VALUES ('University at Buffalo (SUNY)', 'University at Buffalo', 'Buffalo', 'New York', '14260');

INSERT INTO `ClassHub-Development`.`Users` (school_id, email, password, salt, first_name, last_name, full_name) 
VALUES (1, 'example@example.com', '$2y$12$W2M.qDOuT5GkWFQymMMDseM7TBEp.iNBaN2Kinr7sb8YPSltHIsMG', 
					'P4$$W0R1)S4LT***', 'test', 'user', 'user, test');

SELECT * FROM `ClassHub-Development`.`Users`
CROSS JOIN `ClassHub-Development`.`School` ON `ClassHub-Development`.`Users`.school_id = `ClassHub-Development`.`School`.School_ID
 WHERE email = 'example@example.com';