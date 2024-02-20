Feature: Run DEV014 test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        #When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: [92148] Verify that as [SCC User Role] can see value of field "Recourse/Non-recourse" should be tranffered "Non-notifiable" value to Customer trasactions when posting Customer Payment Journal
        When 92148 User navigate to Customer payment journal
        Then 92148 User can Post the customer payment journal
        Then 92148 User can check that field "Recourse/Non-recourse" should be populated value "Non-notifiable"