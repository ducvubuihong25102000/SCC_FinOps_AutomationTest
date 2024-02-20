Feature: Run 5 General Ledger test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage  

    Scenario: [91783] Verify that as [SCC User Role] can see correct information on posted General Journal with Bank account
        When 91783 User navigate to General Journal
        Then 91783 Verify user able to create General Journal for Bank and Posted
        Then 91783 Verify that a tick displays on the Posted column and the Posted Date
        Then 91783 Verify the value of the Voucher of the Posted GL

    Scenario: [91781] Verify that as [SCC User Role] can see correct information on posted General Journal with Ledger account
        When 91781 User navigate to General Journal
        Then 91781 Verify user in which Legal Entity
        Then 91781 Verify user able to create General Journal and Posted
        Then 91781 Verify the value of the Voucher page
        
    Scenario: [91785] Verify that as [SCC User Role] can see correct information on posted General Journal with Fixed Asset account
        When 91785 User is navigate to General journal page
        Then 91785 User create a new general journal 
        Then 91785 Fulfil the journal for a Fixed Asset then posted the journal
        When 91785 User is navigate to Fixed Asset page
        Then 91785 User is open Fixed Asset details form
        Then 91785 Verify user can see the journal which is posted for a Fixed Asset above should be stored correctly


