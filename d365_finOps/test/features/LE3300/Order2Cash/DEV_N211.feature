Feature: DEV-N211 - List all invoices not sent automatically

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        # When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage  
    
    Scenario: Verify that [SCC User Role] the user can see the new fields on Sales invoice header with Manually processed is editable
        Given 92432 User already have sale invoice which have method manual 
        When 92432 User view sale invoice journal
        Then 92432 User should able to see Manually processed, Date manually processed and Manually processed by field
    
    Scenario: Verify that [SCC User Role] the user can see the new fields on Sales invoice header with Manually processed is not editable
        Given 92433 User already have sale invoice which have method PDF
        When 92433 User view sale invoice journal
        Then 92433 User should not able to edit Manually processed, Date manually processed and Manually processed by field

    Scenario: Verify that [SCC User Role] the user can see the new fields on Sales invoice header with Manually processed is editable
        Given 92434 User already have sale invoice which have method manual
        When 92434 User view free text invoice journal
        Then 92434 User should able to edit Manually processed, Date manually processed and Manually processed by field

    Scenario: Verify that [SCC User Role] the user can edit a Free text invoice header with Manually processed is not editable
        Given 92435 User already have sale invoice which have method PDF
        When 92435 User view free text invoice journal
        Then 92435 User should not able to edit Manually processed, Date manually processed and Manually processed by field