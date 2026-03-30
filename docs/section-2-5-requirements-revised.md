## 2.5 Operating Environment

The following tables present the functional requirements (Table 2.5.1) and non-functional requirements (Table 2.5.2) of the proposed Smiles Dental Hub system. Functional requirements describe what the system is capable of doing, while non-functional requirements describe the quality attributes and operating conditions needed to ensure an efficient, secure, and reliable user experience.

### Table 2.5.1 Functional Requirements

| Module / Feature | Description |
| --- | --- |
| **Login Page** |  |
| Login Form | Allows authorized staff users to log in using their username or email address and password. |
| Login Button | Submits the entered credentials for authentication. |
| System Authorization Alert | Displays an error message when the entered credentials are invalid or when the account is not authorized for access. |
| Eye Button | Allows the user to show or hide the password while typing. |
| Forgot Password | Allows the user to request a password reset code through the registered email address. |
| Verify Reset Code | Allows the user to enter the verification code sent to email before setting a new password. |
| Reset Password | Allows the user to create and confirm a new password after successful code verification. |
| **Navigation Bar / Sidebar** |  |
| Home Tab | Redirects the user to the Home page. |
| Patient Records Tab | Redirects the user to the Patient Records page. |
| Add Patient Record Tab | Redirects the user to the Add Patient page. |
| Procedures Tab | Redirects the user to the Procedures page. |
| Patient Logs Tab | Redirects the user to the Patient Logs page. |
| Settings Tab | Redirects the user to the Settings page for updating account information. |
| Admin Tab | Redirects the admin user to the Admin page. This tab is accessible only to users with the admin role. |
| Logout Button | Allows the user to end the current session and log out of the system. |
| Logout Confirmation Buttons | The **Yes** button confirms logout, while the **No/Cancel** button closes the confirmation dialog without logging out. |
| **Home Page** |  |
| Dashboard Summary Cards | Displays key summary information such as the number of patients served today and during the current week. |
| Weekly and Monthly Patient Charts | Displays patient statistics using graphical charts based on recent service records. |
| Hover Chart Tooltip | Displays the number of male patients, female patients, and total patients for a selected day or month when the user hovers over a bar. |
| Next and Previous Arrows | Allows the user to switch between weekly and monthly chart views. |
| **Add Patient Record** |  |
| Multi-Step Registration Form | Guides the user through the sections **Patient Information**, **Medical History**, **Dental History**, and **Authorization and Release**. |
| Patient Information Form | Collects patient details such as last name, first name, middle name, suffix, birthdate, age, sex, nickname, email address, civil status, current address, mobile number, occupation, and office address. Required and optional fields are validated accordingly. |
| Additional Form for Minors | Displays additional fields for patients below 18 years old, including parent/guardian name, mobile number, occupation, and office address. |
| Medical History Form | Collects physician information, specialty, address, allergen information, health conditions, and responses to medical history questions. |
| Dental History Form | Collects the name of the previous dentist, last dental examination date, reason for consultation, and responses to dental history questions. |
| Authorization and Release Form | Allows the patient to read and agree to the authorization and release statement before submission. |
| Next Button | Moves the user to the next form section after validation of required inputs. |
| Back Button | Returns the user to the previous section without deleting already entered information. |
| Submit Button | Submits the completed patient registration form to the database. |
| Draft Preservation | Temporarily saves in-progress patient registration data in session storage so information is not easily lost while navigating between steps. |
| Duplicate Patient Validation | Checks existing patient records to prevent duplicate entries based on identifying patient information. |
| Validation Alerts | Displays notices when required fields are incomplete, answers are missing, or invalid data is entered. |
| Success Alert | Displays a success message after successful patient record submission. |
| **Patient Records Page** |  |
| Patient Records List | Displays all active and inactive patient records that are not yet archived. |
| Add New Patient Button | Opens the Add Patient Record page to create a new patient entry. |
| Search Bar | Allows users to search patient records by patient ID or patient name. |
| Status Toggle | Allows authorized users to set a patient record as active or inactive. |
| View Button | Opens the detailed patient record page. |
| Sort By Control | Allows the user to sort patient records by available sorting options. |
| Page Navigation | Allows the user to move between pages of patient records and control the number of rows displayed. |
| **Patient Record Details - Patient Information Tab** |  |
| Export Button | Allows the user to generate an export preview and print or save the patient record as a PDF file. |
| Edit Button | Allows the user to update patient personal information, health status, allergen information, dental history, and medical history. |
| View Documents Button | Allows the user to view uploaded patient documents. |
| Add Documents Button | Allows the user to upload patient-related supporting documents. |
| Archive Documents Button | Allows the user to archive uploaded patient documents when necessary. |
| Save Button | Saves edited patient information. |
| Cancel Button | Closes the active editing form without saving changes. |
| Close Button (X) | Closes the active modal or pop-up window. |
| **Patient Record Details - Dental Records Tab** |  |
| Dental Record Display | Shows the patient's dental chart, periodontal screening, occlusion, prescriptions, and notes. |
| Update Dental Records Button | Opens the dental record update form. |
| Dental Chart Drop-Down | Allows the user to assign or update a legend code for each tooth position. |
| Dental Record Form | Allows the user to update periodontal screening, occlusion, dental chart entries, prescriptions, and dental notes. |
| Save Dental Record Button | Saves the updated dental record. |
| Role Restriction on Dental Editing | Receptionists can view dental records but cannot save modifications, while associate dentists and admins can update them. |
| **Patient Record Details - Service Records Tab** |  |
| Service Records List | Displays the patient's service history. |
| Add Service Record Button | Opens the form for adding a new service record. |
| View Service Record Button | Opens a detailed view of an existing service record. |
| Edit Service Record Button | Opens the form for updating an existing service record. |
| Date Calendar Input | Allows the user to select the service date. |
| Service Selection Drop-Down | Allows the user to select one or more dental services for the patient. |
| Quantity Control | Allows the user to adjust the quantity of each selected service. |
| Amount Entry | Allows the user to enter or update the service amount. |
| Discount Entry | Allows the user to apply percentage-based or peso-based discounts. |
| Total Amount Computation | Automatically computes the subtotal, discount amount, and final total amount. |
| Confirmation Dialog | Asks the user to confirm before saving a new or updated service record. |
| Done Button | Closes the view service record modal. |
| **Patient Logs Page** |  |
| Patient Logs Table | Displays patient log entries related to service updates and related activity. |
| Search Bar | Allows the user to search patient logs by patient name. |
| Filter by Date | Allows the user to filter logs by a selected date. |
| Sort Direction Button | Allows the user to sort the patient logs by date from newest to oldest or vice versa. |
| Page Navigation | Allows the user to move between log pages and change the number of displayed rows. |
| **Procedures Page - Services Tab** |  |
| Services List | Displays all active dental services with their corresponding prices. |
| Search Box | Allows the user to search services by name. |
| Add Service Form | Allows the user to add a new service with its name and price. |
| Edit Service Button | Allows the user to update a service's name and price. |
| Archive Service Button | Allows the admin to archive a service. |
| Duplicate Validation | Prevents duplicate service entries from being added or updated. |
| Success and Error Alerts | Displays notices for successful, invalid, or duplicate operations. |
| **Procedures Page - Dental Chart Legend Tab** |  |
| Dental Chart Legends List | Displays active tooth conditions and their legend codes. |
| Search Box | Allows the user to search legends by legend code or condition name. |
| Add Condition Form | Allows the user to add a new dental chart legend and condition. |
| Update Dental Chart Legend Button | Allows the user to update a legend code or tooth condition. |
| Archive Dental Chart Legend Button | Allows the admin to archive a dental chart legend. |
| Legend Code Migration | Updates existing dental records when a legend code is changed, so chart references remain consistent. |
| Duplicate Validation | Prevents duplicate legend codes or tooth condition names. |
| **Admin Page - Manage Users** |  |
| Users List | Displays all active registered users with their staff ID, name, username, role, and creation date. |
| Search Bar | Allows the admin to search users by name or staff ID. |
| Sort Controls | Allows the admin to sort users by name, staff ID, creation date, or role. |
| Add User Button | Opens the form for creating a new staff account. |
| Edit User Button | Allows the admin to view and update user information such as name, username, role, birthday, mobile number, and address. |
| Archive User Button | Allows the admin to archive a user account instead of permanently deleting it from the active list. |
| Validation Alerts | Notifies the admin of duplicate entries, missing required fields, and success messages. |
| Page Navigation | Allows navigation across pages of user records. |
| **Admin Page - Add User** |  |
| Fill-Up Form | Allows the admin to enter first name, middle name, last name, suffix, username, password, role, and optional profile details. |
| Add Button | Creates a new user account in the system. |
| Generated System Email | Creates a system email format for newly added users before profile completion. |
| Success / Error Alerts | Informs the admin whether the account creation succeeded or failed. |
| **Admin Page - Inactive List** |  |
| Inactive Patients Table | Displays inactive patient records that are not yet archived. |
| Search Bar | Allows the admin to search inactive patients by name or patient ID. |
| Sort Controls | Allows sorting by name, patient ID, or inactive date. |
| Archive Button | Allows the admin to archive an inactive patient record. |
| Confirmation Alert | Asks the admin to confirm before archiving a record. |
| Page Navigation | Allows movement across the inactive list pages. |
| **Admin Page - Archive List** |  |
| Archive Type Drop-Down | Allows the admin to switch between archived **patients**, **users**, **services**, and **dental conditions**. |
| Search Bar | Allows the admin to search archived entries. |
| Sort Controls | Allows the admin to sort archived records based on available fields such as name, patient ID, staff ID, or archive date. |
| Retrieve Button | Allows the admin to restore archived patients, users, services, or dental chart legends back to active use when applicable. |
| Confirmation Alert | Asks the admin to confirm retrieval actions. |
| Page Navigation | Allows movement across pages in the archive list. |
| **Settings Page** |  |
| Profile Information View | Displays the current user's profile details. |
| Profile Update Form | Allows the user to update editable personal details such as birthday, mobile number, and address. |
| Email Change Request | Allows the user to request an email change and verify it using a verification code sent through email. |
| Staff Onboarding Verification | Requires newly created staff users with placeholder emails to complete their real email, birthday, mobile number, and address, then verify the submitted email before gaining full access. |
| Validation and Feedback Messages | Displays appropriate messages for invalid input, expired verification code, successful verification, and successful updates. |

The functional requirements table presents the specific capabilities of the Smiles Dental Hub information system. It identifies the major user interactions, from secure login and account recovery to patient registration, patient record management, dental and service record updating, patient log viewing, procedure management, user administration, archive handling, and profile maintenance. These functions define the complete digital workflow intended to improve clinic operations, reduce reliance on fragmented paper-based processes, and provide accurate role-based access to patient information.

### Table 2.5.2 Non-Functional Requirements

| Non-Functional Requirement | Description |
| --- | --- |
| Usability | The system interface must be intuitive and easy to navigate so that clinic staff, associate dentists, and admins can perform tasks such as patient registration, service entry, chart updating, exporting records, and archive management without requiring advanced technical knowledge. |
| Performance | Core pages such as login, dashboard, patient records, procedures, and service record screens should load promptly under normal clinic network conditions to support smooth patient processing. |
| Reliability | The system must ensure that patient records, dental charts, service records, logs, uploaded documents, and user data are accurately saved and retrievable whenever needed. |
| Security | The system must use secure authentication, role-based access control, and protected account workflows so that only authorized personnel can access or modify sensitive patient and administrative data. |
| Data Integrity | The system must validate required fields, detect duplicate patient and procedure entries, preserve consistent archive states, and prevent invalid or incomplete data from being saved. |
| Availability | The system should remain accessible during clinic operating hours with minimal downtime to avoid disruptions in patient accommodation and record handling. |
| Maintainability | The system should use modular and organized code so future updates, bug fixes, and additional features can be implemented efficiently without affecting the entire application. |
| Scalability | The system should support continuous growth in the number of patients, staff users, services, legends, logs, and uploaded documents without significant degradation in performance. |
| Compatibility | The system must work properly on commonly used clinic devices such as desktop computers and laptops and should support modern browsers such as Google Chrome and Microsoft Edge. |
| Recoverability | The system should support restoration workflows such as retrieving archived records and recovering staff account access through password reset and email verification. |
| Auditability | The system should maintain log records for key patient-related actions to support traceability and accountability of system usage. |

Table 2.5.2 defines the essential quality attributes of the Smiles Dental Hub system. These requirements focus on how the system should perform, rather than only what functions it provides. They establish standards for usability, performance, security, reliability, and data integrity to ensure that patient and clinic data remain accurate, protected, and consistently available. In addition, maintainability, scalability, recoverability, and auditability help ensure that the system can continue to support the clinic's future operational and technical needs.
