## Additional Test Cases Page 2

This page continues the test case set using the same structure and layout style as the current test case template. It focuses on the remaining high-priority scenarios that were still missing after the first additional test case page.

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

**Post-Conditions:** The original code is replaced or invalidated according to system behavior, and the user may continue the password reset process using the new code.

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
