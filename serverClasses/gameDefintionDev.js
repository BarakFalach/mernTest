const gameDefenition = {};
const audioUrl = "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1";

gameDefenition["video1"] = {
  key: "video1",
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/204414561",
  },
  duration: 32,
};
gameDefenition["question1"] = {
  key: "question1",
  type: "Question",
  phaseProp: {
    question: "?מה גילכם",
    answers: ["חטיבת ביניים", "חטיבה עליונה", "אחר"],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
  duration: 15,
};
gameDefenition["bars1"] = {
  key: "bars1",
  type: "Bars",
  duration: 5,
};
gameDefenition["top3_1"] = {
  key: "top3_1",
  type: "Top3",
  duration: 20,
  phaseProp: {
    audioArr: [
      "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1",
      "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1",
      "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1",
    ],
  },
};
gameDefenition["question2"] = {
  key: "question2",

  type: "Question",
  phaseProp: {
    question: "?האם אי פעם השתמשתם במריחואנה או גראס",
    answers: ["מעולם לא", "פעם בודדת", "פעמים בודדות (3-5)"],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
  duration: 15,
};
gameDefenition["bars2"] = {
  key: "bars2",
  type: "Bars",
  duration: 5,
};
gameDefenition["video2"] = {
  key: "video2",
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/494218419/fc3e5c2cf6",
  },
  duration: 33,
};
gameDefenition["question3"] = {
  key: "question3",
  type: "Question",
  phaseProp: {
    question: "במעבדות הסמים הלא חוקיות",
    answers: [
      "מזקקים את הסמים בצורה סטירילית",
      "מערבבים את חומרי הסם עם רעלים בכדי לחזק את השפעתן",
      "משתמשים באמצעים חדשניים להפקת הסם",
      "כל התשובות נכונות",
    ],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
  duration: 15,
};
gameDefenition["bars3"] = {
  key: "bars3",
  type: "Bars",
  duration: 5,
};
gameDefenition["question4"] = {
  key: "question3",
  type: "Question",
  phaseProp: {
    question: "במעבדות הסמים הלא חוקיות",
    answers: ["נכון", "לא נכון"],
    time: 6,
    audioUrl: audioUrl,
  },
  correct_answer: 1,
  answerAudio: audioUrl,
  duration: 15,
};
gameDefenition["bars4"] = {
  key: "bars3",
  type: "Bars",
  duration: 5,
};
exports.gameDefenition = gameDefenition;
