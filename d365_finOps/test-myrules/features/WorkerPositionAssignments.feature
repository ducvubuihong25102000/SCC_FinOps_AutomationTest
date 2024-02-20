Feature: Worker Position Assigments

    Login
    Background: User verifies gmail, User in on login Page, verify the user

    Scenario: User can login with AD user
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: User can change new position for the worker
        When User navigate to Worker page
        Then Select Worker Position Assignments from the Positions menu bar
        Then Select Position and Change new position for the worker