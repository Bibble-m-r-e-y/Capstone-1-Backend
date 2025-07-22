const db = require("./db");
const { User, Poll } = require("./index");

const seed = async () => {
  try {
    db.logging = false;
    await db.sync({ force: true }); // Drop and recreate tables

    const users = await User.bulkCreate([
      {
        firstName: "John",
        lastName: "Don",
        status: "admin",
        email: "johnDon@gmail.com",
        auth0Id: "auth0|123456789",
        passwordHash: User.hashPassword("admin123"),
        profileImage: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMBgJ9hOxoAAAAASUVORK5CYII=",
          "base64",
        ),
      },

      {
        firstName: "Lina",
        lastName: "Wang",
        status: "normal",
        email: "lina.wang@example.com",
        auth0Id: "auth0|abcdef9876",
        passwordHash: User.hashPassword("linaPass456"),
        profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        firstName: "Marcus",
        lastName: "Lee",
        status: "disabled",
        email: "marcuslee@gmail.com",
        auth0Id: "auth0|xyz123456",
        passwordHash: User.hashPassword("secure789"),
        profileImage: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0dhZglEAAwEAOw==",
          "base64",
        ),
      },
      {
        firstName: "Sara",
        lastName: "Kim",
        status: "normal",
        email: "sara.kim@demo.com",
        auth0Id: "auth0|test24680",
        passwordHash: User.hashPassword("passWord123"),
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    ]);

    const polls = await Poll.bulkCreate([
      {
        title: "best movies",
        description: "Rank each options in onder",
        options: ["Pearl harbor", "Perfect days", "Howl's moving castle"],
        status: "ended",
        endDate: new Date("8/31/2025"),
        filter: [1, 2],
        sumOfVotes: 5,
      },
      {
        title: "best music",
        description: "Rank each options in onder",
        options: ["Lofi", "Classic", "Acoustic"],
        status: "published",
        endDate: new Date("7/31/2025"),
        filter: [0],
        sumOfVotes: 7,
      },
      {
        title: "Color you like to wear in summer",
        description: "Rank each options in onder",
        options: ["White", "Black", "Colorful"],
        status: "draft",
        endDate: new Date("9/30/2025"),
        filter: [0, 1, 2],
        sumOfVotes: 5,
      },
      {
        title: "Club trip",
        description: "Rank each options in onder",
        options: ["Mercer lab", "Bear mountain", "Central park"],
        status: "disabled",
        endDate: new Date("5/31/2025"),
        filter: [1, 8, 9, 10],
        sumOfVotes: 10,
      },
    ]);

    await polls[1].setUser(users[0]);
    await polls[2].setUser(users[1]);
    await polls[3].setUser(users[2]);
    await polls[0].setUser(users[0]);

    await polls[0].addUser(users[0], {
      through: {
        status: "draft",
        ranking: ["Howls Moving Castle", "Perfect days"],
      },
    });
    await polls[1].addUser(users[1], {
      through: {
        status: "draft",
        ranking: ["classic", "acoustic"],
      },
    });
    await polls[2].addUser(users[0], {
      through: {
        status: "draft",
        ranking: ["Colorful", "Black"],
      },
    });
    console.log(`👤 Created ${users.length} users`);
    console.log(`📋Created${polls.length}polls`);

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
