# Time By Ping's NestJS exercise

## 1️⃣ Description

This is a sample repository of what a small API might look like initially.
It is written in Typescript using the [NestJS](https://github.com/nestjs/nest) framework.

Think of this as the starting point for an API that you might use if you were writing an application that allowed developers to track freelance work done for multiple projects and multiple clients.

The overall structure of the system looks something like this:

Clients: Represent people or organizations who are contracting out work to be done.
Projects: Represent a specific collection of work all related to achieving the same goal.
Developers: Represent a freelance software developer who will do some or all the work associated with a project.
Tasks: Represent small units of work done (or actions taken) by a Developer towards completing a project.

Therefore:

**Clients have projects to be done, and software developers complete tasks to achieve the different projects' goals.**

The API is meant to help us keep track of the work that is done by different developers:

- What work was done?
- For how long?
- For what project?
- How much has been done for a specific client (in total)?
- Etc.

The API is far from complete and it contains some errors or implementations that go against best-practices.

This is where you come in 🙂

## 2️⃣ Purpose and format of the interview.

You will take the lead in inspecting this API and point out areas of improvement.

Comment on how you would improve the API implementation and then we'll dive into implementing some of those ideas.

Feel free to ask questions and have exploratory discussions as you go along.

## 3️⃣ Getting started

```bash
# install dependencies
$ npm install

# run the app in development mode
$ npm run start:dev # app should run at http://localhost:3000/

# to check errors with compilation, run
$ npm run build
```

**API Documentation:** http://localhost:3000/api/

## 4️⃣ Lastly, some advice

- Talk aloud, let us know what you're thinking.
- Don't worry about catching ALL the areas of improvement.
- Mention the ones you see, and then dive deep into a few improvements.
- Think of edge-cases that should be validated or tested.
- There is no single right/wrong answer.
