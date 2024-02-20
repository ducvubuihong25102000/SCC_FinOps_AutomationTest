Feature: Run DEV156 test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        #When User enter valid finops user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: [91996] Verify that [Credit Controller] can check the customer with credit balance should be exclude from the document report when slider bar "Exclude account in credit" is "YES"
        When 91996 User navigate to Customer payment journal
        Then 91996 User Create a new Customer payment journal
        Then 91996 User navigate to Customer account statement to check the value

    Scenario: [91997] Verify that [Credit Controller] can check the customers with credit and debit balance should be included in the customer account statements report when slider bar "Exclude account in credit" is "NO"
        When 91997 User navigate to Customer account statement
        Then 91997 User can check the customers with credit and debit balance should be included in the customer account statements report when slider bar Exclude account in credit is NO

    Scenario: [91998] Verify that [Credit Controller] can check the customer with zero balance should be exclude from the document report when slider bar "Exclude account in credit" is "YES"
        When 91998 User navigate to Customer account statement
        Then 91998 User can check the customers with zero balance should be included in the customer account statements report when slider bar Exclude account in credit is YES