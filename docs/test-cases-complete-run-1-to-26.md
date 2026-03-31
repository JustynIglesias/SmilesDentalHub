## Complete Test Cases

This document consolidates the Smiles Dental Hub test cases into one continuous set from `Run_1` to `Run_26` using the same general test case layout.

---

### Table S-2.3.1: Valid Login

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_1  
**Test Designed by:** Keith San Miguel  
**Test Priority:** High  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Log-in with Valid Credentials  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized staff user can log in successfully using valid credentials.  
**Pre-Conditions:** The user account already exists, is active, and has valid login credentials.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Navigate to the Login page. | N/A | The Login page is displayed. | ____________________ | ______ |
| 2 | Enter a valid username. | Username: `admin` | The username is accepted. | ____________________ | ______ |
| 3 | Enter a valid password. | Password: `admin123` | The password is accepted. | ____________________ | ______ |
| 4 | Click **Login**. | N/A | The user is redirected to the Home page. | ____________________ | ______ |

**Post-Conditions:** A valid user session is created.

---

### Table S-2.3.2: Invalid Password Login

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_2  
**Test Designed by:** Keith San Miguel  
**Test Priority:** High  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Login with Invalid Password  
**Test Execution date:** ____________________  
**Description:** Verify that the system rejects login when the password is incorrect.  
**Pre-Conditions:** The username exists in the system.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Login page. | N/A | The Login page is displayed. | ____________________ | ______ |
| 2 | Enter a valid username. | Username: `admin` | The username is accepted. | ____________________ | ______ |
| 3 | Enter an invalid password. | Password: `admin124` | The password is submitted for validation. | ____________________ | ______ |
| 4 | Click **Login**. | N/A | The system displays an invalid-credentials alert and keeps the user on the Login page. | ____________________ | ______ |

**Post-Conditions:** No user session is created.

---

### Table S-2.3.3: Login with Empty Required Fields

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_3  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Login with Empty Required Fields  
**Test Execution date:** ____________________  
**Description:** Verify that the system prevents login when the username or password field is empty.  
**Pre-Conditions:** User is on the Login page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Leave the username field blank. | Username: blank | The username field remains empty. | ____________________ | ______ |
| 2 | Leave the password field blank. | Password: blank | The password field remains empty. | ____________________ | ______ |
| 3 | Click **Login**. | N/A | The system blocks login and displays validation for required fields. | ____________________ | ______ |
| 4 | Enter only one required field and click **Login** again. | Username: `admin`, Password: blank | The system still prevents login. | ____________________ | ______ |

**Post-Conditions:** No session is created and the user remains on the Login page.

---

### Table S-2.3.4: Update Dental Records

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_4  
**Test Designed by:** Keith San Miguel / Revised by Codex  
**Test Priority:** High  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Update Patient Dental Record  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized dentist or admin can update a patient's dental chart and related dental notes.  
**Pre-Conditions:** Authorized user is logged in and the selected patient already has an existing record.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open **Patient Records** and select a patient. | Patient Name: `John Doe` | The patient details page is displayed. | ____________________ | ______ |
| 2 | Open the **Dental Records** tab. | N/A | Dental chart and related record details are displayed. | ____________________ | ______ |
| 3 | Update a tooth legend or note. | Tooth `#18`, Status: `Fillings` | The selected dental input is updated in the form. | ____________________ | ______ |
| 4 | Click **Save Dental Record**. | N/A | The system saves the updated dental record and displays a success message. | ____________________ | ______ |

**Post-Conditions:** The patient dental record reflects the saved changes.

---

### Table S-2.3.5: Add Service Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_5  
**Test Designed by:** Kerr Lawrence Atabelo / Revised by Codex  
**Test Priority:** High  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Add Service Record  
**Test Execution date:** ____________________  
**Description:** Verify that the user can add a new service record to a patient's profile.  
**Pre-Conditions:** Authorized staff user is logged in and has opened a patient's Service Records tab.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open **Patient Records** and select a patient. | Patient Name: `John Doe` | The patient record is opened. | ____________________ | ______ |
| 2 | Open the **Service Records** tab. | N/A | The patient's service history is displayed. | ____________________ | ______ |
| 3 | Click **Add Service Record**. | N/A | The add-service form or modal is displayed. | ____________________ | ______ |
| 4 | Enter service information and save. | Service: `Tooth Cleaning` | The system saves the new service record successfully. | ____________________ | ______ |

**Post-Conditions:** The new service record appears in the patient's service history.

---

### Table S-2.3.6: Update Procedure

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_6  
**Test Designed by:** Keith San Miguel / Revised by Codex  
**Test Priority:** High  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Update Procedure Entry  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized user can update an existing service or dental chart legend entry.  
**Pre-Conditions:** Authorized user has access to the Procedures page and at least one existing entry is available.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **Procedures** page. | N/A | The Procedures page is displayed. | ____________________ | ______ |
| 2 | Select an existing entry to edit. | Service: `Tooth Extraction` | The edit form is displayed. | ____________________ | ______ |
| 3 | Update the entry details. | Updated Price or Label | The form accepts the revised details. | ____________________ | ______ |
| 4 | Save the changes. | N/A | The system updates the entry and displays success feedback. | ____________________ | ______ |

**Post-Conditions:** The updated procedure entry appears in the list.

---

### Table S-2.3.7: Patient Logs

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_7  
**Test Designed by:** Keith San Miguel / Revised by Codex  
**Test Priority:** High  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Patient Logs  
**Test Execution date:** ____________________  
**Description:** Verify that the patient logs page supports searching, date filtering, sorting, and pagination.  
**Pre-Conditions:** Patient logs already exist in the system.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Search by patient name. | Name: `Doe, John` | Matching patient log entries are displayed. | ____________________ | ______ |
| 2 | Apply a date filter or range. | Date: `2026-03-31` | Matching log entries are filtered correctly. | ____________________ | ______ |
| 3 | Change sort direction. | Ascending or Descending | Logs are sorted by date accordingly. | ____________________ | ______ |
| 4 | Use pagination controls. | Next / Previous | Additional log pages can be viewed when results exceed the page limit. | ____________________ | ______ |

**Post-Conditions:** The filtered and sorted log view remains active until changed.

---

### Table S-2.3.8: Archive Inactive Patient Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_8  
**Test Designed by:** Keith San Miguel / Revised by Codex  
**Test Priority:** Medium  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Archive Inactive Patient Record  
**Test Execution date:** ____________________  
**Description:** Verify that the admin can archive an inactive patient record from the Inactive List.  
**Pre-Conditions:** Admin is logged in and at least one inactive patient record exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **Admin** page. | N/A | The Admin page is displayed. | ____________________ | ______ |
| 2 | Open the **Inactive List** tab. | N/A | Inactive patient records are displayed. | ____________________ | ______ |
| 3 | Select an inactive patient. | Patient Name: `John Doe` | The selected record is ready for archiving. | ____________________ | ______ |
| 4 | Click **Archive** and confirm. | N/A | The patient record is moved to the Archive List. | ____________________ | ______ |

**Post-Conditions:** The patient record appears in the archive list instead of the inactive list.

---

### Table S-2.3.9: Log Out of the System

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_9  
**Test Designed by:** Keith San Miguel / Revised by Codex  
**Test Priority:** Medium  
**Test Designed date:** 11/12/2025  
**Test Executed by:** ____________________  
**Test Title:** Log-out of the System  
**Test Execution date:** ____________________  
**Description:** Verify that a logged-in user can end the current session through logout confirmation.  
**Pre-Conditions:** The user is currently logged in.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Click the **Logout** button. | N/A | A logout confirmation dialog is displayed. | ____________________ | ______ |
| 2 | Click **Yes** to confirm. | N/A | The system ends the current session. | ____________________ | ______ |
| 3 | Review the destination page. | N/A | The user is redirected to the Login page. | ____________________ | ______ |

**Post-Conditions:** The session is closed.

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

---

### Table S-2.3.19: Resend Reset Code

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_19  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Resend Reset Code  
**Test Execution date:** ____________________  
**Description:** Verify that the user can request another password reset code when the original code is not received or has expired.  
**Pre-Conditions:** The user has already requested a password reset code from the Forgot Password page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the password reset verification page. | N/A | The verification form is displayed. | ____________________ | ______ |
| 2 | Click **Resend Reset Code**. | N/A | The system generates and sends a new reset code to the registered email address. | ____________________ | ______ |
| 3 | Check the email inbox and enter the new code. | Reset Code: `112233` | The system accepts the new code if it is valid. | ____________________ | ______ |
| 4 | Continue to password reset. | N/A | The user proceeds to the reset-password form successfully. | ____________________ | ______ |

**Post-Conditions:** The original code is replaced or invalidated according to system behavior.

---

### Table S-2.3.20: Login with Empty Required Fields

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_20  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Login with Empty Required Fields  
**Test Execution date:** ____________________  
**Description:** Verify that the system prevents login when the username or password field is empty.  
**Pre-Conditions:** User is on the Login page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Leave the username field blank. | Username: blank | The username field remains empty. | ____________________ | ______ |
| 2 | Leave the password field blank. | Password: blank | The password field remains empty. | ____________________ | ______ |
| 3 | Click **Login**. | N/A | The system blocks login and displays a validation message for required fields. | ____________________ | ______ |
| 4 | Enter only one required field and click **Login** again. | Username: `admin`, Password: blank | The system still prevents login and displays the required validation feedback. | ____________________ | ______ |

**Post-Conditions:** No session is created and the user remains on the Login page.

---

### Table S-2.3.21: Cancel Logout Confirmation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_21  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Cancel Logout Confirmation  
**Test Execution date:** ____________________  
**Description:** Verify that the user remains logged in when the logout confirmation is canceled.  
**Pre-Conditions:** User is logged in and currently viewing any system page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Click the **Logout** button. | N/A | A logout confirmation dialog is displayed. | ____________________ | ______ |
| 2 | Click **No** or **Cancel**. | N/A | The confirmation dialog closes without ending the session. | ____________________ | ______ |
| 3 | Check the current page and session state. | N/A | The user remains on the current page and is still logged in. | ____________________ | ______ |

**Post-Conditions:** The current session stays active.

---

### Table S-2.3.22: Draft Preservation in Add Patient Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_22  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Draft Preservation in Add Patient Record  
**Test Execution date:** ____________________  
**Description:** Verify that entered patient registration data is temporarily preserved while navigating through the multi-step form.  
**Pre-Conditions:** Authorized staff user is logged in and has opened the Add Patient Record page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Enter patient information in the first registration step. | Name: `Juan Dela Cruz`, Birthdate: `2000-05-10` | The entered data appears in the form fields. | ____________________ | ______ |
| 2 | Click **Next** to move to the next step. | N/A | The system proceeds to the next section of the form. | ____________________ | ______ |
| 3 | Click **Back** to return to the first step. | N/A | Previously entered data remains visible in the first-step fields. | ____________________ | ______ |
| 4 | Review the previously entered details. | N/A | The draft data is still preserved and does not need to be re-entered. | ____________________ | ______ |

**Post-Conditions:** In-progress patient registration data remains available until the form is submitted or cleared.

---

### Table S-2.3.23: Minor Patient Registration Displays Guardian Fields

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_23  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Minor Patient Registration Displays Guardian Fields  
**Test Execution date:** ____________________  
**Description:** Verify that additional parent or guardian fields are displayed when registering a patient below 18 years old.  
**Pre-Conditions:** Authorized staff user is on the Add Patient Record page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Enter a birthdate for a patient below 18 years old. | Birthdate: `2012-08-15` | The system calculates the age as a minor patient. | ____________________ | ______ |
| 2 | Review the Patient Information section. | N/A | Additional parent or guardian fields are displayed. | ____________________ | ______ |
| 3 | Enter guardian information. | Guardian Name: `Maria Dela Cruz` | The system accepts guardian-related details. | ____________________ | ______ |
| 4 | Continue to the next step. | N/A | The form proceeds normally with the additional minor-related information included. | ____________________ | ______ |

**Post-Conditions:** The patient's registration data includes the required guardian details for a minor.

---

### Table S-2.3.24: Password Update from My Account

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_24  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Password Update from My Account  
**Test Execution date:** ____________________  
**Description:** Verify that a logged-in user can update the account password through the My Account page.  
**Pre-Conditions:** Staff user is logged in and has access to the My Account page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **My Account** page. | N/A | The account page is displayed. | ____________________ | ______ |
| 2 | Locate the password update form. | N/A | The password update fields are visible. | ____________________ | ______ |
| 3 | Enter and confirm a new password. | New Password: `NewPass123!` | The system accepts the entered password if it meets the required format. | ____________________ | ______ |
| 4 | Submit the password change. | N/A | The system saves the new password and displays a success message. | ____________________ | ______ |
| 5 | Log out and log in again using the new password. | Username: `staff01`, Password: `NewPass123!` | The user successfully logs in using the updated password. | ____________________ | ______ |

**Post-Conditions:** The user's account uses the new password for future logins.

---

### Table S-2.3.25: Update Dental Chart Legend with Legend Code Migration

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_25  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Update Dental Chart Legend with Legend Code Migration  
**Test Execution date:** ____________________  
**Description:** Verify that when a dental chart legend code is updated, existing dental records using that code are updated consistently.  
**Pre-Conditions:** Admin or authorized user has access to the Procedures page and an existing legend code is already in use by at least one patient dental record.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the **Procedures** page and go to the **Dental Chart Legends** tab. | N/A | The list of dental chart legends is displayed. | ____________________ | ______ |
| 2 | Select a legend entry to edit. | Current Code: `CAR`, New Code: `CAR1` | The legend edit form is displayed. | ____________________ | ______ |
| 3 | Save the updated legend code. | N/A | The system saves the new legend code successfully. | ____________________ | ______ |
| 4 | Open a patient dental record that previously used the old code. | Patient Name: `John Doe` | The dental chart now reflects the updated legend code instead of the old one. | ____________________ | ______ |

**Post-Conditions:** All related records consistently use the updated legend code.

---

### Table S-2.3.26: Invalid Onboarding Verification Code

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_26  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Invalid Onboarding Verification Code  
**Test Execution date:** ____________________  
**Description:** Verify that the system rejects an invalid onboarding verification code during new staff account activation.  
**Pre-Conditions:** Newly created staff account has already submitted onboarding details and reached the email verification step.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Enter an incorrect onboarding verification code. | Verification Code: `000000` | The system checks the submitted code. | ____________________ | ______ |
| 2 | Submit the code. | N/A | The system displays an invalid-code message and does not complete onboarding. | ____________________ | ______ |
| 3 | Review account access status. | N/A | Full account access is still restricted until valid verification is completed. | ____________________ | ______ |

**Post-Conditions:** The user remains in the onboarding verification flow and cannot access the full system yet.
