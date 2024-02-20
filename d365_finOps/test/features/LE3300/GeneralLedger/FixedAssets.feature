Feature: Run 16 Fixed Assets test cases

    Scenario: Verify as [SCC User Role] is able to logged in to FinOps homepage
        Given User is on SCC FinOps Authentication page
        # When User enter valid finops user credential and Click Submit
        Then Verify that system is logged in to FinOps homepage       

    Scenario: Verify that as [SCC User Role], i able to create, update, acquire, depreciate, reclassify and change a Fixed asset
        # When 91926 Navigate to FA page and User create a new Fixed asset
        # Then 91926 Verify that fixed asset should have status Not yet acquired
        
        # Then 91924 User is openned desired fixed asset and add new financial dimension inforamtion for it
       
        # Then 91844 Navigate to FA Journal page
        # Then 91844 User create a new Acquisition transaction via Fixed asset journal
        # Then 91844 Verify that the existing FA can be used in Fixed asset journal
        
        # When 91845 Navigate to FA Journal page
        # Then 91845 User create a new FA adjustment journal via Fixed asset journal
        # Then 91845 Verify that the value of the FA Acquisition price should be increased

        # When 92900 user navigate to the Invoice journal page
        # Then 92900 User create a Invoice Journal for desire FA then validate and post the invoice journal
        # Then 92900 User can see newly created journal in FA transaction
        
        # When 92910 Navigate to the Fixed Assets page
        # Then 92910 Update Calculate depreciation then Verify that fixed asset should be updated correctly
        
        # When 92911 Navigate to the Fixed Assets page
        # Then 92911 Update Depreciation Last run and service life then Verify that fixed asset should be updated correctly 
       
        # When 92912 Navigate to the Fixed Assets page
        # Then 92912 Update Depreciation Last run then Verify that fixed asset should be updated correctly

        # When 92913 Navigate to FA Journal page
        # Then 92913 User create a new Depreciation type via Fixed asset journal
        # Then 92913 Verify user can create a depreciation transaction by using Depreciation proposal
        
        # When 92902 Navigate to the Fix asset page
        # Then 92902 Verify users are able to update existing fixed asset 
        
        # When 92904 Navigate to the Fix asset page
        # Then 92904 Verify users are able to update existing fixed asset group  
       
        # When 92903 Navigate to the Fix asset page
        # Then 92903 Verify users are able to update existing fixed asset group and FA number
        
        # When 91927 Navigate to the Fix asset page
        # Then 91927 Fixed asset registered can be reclassification sucessfully
        
        # When 91843 Navigate to FA page
        # Then 91843 User create a new Acquisition transaction via Fixed asset journal
        
        # Then 91925 Navigate to FA journal page
        # Then 91925 Verify that correct information on posted Scrap a fixed asset using a fixed asset journal
        
        Then 91929 User need prepare a new FA
        Then 91929 User create a acquired FA
        Then 91929 User create a depreciated FA
        When 91929 User is navigate to FTI page
        Then 91929 Verify users are able to Sell a Fixed asset by using Free text invoices    

        # When 91928 User prepare a FA
        # Then 91928 User create a acquired FA
        # Then 91928 User create a depreciated FA
        # When 91928 Navigate to FA journal page 
        # Then 91928 Verify that correct information on posted Sale fixed asset using a fixed asset journal 
        
        # Given 91848 User is on Purchase Order page
        # When 91848 User is open a PO with multiple quantity
        # Then 91848 User print a product receipt for 1 quantity in that PO
        # Then 91848 Navigate to Fixed Asset page and Open newly created FA
        # Then 91848 Verify that FA Acquisition price is not increased and status is Not yet acquired
        # Then 91848 User invoiced the PO and matching with 1 quantity
        # Then 91848 Navigate to Purchase Order details form
        # Then 91848 User print a product receipt for last quantity in that PO
        # Then 91848 User invoiced the PO and matching with the rest quantity
        # Then 91848 Navigate back to Fixed Asset page and Open newly created FA
        # Then 91848 Verify that FA Acquisition price is increased and status is Open

        # Given 91846 User is on Purchase Order page
        # When 91846 User open prepared PO with status Confirmed and it should have Yes, direct AICC other
        # Then 91846 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully
        # Then 91846 Verify that Fixed Asset status is Not yet accquire
        # When 91846 Navigate back to Purchase Order page
        # Then 91846 Verify that user can create a supplier invoice for that PO successfully
        # Then 91846 Navigate back to Fixed Asset page and open newly created FA
        # Then 91846 Verify that FA should have status Open and have Acquisition price

        # Given 91847 User is on Purchase Order page
        # When 91847 User open prepared PO with status Confirmed and it's should below 250
        # Then 91847 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully
        # When 91847 Navigate to Purchase Order page
        # Then 91847 Verify that user can create a supplier invoice for that PO successfully
        # When 91847 Navigate back to Purchase Order page
        # Then 91847 Verify invoice journal should be contained correct values

        # Given 92901 User is on Purchase Order page
        # When 92901 User is open a PO with multiple quantity
        # Then 92901 User print a product receipt for that PO
        # Then 92901 User invoiced the PO
        # Then 92901 Navigate to Fixed Asset page and Open newly created FA
        # Then 92901 Verify that FA Acquisition price is increased

        # Given 91842 User is on Purchase Order page
        # When 91842 User open prepared PO with status Confirmed and it should have Yes, direct AICC other
        # Then 91842 Verify that user can create a product receipt for that PO and generate a new Fixed asset successfully
        # When 91842 Navigate back to Purchase Order page
        # Then 91842 Verify that user can create a supplier invoice for that PO successfully
        # Then 91842 Navigate back to Fixed Asset page and open newly created FA
        # Then 91842 Verify that FA should have status Open and have Acquisition price
        # Then 91842 Verify that FA should not be linked to a fixed asset