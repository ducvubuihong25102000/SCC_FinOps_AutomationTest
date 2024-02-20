Feature: 

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        When User enter valid finops user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage
    
    Scenario: 96646 Verify that [SCC User Role] user can see 2 new Invoice number and document date columns in Posted VAT report are populated for Posted General Journal
        Given 96646 User is on General Journals page
        When 96646 User create a new General Journal
        Then 96646 User run Posted VAT report
        Then 96646 User should be see Invoice number and Document date are populated properly