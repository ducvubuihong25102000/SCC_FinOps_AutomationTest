Feature: Run 16 Fixed Assets test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC Authentication page
        When User enter valid user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage
        Then Verify that system is logged in correct legal entity

    # -------------------------------- Starting of reuse FA data ------------------------------- #

Scenario: [91932] Verify that as [SCC User Role], i able to create new Fixed Asset record via fixed asset register
    When 91932 Navigate to FA page and User create a new Fixed asset
    Then 91932 Verify that fixed asset should have status Not yet acquired

Scenario: [91930] Verify that as [SCC User Role], can add financial dimensions to fixed assets register
    When 91930 Navigate to FA page 
    When 91930 User is openned desired fixed asset and add new financial dimension inforamtion for it
    Then 91930 Verify that fixed asset should have status Not yet acquired

# Scenario: [91913] Verify that as [SCC User Role], user can acquire a Fixed asset using Fixed asset journal
#     When 91913 Navigate to FA page
#     Then 91913 User create a new Acquisition transaction via Fixed asset journal
#     Then 91913 Verify that the existing FA can be used in Fixed asset journal

# Scenario: [91912] Verify that as [SCC User Role], user can  create a new Fixed asset using Fixed asset journal
#     When 91912 Navigate to FA page
#     Then 91912 User create a new Acquisition transaction via Fixed asset journal
#     Then 91912 Verify that the newly created FA can be used in Fixed asset journal

# Scenario: [91914] Verify that as [SCC User Role], user can create an FA adjustment journal to increase the value of a fixed asset
#     When 91914 Navigate to FA page
#     Then 91914 User create a new FA adjustment journal via Fixed asset journal
#     Then 91914 Verify that the value of the FA Acquisition price should be increased

# Scenario: [91874] Verify that as [SCC User Role], user can create depreciation proposal
#     When 91874 Navigate to FA page
#     Then 91874 User create a new Depreciation type via Fixed asset journal
#     Then 91874 Verify user can create a depreciation transaction by using Depreciation proposal

# Scenario: [91872] Verify that as [SCC User Role], can set asset to depreciate or not to depreciate for fixed assets
#     When 91872 Navigate to the Fixed Assets page
#     Then 91872 Update Calculate depreciation then Verify that fixed asset should be updated correctly  

# Scenario: [91873] Verify that as [SCC User Role], can update asset book depreciation
#     When 91873 Navigate to the Fixed Assets page
#     Then 91873 Update Depreciation Last run and service life then Verify that fixed asset should be updated correctly 

# Scenario: [93049] Verify that as [SCC User Role], can update asset book depreciation
#     When 93049 Navigate to the Fixed Assets page
#     Then 93049 Update Depreciation Last run then Verify that fixed asset should be updated correctly

# Scenario: [93046] Verify that as [SCC User Role], can edit fixed asset register
#     When 93046 Navigate to the Fix asset page
#     Then 93046 Verify users are able to update existing fixed asset  

# Scenario: [91933] Verify that as [SCC User Role], user can reclassify a Fixed asset
#     When 91933 Navigate to the Fix asset page
#     Then 91933 Fixed asset registered can be reclassification sucessfully  

# Scenario: [93048] Verify that as [SCC User Role], can change fixed asset group only
#     When 93048 Navigate to the Fix asset page
#     Then 93048 Verify users are able to update existing fixed asset group

# Scenario: [93047] Verify that as [SCC User Role], can change fixed asset group and fixed asset number
#     When 93047 Navigate to the Fix asset page
#     Then 93047 Verify users are able to update existing fixed asset group and FA number

#  ---------------- End of reusing FA data, starting create new FA from now on ---------------- #

# Scenario: [93052] Verify that as [SCC User Role], user can create a new invoice journal to increase the value of a fixed asset.
#     When 93052 user navigate to the Invoice journal page
#     Then 93052 User create a Invoice Journal for desire FA then validate and post the invoice journal   

# Scenario: [91931] Verify that [SCC User Role] can see correct information on posted Scrap a fixed asset using a fixed asset journal
#     Then 91931 Navigate to FA journal page
#     Then 91931 Verify that correct information on posted Scrap a fixed asset using a fixed asset journal

# Scenario: [91935] Verify that as [SCC User Role], user can Sell a Fixed asset by using Free text invoices
#     Then 91935 User need prepare a depreciated FA
#     When 91935 User is navigate to FTI page
#     Then 91935 Verify users are able to Sell a Fixed asset by using Free text invoices

# Scenario: [91934] Verify that [SCC User Role] can see correct information on posted Sell a fixed asset using a fixed asset journal
#     When 91934 User prepare a FA
#     Then 91934 User need depreciated that FA
#     When 91934 Navigate to FA journal page 
#     Then 91934 Verify that correct information on posted Sale fixed asset using a fixed asset journal

# Scenario: [91915] Verify that [SCC User Role ] can create a purchasing fixed asset if the unit price is above £250
#     Given 91915 User is on Purchase Order page
#     When 91915 User open prepared PO with status Confirmed and it should have Yes, direct AICC other
#     Then 91915 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully
#     When 91915 Navigate back to Purchase Order page
#     Then 91915 Verify that user can create a supplier invoice for that PO successfully
#     Then 91915 Navigate back to Fixed Asset page and open newly created FA
#     Then 91915 Verify that FA should have status Open and have Acquisition price

# Scenario: [91916] Verify that [SCC User Role ] can create a purchasing fixed asset if the unit price is below £250
#     Given 91916 User is on Purchase Order page
#     When 91916 User open prepared PO with status Confirmed and it's should below 250
#     Then 91916 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully
#     When 91916 Navigate to Purchase Order page
#     Then 91916 Verify that user can create a supplier invoice for that PO successfully
#     When 91916 Navigate back to Purchase Order page
#     Then 91916 Verify invoice journal should be contained correct values

# Scenario: [91911] Verify that [SCC User Role] user has the ability to overwrite the line and create or not to create a fixed asset
#     Given 91911 User is on Purchase Order page
#     When 91911 User open prepared PO with status Confirmed and it should have Yes, direct AICC other
#     Then 91911 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully
#     When 91911 Navigate back to Purchase Order page
#     Then 91911 Verify that user can create a supplier invoice for that PO successfully
#     Then 91911 Navigate back to Fixed Asset page and open newly created FA
#     Then 91911 Verify that FA should have status Open and have Acquisition price
#     Then 91911 Verify that FA should not be linked to a fixed asset   

# Scenario: [93053] Verify that [SCC User Role] user can create a purchasing FA with multiple Quantity single invoice
#     Given 93053 User is on Purchase Order page
#     When 93053 User is open a PO with multiple quantity
#     Then 93053 User print a product receipt for that PO
#     Then 93053 User invoiced the PO
#     Then 93053 Navigate to Fixed Asset page and Open newly created FA
#     Then 93053 Verify that FA Acquisition price is increased

# Scenario: [91917] Verify that [SCC User Role] user can create a purchasing FA with multiple Quantity multiple  invoices
#     Given 91917 User is on Purchase Order page
#     When 91917 User is open a PO with multiple quantity
#     Then 91917 User print a product receipt for 1 quantity in that PO
#     Then 91917 Navigate to Fixed Asset page and Open newly created FA
#     Then 91917 Verify that FA Acquisition price is not increased and status is Not yet acquired
#     Then 91917 User invoiced the PO and matching with 1 quantity
#     Then 91917 Navigate to Purchase Order details form
#     Then 91917 User print a product receipt for last quantity in that PO
#     Then 91917 User invoiced the PO and matching with the rest quantity
#     Then 91917 Navigate back to Fixed Asset page and Open newly created FA
#     Then 91917 Verify that FA Acquisition price is increased and status is Open



