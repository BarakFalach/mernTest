const gameDefenition = {};
const audioUrl = "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1";

gameDefenition["video1"] = {
  key: "video1",
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/204414561",
  },
  duration: 34,
};
gameDefenition["question1"] = {
  key: "question1",
  type: "question",
  phaseProp: {
    question: "מה גילכם?",
    answers: ["חטיבת ביניים", "חטיבה עליונה", "אחר"],
    time: 6,
    key: "question1",
  },
  correct_answer: 1,
  duration: 19,
};
gameDefenition["bars1"] = {
  key: "bars1",
  type: "Bars",
  duration: 8,
};
gameDefenition["top3_1"] = {
  key: "top3_1",
  type: "Top3",
  duration: 24,
  phaseProp: {
    audioArr: [
      "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1",
      "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1",
      "https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1",
    ],
  },
};
gameDefenition["groups1"] = {
  key: "groups1",
  phaseProp: { term: "ולסיום - מי ענו ביחד יותר תשובות נכונות?" },
  type: "groups",
  duration: 10,
};
gameDefenition["question2"] = {
  key: "question2",

  type: "question",
  phaseProp: {
    question: "האם אי פעם השתמשתם במריחואנה או גראס?",
    answers: ["מעולם לא", "פעם בודדת", "פעמים בודדות (3-5)"],
    time: 6,
    key: "question2",
  },
  correct_answer: 1,
  duration: 19,
};
gameDefenition["bars2"] = {
  key: "bars2",
  type: "Bars",
  duration: 8,
};
gameDefenition["video2"] = {
  key: "video2",
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/494218419/fc3e5c2cf6",
  },
  duration: 35,
};
gameDefenition["generic1"] = {
  key: "generic1",
  type: "generic",
  phaseProp: {
    key: "generic1",
    paragraph: "hi berdugo this is the generic track",
  },
};
gameDefenition["question3"] = {
  key: "question3",
  type: "question",
  phaseProp: {
    question: "במעבדות הסמים הלא חוקיות",
    answers: [
      "מזקקים את הסמים בצורה סטירילית",
      "מערבבים את חומרי הסם עם רעלים בכדי לחזק את השפעתן",
      "משתמשים באמצעים חדשניים להפקת הסם",
      "כל התשובות נכונות",
    ],
    time: 6,
    key: "question3",
  },
  correct_answer: 1,
  duration: 19,
};
gameDefenition["bars3"] = {
  key: "bars3",
  type: "Bars",
  duration: 8,
};
gameDefenition["question4"] = {
  key: "question4",
  type: "question",
  phaseProp: {
    question: "במעבדות הסמים הלא חוקיות",
    answers: ["נכון", "לא נכון"],
    time: 6,
    key: "question4",
  },
  correct_answer: 1,
  duration: 19,
};
gameDefenition["bars4"] = {
  key: "bars4",
  type: "Bars",
  duration: 8,
};
gameDefenition["goodbye"] = {
  key: "goodbye",
  type: "goodBye",
  phaseProp: {},
};
exports.gameDefenition = gameDefenition;
