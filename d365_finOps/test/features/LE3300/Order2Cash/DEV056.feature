Feature: Run DEV056 test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        #When User enter valid finops user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: [92964] Verify that as [SCC User Role] can create Free text invoice template
        When 92964 User navigate to All Customer
        Then 92964 Verify can view 3 new fields Changed by/Credit report date/Financial year end in Customers form

    Scenario: [92965] Verify that as [SCC User Role] can create Free text invoice template
        When 92965 User navigate to All Customer
        Then 92965 Verify can set Financial Year End for Customer
        
    Scenario: [92966] Verify that as [SCC User Role] can create Free text invoice template
        When 92966 User navigate to All Customer
        Then 92966 Verify can set Credit Report Date for Customer

    Scenario: [92967] Verify that as [SCC User Role] can create Free text invoice template
        When 92967 User navigate to All Customer
        Then 92967 Verify that value for Changed by and Credit limit change date is added when manually changing Credit limit

   Scenario: [92968] Verify that as [SCC User Role] can create Free text invoice template
        When 92968 User navigate to All Customer
        Then 92968 Verify that value for Changed by and Credit limit change date is Updated when Credit limit Changed

   Scenario: [92969] Verify that as [SCC User Role] can create Free text invoice template
        When 92969 User navigate to All Customer
        Then 92969 Verify that value for Changed by and Credit limit change date is update when changing Credit limit using Credit Limit Adjustments journal

   Scenario: [92971] Verify that as [SCC User Role] can create Free text invoice template
        When 92971 User navigate to All Customer
        Then 92971 Verify that value for Changed by and Credit limit change date is added when manually changing the Credit limit in customer currency




