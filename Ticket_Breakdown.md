# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Database update to add external id
- **Description**
  - We need to add a new column to the Agents table to store the external id. I would suggest using the name `external_id` for the column.
  - This column should be a string up to 64(!investigate if the length is enough!) chars for flexibility, nullable, and unique.
  - The column should be indexed for better performance.
  
- **Acceptance Criteria**
  - [ ] The database migration provided
  - [ ] Agents have a new column called `external_id`
  - [ ] The `external_id` column is a string with appropriate length
  - [ ] The `external_id` column is nullable
  - [ ] The `external_id` column is unique
  - [ ] The `external_id` column is indexed

- **Time Estimate**
    4-8 hours including field length research and PR (2 if we use fibonacci numbers for estimations)

### Ticket 2: Query shifts by external id
- **Description**
  - We need to create a new function `getShiftsByExternalId` that takes an external id and returns all shifts for that agent.
  - external id should be added in [Ticket 1](link to ticket 1)
- **Acceptance Criteria**
  - [ ] `getShiftsByExternalId` returns all shifts for the given external id
  - [ ] `getShiftsByExternalId` returns an empty array if no shifts are found
  - [ ] `getShiftsByExternalId` throws an error if the external id is not found
  - [ ] `getShiftsByExternalId` correctly handle non-string external ids
  - [ ] `getShiftsByExternalId` performance is optimized and all DB queries use indexes
  - [ ] `getShiftsByExternalId` return shifts with agent data including the external id
  - [ ] tests are updated
- **Time Estimate**
  1 day including tests and PR (2 if we use fibonacci numbers for estimations)

### Ticket 3: Update `generateReport` to use external id
- **Description**
  - We need to update `generateReport` to generate a report based on an external id.
  - generateReport should accept a report builder as a parameter to allow for different report types
  - report builder should encapsulate the logic of building the report
  - the current `genereateReport` should keep the same behaviour when no report builder is provided
  - Report format should be provided by the UI team
- **Acceptance Criteria**
  - [ ] `generateReport` accepts an external id and a report builder
  - [ ] a builder for the current report is implemented and used by default
  - [ ] a builder for the new report(by external id) is implemented and used when provided
  - [ ] tests are updated
- **Time Estimate**
  1 day including tests and PR (2 if we use fibonacci numbers for estimations)

### Ticket 4: Update Api to be able to generate report by external id
- **Description**
  - We need to update the api to be able to generate a report by external id.
  - The endpoint we use for generating reports should accept an external id and a report type
  - The endpoint should return the report as a pdf
- **Acceptance Criteria**
    - [ ] the api accepts an external id and a report type
    - [ ] the api returns the report as a pdf
    - [ ] the api returns an error if the external id is not found
    - [ ] the api returns an error if the report type is not found
    - [ ] the api returns an error if the external id is not provided when generating a report by external id
    - [ ] endpoint test are updated
- **Time Estimate**
  4-8 hours including tests and PR (2 if we use fibonacci numbers for estimations)

### Ticket 5: Update UI to be able to upload a new report 
- **Description**
  - Need requirements from the UI team
