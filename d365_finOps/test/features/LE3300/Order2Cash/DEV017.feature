Feature: Run DEV017 test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        #When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: [96552] Verify that as [SCC User Roles] can see new fields are displayed on the  Direct debit mandates fast tab
        When 96552 User navigate to All Customer
        Then 96552 Verify can create new DD

    Scenario: [96554] Verify that as [SCC User Roles] can see the error message if input bank account with the AccountNum is less than 8 characters and the RegistrationNum is less than 6 characters to Direct debit mandate
        When 96554 User navigate to All Customer
        Then 96554 Verify error message when create new DD with AccountNum and RegistrationNum invalid

    Scenario: [96557] Verify that as [SCC User Roles] can see new fields are available on Sales Ledger parameter table as design
        When 96557 User navigate to Sales Ledger Parameters
        Then 96557 Verify new Enable electronic document send, Template for email text and AUDDIS file serial number fields appear properly

    Scenario: [96558] Verify that as [SCC User Roles] can see new fields are available on System administrator parameter table which has correct configure as design
        When 96558 User navigate to System parameters
        Then 96558 Verify new fast tab Docusign Integration appear properly

    Scenario: [96561] Verify that as [SCC User Roles] can cancel a mandate DD mandate
        When 96561 User navigate to All Customers
        Then 96561 Verify that users can cancel a mandate DD mandate