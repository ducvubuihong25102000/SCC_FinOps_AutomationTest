Feature: Run End to End process for P2P test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage

    Scenario: [105591] Verify that as [SCC User Role] can create Purchase Requisition
        When 105591 User navigate to All Purchase Requisition
        Then 105591 User Create a new Purchase Requisition
        Then 105591 User Submit the Purchase Requisition
        Then 105591 User Verify the PR status is In Review
        Then 105591 User Approve the Purchase Requisition
        Then 105591 Verify the PR status is Approved
        Then 105591 Verify the PR status is moved to Closed and the created newly Purchase Order
    
    Scenario: [105594] Verify that as [SCC User Role] can confirm the Purchase Order created from the Purchase Requisition
        When 105594 User navigate to All Purchase Order
        Then 105594 User open the existed PO with status as Approved
        Then 105594 User Confirm the Purchase Order
        Then 105594 Verify the PR status is moved to Confirmed
    
    # Scenario: [105595] Verify that as [SCC User Role] can edit Purchase order state
    #   When 105595 User Navigate to All Purchase Order
    #   Then 105595 User Opens the approriate purchase order with the Approval status is Approved
    #   Then 105595 User Click on Request Change to the purchase order
    #   Then 105595 Verify that the purchase order will now be changed to Draft state
    #   Then 105595 User Click on Submit the PO again
    #   Then 105595 Verify that the purchase order is In Review state
    #   Then 105595 Verify that the the PO status is Approved

    # Scenario: [105596] Verify that as [SCC User Role] can generate Product receipt for the Purchase Order
    #     When 105596 User navigate to All Purchase Order
    #     Then 105596 User open the existed PO with status as Confirmed
    #     Then 105596 User can generate Product receipt for the Purchase Order
    #     Then 105596 Verify the PR status is moved to Received
    
    # Scenario: [105597] Verify that as [SCC User Role] can amend the quantity of the purchase order receipt in Product receipt journal
    #   When 105597 User Navigate to All Purchase Order
    #   When 105597 User Opens the approriate purchase order with the status is Confirmed
    #   Then 105597 User Makes receipt for the Purchase Order product
    #   Then 105597 Verify the PO status is Received
    #   Then 105597 User Cancels the purchase order's product receipt
    #   Then 105597 Verify the Receive value should be blank and the Amount of the product receipt should be deducted to 0.00
    #   Then 105597 User Amend receipt for the Purchase Order product
    #   Then 105597 User Corrects the purchase order's product receipt
    #   Then 105597 Verify the Received and Order value should be amended successfully and the Amount of the product receipt should be displayed correctly

    # Scenario: [105598] Verify that as [SCC User Role] can generate Purchase Order Invoice
    #     When 105598 User navigate to All Purchase Order
    #     Then 105598 User open the existed PO with status as Received
    #     Then 105598 User can generate PO Invoice for the Purchase Order
    #     Then 105598 Verify the PO status is moved to Invoiced
    
    # Scenario: [105605] Verify that as [SCC User Role]  can create invoice payment via supplier invoice payment
    #     When 105605 User navigate to Supplier payment journal
    #     Then 105605 User create new Supplier Payment journal
    #     Then 105605 Verify the payment voucher

    # Scenario: [105592] Verify that as [SCC User Role] can create a purchase requisition for FA then PO is created automatically
    #   When 105592 User Navigate to All Purchase Requisition
    #   Then 105592 User Create a new Purchase Requisition
    #   Then 105592 User Submit the Purchase Requisition
    #   Then 105592 Verify the PR status is In Review
    #   Then 105592 User Approve the Purchase Requisition
    #   Then 105592 Verify the PR status is Approved
    #   Then 105592 Verify the PR status is moved to Closed
    #   When 105592 User Navigate to All Purchase Order
    #   Then 105592 Verify the newly created PO with the Approval status is Approved and Purchase order status is Open order
    #   Then 105592 User Confirm the Purchase Order
    #   Then 105592 Verify the PO status is Confirmed
    #   Then 105592 User Makes receipt for the Purchase Order product
    #   Then 105592 Verify the PO status is Received
    #   Then 105592 Verify the newly created Fixed Asset with the status is Not yet acquired
    
    # Scenario: [105599] Verify that as [SCC User Role] can invoice a PO for FA
    #     When 105599 User navigate to All Purchase Order
    #     Then 105599 User open the existed PO with status as Received
    #     Then 105599 User can generate PO Invoice for the Purchase Order
    #     Then 105599 Verify the PO status is moved to Invoiced
    #     Then 105599 User navigate to All Fixed Assets
    #     Then 105599 Verify fixed asset has been acquired and placed in service date is populated

    # Scenario: [105601] Verify that as [SCC User Role]  can create invoice payment via Pending supplier invoice
    #     When 105601 User navigate to Pending supplier invoice
    #     Then 105601 User Create a new Pending supplier invoice with any VAT code
    #     Then 105601 User Open VAT transaction dialog and change Total calculated VAT amount
    #     Then 105601 User Post the invoice
    #     Then 105601 User navigate to Supplier
    #     Then 105601 Open desire Supplier
    #     Then 105601 Verify the voucher should be stored correct supplier invoice transaction

    # Scenario: [105602] Verify that as [SCC User Role] can create a non-PO invoice for FA
    #     When 105602 User navigate to Pending supplier invoice
    #     Then 105602 User Create a new Pending supplier invoice with any VAT code
    #     Then 105602 User Open Fixed Assets tab and specify the fixed asset group
    #     Then 105602 User Post the invoice
    #     Then 105602 User navigate to Supplier and Open desire Supplier
    #     Then 105602 Verify the voucher should be stored correct supplier invoice transaction
    #     Then 105602 Verify the Posted VAT should be stored correct
    #     Then 105602 User navigate to Fixed Assets page
    #     Then 105602 Verify the FA should change to Open status

    # Scenario: [105603] Verify that as [SCC User Role] can create a non-PO invoice for FA Addition
    #     When 105603 User navigate to Pending supplier invoice
    #     Then 105603 User Create a new Pending supplier invoice with any VAT code
    #     Then 105603 User Open VAT transaction dialog and change Total calculated VAT amount
    #     Then 105603 User Post the invoice
    #     Then 105603 User navigate to Supplier
    #     Then 105603 Open desire Supplier
    #     Then 105603 Verify the voucher should be stored correct supplier invoice transaction
   