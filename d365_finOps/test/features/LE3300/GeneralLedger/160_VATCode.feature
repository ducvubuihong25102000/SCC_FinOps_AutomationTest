Feature: FreeTextInvoice

    FreeTextInvoice
    Background: User create a FTI, then verify VAT code is applied correctly

    Scenario: Verify FTI is applied correct  Tax Code 001
        When User login with admin role
        Then System navigate to FTI page
        Then Create new Free Text Invoice then verify FTI is posted and applied correct Tax Code
        Then Create new Free Text Invoice then verify FTI is posted and no Tax Code is applied
        Then Then Create new Free Text Invoice then verify FTI is posted and 2 Tax Code is applied
        
       