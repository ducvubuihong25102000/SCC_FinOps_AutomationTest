Feature: Run 3 GL test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage
        Then Verify that system is logged in correct legal entity

    # -------------------------------- Starting of reuse GL data ------------------------------- #

    Scenario: [91162] Verify that as [SCC User Role] can see correct information on posted General Journal with Bank account
        When 91162 User navigate to General Journal
        Then 91162 Verify user in which Legal Entity
        Then 91162 Verify user able to create General Journal for Bank and Posted
        Then 91162 Verify that a tick displays on the Posted column and the Posted Date
        Then 91162 Verify the value of the Voucher of the Posted GL

    Scenario: [91160] Verify that as [SCC User Role] can see correct information on posted General Journal with Ledger account
        When 91160 User navigate to General Journal
        Then 91160 Verify user in which Legal Entity
        Then 91160 Verify user able to create General Journal and Posted
        Then 91160 Verify the value of the Voucher page

    Scenario: [91164] Verify that as [SCC User Role] can see correct information on posted General Journal with Fixed asset account
        When 91164 User is navigate to General journal page
        Then 91164 User create a new general journal 
        Then 91164 Fulfil the journal for a Fixed Asset then posted the journal
        When 91164 User is navigate to Fixed Asset page
        Then 91164 User is open Fixed Asset details form
        Then 91164 Verify user can see the journal which is posted for a Fixed Asset above should be stored correctly