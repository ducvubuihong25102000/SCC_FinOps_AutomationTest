Feature: Run N207 test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        #When User enter valid finops user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: [69044] Verify that as [SCC User Role] can create Free text invoice template
        When 69044 User navigate to Free Text invoice templates
        Then 69044 User Create a new Free Text invoice template
        Then 69044 Verify the new created Free Text invoice template

    Scenario: [69045] Verify that as [SCC User Role] can create Free text invoice using template
        When 69045 User navigate to Free Text invoice
        Then 69045 User Create a new Free Text invoice using template

    Scenario: [69046] Verify that as [SCC User Role] can create new recurring Invoice
        When 69046 User navigate to All customer
        Then 69045 User Create a new recurring Invoice using template
        Then 69046 Verify a new recurring Invoice using template appear properly

    Scenario: [69047] Verify that as [SCC User Role] can generate recurring Invoice
        When 69047 User navigate to Recurring invoices
        Then 69047 User generate recurring Invoice

    Scenario: [72980] Verify that as [SCC User Role] can create Free text invoice using the customer
        When 72980 User navigate to Free Text invoice
        Then 72980 User Create a new Free Text invoice using template with customer
