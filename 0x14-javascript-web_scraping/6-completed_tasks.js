#!/usr/bin/node

const request = require('request');

const getCompletedTasksByUser = (apiUrl) => {
  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(`Request failed with status code ${response.statusCode}`);
        return;
      }

      const tasks = JSON.parse(body);
      const completedTasksByUser = {};

      tasks.forEach((task) => {
        if (task.completed) {
          completedTasksByUser[task.userId] = (completedTasksByUser[task.userId] || 0) + 1;
        }
      });

      resolve(completedTasksByUser);
    });
  });
};

if (process.argv.length !== 3) {
  console.error('Usage: node 6-completed_tasks.js <API_URL>');
} else {
  const apiUrl = process.argv[2];

  getCompletedTasksByUser(apiUrl)
    .then((completedTasks) => {
      console.log(completedTasks);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

