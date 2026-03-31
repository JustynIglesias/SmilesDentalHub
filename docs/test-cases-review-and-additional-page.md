## Test Cases Review and Additional Test Cases

This document reviews the existing test cases found in **Test cases.pdf** and identifies which test cases need revision, which important scenarios are still missing, and which additional test cases should be added. A new set of test cases is also provided using the same general layout as the current test case template.

### 1. Test Cases That Need Revision

| Existing Test Case | Issue Found | Recommended Revision |
| --- | --- | --- |
| **Run_1 - Log-in with valid credentials** | Acceptable, but the pre-conditions and actual-result wording are too brief. | Add a pre-condition stating that the user account already exists and is active. Make the actual result specific, such as successful redirection to the Home page. |
| **Run_2 - Login with invalid password** | The description says valid login and dashboard redirection even though the scenario is invalid login. The actual result also contradicts the expected result. | Revise the description to focus on rejection of invalid credentials. Expected and actual results should both state that the user remains on the Login page and sees an error message. |
| **Run_3 - Log-in with valid credentials** | Duplicates the purpose of Run_1. | Replace this case with another login-related scenario such as empty required fields, forgot password, or reset code verification. |
| **Run_4 - Update Patient Dental History and Odontogram** | Refers to a separate Dental History tab and mixes history questions with chart updates in one case. The current system is organized under patient details and dental records. | Split into two test cases: one for updating patient information or history details, and one for updating dental records. Use the actual module names from the system. |
| **Run_5 - Add Service Record** | Stops at opening the modal and does not verify saving, total computation, or confirmation behavior. | Extend the case to include service selection, quantity, amount, discount, total computation, confirmation, and successful save. |
| **Run_6 - Update Procedure** | Combines adding, editing, and archiving for both services and dental chart legends in one test case. | Split into separate cases for adding a service, editing a service, archiving a service, adding a legend, editing a legend, and archiving a legend. |
| **Run_7 - Patient Logs** | Mentions filtering by assigned dentist, which is not reflected in the revised system documentation. | Revise the scope to search by patient name, filter by date range, sort by date, and paginate results only. |
| **Run_8 - Adjust patient status** | Says changing status to inactive or archived as if both happen in one page flow. In the system, inactive and archive are separate admin workflows. | Revise into two separate test cases: one for changing a patient from active to inactive, and another for archiving an inactive patient through the Inactive List. |
| **Run_9 - Log-out of the system** | Functional but too short and does not verify logout confirmation behavior. | Add steps for clicking logout, confirming through the dialog, and returning to the Login page. Consider another case for canceling logout. |

### 2. Missing Test Cases

The current PDF is missing several important test cases that should be included to align with the implemented system:

- forgot password request
- verify reset code and reset password
- resend reset code
- add patient with missing required fields
- duplicate patient validation
- patient records filtering
- dental record role restriction for receptionist
- service record amount, quantity, discount, and total computation
- patient logs filtering by date range
- add service with duplicate validation
- add or update dental chart legend with duplicate validation
- archive retrieval from Archive List
- add user account
- email change request and verification
- staff onboarding verification for placeholder email accounts
- password update from My Account
- cancel logout confirmation

### 2.1 Remaining Recommended Test Cases After the Additional Page

After comparing this file against the complete Section 2.5 features, the following test cases are still recommended because they are not yet written as full templates in this document:

- resend reset code
- login with empty required fields
- cancel logout confirmation
- draft preservation in the Add Patient Record form
- additional fields displayed for minor patients
- archive uploaded supporting documents
- service record save confirmation dialog
- associate dentist successfully updates dental records
- admin successfully updates dental records
- add service with duplicate validation
- update dental chart legend with legend code migration
- view user details
- retrieve specific archive types separately such as patient, user, service, and dental chart legend
- password update from My Account
- invalid or expired email verification code
- invalid or expired onboarding verification code

### 3. Additional Test Cases

The following test cases may be added as an additional page using the same layout style as the current test case format.

---

### Table S-2.3.10: Forgot Password and Reset Password

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_10  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Forgot Password and Reset Password  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized staff user can request a password reset code, verify the code, and create a new password successfully.  
**Pre-Conditions:** Existing active staff account with accessible registered email address.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Navigate to the Login page and click **Forgot Password**. | N/A | The forgot-password form is displayed. | ____________________ | ______ |
| 2 | Enter the registered username or email address. | Username: `admin` | The system accepts the account identifier and sends a reset code to the registered email. | ____________________ | ______ |
| 3 | Enter the received verification code. | Reset Code: `123456` | The system validates the code and allows password reset. | ____________________ | ______ |
| 4 | Enter and confirm a new password. | New Password: `Admin123!` | The system accepts the new password if it meets requirements. | ____________________ | ______ |
| 5 | Submit the reset form. | N/A | The system saves the new password and redirects the user to the Login page with a success message. | ____________________ | ______ |

**Post-Conditions:** The user can log in using the newly created password.

---

### Table S-2.3.11: Add Patient Record with Required-Field Validation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_11  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Add Patient Record with Missing Required Fields  
**Test Execution date:** ____________________  
**Description:** Verify that the system prevents submission when required patient registration fields are incomplete.  
**Pre-Conditions:** Authorized staff user is logged in and has opened the Add Patient Record page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **Add Patient Record** page. | N/A | The multi-step registration form is displayed. | ____________________ | ______ |
| 2 | Leave one or more required fields blank in the Patient Information section. | Last Name: blank | The system highlights missing required fields. | ____________________ | ______ |
| 3 | Click **Next**. | N/A | The form does not proceed to the next section. Validation alerts are displayed. | ____________________ | ______ |
| 4 | Complete the missing required fields. | Last Name: `Dela Cruz` | The validation warning is cleared after valid input is provided. | ____________________ | ______ |
| 5 | Click **Next** again. | N/A | The system proceeds to the next registration section. | ____________________ | ______ |

**Post-Conditions:** Patient registration remains incomplete until all required fields are properly filled in.

---

### Table S-2.3.12: Duplicate Patient Validation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_12  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Duplicate Patient Validation  
**Test Execution date:** ____________________  
**Description:** Verify that the system detects and prevents duplicate patient registration based on existing identifying information.  
**Pre-Conditions:** An existing patient record is already stored in the system.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **Add Patient Record** page. | N/A | The registration form is displayed. | ____________________ | ______ |
| 2 | Enter patient information matching an existing record. | Name: `Juan Dela Cruz`, Birthdate: `2000-05-10` | The system accepts the input temporarily. | ____________________ | ______ |
| 3 | Continue through the form and submit the record. | N/A | The system checks for duplicates before saving. | ____________________ | ______ |
| 4 | Confirm the submission attempt. | N/A | The system displays a duplicate-record alert and blocks creation of a second record. | ____________________ | ______ |

**Post-Conditions:** No duplicate patient record is added to the database.

---

### Table S-2.3.13: Receptionist Cannot Save Dental Record Updates

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_13  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Role Restriction on Dental Record Editing  
**Test Execution date:** ____________________  
**Description:** Verify that a receptionist can view dental records but cannot save dental record modifications.  
**Pre-Conditions:** Receptionist account is logged in and a patient with an existing dental record is available.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open **Patient Records** and select a patient. | Patient Name: `John Doe` | The patient record details page is displayed. | ____________________ | ______ |
| 2 | Open the **Dental Records** tab. | N/A | The dental chart and record details are visible. | ____________________ | ______ |
| 3 | Attempt to modify a tooth legend or dental note. | Tooth: `#18`, Note: `Needs follow-up` | The receptionist may view details, but editing actions are restricted. | ____________________ | ______ |
| 4 | Attempt to save the dental record. | N/A | The system prevents saving or hides the save action for unauthorized users. | ____________________ | ______ |

**Post-Conditions:** The existing dental record remains unchanged.

---

### Table S-2.3.14: Add Service Record with Quantity, Discount, and Total Computation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_14  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Add Service Record with Computation Validation  
**Test Execution date:** ____________________  
**Description:** Verify that the system correctly computes subtotal, discount, and total amount when adding a service record.  
**Pre-Conditions:** Authorized staff user is logged in and has opened a patient's Service Records tab.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Click **Add Service Record**. | N/A | The service-record form or modal is displayed. | ____________________ | ______ |
| 2 | Select a service and quantity. | Service: `Tooth Cleaning`, Quantity: `2` | The selected service is added to the form. | ____________________ | ______ |
| 3 | Enter the amount and discount. | Amount: `1000`, Discount: `10%` | The system computes the subtotal, discount value, and final total automatically. | ____________________ | ______ |
| 4 | Review the computed total. | Expected Total: `1800` | The displayed total matches the correct computation. | ____________________ | ______ |
| 5 | Click **Save** and confirm the action. | N/A | The system saves the service record and displays a success message. | ____________________ | ______ |

**Post-Conditions:** The new service record appears in the patient's service history.

---

### Table S-2.3.15: Filter Patient Logs by Date Range

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_15  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Filter Patient Logs by Date Range  
**Test Execution date:** ____________________  
**Description:** Verify that the patient logs page correctly filters activity records using a starting and ending date.  
**Pre-Conditions:** Patient logs exist for multiple dates.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **Patient Logs** page. | N/A | The patient logs list is displayed. | ____________________ | ______ |
| 2 | Click the **Filter Button**. | N/A | The date-range filter panel is displayed. | ____________________ | ______ |
| 3 | Enter a starting date and ending date. | From: `2026-03-01`, To: `2026-03-31` | The system accepts the selected date range. | ____________________ | ______ |
| 4 | Apply the filter. | N/A | Only log records within the selected date range remain visible. | ____________________ | ______ |
| 5 | Review pagination and sort order. | N/A | Pagination and sorting continue to work for the filtered results. | ____________________ | ______ |

**Post-Conditions:** The displayed patient logs remain limited to the selected date range until filters are cleared or changed.

---

### Table S-2.3.16: Retrieve Archived Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_16  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Retrieve Archived Record from Archive List  
**Test Execution date:** ____________________  
**Description:** Verify that the admin can restore an archived record from the Archive List.  
**Pre-Conditions:** An archived patient, user, service, or dental chart legend already exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in as admin and open the **Admin** page. | Admin account | The admin page is displayed. | ____________________ | ______ |
| 2 | Open the **Archive List** tab. | N/A | Archived records are displayed. | ____________________ | ______ |
| 3 | Select the archive type. | Archive Type: `Services` | The system displays archived service records only. | ____________________ | ______ |
| 4 | Click **Retrieve** on an archived record. | Service: `Tooth Cleaning` | The system asks for confirmation before retrieval. | ____________________ | ______ |
| 5 | Confirm the retrieval. | N/A | The record is restored to active use and removed from the archive list. | ____________________ | ______ |

**Post-Conditions:** The retrieved record becomes available again in its active module.

---

### Table S-2.3.17: Email Change Request and Verification

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_17  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Email Change Request and Verification  
**Test Execution date:** ____________________  
**Description:** Verify that a user can request an email change and complete verification using the code sent to the new email address.  
**Pre-Conditions:** Staff user is logged in and has access to the My Account page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **My Account** page. | N/A | The user profile is displayed. | ____________________ | ______ |
| 2 | Enter a new email address and submit the request. | New Email: `staff.new@example.com` | The system sends a verification code to the new email address. | ____________________ | ______ |
| 3 | Enter the received verification code. | Verification Code: `456789` | The system validates the code. | ____________________ | ______ |
| 4 | Confirm the email update. | N/A | The new email address is saved to the account. | ____________________ | ______ |
| 5 | Review the success message. | N/A | The system displays confirmation of the successful email update. | ____________________ | ______ |

**Post-Conditions:** The user's account now uses the verified new email address.

---

### Table S-2.3.18: Staff Onboarding Verification for Placeholder Email Accounts

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_18  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Staff Onboarding Verification for New User Account  
**Test Execution date:** ____________________  
**Description:** Verify that a newly created staff user with a placeholder system email is required to complete onboarding details and verify a real email address before gaining full access.  
**Pre-Conditions:** Admin has created a new staff account with a generated system email, and the user has valid initial login credentials.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in using the newly created staff account. | Username: `staff01`, Password: `Temp123!` | The system accepts the credentials but detects that the account profile is incomplete. | ____________________ | ______ |
| 2 | Review the onboarding form. | N/A | The system requires the user to complete missing profile fields such as real email, birthday, mobile number, and address. | ____________________ | ______ |
| 3 | Enter the required onboarding details. | Email: `staff01@example.com`, Birthday: `2000-01-15`, Mobile: `09123456789`, Address: `Sample Address` | The system accepts the entered profile details and sends a verification code to the submitted email address. | ____________________ | ______ |
| 4 | Enter the verification code sent to the real email address. | Verification Code: `654321` | The system validates the code and completes the email verification process. | ____________________ | ______ |
| 5 | Submit the onboarding process and continue to the system. | N/A | The system grants full account access and redirects the user to the allowed modules based on role. | ____________________ | ______ |

**Post-Conditions:** The staff account is fully activated with verified email and completed profile details.

### 4. Recommended Next Step

If you want a stronger testing section for your paper, the best approach is:

1. Revise the existing PDF test cases using the corrections in Section 1.
2. Add the missing scenarios listed in Section 2.
3. Use the additional templates in Section 3 as the next page or continuation of your test-case appendix.
