Feature: Run 14 Cash and Bank test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage    
    ###--- FA

##### Not run due to Request change function is not available at the time ----- Confirm that we not testing any test cases which is used request change function
