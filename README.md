# Wordify

An app that displays a word of the day and gives songs based on the word

## Table of Contents

- [Introduction](#introduction)
- [Built With](#built-with)
- [Update History](#update-history)
- [Roadmap](#roadmap)
- [Links](#links)

## 👉 Introduction

This project was initially made as part of the School of Code's Christmas break task. However, since then, I have learned new things, and decided to apply my knowledge and improve this app!

Stay tuned as it is still being continously updated 🤩

## 🔨 Built With

- React.js 17.0.2
- Axios 0.24.0
- Express.js 4.17.2

## Update History

- Initially, the app was made with vanilla Javascript. However, this has been refactored so the current version utilises React.js.
- For the music data, I have initially used [Deezer API](https://rapidapi.com/deezerdevs/api/deezer-1/). However, I have encountered many issues such as exceeding the quota limit, even though I haven't made any calls yet. Therefore, currently, I'm using [Spotify API](https://developer.spotify.com/documentation/web-api/).
- For the word of the day, I have loooked through many words APIs, but after researching, I have concluded that most of them had too many complex words, which were unlikely to be in the title of a song (I dare you to find a song with *anthemion* in the title 😜 ). Therefore, I have made my own [Words API](https://words-api-project.herokuapp.com/words) which is deployed on Heroku.

## 🔜 Roadmap

- [ ]  Deployment
- [ ]  Test with React Testing Library & Jest
- [ ]  Refactor the app to utilise Typescript

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandraskolarczyk/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sansko_)
