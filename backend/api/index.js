const express = require("express");
const routs = express.Router();
const fs = require("fs");
const userData = require("../users.json");
let pollData = require("../polls.json");
const Immutable = require("immutable");

routs.get("/sign-in/:username/:password", (request, response) => {
  const username = request.params.username;
  const password = request.params.password;
  if (
    userData.users.some(
      (user) => user.username === username && user.password === password
    )
  ) {
    return response.status(200).send({
      user: userData.users.filter((user) => user.username === username)[0],
      polls: pollData.polls,
    });
  } else {
    return response.status(401).send(`${username} cannot be authorized`);
  }
});

routs.post("/vote", (request, response) => {
  const poll = request.body[0];
  const option = request.body[1];
  const userId = Number(request.body[2]);
  if (poll.votes.some((vote) => vote.userId === userId)) {
    poll.votes = poll.votes.map((voteObject) =>
      voteObject.userId === userId
        ? { userId: userId, vote: option }
        : voteObject
    );
  } else {
    poll.votes.push({ userId: userId, vote: option });
  }
  pollData.polls = pollData.polls.map((pollObject) =>
    pollObject.id === poll.id ? poll : pollObject
  );
  fs.writeFile(
    "./polls.json",
    JSON.stringify(pollData),
    (error) => error && console.log(error)
  );
  return response.status(201).send({ polls: pollData.polls });
});

routs.post("/create-new-poll", (request, response) => {
  const pollId = request.body[0];
  const creationDate = request.body[1];
  const title = request.body[2];
  const description = request.body[3];
  const creator = request.body[4];
  const options = request.body[5];
  const newPoll = {
    id: pollId,
    creationDate: creationDate,
    title: title,
    description: description,
    creator: creator,
    options: options,
    votes: [],
  };
  pollData.polls.push(newPoll);
  fs.writeFile(
    "./polls.json",
    JSON.stringify(pollData),
    (error) => error && console.log(error)
  );
  return response.status(201).send({ polls: pollData.polls });
});

routs.get("/check-for-change/:hash", (request, response) => {
  const backendHash = Immutable.fromJS(pollData.polls).hashCode();
  const frontendHash = request.params.hash;
  if (Number(frontendHash) === backendHash) {
    return response.status(200).send({ change: false });
  } else {
    return response.status(200).send({ change: true, polls: pollData.polls });
  }
});

module.exports = routs;
