const db = require("./db");
const { User } = require("./index");
const { Poll } = require("./index");
const { BallotSubmission } = require("./index");

const seed = async () => {
  try {
    db.logging = false;
    await db.sync({ force: true }); // Drop and recreate tables

    const users = await User.bulkCreate([
      {
        firstname: "John",
        lastname: "Don",
        //age18plus: 1,
        status: "admin",
        email: "johnDon@gmail.com",
        auth0Id: "auth0|123456789",
        passwordHash: User.hashPassword("admin123"),
        profileimage:
          // 1x1 transparent PNG image base64 (minimal blob sample)
          Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMBgJ9hOxoAAAAASUVORK5CYII=",
            "base64"
          ),
      },

      {
        firstname: "Lina",
        lastname: "Wang",
        //age18plus: 1,
        status: "normal",
        email: "lina.wang@example.com",
        auth0Id: "auth0|abcdef9876",
        passwordHash: User.hashPassword("linaPass456"),
        profileimage: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        firstname: "Marcus",
        lastname: "Lee",
        //age18plus: 1,
        status: "disabled",
        email: "marcuslee@gmail.com",
        auth0Id: "auth0|xyz123456",
        passwordHash: User.hashPassword("secure789"),
        profileimage: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0dhZglEAAwEAOw==",
          "base64"
        ),
      },
      {
        firstname: "Sara",
        lastname: "Kim",
        //age18plus: 0,
        status: "normal",
        email: "sara.kim@demo.com",
        auth0Id: "auth0|test24680",
        passwordHash: User.hashPassword("passWord123"),
        profileimage: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    ]);

    const polls = await Poll.bulkCreate([
      {
        title: "best movies",
        description: "Rank each options in onder",
        options: ["Pearl harbor", "Perfect days", "Howl's moving castle"],
        status: "ended",
        endDate: 8 / 31 / 2025,
        opentoAuthorized: true,
        sumOfVotes: 5,
      },
      {
        title: "best music",
        description: "Rank each options in onder",
        options: ["Lofi", "Classic", "Acoustic"],
        status: "published",
        endDate: 7 / 31 / 2025,
        opentoAuthorized: true,
        sumOfVotes: 7,
      },
      {
        title: "Color you like to wear in summer",
        description: "Rank each options in onder",
        options: ["White", "Black", "Colorful"],
        status: "draft",
        endDate: 9 / 30 / 2025,
        opentoAuthorized: false,
        sumOfVotes: 5,
      },
      {
        title: "Club trip",
        description: "Rank each options in onder",
        options: ["Mercer lab", "Bear mountain", "Central park"],
        status: "disabled",
        endDate: 5 / 30 / 2025,
        opentoAuthorized: true,
        sumOfVotes: 10,
      },
    ]);

    const BallotSubmissions = await BallotSubmission.bulkCreate([
      {
        ranking: ["White", "Black", "Colorful"],
        status: "draft",
        // userId: 0,
      },
      {
        ranking: ["Central park", "Bear mountain", "Mercer lab"],
        status: "submitted",
        // userId: 1,
      },
      {
        ranking: ["Howl's moving castle", "Perfect days", "Pearl harbor"],
        status: "draft",

        // userId: 2,
      },
    ]);

    await polls[1].setUser(users[0]);
    await polls[2].setUser(users[1]);
    await polls[3].setUser(users[2]);
    await polls[0].setUser(users[0]);
    // console.log(BallotSubmission[0]);
    await BallotSubmissions[1].setUser(users[0]);
    await BallotSubmissions[2].setUser(users[1]);
    await BallotSubmissions[0].setUser(users[0]);

    console.log(`👤 Created ${users.length} users`);
    console.log(`📋Created${polls.length}polls`);
    console.log(`📊Created${BallotSubmissions.length}ballotSubmissions`);

    console.log("🌱 Seded the database");
  } catch (error) {
    console.error("Error seeding database:", error);
    if (error.message.includes("does not exist")) {
      console.log("\n🤔🤔🤔 Have you created your database??? 🤔🤔🤔");
    }
  }
  db.close();
};

seed();
