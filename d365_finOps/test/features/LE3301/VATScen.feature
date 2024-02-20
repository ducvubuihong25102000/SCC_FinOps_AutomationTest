Feature: Run 9 VAT Scenarios test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage 
        Then Verify that system is logged in correct legal entity

    # Scenario: [92882] Verify that as [SCC User Role] can apply Intracompany VAT for a Sale Order
    #     When 92882 User navigate to Sale Order
    #     Then 92882 User Create a new Sale Order
    #     Then 92882 User Confirm the Sale Order
    #     Then 92882 User Post delivery note for the Sale Order
    #     Then 92882 User Invoice the Sale Order
    #     Then 92882 Verify the voucher should have Posting Type and posting information
    
    # Scenario: [92894] Verify that as [SCC User Role] can apply a GBP tax code for a Sale Order even customer account currency is USD
    #     When 92894 User navigate to Sale Order
    #     Then 92894 User Create a new Sale Order with USD Customer and GBP tax code
    #     Then 92894 Verify VAT amount is re-calculated and applied with correct VAT code on on Temporary VAT transactions
    #     Then 92894 User Confirm the Sale Order
    #     Then 92894 User Post delivery note for the Sale Order
    #     Then 92894 User Invoice the Sale Order
    #     Then 92894 Verify the voucher should have Posting Type and posting information
    
    # Scenario: [92888] Verify that as [SCC User Role] can adjust VAT percentage pior posting the invoice
    #     When 92888 User navigate to Pending supplier invoice
    #     Then 92888 User Create a new Pending supplier invoice with GBP tax code
    #     Then 92888 User Open VAT transaction dialog and change Total calculated VAT amount 
    #     Then 92888 User Post the invoice
    #     Then 92888 User navigate to Supplier
    #     Then 92888 Open desire Supplier
    #     Then 92888 Verify the voucher should be stored correct supplier invoice transaction

    # Scenario: [92890] Verify that as [SCC User Role] can see correct PUK R5% is applied correctly when supplier transaction is posted with VAT group is RED-5%
    #     When 92890 User navigate to Pending supplier invoice
    #     Then 92890 User Create a new Pending supplier invoice with RED-5%
    #     Then 92890 User Open VAT transaction dialog and change Total calculated VAT amount 
    #     Then 92890 User Post the invoice
    #     Then 92890 User navigate to Supplier
    #     Then 92890 Open desire Supplier
    #     Then 92890 Verify the voucher should be stored correct supplier invoice transaction

    # Scenario: [92891] Verify that as [SCC User Role] can see EXEMPT-S VAT code is applied when supplier transaction is posted with Insurance category and VAT group is EXEMPT-S
    #     When 92891 User navigate to Pending supplier invoice
    #     Then 92891 User Create a new Pending supplier invoice with EXEMPT-S
    #     Then 92891 User Open VAT transaction dialog and change Total calculated VAT amount 
    #     Then 92891 User Post the invoice
    #     Then 92891 User navigate to Supplier
    #     Then 92891 Open desire Supplier
    #     Then 92891 Verify the voucher should be stored correct supplier invoice transaction

    # Scenario: [92887] Verify that as [SCC User Role] can see correct VAT information are displayed within posted GJ form
    #     When 92887 User navigate to General Journal
    #     Then 92887 User Create a new General Journal with GBP tax code
    #     Then 92887 User post the journal
    #     Then 92887 Verify the VAT code and VAT percentage are displayed correctly

    # Scenario: [92889] Verify that as [SCC User Role] can see VAT postings are displayed correctly within Trial Balance form
    #     When 92889 User navigate to General Journal
    #     Then 92889 User Create a new General Journal with VAT output account and change VAT Code value to PUK_R5%
    #     Then 92889 User post the journal
    #     Then 92889 Verify the posting VAT information should be displayed correctly on Voucher
    #     Then 92889 User navigate to Posted VAT
    #     Then 92889 User filter VAT Code is PUK_R5% on Inquiry dialog
    #     Then 92889 User navigate to Trial Balance
    #     Then 92889 User calculate balance of all main account at specific date interval
    #     Then 92889 Open VAT output account balance
    #     Then 92889 Verify the posted journal above should be stored correctly

    # Scenario: [92892] Verify that as [SCC User Role] can see EXEMPT-S VAT code is applied on general journal transaction with Bank type
    #     When 92892 User navigate to General Journal
    #     Then 92892 User Create a new General Journal with Bank account and EXEMPT-S tax code
    #     Then 92892 User post the journal
    #     Then 92892 User navigate to Bank account
    #     Then 92892 Verify the posted journal above should be stored correctly in bank transaction page

    # Scenario: [92893] Verify that as [SCC User Role] can bank charges with VAT code EXEMPT-S from automatic reconciliation
    #     When 92893 User navigate to Bank Statement
    #     Then 92893 User import a new bank statement
    #     Then 92893 User open the bank statement details form
    #     Then 92893 User able to edit VAT code to EXEMPT-S
    #     Then 92893 User navigate to Bank reconcilation
    #     Then 92893 User create a new Bank reconcilation for used bank account
    #     Then 92893 Matched and marked bank statement above as reconciled
    #     Then 92893 User navigate to Bank account
    #     Then 92893 Verify the posted journal should be stored correctly in view accounting page


    # Scenario: [92889] Verify that as [SCC User Role] can see VAT postings are displayed correctly within Trial Balance form
    #     When 92889 User navigate to General Journal
    #     Then 92889 User Create a new General Journal with Bank account and EXEMPT-S tax code
    #     Then 92889 User post the journal
	# 	  Then 92889 User navigate to Trial balance
    #     Then 92889 User calculate balance
	# 	  Then 92889 Verify Transaction displayed correctly