Feature: LoginUser

    Login
    Background: User verifies gmail, User in on login Page, verify the user

    Scenario: User can login with AD user
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage
        # Then Verify that system is logged in correct legal entity