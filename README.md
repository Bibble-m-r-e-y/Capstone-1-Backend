# Capstone I Backend

## Exact Dates/Days and Times

- Emmanuel Ruiz - 10 am - 4 pm (M-F) 10 am - 2 pm (Sat) [Flexible weekdays; Rather not Sat/Sun]
- Yangmei Lu - 10am - 4pm, optional: 4 pm - 12 am (M - F) [Fri morning chores, prefer no weekend]
- Muhammad Shaikh - 10-8(M-F)pm 12-4 pm (sat-sun) [Flexible weekdays, weekends]
- Roselyn Marte - (mon-thurs 8am-1pm I have calc 1) but after i am available all day. 1pm-10pm(M-T) 9am-10pm Fri-Sat [I am available everyday even sunday but sunday i tend to have a lot of things to do. If we set up a time in advance I can arrange my schedule]

## Getting Started

This project uses Express.js to serve up an API server, and Sequelize to connect to a PostgreSQL database. It uses JWTs for authentication with username and password.

You will also need to create the database: by default it is called `capstone-1`, but you are welcome to rename it in `database/db.js`

After that, you can get started with these commands

```
npm install # 📦 To install the packages
npm run seed # 🌱 To seed the database
npm run start-dev # 🚀 To start the server in development mode
```

This project runs in the Node.js runtime environment. We're not using Webpack here, but we are using a tool called nodemon, which re-runs our app whenever we save a file. You should see a message in the terminal telling you that the server is running on port 8080.

When an error occurs on the backend (Express), you'll see a message in the terminal. When an error occurs on the frontend (React), you'll see that error in the browser.

## Deployment

This project has a vercel.json file, which will make it easier to deploy this project to Vercel. Check the video listed in the cohort repository for a walkthrough of how to connect your deployed Express server to Neon Postgres.
