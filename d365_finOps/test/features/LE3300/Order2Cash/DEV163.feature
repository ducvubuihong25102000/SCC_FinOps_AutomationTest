Feature: DEV163 - List all invoices not sent automatically

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        # When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage 

    Scenario: Verify that as [SCC User Role] can see the new field Require reasons for free text invoice credits should be added to the Sales ledger parameters form as design
        Given 100559 User is on Sales Ledger parameters page
        Then 100559 User able to see new field call Require reasons for free text invoice credits

    Scenario: Verify that as [SCC User Role] can see the new field Require reasons for project invoice proposal credits should be added to the Project management and accounting parameters form as design
        Given 100560 User is on Project Management and accounting parameters page
        Then 100560 User able to see new field call Require reasons for project invoice proposal credits

    Scenario: Verify that as [SCC User Role] can create and post a credit note for a Free text invoice
        Given 100561 User is created a credit note invoice via free text invoice
        When 100561 User open credting invoice page
        Then 100561 User able to edit Reason code and comment fields on Credit Invoicing page

    Scenario: Verify that as [SCC User Role] can't post a credit note for a Free text invoice
        Given 100565 System is not allow create credit note free text invoice
        Then 100565 User not able to post credit note free text invoice without reason code
