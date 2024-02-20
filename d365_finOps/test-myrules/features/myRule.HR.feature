Feature: 

    Login
    Background: User verifies gmail, User in on login Page, verify the user

    Scenario: User can login with AD user
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        # Then Verify that system is logged in to FinOps homepage
        # Then Verify that system is logged in correct legal entity

    Scenario: Verify that as [SCC User Role] can view output of fields for the Worker page detail
        When 7764 User enter navigation to Worker page detail
        Then 7764 Expand the worker summary fast tab, observe all value
        Then 7764 Expand the Personal information fast tab, Note the value in the Gender field
        Then 7776 Change the Wage code related to Employee
        
    Scenario: Verify that as [SCC User Role] can view output of fields for the Employment Detail
        When 7764 User enter navigation to Worker page detail   
        Then 7741 Change 'Guarantee Start Date' field
        Then 7743 Change Guarantee Period field to Month
        Then 7744 Change Guarantee amount field
        Then 7746 Change Guarantee Duration field & Click Save
        Then 7792 Change the Car Grade related to Employee
        Then 7725 Change Employment Start Date for a Worker
        Then 7726 Change Employment End Date
        Then 7755 Change Probation Period
        Then 7757 Change Probation Period Extension
        Then 7759 Change Last Day Worked
        Then 7761 Change Termination Date
        Then 7735 Change Bonus/OTC Plan Name
        Then 7737 Change BonusOTC amount
        Then 7739 Change Bonus/OTC
