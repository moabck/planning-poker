const express = require('express')
const routs = express.Router()

routs.get('/polls', (request, response) => {
    return response.status(200).send(polls)
})

const polls = {
    polls: [
        {
            id: 0,
            title: 'task123',
            votes: [3, 4, 3]
        },
        {
            id: 1,
            title: 'task124',
            votes: [4, 4, 6]
        }
    ]
}

module.exports = routs