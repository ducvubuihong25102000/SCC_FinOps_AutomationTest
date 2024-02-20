Feature: Run 14 Cash and Bank test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage       

## ------------------------- Reuse Bank statement ID for reconcilation process -----------------------

    # Scenario: Process to reconciled a Bank Statement
    #     When User enter navigation to Bank statements
    #     Then 91000 Verify User can import the bank statement without reconcile after import
    #     Then 91005 Verify user is able to validate bank statement
    #     Then 90999 Verify user able to create manual bank reconcilation
    #     Then 90999 Verify there is no data in the bank reconcilation 
    #     When 91004 User enter navigation to Bank reconcilation
    #     Then 91004 Verify user able to can run Auto Matching Rules
    #     Then 91004 User navigate to Bank statement page
    #     Then 91004 Verify the matched Bank Statement status should changed to Matched
    #     When 91003 User enter navigation to Bank reconciliation
    #     Then 91003 Verify No data in Unmatch in Transaction
    #     Then 91003 Marked Transaction as reconciled
    #     Then 91003 Verify the status of the bank statement was marked reconciled

##------------------------------------- Account Reconciliation process ------------------------------------------#

    # Scenario: [90995] Verify that as [SCC User Role] can create manual bank reconciliation
    #     When 90995 User navigate to Bank Account
    #     Then 90995 Navigate to Bank Statement page
    #     Then 90995 Verify user able to create manual bank statement

    # Scenario: [90997] Verify tShat as [SCC User Role] can add bank transaction type entries
    #     When 90997 User navigate to Bank Account
    #     Then 90997 Navigate to Bank Statement page
    #     Then 90997 Navigate to Account Reconciliation page
    #     Then 90997 Verify user able to create manual bank transaction
    #     When 90997 Navigate back to Bank Statement page
    #     Then 90997 Navigate back to Account Reconciliation page
    #     Then 90997 Verify bank transaction should be stored correctly

    # Scenario: [90996] Verify that as [SCC User Role] can mark reconcile transaction
    #     When 90996 User enter navigation to Bank accounts
    #     Then 90996 Navigate to Bank Statement page
    #     Then 90996 Navigate to Account Reconciliation page
    #     Then 90996 Verify user able to marked cleared and the unreconciled amount is counted 

    # Scenario: [90998] Verify that as [SCC User Role] can mark reconcile transaction
    #     When 90998 User navigate to Bank Account
    #     Then 90998 Verify user able to create manual bank reconcilation
    #     Then 90998 Verify the transaction is marked as Unreconciled
    #     Then 90998 Verify that the Bank statement column has been reconciled 

##-Precondition: Existing Validated Bank Statement(import), Make sure Bank Statement amount is from Credit side-----------------------------------------------------------------------------------------------#

    # Scenario: [91001] Verify that as [SCC User Role] can Manual Match Items
    #     When 91001 User enter navigation to Bank reconcilation
    #     Then 91001 Verify user able to can manual matching bank statement
    #     Then 91001 User navigate to Bank statement page
    #     Then 91001 Verify the matched Bank Statement status should changed to Matched

##-Precondition: ---------------------------------------------------------------------------------------------#

    # Scenario: [91012] Verify that as [SCC User Role] can View a Bank Transaction
    #     When 91012 User enter navigation to Bank transactions report
    #     Then 91012 Verify user is able to run Bank tranasction report
    
    # Scenario: [91013] Verify that as [SCC User Role] can View Unreconciled Items
    #     When 91013 User enter navigation to Bank accounts
    #     Then 91013 Verify user is able to view unreconciled items
    
##-Precondition: -----------------------------------------------------------------------------------------------#

    # Scenario: [90991] Verify that as [SCC User Role] can set up the cash flow forecast  
    #     When 90991 User enter navigation to Cash flow forecast setup
    #     Then 90991 Verify General Ledger
    #     Then 90991 Verify Purchase Ledger
    #     Then 90991 Verify Sale Ledger tab 

##-Precondition: -----------------------------------------------------------------------------------------------#
  
    # Scenario: [91000] Verify that as [SCC User Role] can Import Bank Statement 
    #     When 91000 User enter navigation to Bank statements
    #     Then 91000 Verify the bank statement will be uploaded in a “Matched” status

##-Precondition: -----------------------------------------------------------------------------------------------#

    Scenario: [66920] Verify that [SCC User Role] user can create General Journal to record Bank Entries
        When 66920 User navigate to General Journal
        Then 66920 Verify user able to create General Journal for Bank and Posted
        Then 66920 Verify bank transactions in the related Bank account should be updated correctly





















