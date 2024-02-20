Feature: 

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        # When User enter valid finops user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage    

    Scenario: 107769 Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Purchase requisition without Item number if Project category has FDs value
        Given 107769 User is on Purchase Requisition page
        When 107769 User create new Purchase Requisition with Item number with Project Category has FDs info
        Then 107769 User can see proper Financial Dimensions should be drived correctly

    Scenario: 107769 Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Purchase order with Item number if Project category has not any FDs value
        Given 107769 User is on Purchase Order page
        When 107769 User create new Purchase Order with Project Category has no FDs info
        Then 107769 User can see proper Financial Dimensions should be drived correctly

    Scenario: 107772 Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Purchase requisition without Item number if Project category has FDs value
        Given 107772 User is on Purchase Order page
        When 107772 User create new Purchase Order with Project Category has FDs info
        Then 107772 User can see proper Financial Dimensions should be drived correctly

    Scenario: 107771 Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Purchase requisition without Item number if Project category has FDs value
        Given 107771 User is on Purchase Requisition page
        When 107771 User create new Purchase Requisition with Project Category has FDs info
        Then 107771 User can see proper Financial Dimensions should be drived correctly
    
    Scenario: 107773 Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Pending Supplier Invoice with Item number if Project category has FDs value
        Given 107773 User is on Pending supplier invoice page
        When 107773 User create new Pending suppleir invoice with Project Category has FDs info
        Then 107773 User can see proper Financial Dimensions should be drived correctly

    Scenario: 107774 Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Pending Supplier Invoice with Item number if Project category has FDs value
        Given 107774 User is on Pending supplier invoice page
        When 107774 User create new Pending suppleir invoice with Project Category has no FDs info
        Then 107774 User can see proper Financial Dimensions should be drived correctly
        

