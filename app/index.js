require("dotenv").config();
const { App } = require("@slack/bolt");
// const students = require("../students.js");

const students = [
  "Yoseob Shin",
  "Veronica De Leon Hernandez",
  "Tolga Kara",
  "Sophia Hammer",
  "Soonam Yi",
  "Roxanne Brodylo",
  "Olesya Steinmetz",
  "Nadja Carina Reischel",
  "Mohamed Abdou",
  "Mirko Eren",
  "Mira Vogt",
  "Marlena Kowieska",
  "Lorie Rocher",
  // "Logan Bacca",
  "Khushboo Goyal",
  "Kevin Klein",
  "Katrin Panova",
  "Hamlet Hayrapetyan",
  "Habid Badillo Espinosa",
  "Gilad Tsabar",
  "Esther Wang",
  "Diana Thüroff",
  "Daniela Kirilova",
  "Daniel Papastratidis",
  "Daniel Parry",
  "Bas Van Der Sluis",
  "Barbara Schulze",
  "Anam Zehra",
];

let users = ["U018HG09XJ9", "U018C5C660N", "U0198N88C00", "U0198PMF62C"];

const getPairs = (students) => {
  const pairs = [];
  for (let i = students.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [students[i], students[j]] = [students[j], students[i]];
  }
  for (let i = 0; i < students.length; i += 2) {
    if (students[i + 1] !== undefined) {
      pairs.push([students[i], students[i + 1]]);
    } else {
      pairs.push([students[i]]);
    }
  }
  return pairs;
};

const bot = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
  // Start the app
  await bot.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!", students);
})();

getPairs(students);

bot.event("app_mention", async ({ context, event }) => {
  console.log("clg in the function", event.user);

  if (users.includes(event.user)) {
    try {
      await bot.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `So <@${
          event.user
        }>... you wanted to generate some pairs... ${getPairs(students).map(
          (pair) => {
            return pair.length === 1
              ? `
            \n- ${pair[0]}... You're on your own`
              : `
            \n- ${pair[0]} & ${pair[1]}`;
          }
        )}`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
    console.log("⚡️ Bolt app is running!", event.user);
  } else {
    try {
      await bot.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `So <@${event.user}>... you wanted to generate some pairs? Well you're not allowed ¯\_(ツ)_/¯`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
    console.log("⚡️ Bolt app is running!", event.user);
  }
});
