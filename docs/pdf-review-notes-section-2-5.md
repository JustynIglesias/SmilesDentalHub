## PDF Review Notes for Section 2.5

This note reviews the content of **Untitled document (4).pdf** and identifies what should be revised, added, replaced, or removed so the documentation better matches the actual Smiles Dental Hub system.

### Overall Assessment

The PDF already covers the core modules of the system, including login, patient registration, patient records, dental records, service records, patient logs, procedures, and admin management. However, several parts need improvement for clarity, consistency, and alignment with the implemented system.

The most common issues in the PDF are:

- inconsistent wording
- repeated button descriptions
- features grouped too broadly
- missing account-recovery and profile-related functions
- a few descriptions that do not fully match the current system behavior

### Revisions Needed

#### 1. Terminology and wording

Some labels in the PDF should be revised to sound more formal and consistent:

- Replace **Fill Up Form** with **Registration Form** or **Input Form**
- Replace **Procedure Tab** with **Procedures Tab**
- Replace **Add Patient Records Tab** with **Add Patient Record Tab**
- Replace **View Patient Information Page** with **Patient Record Details - Patient Information Tab**
- Replace **View Dental Records Page** with **Patient Record Details - Dental Records Tab**
- Replace **Service Record Page** with **Patient Record Details - Service Records Tab**
- Replace **System alert for validation** with **Confirmation Alert** or **Validation Alert**
- Replace **Total Amount Query** with **Total Amount Computation**

#### 2. Content that should be corrected

- The PDF states that the **Add New Patient Button** creates a new patient record "with an associated account." This should be removed because patients do not have their own system account in the current implementation.
- The PDF mentions insurance-provider sharing in the **Authorization and Release Form**. If this is not explicitly implemented in the current system, the wording should be simplified to focus on consent to treatment, record management, and data collection.
- The **No Button** under logout is described as "Confirming if they will really log out." This should instead state that it cancels or closes the logout confirmation dialog.
- The **Dental History Details Form** mentions "medical questions." This should be revised to **dental history questions**.
- The **Patient Logs Page** says logs can be sorted by assigned dentist. If this filter is not present in the actual system, it should be removed.
- The **Inactive List** description says it is used to archive a user. In the current system, the inactive list is for inactive patient records that may later be archived by the admin. That part should be corrected.
- The archive list sections for patients, users, services, and dental conditions repeat the same generic wording. These can be consolidated to avoid redundancy.

#### 3. Missing features that should be added

The PDF is missing several important features already reflected in the revised Markdown version and in the actual system:

- Forgot password
- Verify reset code
- Reset password
- Settings page
- Profile update form
- Email change request with verification
- Staff onboarding verification for placeholder emails
- Draft preservation in the add-patient form
- Duplicate patient validation
- Role restriction on dental record editing
- Discount entry in service records
- Quantity control in service records
- Confirmation dialog before saving service records
- Archive documents button
- Legend code migration when dental chart legend codes are updated

#### 4. Items that should be split for clarity

Some features in the PDF are too compressed and are clearer when described separately:

- **Add, View, and Edit Service Records** should be described as separate actions
- **Archive List** can be described once as a shared admin function, then list the supported archive types
- **System alerts** should be separated into validation alerts, duplicate alerts, success alerts, and confirmation alerts where applicable

#### 5. Non-functional requirement improvements

The non-functional requirements section is a good start, but some items should be refined:

- **Performance** should not focus only on dental and service modules. It should include major pages such as login, dashboard, patient records, procedures, and service record screens.
- **Reliability** should include patient records, dental charts, service records, logs, uploaded documents, and user data.
- **Security** should mention secure authentication, password recovery, role-based access control, and protected administrative actions.
- **Maintainability** should refer to modular and organized code for future updates.
- Consider adding the following missing non-functional requirements:
  - Recoverability
  - Auditability

### Recommended Direction

The current file [section-2-5-requirements-revised.md](c:\Users\user\Downloads\SE%20DENTAL%20HUB\SmilesDentalHub\docs\section-2-5-requirements-revised.md) is already a stronger and more complete version than the original PDF. It improves wording, removes inaccurate statements, adds missing features, and aligns the documentation more closely with the implemented system.

### Final Recommendation

For your paper, the PDF should not be used as-is. It should be revised using the current Markdown version as the main reference because that version is:

- clearer
- more consistent
- more complete
- more accurate to the actual Smiles Dental Hub system

If needed, the same review process can also be applied to the operational features or system features section next.
