const gameDefenition = {};

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
    time: 8,
  },
  correct_answer: 0,
};
gameDefenition["question2"] = {
  key: "question2",
  type: "Question",
  phaseProp: {
    question: "how are you Tommorow",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 8,
  },
  correct_answer: 0,
};
gameDefenition["video2"] = {
  key: "video2",
  type: "video",
  phaseProp: {
    videoUrl: "https://player.vimeo.com/video/494218419",
  },
};
gameDefenition["question3"] = {
  key: "question3",
  type: "Question",
  phaseProp: {
    question: "how are you in the day after Tommorow",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 8,
  },
  correct_answer: 0,
};
exports.gameDefenition = gameDefenition;
