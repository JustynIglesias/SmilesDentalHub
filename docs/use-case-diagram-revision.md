## Use Case Diagram Revision Notes

This document presents the recommended revisions for the current use case diagram of the proposed **Smiles Dental Hub** system. The suggestions below are based on the documented system requirements and implemented features found in the project files.

### Main Revisions Needed

The current use case diagram is understandable, but several use cases should be revised so that the diagram matches the actual scope of the system more accurately.

The following changes are recommended:

- Remove the connection between **Patient** and **View Patient Logs**.
- Remove the connection between **Patient** and **Login / Logout**.
- Keep the **Patient** actor only for the patient registration process because patients do not have their own system login in the current system.
- Replace **Receptionist or Dental Assistant** with one consistent actor name. If the study uses **Receptionist** in the documentation, that same term should also be used in the diagram.
- Replace **Login / Logout** with **Authenticate User** for cleaner use case naming.
- Replace broad use cases such as **Add, Update, and View** with more specific actions.
- Separate **Retrieving and Archiving** into two distinct use cases: **Archive Records** and **Retrieve Archived Records**.
- Rename **Add and Update (Services and tooth condition)** to **Manage Services** and **Manage Dental Chart Legends**.

### Use Cases That Should Be Removed or Replaced

| Current Use Case | Recommended Revision |
| --- | --- |
| Fill up information | Replace with **Fill Up Patient Registration Form** |
| Login / Logout | Replace with **Authenticate User** |
| Add, Update, and View (Patient Information) | Replace with **Add Patient Record**, **View Patient Information**, and **Update Patient Information** |
| Add, Update, and View (Service Records) | Replace with **Add Service Record**, **View Service Record**, and **Update Service Record** |
| Add and Update (Services and tooth condition) | Replace with **Manage Services** and **Manage Dental Chart Legends** |
| Retrieving and Archiving | Replace with **Archive Records** and **Retrieve Archived Records** |

### Missing Use Cases

Based on the current system requirements and features, the following use cases are missing and may be added to better represent the system:

- **Reset Password**
- **Export Patient Record**
- **Upload Patient Documents**
- **View Patient Documents**
- **Update Profile**
- **Change Email with Verification**
- **Manage Users**
- **Set Patient Active/Inactive Status**

If the adviser prefers a simplified use case diagram, related actions may be grouped into broader use cases such as **Manage Patient Documents** or **Manage Service Records**.

### Recommended Actors and Use Cases

#### Patient

- Fill Up Patient Registration Form

#### Receptionist

- Authenticate User
- Add Patient Record
- View Patient Information
- Update Patient Information
- View Dental Records
- Add Service Record
- View Service Record
- Update Service Record
- View Patient Logs
- Manage Services
- Manage Dental Chart Legends
- Update Profile
- Change Email with Verification
- Reset Password
- Export Patient Record
- Upload Patient Documents
- View Patient Documents
- Set Patient Active/Inactive Status

#### Associate Dentist

- Authenticate User
- View Patient Information
- Update Patient Information
- View Dental Records
- Update Dental Records
- Add Service Record
- View Service Record
- Update Service Record
- View Patient Logs
- Manage Services
- Manage Dental Chart Legends
- Update Profile
- Change Email with Verification
- Reset Password
- Export Patient Record
- Upload Patient Documents
- View Patient Documents
- Set Patient Active/Inactive Status

#### Admin

- Authenticate User
- View Patient Information
- Update Patient Information
- View Dental Records
- Update Dental Records
- Add Service Record
- View Service Record
- Update Service Record
- View Patient Logs
- Manage Services
- Manage Dental Chart Legends
- Manage Users
- Archive Records
- Retrieve Archived Records
- Update Profile
- Change Email with Verification
- Reset Password
- Export Patient Record
- Upload Patient Documents
- View Patient Documents
- Set Patient Active/Inactive Status

### Recommended Simplified Version

If a cleaner and less crowded diagram is needed, the following use cases may be used instead:

- Fill Up Patient Registration Form
- Authenticate User
- Add Patient Record
- View Patient Information
- Update Patient Information
- View Dental Records
- Update Dental Records
- Manage Service Records
- View Patient Logs
- Manage Services
- Manage Dental Chart Legends
- Manage Users
- Archive Records
- Retrieve Archived Records
- Update Profile
- Reset Password
- Export Patient Record
- Manage Patient Documents
- Set Patient Active/Inactive Status

### Additional Note on UML Presentation

For a more standard UML use case diagram, it is better to use plain association lines instead of colored directional arrows. The colors may help with presentation, but simple lines are more consistent with formal UML notation.

### Conclusion

The original diagram already shows the major parts of the system, but revising the actor assignments, separating combined actions, and adding missing functions will make the diagram more accurate, clearer, and more aligned with the actual Smiles Dental Hub system.
