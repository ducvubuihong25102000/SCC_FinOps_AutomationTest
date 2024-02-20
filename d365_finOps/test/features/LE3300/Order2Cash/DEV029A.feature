Feature: DEV-029A-FIN - Credit Suppress Dunning-Addendum

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        # When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage  

    Scenario: Verify that [Credit Controller] overdue invoices of the Customer V3 are included in dunning letter if "Include customers set exclusion" and "Exclude from automatic dunning" is set as "No"
        Given 92063 Customer without exclusive from dunning letter
        When 92063 Collecter start create customer dunning letter
        Then 92063 Verify Customer above should receive dunning letter from system for ovedue invocies

    Scenario: Verify that [Credit Controller] overdue invoices of the Customer V3 aren't included in dunning letter if  "Include customers set exclusion" is set as "No", regardless the customer V3 have the "Exclude from automatic dunning" flag set as "Yes"
        Given 92064 Customer with exclusive from dunning letter
        When 92064 Collecter start create customer dunning letter
        Then 92064 Verify Customer above should not receive dunning letter from system for ovedue invocies