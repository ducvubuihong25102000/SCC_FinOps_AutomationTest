Feature: CR119627 - Provide credit controller ID for Credit pools

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        # When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage  
    
    Scenario: Verify that as [SCC User Role] can see the new SCC Credit Controller IDs table has been configured
        Given 122519 User is on Credit and Controller IDs page
        Then 122519 Verify User is able to see two new fields
    
    Scenario: Verify that as [SCC User Role] can create Unique data for Credit ControllerIDs table
        Given 122520 User is on Credit and Controller IDs page
        Then 122520 Verify User is able to create scc credit collection record

    Scenario: Verify that as [SCC User Role] can see the new SCC Branch to credit controller mapping table has been configured
        Given 122521 User is on SCC Branch to credit controller mapping page
        Then 122521 Verify User is able to see three new fields

    Scenario: Verify that as [SCC User Role] can see the new SCC Branch to credit controller mapping table has been configured
        Given 122522 User is on SCC Branch to credit controller mapping page
        Then 122522 Verify User is able to create scc branch to credit controller