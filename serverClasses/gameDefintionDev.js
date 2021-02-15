const gameDefenition = {};
const audioUrl = "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1";

gameDefenition["video1"] = {
  key: "video1",
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/204414561",
  },
};
gameDefenition["question1"] = {
  key: "question1",
  type: "Question",
  phaseProp: {
    question: "how are you today",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
};
gameDefenition["question2"] = {
  key: "question2",
  type: "Question",
  phaseProp: {
    question: "how are you Tommorow",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
};
gameDefenition["video2"] = {
  key: "video2",
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/494218419/fc3e5c2cf6",
  },
};
gameDefenition["question3"] = {
  key: "question3",
  type: "Question",
  phaseProp: {
    question: "how are you in the day after Tommorow",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
};
exports.gameDefenition = gameDefenition;
