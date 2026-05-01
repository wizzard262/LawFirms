# LMS.Assessment.Api

An API for managing law firm details.

## Requirements

- .NET 10
- Node 24+

## Setup

```sh
git clone git@github.com:markr-lms/fullstack-assessment.git 
cd fullstack-assessment 
code .
```

### API

Run API
```sh
dotnet restore
dotnet tool restore
cd LMS.Assessment.Api
dotnet run
```

Run tests

`dotnet test`

Run mutation tests

`dotnet stryker`


### UI (in VS Code Terminal, not Powershell)

```sh
cd lms-assessment-ui
npm i
npm run dev
```

## Assessment Tasks
1. Talk through how you'd improve the codebase.
2. Fix the law firm paging bug on the UI. (N.B. It was paging index by zero)
3. For `GET /lawfirms` add a sortOrder query parameter which defaults to newest first. Test it in the UI by creating a new law firm. (newest or oldest)
4. For `GET /lawfirms` add a sortBy query parameter which defaults to createdAt.
4. For `POST /lawfirms` store the user agent and IP in the database for auditing purposes.


## ============= OTHER ===================
REDUX = state management
C:\DEV\Repositories\GitHub\fullstack-assessment-main\LMS.Assessment.Api\Controllers\LawFirmsController.cs
mark.rafter@lms.com
mark.spooner@lms.com