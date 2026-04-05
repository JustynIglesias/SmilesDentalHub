## Compressed Test Cases

This document presents a balanced compressed version of the Smiles Dental Hub test cases. It reduces the total number of runs while keeping the major system functions and validations clearly separated. This version is intended to be more suitable for paper documentation than the over-compressed version.

### Recommended Balanced Test Case Set

Instead of using all `26` runs or compressing everything too aggressively, this file groups related scenarios into a clearer reduced set. Each run keeps enough procedural detail to show a complete workflow while still reducing repetition. Additional high-risk security and access-control scenarios are also included so the compressed set does not miss critical behaviors.

---

### Table S-2.3.1: Valid Login

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_1  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Valid Login  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized staff user can log in successfully using valid credentials.  
**Pre-Conditions:** An active staff account already exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Login page. | N/A | The Login page is displayed properly. | ____________________ | ______ |
| 2 | Enter a valid username. | Username: `admin` | The username field accepts the entered value. | ____________________ | ______ |
| 3 | Enter a valid password. | Password: `admin123` | The password field accepts the entered value. | ____________________ | ______ |
| 4 | Click **Login**. | N/A | The system authenticates the credentials. | ____________________ | ______ |
| 5 | Review the resulting page. | N/A | The user is redirected to the Home page and a valid session is created. | ____________________ | ______ |

**Post-Conditions:** The user is logged in and can access authorized modules.

---

### Table S-2.3.2: Invalid and Empty Login

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_2  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Invalid and Empty Login Validation  
**Test Execution date:** ____________________  
**Description:** Verify that the system rejects login attempts with invalid credentials or incomplete required fields.  
**Pre-Conditions:** The Login page is accessible.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Enter a valid username. | Username: `admin` | The username field accepts the entered value. | ____________________ | ______ |
| 2 | Enter an invalid password. | Password: `wrong123` | The password field accepts the entered value for validation. | ____________________ | ______ |
| 3 | Click **Login**. | N/A | The system displays an invalid-credentials message and keeps the user on the Login page. | ____________________ | ______ |
| 4 | Clear the fields and leave the required login fields empty. | Username: blank, Password: blank | The form contains incomplete required fields. | ____________________ | ______ |
| 5 | Click **Login** again. | N/A | The system displays required-field validation and prevents login. | ____________________ | ______ |

**Post-Conditions:** No session is created.

---

### Table S-2.3.3: Forgot Password and Reset Password

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_3  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Forgot Password and Reset Password  
**Test Execution date:** ____________________  
**Description:** Verify that a user can request a reset code, verify it, and create a new password successfully.  
**Pre-Conditions:** Existing active staff account with accessible registered email address.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Click **Forgot Password** from the Login page. | N/A | The password recovery form is displayed. | ____________________ | ______ |
| 2 | Enter the registered username or email address. | Username: `admin` | The system accepts the account identifier. | ____________________ | ______ |
| 3 | Submit the request for a reset code. | N/A | The system sends a verification code to the registered email address. | ____________________ | ______ |
| 4 | Enter the received verification code. | Reset Code: `123456` | The system verifies the code and opens the reset-password form. | ____________________ | ______ |
| 5 | Enter and confirm a new password, then submit. | New Password: `Admin123!` | The new password is saved successfully and the user is returned to the Login page. | ____________________ | ______ |

**Post-Conditions:** The user can log in using the new password.

---

### Table S-2.3.4: Resend Reset Code

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_4  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Resend Reset Code  
**Test Execution date:** ____________________  
**Description:** Verify that the user can request another password reset code when needed.  
**Pre-Conditions:** The user is already on the reset-code verification page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the reset-code verification page. | N/A | The verification form is displayed. | ____________________ | ______ |
| 2 | Click **Resend Reset Code**. | N/A | The system generates and sends a new reset code to the registered email address. | ____________________ | ______ |
| 3 | Check the email and enter the new verification code. | Reset Code: `112233` | The system accepts the new code if valid. | ____________________ | ______ |
| 4 | Continue to the reset-password form. | N/A | The user is allowed to proceed with the password reset flow. | ____________________ | ______ |

**Post-Conditions:** The user may continue the reset flow using the new code.

---

### Table S-2.3.5: Add Patient Record with Required Validation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_5  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Add Patient Record with Required Validation  
**Test Execution date:** ____________________  
**Description:** Verify that the system prevents the user from moving forward when required registration fields are incomplete.  
**Pre-Conditions:** Authorized staff user is logged in and has opened the Add Patient Record page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Add Patient Record page. | N/A | The patient registration form is displayed. | ____________________ | ______ |
| 2 | Leave one or more required fields blank in the Patient Information section. | Last Name: blank | The required field remains incomplete. | ____________________ | ______ |
| 3 | Click **Next**. | N/A | The system displays validation alerts and does not proceed to the next section. | ____________________ | ______ |
| 4 | Enter the missing required values. | Last Name: `Dela Cruz` | The required field is completed successfully. | ____________________ | ______ |
| 5 | Click **Next** again. | N/A | The system proceeds to the next section of the form. | ____________________ | ______ |

**Post-Conditions:** The form proceeds only after required fields are completed.

---

### Table S-2.3.6: Duplicate Patient Validation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_6  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Duplicate Patient Validation  
**Test Execution date:** ____________________  
**Description:** Verify that the system prevents registration of a patient whose identifying data already exists.  
**Pre-Conditions:** A matching patient record is already stored in the system.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Add Patient Record page. | N/A | The registration form is displayed. | ____________________ | ______ |
| 2 | Enter patient information matching an existing record. | Name: `Juan Dela Cruz`, Birthdate: `2000-05-10` | The entered patient data is accepted for checking. | ____________________ | ______ |
| 3 | Continue through the form and attempt submission. | N/A | The system checks the submitted information against existing records. | ____________________ | ______ |
| 4 | Review the response after submission. | N/A | The system displays a duplicate-patient alert and prevents record creation. | ____________________ | ______ |

**Post-Conditions:** No duplicate patient is saved.

---

### Table S-2.3.7: Draft Preservation and Minor Patient Fields

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_7  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Draft Preservation and Minor Patient Fields  
**Test Execution date:** ____________________  
**Description:** Verify that the registration form preserves draft data and shows guardian fields for minor patients.  
**Pre-Conditions:** Authorized staff user is on the Add Patient Record page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Enter a birthdate below 18 years old. | Birthdate: `2012-08-15` | The system calculates the patient as a minor. | ____________________ | ______ |
| 2 | Review the Patient Information section. | N/A | Parent or guardian fields are displayed. | ____________________ | ______ |
| 3 | Fill in patient data and continue to the next step. | Name: `Maria Santos` | The form accepts the entered data and proceeds. | ____________________ | ______ |
| 4 | Click **Back** to return to the previous section. | N/A | Previously entered data remains in the form fields. | ____________________ | ______ |

**Post-Conditions:** The registration draft remains preserved and minor-specific fields are shown when applicable.

---

### Table S-2.3.8: Patient Record Viewing and Dental Role Restriction

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_8  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Patient Record Viewing and Dental Role Restriction  
**Test Execution date:** ____________________  
**Description:** Verify that patient records can be viewed correctly and that receptionists cannot save dental record edits.  
**Pre-Conditions:** A patient with existing records is available.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Patient Records page. | N/A | The patient records list is displayed. | ____________________ | ______ |
| 2 | Select a patient record. | Patient Name: `John Doe` | The patient details page is displayed. | ____________________ | ______ |
| 3 | Open the Dental Records tab as receptionist. | N/A | The dental record details are visible to the receptionist. | ____________________ | ______ |
| 4 | Attempt to modify and save a dental entry. | Tooth `#18` | The receptionist can view the record but cannot save updates. | ____________________ | ______ |

**Post-Conditions:** Receptionists remain restricted from saving dental record modifications.

---

### Table S-2.3.9: Update Dental Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_9  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** Update Dental Record  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized associate dentist or admin can update clinical dental-record details such as chart findings, periodontal or occlusion data, prescriptions, or notes successfully.  
**Pre-Conditions:** An associate dentist or admin is logged in and a patient dental record already exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open Patient Records and select a patient. | Patient Name: `John Doe` | The patient details page is displayed. | ____________________ | ______ |
| 2 | Open the Dental Records tab. | N/A | The dental record details are displayed. | ____________________ | ______ |
| 3 | Update one or more allowed clinical fields. | Tooth `#18`, Legend: `Fillings`, Note: `Sensitive on percussion` | The selected dental-record fields are updated successfully in the form. | ____________________ | ______ |
| 4 | Save the dental record. | N/A | The system validates the entry, saves the updated dental record, and displays success feedback. | ____________________ | ______ |
| 5 | Reopen or review the same dental record. | N/A | The saved chart findings, notes, and related changes remain visible in the patient's dental record. | ____________________ | ______ |

**Post-Conditions:** The dental record reflects the saved changes.

---

### Table S-2.3.10: Add Service Record with Computation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_10  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** Add Service Record with Quantity, Discount, and Total Computation  
**Test Execution date:** ____________________  
**Description:** Verify that an authorized associate dentist or admin can add a treatment-related service record and that quantity, pricing, discount, and final total are computed correctly before saving.  
**Pre-Conditions:** An associate dentist or admin is logged in and has opened a patient's Service Records tab.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open a patient's Service Records tab. | Patient Name: `John Doe` | The service history is displayed. | ____________________ | ______ |
| 2 | Click **Add Service Record**. | N/A | The service-record form is displayed. | ____________________ | ______ |
| 3 | Enter treatment-related service details including quantity, unit price, and discount. | Service: `Tooth Cleaning`, Quantity: `2`, Unit Price: `1000`, Discount: `10%` | The system computes the subtotal, discount amount, and final total automatically. | ____________________ | ______ |
| 4 | Review the computed values before saving. | Expected Subtotal: `2000`, Expected Total: `1800` | The displayed computation matches the entered quantity, price, and discount values. | ____________________ | ______ |
| 5 | Save the service record. | N/A | The system saves the service record successfully and displays confirmation feedback. | ____________________ | ______ |
| 6 | Review the service history list. | N/A | The new service record appears in the patient's service history with the correct computed values. | ____________________ | ______ |

**Post-Conditions:** The service record is added successfully.

---

### Table S-2.3.11: Patient Logs

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_11  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Patient Logs Search, Filter, Sort, and Pagination  
**Test Execution date:** ____________________  
**Description:** Verify that patient logs support searching, date filtering, sorting, and page navigation.  
**Pre-Conditions:** Patient logs exist for multiple records and dates.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Patient Logs page. | N/A | The patient logs list is displayed. | ____________________ | ______ |
| 2 | Search logs by patient name. | Name: `Doe, John` | Matching log entries are displayed. | ____________________ | ______ |
| 3 | Apply a date-range filter. | From: `2026-03-01`, To: `2026-03-31` | Only matching logs remain visible. | ____________________ | ______ |
| 4 | Change sort direction. | Ascending / Descending | The displayed logs are reordered according to the selected sort direction. | ____________________ | ______ |
| 5 | Use page navigation controls. | Next / Previous | Pagination works correctly when log results exceed the page limit. | ____________________ | ______ |

**Post-Conditions:** Filtered and sorted patient logs remain visible until changed.

---

### Table S-2.3.12: Procedures Management

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_12  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Procedures Management  
**Test Execution date:** ____________________  
**Description:** Verify that authorized users can update services and dental chart legends, including legend code migration.  
**Pre-Conditions:** Authorized user has access to the Procedures page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Procedures page. | N/A | The Procedures page is displayed. | ____________________ | ______ |
| 2 | Select and update a service entry. | Service: `Tooth Extraction` | The updated service information is saved successfully. | ____________________ | ______ |
| 3 | Switch to Dental Chart Legends and update a legend code. | Current Code: `CAR`, New Code: `CAR1` | The new legend code is saved successfully. | ____________________ | ______ |
| 4 | Open a patient record that used the old legend code. | Patient Name: `John Doe` | Related dental records now reflect the updated legend code. | ____________________ | ______ |

**Post-Conditions:** Procedure entries remain updated and consistent across related records.

---

### Table S-2.3.13: Archive Inactive Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_13  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Archive Inactive Record  
**Test Execution date:** ____________________  
**Description:** Verify that the admin can archive an inactive patient record from the Inactive List.  
**Pre-Conditions:** Admin is logged in and at least one inactive patient record exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Admin page. | N/A | The Admin page is displayed. | ____________________ | ______ |
| 2 | Open the Inactive List tab. | N/A | Inactive patient records are displayed. | ____________________ | ______ |
| 3 | Select an inactive patient record. | Patient Name: `John Doe` | The selected record is ready for archiving. | ____________________ | ______ |
| 4 | Click **Archive** and confirm the action. | N/A | The patient record is archived successfully. | ____________________ | ______ |

**Post-Conditions:** The patient record appears in the archive list.

---

### Table S-2.3.14: Retrieve Archived Record

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_14  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Retrieve Archived Record  
**Test Execution date:** ____________________  
**Description:** Verify that the admin can retrieve an archived record from the Archive List.  
**Pre-Conditions:** At least one archived record exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Archive List tab. | N/A | The list of archived records is displayed. | ____________________ | ______ |
| 2 | Select an archive type. | Archive Type: `Services` | Matching archived records are filtered and displayed. | ____________________ | ______ |
| 3 | Click **Retrieve** on an archived record. | Service: `Tooth Cleaning` | The system asks for confirmation before restoration. | ____________________ | ______ |
| 4 | Confirm the retrieval action. | N/A | The record is restored to active use successfully. | ____________________ | ______ |

**Post-Conditions:** The retrieved record becomes available again in its active module.

---

### Table S-2.3.15: Email Change Verification

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_15  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Email Change Verification  
**Test Execution date:** ____________________  
**Description:** Verify that a user can request an email change and complete verification successfully.  
**Pre-Conditions:** Staff user is logged in and has access to the My Account page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the My Account page. | N/A | The user's account details are displayed. | ____________________ | ______ |
| 2 | Enter a new email address and submit the request. | New Email: `staff.new@example.com` | The system sends a verification code to the new email. | ____________________ | ______ |
| 3 | Enter the verification code. | Verification Code: `456789` | The system validates the code successfully. | ____________________ | ______ |
| 4 | Confirm the email change. | N/A | The account email is updated successfully. | ____________________ | ______ |

**Post-Conditions:** The account now uses the verified new email address.

---

### Table S-2.3.16: Password Update from My Account

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_16  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Password Update from My Account  
**Test Execution date:** ____________________  
**Description:** Verify that a user can change the account password through the My Account page.  
**Pre-Conditions:** Staff user is logged in and can access the My Account page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the My Account page. | N/A | The account page is displayed. | ____________________ | ______ |
| 2 | Locate the password update form. | N/A | The password update fields are visible. | ____________________ | ______ |
| 3 | Enter and confirm a new password. | New Password: `NewPass123!` | The system accepts the new password and saves it successfully. | ____________________ | ______ |
| 4 | Log out and log in using the new password. | Username: `staff01`, Password: `NewPass123!` | The user logs in successfully using the updated password. | ____________________ | ______ |

**Post-Conditions:** The account uses the new password for future logins.

---

### Table S-2.3.17: Staff Onboarding Verification

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_17  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Staff Onboarding Verification  
**Test Execution date:** ____________________  
**Description:** Verify that a new staff user must complete onboarding and email verification before gaining full access.  
**Pre-Conditions:** Admin has created a new staff account with placeholder email and valid initial credentials.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in using the newly created staff account. | Username: `staff01`, Password: `Temp123!` | The system opens the onboarding flow because the profile is incomplete. | ____________________ | ______ |
| 2 | Enter required profile details. | Birthday, Mobile Number, Address | The system accepts the missing profile information. | ____________________ | ______ |
| 3 | Submit a real email address. | Email: `staff01@example.com` | The system sends a verification code to the submitted email. | ____________________ | ______ |
| 4 | Enter an invalid code first, then enter a valid code. | Invalid: `000000`, Valid: `654321` | Invalid verification is rejected, while valid verification completes onboarding successfully. | ____________________ | ______ |
| 5 | Continue to the allowed modules after verification. | N/A | Full account access is granted based on the user's role. | ____________________ | ______ |

**Post-Conditions:** Only verified onboarding grants full account access.

---

### Table S-2.3.18: Logout Flow

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_18  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Logout Confirmation and Cancel Logout  
**Test Execution date:** ____________________  
**Description:** Verify that the user can cancel logout or confirm logout correctly.  
**Pre-Conditions:** User is logged in.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Click **Logout**. | N/A | The logout confirmation dialog is displayed. | ____________________ | ______ |
| 2 | Click **No** or **Cancel**. | N/A | The dialog closes and the user remains logged in. | ____________________ | ______ |
| 3 | Click **Logout** again. | N/A | The logout confirmation dialog is displayed again. | ____________________ | ______ |
| 4 | Click **Yes** to confirm logout. | N/A | The system ends the session and redirects to the Login page. | ____________________ | ______ |

**Post-Conditions:** Confirmed logout ends the session, while canceled logout keeps the session active.

---

### Table S-2.3.19: Inactive or Archived Account Access Restriction

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_19  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Inactive or Archived Account Access Restriction  
**Test Execution date:** ____________________  
**Description:** Verify that an inactive or archived staff account cannot continue into the system even if login credentials are entered correctly.  
**Pre-Conditions:** A staff account exists but is marked inactive in the system.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Login page. | N/A | The Login page is displayed. | ____________________ | ______ |
| 2 | Enter the correct credentials for the inactive or archived account. | Username: `staff01`, Password: `Temp123!` | The credentials are submitted to the system. | ____________________ | ______ |
| 3 | Attempt to proceed after login. | N/A | The account is blocked from full system access. | ____________________ | ______ |
| 4 | Review the resulting message or behavior. | N/A | The system shows that the account is not provisioned for system access or otherwise denies protected access. | ____________________ | ______ |

**Post-Conditions:** The inactive or archived account cannot access protected modules.

---

### Table S-2.3.20: Failed Login Alert Email After Four Attempts

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_20  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Failed Login Alert Email After Four Attempts  
**Test Execution date:** ____________________  
**Description:** Verify that the system sends a failed-login warning email to the registered account email after four unsuccessful login attempts.  
**Pre-Conditions:** SMTP is configured and the target account has a valid registered email.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Login page. | N/A | The Login page is displayed. | ____________________ | ______ |
| 2 | Enter a valid username with an incorrect password and click **Login**. | Username: `admin`, Password: `wrong123` | The system rejects the login attempt. | ____________________ | ______ |
| 3 | Repeat the failed login process until the fourth failed attempt. | Same incorrect password for four attempts | The system continues to reject the login attempts. | ____________________ | ______ |
| 4 | Check the registered email after the fourth failure. | Registered Email | A failed-login alert email is sent to the registered email address. | ____________________ | ______ |

**Post-Conditions:** The account owner receives a failed-login warning email after the configured threshold is reached.

---

### Table S-2.3.21: Role-Based Access to Admin Module

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_21  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Role-Based Access to Admin Module  
**Test Execution date:** ____________________  
**Description:** Verify that only users with the admin role can access the Admin module and its administrative functions.  
**Pre-Conditions:** One admin account and one non-admin staff account both exist.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in using a non-admin account. | Role: `receptionist` or `associate_dentist` | The non-admin user enters the system successfully. | ____________________ | ______ |
| 2 | Attempt to open the Admin page or Admin navigation item. | N/A | The non-admin user is redirected away from the Admin page or denied access. | ____________________ | ______ |
| 3 | Log out and log in using an admin account. | Role: `admin` | The admin enters the system successfully. | ____________________ | ______ |
| 4 | Open the Admin module. | N/A | The admin page and administrative functions are accessible. | ____________________ | ______ |

**Post-Conditions:** Only admin users can access the Admin module.

---

### Table S-2.3.22: Role-Based Archive Restriction in Procedures

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_22  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Role-Based Archive Restriction in Procedures  
**Test Execution date:** ____________________  
**Description:** Verify that only admin users can archive procedure services and dental chart legends.  
**Pre-Conditions:** One non-admin staff account and one admin account both have access to the Procedures page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in using a non-admin account and open the Procedures page. | Role: `receptionist` or `associate_dentist` | The Procedures page is displayed. | ____________________ | ______ |
| 2 | Attempt to archive a service or dental chart legend. | Service or Legend Entry | The system blocks the action and shows that only admins can archive these records. | ____________________ | ______ |
| 3 | Log out and log in using an admin account. | Role: `admin` | The admin enters the system successfully. | ____________________ | ______ |
| 4 | Attempt the same archive action again. | Same service or legend entry | The archive action is allowed for the admin account. | ____________________ | ______ |

**Post-Conditions:** Procedure archive actions remain restricted to admin users only.

---

### Table S-2.3.23: Email Change Resend and Invalid Verification Handling

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_23  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Email Change Resend and Invalid Verification Handling  
**Test Execution date:** ____________________  
**Description:** Verify that the system supports resending an email-change verification code and correctly rejects invalid or expired verification attempts.  
**Pre-Conditions:** Staff user is logged in and has access to the My Account page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the My Account page and request an email change. | New Email: `staff.new@example.com` | The system sends a verification code to the new email address. | ____________________ | ______ |
| 2 | Click the resend verification option. | N/A | The system sends a new verification code to the same email address. | ____________________ | ______ |
| 3 | Enter an invalid or expired verification code. | Verification Code: `000000` | The system rejects the code and displays an error message. | ____________________ | ______ |
| 4 | Enter the valid latest verification code. | Verification Code: `456789` | The system verifies the code successfully. | ____________________ | ______ |
| 5 | Confirm the email update. | N/A | The email change is completed successfully. | ____________________ | ______ |

**Post-Conditions:** The account email is updated only after successful valid verification.

---

### Table S-2.3.24: Patient Records Filtering

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_24  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Patient Records Filtering  
**Test Execution date:** ____________________  
**Description:** Verify that the Patient Records page correctly filters records by available filter criteria.  
**Pre-Conditions:** Multiple patient records exist with different sex, status, age, and registration dates.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Patient Records page. | N/A | The patient records list is displayed. | ____________________ | ______ |
| 2 | Open the filter panel. | N/A | The patient records filter options are displayed. | ____________________ | ______ |
| 3 | Apply one or more filters. | Status: `Inactive`, Sex: `Female` | Only matching patient records remain visible. | ____________________ | ______ |
| 4 | Adjust or clear the filters. | Clear Filters | The list updates and returns to the unfiltered state when filters are removed. | ____________________ | ______ |

**Post-Conditions:** Patient records remain filtered only according to the currently selected criteria.

---

### Table S-2.3.25: Export Patient Record and Archive Document

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_25  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Export Patient Record and Archive Document  
**Test Execution date:** ____________________  
**Description:** Verify that a user can export a patient record as PDF and archive an uploaded supporting document when permitted.  
**Pre-Conditions:** A patient record exists and has at least one uploaded supporting document.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open a patient's Patient Information tab. | Patient Name: `John Doe` | The patient information and document actions are displayed. | ____________________ | ______ |
| 2 | Click **Export**. | N/A | The system generates a printable or savable PDF preview of the patient record. | ____________________ | ______ |
| 3 | View the uploaded documents. | N/A | The list of patient documents is displayed. | ____________________ | ______ |
| 4 | Select a document and click **Archive**. | Document: `Consent Form` | The system archives the selected document successfully. | ____________________ | ______ |

**Post-Conditions:** The patient record can be exported and the selected document is removed from active document use.

---

### Table S-2.3.26: Service Record View and Edit

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_26  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Service Record View and Edit  
**Test Execution date:** ____________________  
**Description:** Verify that authorized users can view an existing service record and update it successfully.  
**Pre-Conditions:** A patient already has an existing service record.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open a patient's Service Records tab. | Patient Name: `John Doe` | The list of service records is displayed. | ____________________ | ______ |
| 2 | Open an existing service record using the view action. | Existing Service Record | The system displays the selected service record details. | ____________________ | ______ |
| 3 | Click the edit action for the same service record. | N/A | The service record edit form is displayed. | ____________________ | ______ |
| 4 | Update one or more editable values and save. | Amount: `1200` | The system saves the updated service record successfully. | ____________________ | ______ |

**Post-Conditions:** The service record reflects the updated saved values.

---

### Table S-2.3.27: Procedure Duplicate Validation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_27  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Procedure Duplicate Validation  
**Test Execution date:** ____________________  
**Description:** Verify that duplicate services or dental chart legends cannot be added or updated in the Procedures module.  
**Pre-Conditions:** At least one existing service and one existing dental chart legend are already stored.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Procedures page. | N/A | The Procedures module is displayed. | ____________________ | ______ |
| 2 | Attempt to add a service with an already existing service name. | Service: `Tooth Extraction` | The system rejects the duplicate service entry and displays an error message. | ____________________ | ______ |
| 3 | Attempt to add or update a dental chart legend to match an existing code or condition. | Code: `CAR1` | The system rejects the duplicate legend entry and displays an error message. | ____________________ | ______ |

**Post-Conditions:** No duplicate procedure or legend is saved.

---

### Table S-2.3.28: Admin Create User Validation

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_28  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Admin Create User Validation  
**Test Execution date:** ____________________  
**Description:** Verify that the admin user-creation flow enforces validation rules for username, password, role, and duplicate email conditions.  
**Pre-Conditions:** Admin is logged in and has access to the Manage Users page.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Admin page and go to Manage Users. | N/A | The user management list is displayed. | ____________________ | ______ |
| 2 | Open the Add User form and enter invalid or duplicate values. | Duplicate Username, Short Password, Invalid Role | The system rejects invalid input and displays appropriate validation messages. | ____________________ | ______ |
| 3 | Enter a valid unique user record. | Valid New User Data | The system accepts the new user information. | ____________________ | ______ |
| 4 | Submit the Add User form. | N/A | The user account is created successfully and appears in the user list. | ____________________ | ______ |

**Post-Conditions:** Only valid unique user accounts are created.

---

### Table S-2.3.29: Admin User Email Update and Delete Restrictions

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_29  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Admin User Email Update and Delete Restrictions  
**Test Execution date:** ____________________  
**Description:** Verify that the admin can update a user's email when allowed and that permanent deletion rules are enforced correctly.  
**Pre-Conditions:** Admin is logged in and at least one staff account exists for management.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open Manage Users and select a user account. | Target User | The selected user's details are displayed. | ____________________ | ______ |
| 2 | Attempt to update the user's email to a valid unique value. | New Email: `updated.staff@example.com` | The system updates the user's email successfully. | ____________________ | ______ |
| 3 | Attempt to permanently delete a user that is not archived or attempt to delete the current admin account. | Current Admin or Active User | The system blocks the deletion and displays the applicable restriction message. | ____________________ | ______ |
| 4 | Attempt permanent deletion only on an archived user that satisfies requirements. | Archived User | The system allows deletion only when deletion rules are satisfied. | ____________________ | ______ |

**Post-Conditions:** User email updates follow validation rules and permanent deletion remains restricted by system safeguards.

---

### Table S-2.3.30: Session Expiration Handling

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_30  
**Test Designed by:** Codex  
**Test Priority:** Medium  
**Test Designed date:** 03/31/2026  
**Test Executed by:** ____________________  
**Test Title:** Session Expiration Handling  
**Test Execution date:** ____________________  
**Description:** Verify that the system handles expired or invalid sessions properly and redirects the user to log in again when necessary.  
**Pre-Conditions:** A logged-in session exists and can be allowed to expire or be invalidated.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in to the system successfully. | Valid Staff Credentials | The user enters the protected system area. | ____________________ | ______ |
| 2 | Allow the session to expire or invalidate the access token. | Expired Session | The active session becomes invalid. | ____________________ | ______ |
| 3 | Attempt to continue using the system or return to the app window. | N/A | The system detects the expired session. | ____________________ | ______ |
| 4 | Review the resulting behavior. | N/A | The user is prompted to log in again or redirected back to the Login page. | ____________________ | ______ |

**Post-Conditions:** Expired sessions do not retain unauthorized access to protected pages.

---

### Table S-2.3.31: Protected Navigation During Patient Self-Registration

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_31  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** Protected Navigation During Patient Self-Registration  
**Test Execution date:** ____________________  
**Description:** Verify that the system protects the patient intake page from unauthorized module switching while a patient is still entering data.  
**Pre-Conditions:** An authorized staff user is logged in, the Add Patient Record page is open, and partial patient data has already been entered.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Start entering patient information in the Add Patient Record form. | Patient Name: `Maria Santos` | The patient registration form accepts the entered draft data. | ____________________ | ______ |
| 2 | Attempt to leave the Add Patient Record page or open another module. | Click another navigation item | The system interrupts the navigation attempt and displays the restricted-navigation prompt. | ____________________ | ______ |
| 3 | Enter an incorrect staff password in the prompt. | Password: `wrong123` | The system rejects the password and keeps the user on the intake page. | ____________________ | ______ |
| 4 | Enter the correct staff password. | Password: `admin123` | The system accepts the password and allows the intended navigation. | ____________________ | ______ |

**Post-Conditions:** The intake page remains protected from unauthorized interruption until valid staff re-authentication is provided.

---

### Table S-2.3.32: Patient Document Upload Validation and Deletion

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_32  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** Patient Document Upload Validation and Deletion  
**Test Execution date:** ____________________  
**Description:** Verify that authorized users can upload an allowed patient document, reject an unsupported file, and delete a saved document successfully.  
**Pre-Conditions:** Authorized user is logged in and a patient record already exists.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open a patient's Patient Information tab. | Patient Name: `John Doe` | The patient information page and document actions are displayed. | ____________________ | ______ |
| 2 | Upload a valid supporting document. | File: `consent-form.pdf` | The system accepts the file upload and shows the document in the patient's document list. | ____________________ | ______ |
| 3 | Attempt to upload an unsupported file type. | File: `script.exe` | The system rejects the file and displays a file-type validation message. | ____________________ | ______ |
| 4 | Delete the previously uploaded valid document. | Document: `consent-form.pdf` | The system confirms and removes the document from the active document list successfully. | ____________________ | ______ |

**Post-Conditions:** Only valid document files are stored, and authorized deletions remove the document from active patient-document access.

---

### Table S-2.3.33: Patient Status Change and Log Recording

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_33  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** Patient Status Change and Log Recording  
**Test Execution date:** ____________________  
**Description:** Verify that changing a patient record from active to inactive or back updates the record correctly and creates a corresponding patient-log entry.  
**Pre-Conditions:** Authorized user is logged in and a patient record exists in active status.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Patient Records page. | N/A | The patient records list is displayed. | ____________________ | ______ |
| 2 | Change the selected patient's status from Active to Inactive. | Patient Name: `John Doe` | The system asks for confirmation before applying the status change. | ____________________ | ______ |
| 3 | Confirm the status change. | N/A | The patient's status is updated to Inactive successfully. | ____________________ | ______ |
| 4 | Open the Patient Logs page and search for the affected patient. | Patient Name: `John Doe` | A log entry for the status change is recorded and displayed. | ____________________ | ______ |
| 5 | Restore the patient's status back to Active if allowed. | N/A | The system updates the status correctly and records the corresponding log event. | ____________________ | ______ |

**Post-Conditions:** Status changes are reflected in patient records and patient logs.

---

### Table S-2.3.34: CSV Migration Import Validation and Summary

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_34  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** CSV Migration Import Validation and Summary  
**Test Execution date:** ____________________  
**Description:** Verify that the admin can import a valid patient migration CSV file and that the system displays validation and processing results correctly.  
**Pre-Conditions:** Admin is logged in and a migration CSV file is available.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Open the Admin page and go to Manage Users or the import area. | N/A | The patient migration import action is available to the admin. | ____________________ | ______ |
| 2 | Attempt to import an invalid or malformed CSV file first. | File: `invalid-migration.csv` | The system rejects the file or displays validation errors without importing invalid rows. | ____________________ | ______ |
| 3 | Import a valid migration CSV file. | File: `patients-record-migrate-sample-compactJUstyn-fixed.csv` | The system accepts the file and starts processing the rows. | ____________________ | ______ |
| 4 | Review the import result summary. | N/A | The summary shows counts of created, updated, and skipped rows. | ____________________ | ______ |
| 5 | Verify one imported or updated patient record. | Imported Patient Record | The patient record and related dental information appear correctly in the system. | ____________________ | ______ |

**Post-Conditions:** Only valid CSV data is processed, and the admin can review the import summary after completion.

---

### Table S-2.3.35: Direct Access Restriction for Protected Modules

**Project Name:** An Information System for Digitizing Dental Patient Record Keeping & Monitoring System  
**TEST CASE TEMPLATE**  
**Test Case ID:** Run_35  
**Test Designed by:** Codex  
**Test Priority:** High  
**Test Designed date:** 04/04/2026  
**Test Executed by:** ____________________  
**Test Title:** Direct Access Restriction for Protected Modules  
**Test Execution date:** ____________________  
**Description:** Verify that users without the required role cannot access protected modules or actions by direct URL entry or forced navigation.  
**Pre-Conditions:** One non-admin account and one admin-only module or action are available in the system.

| Step | Test step | Test data | Expected result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Log in using a non-admin account. | Role: `receptionist` | The non-admin user enters the system successfully. | ____________________ | ______ |
| 2 | Manually enter the URL or forced route for an admin-only page. | Admin URL or route | The system blocks access and redirects the user or displays an unauthorized-access message. | ____________________ | ______ |
| 3 | Attempt a restricted admin-only action through a saved link or direct request path. | Archive or Manage Users action | The system denies the action because the user's role is insufficient. | ____________________ | ______ |
| 4 | Log in using an admin account and open the same page or action. | Role: `admin` | The admin can access the protected module and action successfully. | ____________________ | ______ |

**Post-Conditions:** Protected routes and restricted actions remain inaccessible to unauthorized roles even through direct navigation attempts.
