
# PMS

- The application has 3 entities - Patient, Visits and Symptoms
- Patient id needs to be created once a patient visited a hospital for the first time
- On Each visit, visitation information can be created with multiple or no symptoms as reported by the patient
- Application has 3 views - Patient List Page, Patient Detail page with Visits and Visit Details with Symptoms List
- The application is a draft based application which will allow the user to switch between different devices and prevent data loss in case of network issues

# Project Structure

It contains these folders and files

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`test/` | test scripts
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## How to run the project

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).
- To run the JEST test, you can use the command npx jest



