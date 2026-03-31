## 2.5 Operating Environment

This section presents the complete operational requirements of the proposed Smiles Dental Hub system. It identifies the major functional features available to authorized users and the non-functional requirements that support secure, reliable, and efficient clinic operations. The section is intended to give a fuller description of how the system is used in practice by clinic staff, associate dentists, and administrators.

### 2.5.1 Overview of Operational Use

Smiles Dental Hub is a web-based dental clinic information system designed to centralize patient registration, record management, treatment documentation, procedure maintenance, account administration, and audit monitoring. The system is used within the clinic environment through internet-connected desktop computers or laptops and is accessed only by authorized staff members. Depending on the assigned role, users are given access only to the modules and actions necessary for their responsibilities.

The system supports the following major operational activities:

- secure staff login and password recovery
- role-based navigation and access control
- patient registration through a guided multi-step form
- patient record viewing and updating
- dental record viewing and authorized editing
- service record creation, viewing, and updating
- patient activity log monitoring
- management of services and dental chart legends
- management of users, inactive records, and archived records
- profile maintenance, email verification, and password updating

### 2.5.2 Role-Based Operational Features

| User Role | Major Operational Features |
| --- | --- |
| Receptionist | Can log in, recover account access, register patients, search and manage patient records, update patient information, upload supporting documents, add and update service records, view dental records, access procedures based on assigned permissions, view patient logs, and manage personal account settings. |
| Associate Dentist | Can log in, recover account access, register patients, access patient records, update dental records, view and update service records, use procedures data for treatment documentation, view patient logs, and manage personal account settings. |
| Admin | Can access all staff features and administrative functions such as user management, inactive-record handling, archive management, service archiving, dental chart legend archiving, and record retrieval workflows. |
| Patient | Does not log in to the system directly but may use the clinic-provided device to complete the registration form during assisted patient intake. |

### 2.5.3 Functional Requirements

#### Table 2.5.1 Functional Requirements

| Module / Feature | Description |
| --- | --- |
| **Login and Account Recovery** |  |
| Login Form | Allows authorized staff users to log in using their username or email address and password. |
| Login Button | Submits the entered credentials for authentication. |
| System Authorization Alert | Displays an error message when the entered credentials are invalid or when the account is not authorized for access. |
| Eye Button | Allows the user to show or hide the password while typing. |
| Forgot Password | Allows the user to request a password reset code through the registered email address. |
| Verify Reset Code | Allows the user to enter the verification code sent to email before setting a new password. |
| Resend Reset Code | Allows the user to request another password reset code when the previous code is not received or has expired. |
| Reset Password | Allows the user to create and confirm a new password after successful code verification. |
| **Navigation and Dashboard** |  |
| Home Tab | Redirects the user to the Home page. |
| Patient Records Tab | Redirects the user to the Patient Records page. |
| Add Patient Record Tab | Redirects the user to the Add Patient page. |
| Procedures Tab | Redirects the user to the Procedures page. |
| Patient Logs Tab | Redirects the user to the Patient Logs page. |
| My Account Tab | Redirects the user to the My Account page for viewing and updating account information. |
| Admin Tab | Redirects the admin user to the Admin page. This tab is accessible only to users with the admin role. |
| Logout Button | Allows the user to end the current session and log out of the system. |
| Logout Confirmation Buttons | The **Yes** button confirms logout, while the **No/Cancel** button closes the confirmation dialog without logging out. |
| Role-Based Navigation Visibility | Displays only the modules and actions allowed for the logged-in user role, such as receptionist, associate dentist, or admin. |
| Dashboard Summary Cards | Displays key summary information such as the number of patients served today and during the current week. |
| Weekly and Monthly Patient Charts | Displays patient statistics using graphical charts based on recent service records. |
| Hover Chart Tooltip | Displays the number of male patients, female patients, and total patients for a selected day or month when the user hovers over a bar. |
| Next and Previous Arrows | Allows the user to switch between weekly and monthly chart views. |
| **Add Patient Record** |  |
| Assisted Patient Registration Workflow | Allows clinic staff to open the registration form on a clinic-owned device so the patient can complete the required information during registration. |
| Multi-Step Registration Form | Guides the user through the sections **Patient Information**, **Medical History**, **Dental History**, and **Authorization and Release**. |
| Patient Information Form | Collects patient details such as last name, first name, middle name, suffix, birthdate, age, sex, nickname, email address, civil status, current address, mobile number, occupation, and office address. Required and optional fields are validated accordingly. |
| Additional Form for Minors | Displays additional fields for patients below 18 years old, including parent or guardian name, mobile number, occupation, and office address. |
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
| **Patient Records Management** |  |
| Patient Records List | Displays all active and inactive patient records that are not yet archived. |
| Add New Patient Button | Opens the Add Patient Record page to create a new patient entry. |
| Search Bar | Allows users to search patient records by patient name. |
| Filter Button | Opens the patient records filter panel where the user can filter records by sex, status, age range, and registration date range. |
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
| Service Record Role Access | Allows authorized staff roles to view, add, or update service records according to assigned permissions. |
| **Patient Logs** |  |
| Patient Logs Table | Displays patient log entries related to service updates and related activity. |
| Search Bar | Allows the user to search patient logs by patient name. |
| Filter Button | Opens the patient logs filter panel where the user can filter logs by date range. |
| Filter by Date Range | Allows the user to filter logs using starting and ending dates. |
| Sort Direction Button | Allows the user to sort the patient logs by date from newest to oldest or vice versa. |
| Page Navigation | Allows the user to move between log pages and change the number of displayed rows. |
| Activity Traceability | Maintains patient-related log entries to support monitoring of record and service activity. |
| **Procedures Management** |  |
| Services List | Displays all active dental services with their corresponding prices. |
| Search Box | Allows the user to search services by name. |
| Add Service Form | Allows the user to add a new service with its name and price. |
| Edit Service Button | Allows the user to update a service's name and price. |
| Archive Service Button | Allows the admin to archive a service. |
| Archive Confirmation Dialog | Asks the admin to confirm before archiving a service. |
| Duplicate Validation | Prevents duplicate service entries from being added or updated. |
| Success and Error Alerts | Displays notices for successful, invalid, or duplicate operations. |
| Service Management Role Access | Allows service viewing and maintenance actions according to user role, while archive and retrieval actions remain restricted to admin workflows. |
| Dental Chart Legends List | Displays active tooth conditions and their legend codes. |
| Legend Search Box | Allows the user to search legends by legend code or condition name. |
| Add Condition Form | Allows the user to add a new dental chart legend and condition. |
| Update Dental Chart Legend Button | Allows the user to update a legend code or tooth condition. |
| Archive Dental Chart Legend Button | Allows the admin to archive a dental chart legend. |
| Legend Archive Confirmation Dialog | Asks the admin to confirm before archiving a dental chart legend. |
| Legend Code Migration | Updates existing dental records when a legend code is changed, so chart references remain consistent. |
| Legend Duplicate Validation | Prevents duplicate legend codes or tooth condition names. |
| Legend Management Role Access | Allows legend viewing and permitted updates based on assigned role, while archive and retrieval actions remain restricted to admin workflows. |
| **Administrative Functions** |  |
| Users List | Displays all active registered users with their staff ID, name, username, role, and creation date. |
| User Search Bar | Allows the admin to search users by name, username, email address, or staff ID. |
| User Filter Button | Opens the manage users filter panel where the admin can filter records by role and account creation date range. |
| User Sort Controls | Allows the admin to sort users by name, staff ID, creation date, or role. |
| Add User Button | Opens the form for creating a new staff account. |
| View User Details | Allows the admin to open and review the full information of an existing staff account. |
| Edit User Button | Allows the admin to view and update user information such as name, username, role, birthday, mobile number, and address. |
| Archive User Button | Allows the admin to archive a user account instead of permanently deleting it from the active list. |
| User Validation Alerts | Notifies the admin of duplicate entries, missing required fields, and success messages. |
| User Page Navigation | Allows navigation across pages of user records. |
| Add User Form | Allows the admin to enter first name, middle name, last name, suffix, username, password, role, and optional profile details. |
| Add Button | Creates a new user account in the system. |
| Generated System Email | Creates a system email format for newly added users before profile completion. |
| Add User Success or Error Alerts | Informs the admin whether the account creation succeeded or failed. |
| Inactive Patients Table | Displays inactive patient records that are not yet archived. |
| Inactive Search Bar | Allows the admin to search inactive patients by patient name or patient ID. |
| Inactive Filter Button | Opens the inactive patients filter panel where the admin can filter records by sex, age range, and inactive date range. |
| Inactive Sort Controls | Allows sorting by name, patient ID, or inactive date. |
| Archive Button | Allows the admin to archive an inactive patient record. |
| Archive Confirmation Alert | Asks the admin to confirm before archiving a record. |
| Inactive Page Navigation | Allows movement across the inactive list pages. |
| Archive Type Drop-Down | Allows the admin to switch between archived patients, users, services, and dental conditions. |
| Archive Search Bar | Allows the admin to search archived entries based on the selected archive type. |
| Archive Filter Button | Opens the archive filter panel where the admin can filter archived records based on the selected archive type and available criteria. |
| Archive Sort Controls | Allows the admin to sort archived records based on available fields such as name, patient ID, staff ID, or archive date. |
| Retrieve Button | Allows the admin to restore archived patients, users, services, or dental chart legends back to active use when applicable. |
| Retrieval Confirmation Alert | Asks the admin to confirm retrieval actions. |
| Archive Page Navigation | Allows movement across pages in the archive list. |
| **My Account** |  |
| Profile Information View | Displays the current user's profile details. |
| Edit Profile Button | Allows the user to switch the profile information section into editable mode. |
| Profile Update Form | Allows the user to update editable personal details such as birthday, mobile number, and address. |
| Save and Cancel Buttons | Allow the user to save profile changes or cancel editing without applying modifications. |
| Email Change Request | Allows the user to request an email change and verify it using a verification code sent through email. |
| Verify New Email Code | Allows the user to submit the verification code sent to the new email address before the email change is finalized. |
| Resend Verification Code | Allows the user to request another email verification code when the previous code is not received or has expired. |
| Password Update Form | Allows the user to enter and confirm a new password from the My Account page. |
| Password Tips Panel | Displays password guidance to help the user create a stronger password. |
| Staff Onboarding Verification | Requires newly created staff users with placeholder emails to complete their real email, birthday, mobile number, and address, then verify the submitted email before gaining full access. |
| Success Modal | Displays confirmation after successful profile, email, or password updates. |
| Validation and Feedback Messages | Displays appropriate messages for invalid input, expired verification code, successful verification, and successful updates. |

The functional requirements above present the specific operational capabilities of the Smiles Dental Hub information system. Together, these features describe the complete digital workflow of the clinic, from account access and patient intake to treatment documentation, service recording, administrative control, and long-term record maintenance.

### 2.5.4 Non-Functional Requirements

#### Table 2.5.2 Non-Functional Requirements

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

The non-functional requirements define the quality standards expected from the system. These requirements ensure that Smiles Dental Hub is not only functionally complete but also usable, secure, reliable, maintainable, and appropriate for continuous use in a clinical setting.
