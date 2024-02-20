Feature: Run 9 VAT Scenarios test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage 

    # Scenario: [92672] Verify that as [SCC User Role] can apply Intracompany VAT for a Sale Order
    #     When 92672 User navigate to Sale Order
    #     Then 92672 User Create a new Sale Order
    #     Then 92672 User Confirm the Sale Order
    #     Then 92672 User Post delivery note for the Sale Order
    #     Then 92672 User Invoice the Sale Order
    #     Then 92672 Verify the voucher should have Posting Type and posting information
    
    # Scenario: [92684] Verify that as [SCC User Role] can apply a GBP tax code for a Sale Order even customer account currency is USD
    #     When 92684 User navigate to Sale Order
    #     Then 92684 User Create a new Sale Order with USD Customer and GBP tax code
    #     Then 92684 Verify VAT amount is re-calculated and applied with correct VAT code on on Temporary VAT transactions
    #     Then 92684 User Confirm the Sale Order
    #     Then 92684 User Post delivery note for the Sale Order
    #     Then 92684 User Invoice the Sale Order
    #     Then 92684 Verify the voucher should have Posting Type and posting information

    # Scenario: [92680] Verify that as [SCC User Role] can see correct PUK R5% is applied correctly when supplier transaction is posted with VAT group is RED-5%
    #     When 92680 User navigate to Pending supplier invoice
    #     Then 92680 User Create a new Pending supplier invoice with RED-5%
    #     Then 92680 User Open VAT transaction dialog and change Total calculated VAT amount 
    #     Then 92680 User Post the invoice
    #     Then 92680 User navigate to Supplier
    #     Then 92680 Open desire Supplier
    #     Then 92680 Verify the voucher should be stored correct supplier invoice transaction
    
    # Scenario: [92681] Verify that as [SCC User Role] can see EXEMPT-S VAT code is applied when supplier transaction is posted with Insurance category and VAT group is EXEMPT-S
    #     When 92681 User navigate to Pending supplier invoice
    #     Then 92681 User Create a new Pending supplier invoice with EXEMPT-S
    #     Then 92681 User Open VAT transaction dialog and change Total calculated VAT amount 
    #     Then 92681 User Post the invoice
    #     Then 92681 User navigate to Supplier
    #     Then 92681 Open desire Supplier
    #     Then 92681 Verify the voucher should be stored correct supplier invoice transaction

    # Scenario: [92683] Verify that as [SCC User Role] can bank charges with VAT code EXEMPT-S from automatic reconciliation
    #     When 92683 User navigate to Bank Statement
    #     Then 92683 User import a new bank statement
    #     Then 92683 User open the bank statement details form
    #     Then 92683 User able to edit VAT code to EXEMPT-S
    #     Then 92683 User navigate to Bank reconcilation
    #     Then 92683 User create a new Bank reconcilation for used bank account
    #     Then 92683 Matched and marked bank statement above as reconciled
    #     Then 92683 User navigate to Bank account
    #     Then 92683 Verify the posted journal should be stored correctly in view accounting page

    # Scenario: [92677] Verify that as [SCC User Role] can see correct VAT information are displayed within posted GJ form
    #     When 92677 User navigate to General Journal
    #     Then 92677 User Create a new General Journal with GBP tax code
    #     Then 92677 User post the journal
    #     Then 92677 Verify the VAT code and VAT percentage are displayed correctly

    # Scenario: [92679] Verify that as [SCC User Role] can see VAT postings are displayed correctly within Trial Balance form
    #     When 92679 User navigate to General Journal
    #     Then 92679 User Create a new General Journal with Bank account and EXEMPT-S tax code
    #     Then 92679 User post the journal
	# 	Then 92679 User navigate to Trial balance
    #     Then 92679 User calculate balance
	# 	Then 92679 Verify Transaction displayed correctly

    # Scenario: [92682] Verify that as [SCC User Role] can see EXEMPT-S VAT code is applied on general journal transaction with Bank type
    #     When 92682 User navigate to General Journal
    #     Then 92682 User Create a new General Journal with Bank account and EXEMPT-S tax code
    #     Then 92682 User post the journal
    #     Then 92682 User navigate to Bank account
    #     Then 92682 Verify the posted journal above should be stored correctly in bank transaction page

     # Scenario: [92678] Verify that as [SCC User Role] can adjust VAT percentage pior posting the invoice
    #    When 92678 User navigate to Pending supplier invoice
    #    Then 92678 User Create a new Pending supplier invoice with GBP tax code
    #    Then 92678 User Open VAT transaction dialog and change Total calculated VAT amount 
    #    Then 92678 User Post the invoice
    #    Then 92678 User navigate to Supplier
    #    Then 92678 Open desire Supplier
    #    Then 92678 Verify the voucher should be stored correct supplier invoice transaction
