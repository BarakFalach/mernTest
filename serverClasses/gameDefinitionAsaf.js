//const audioUrl = 'https://www.dropbox.com/s/sggi2zxzwfnur5w/sasfa.wav?raw=1';

const gameDefenition = {};
const clockTime = 6;
const questionOffset = 1;
const barsOffset = 1;
const videoOffset = 2.5;
const genericOffset = 1;
const shortQuestionDuration = 7;
const mediumQuestionDuration = 10;
const longQuestionDuration = 13;
const videosDict = {
  1: { link: "https://vimeo.com/517074658", duration: 42.84 },
  2: { link: "https://vimeo.com/517074560", duration: 158.4 },
  3: { link: "https://vimeo.com/517600699", duration: 186.72 }, //boys girls
  4: { link: "https://vimeo.com/517074418", duration: 12.32 },

  5: { link: "https://vimeo.com/517074389", duration: 11.52 },
  6: { link: "https://vimeo.com/517275923", duration: 22.52 },
  7: { link: "https://vimeo.com/517075652", duration: 515.08 },
  8: { link: "https://vimeo.com/517733650", duration: 10.92 },
  9: { link: "https://vimeo.com/517734228", duration: 92 },
  10: { link: "https://vimeo.com/517276028", duration: 11.76 },
  11: { link: "https://vimeo.com/517275995", duration: 13.56 },
  12: { link: "https://vimeo.com/517083680", duration: 374.12 },
  13: { link: "https://vimeo.com/517275967", duration: 13.24 },
  14: { link: "", duration: 0 }, //there is no video 14
  15: { link: "https://vimeo.com/517081783", duration: 14.64 },
  16: { link: "https://vimeo.com/517081812", duration: 22.08 },
  17: { link: "https://vimeo.com/517081839", duration: 14.28 },
  18: { link: "https://vimeo.com/517081872", duration: 7.8 },
  19: { link: "https://vimeo.com/517081892", duration: 15.88 },
  20: { link: "https://vimeo.com/517081916", duration: 52.48 },
};

// Movie 1 (phases 1)
gameDefenition["1"] = {
  type: "video",
  duration: videosDict[1].duration + videoOffset,
  phaseProp: {
    key: "1",
    videoUrl: videosDict[1].link,
  },
};

// Check Question (phases 2A-2B)
gameDefenition["2"] = {
  type: "question",
  duration: 10.34 + clockTime + questionOffset,
  correct_answer: 1,
  phaseProp: {
    key: "2",
    question: "מה שלומכם היום?",
    answers: ["מצב רוח טוב", "מצב רוח פחות טוב"],
    time: clockTime,
  },
};
//rename from 2.5 -> to 3
gameDefenition["3"] = {
  type: "bars",
  duration: 4.24 + barsOffset,
  phaseProp: {
    key: "3",
  },
  questionKey: "2",
};

TODO: "add movie 2";
//rename from 3 -> to 4
// Movie 2 (phases 3 - 16)
gameDefenition["4"] = {
  type: "video",
  duration: videosDict[2].duration + videoOffset,
  phaseProp: {
    key: "4",
    videoUrl: videosDict[2].link,
  },
};

// Survey Questions (phases 17-36)
gameDefenition["17"] = {
  type: "question",
  duration: 2.46 + clockTime + questionOffset,
  phaseProp: {
    key: "17",
    question: "אנא הזדהו",
    answers: ["בן", "בת"],
    time: clockTime,
  },
};

gameDefenition["19"] = {
  type: "question",
  duration: 4.6 + clockTime + questionOffset,
  phaseProp: {
    key: "19",
    question: "באיזו כיתה אתם לומדים?",
    answers: ["כיתה ח", "כיתה ט", "כיתה י", "כיתה יא"],
    time: clockTime,
  },
};

// Generic Reminder
gameDefenition["20"] = {
  type: "generic",
  duration: 2.2 + genericOffset,
  phaseProp: {
    key: "20",
    paragraph: "אני מזכיר לכם שזהותכם חסויה",
  },
};

gameDefenition["21"] = {
  type: "question",
  duration: 11.68 + clockTime + questionOffset,
  phaseProp: {
    key: "21",
    question:
      "האם  אי פעם השתמשת בסם הקנאביס המכונה גם מריחואנה, גראס, ג'וינט, וויד ",
    answers: ["מעולם לא", "פעם בודדת", "פעמים בודדות (3-5)", "יותר מחמש פעמים"],
    time: clockTime,
  },
};

gameDefenition["23"] = {
  type: "question",
  duration: 12.37 + clockTime + questionOffset,
  phaseProp: {
    key: "23",
    question:
      "האם אי פעם השתמשת בחומרים נדיפים כמו גז מזגנים, גז קצפות, דלק בכדי להתמסטל?",
    answers: ["מעולם לא", "פעם בודדת", "פעמים בודדות (3-5)", "יותר מחמש פעמים"],
    time: clockTime,
  },
};

gameDefenition["25"] = {
  type: "question",
  duration: 10.9 + clockTime + questionOffset,
  phaseProp: {
    key: "25",
    question:
      "האם אי פעם השתמשת בסמי פיצוציות, אקסטזי, הרואין, קוקאין או תרופות מרשם?",
    answers: ["מעולם לא", "פעם בודדת", "פעמים בודדות (3-5)", "יותר מחמש פעמים"],
    time: clockTime,
  },
};

gameDefenition["29"] = {
  type: "question",
  duration: 8.46 + clockTime + questionOffset,
  phaseProp: {
    key: "29",
    question: "כמה מסוכן לבני בנות גילכם להשתמש בסמים?",
    answers: ["אין סיכוי", "סיכוי נמוך", "סיכון בינוני", "סיכון גבוה"],
    time: clockTime,
  },
};

// Survey but real Question (phases 37 - 43)
gameDefenition["37"] = {
  type: "question",
  duration: 7.7 + clockTime + questionOffset,
  phaseProp: {
    key: "37",
    question: "מה קורה שלוקחים סמים?",
    answers: [
      "נעשים שמחים",
      "כלום",
      "נעשים עצובים",
      "על כל אחד זה משפיע באופן שונה",
    ],
    time: clockTime,
  },
};

gameDefenition["39"] = {
  type: "question",
  duration: 9.69 + clockTime + questionOffset,
  phaseProp: {
    key: "39",
    question: "כמה זמן משפיע סם הקאנביס על גוף האדם?",
    answers: ["פחות מ-8 שעות", "עד ל-24 שעות", "עד 7 ימים", "עד 30 יום"],
    time: clockTime,
  },
};

// Survey Questions (phases 41-43)
gameDefenition["41"] = {
  type: "question",
  duration: 6.04 + clockTime + questionOffset,
  phaseProp: {
    key: "41",
    question: "האם בכוונתכם לצרוך קנאביס בעתיד?",
    answers: ["בהחלט כן", "אולי", "בהחלט לא"],
    time: clockTime,
  },
};

gameDefenition["43"] = {
  type: "question",
  duration: 9.72 + clockTime + questionOffset,
  phaseProp: {
    key: "43",
    question:
      "אם תדעו שאחיכם או אחותכם משתמשים בקאנביס האם תחששו שזה עלול לפגוע בקשר שלו עם הוריכם?",
    answers: ["לא", "אולי", "בהחלט כן"],
    time: clockTime,
  },
};

TODO: "add movie 3";
// Movie 3 (phases 45 - 57)
gameDefenition["45"] = {
  type: "video",
  duration: videosDict[3].duration + videoOffset,
  phaseProp: {
    key: "45",
    videoUrl: videosDict[3].link,
  },
};

// Grouping - לאיזו קבוצה אתה משתייך?
TODO: "grouping-1 ???";
gameDefenition["57"] = {
  type: "question",
  duration: 17,
  phaseProp: {
    key: "57",
    question: "לאן אתם משתייכים?",
    answers: ["קבוצת הבנים", "קבוצת הבנות"],
    time: clockTime,
  },
};

TODO: "grouping-2 ???";
gameDefenition["58"] = {
  type: "question",
  duration: 17,
  phaseProp: {
    key: "58",
    question: "איך מתחיל שם משפחתכם?",
    answers: ["א-י", "כ-ת"],
    time: clockTime,
  },
};

TODO: "add movie 4";
// Movie 4 (phases 59)
gameDefenition["59"] = {
  type: "video",
  duration: videosDict[4].duration + videoOffset,
  phaseProp: {
    key: "59",
    videoUrl: videosDict[4].link,
  },
};

gameDefenition["60"] = {
  type: "question",
  duration: 13.81 + clockTime + questionOffset,
  correct_answer: 2,
  phaseProp: {
    key: "60",
    question: "במעבדות הלא חוקיות:",
    answers: [
      "מזקקים את הסמים בצורה סטרילית",
      "מערבבים את חומרי הסם עם רעלים בכדי לחזק את השפעתן",
      "משתמשים באמצעים חדשניים להפקת הסם",
      "כל התשובות נכונות",
    ],
    time: clockTime,
  },
};

//inserted bars no audio
gameDefenition["61"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "61",
  },
  questionKey: "60",
};

TODO: "add movie 5";
// Movie 5 (phases 62)
gameDefenition["62"] = {
  type: "video",
  duration: videosDict[5].duration + videoOffset,
  phaseProp: {
    key: "62",
    videoUrl: videosDict[5].link,
  },
};

gameDefenition["63"] = {
  type: "question",
  duration: 17.12 + clockTime + questionOffset,
  correct_answer: 4,
  phaseProp: {
    key: "63",
    question: "כיצד פועלים הסמים בגופינו?",
    answers: [
      "נספגים בנימי הדם בריאות, ברירית האף או במעי הדק",
      "מגיעים אל כל חלק בגוף באמצעות מחזור הדם",
      "משבשים את התקשורת העצבית במוח ומשנים את תפקודיו",
      "כל התשובות נכונות",
    ],
    time: clockTime,
  },
};

//was audio 63, changed to 65
gameDefenition["65"] = {
  type: "bars",
  duration: 9.42 + barsOffset,
  phaseProp: {
    key: "65",
  },
  questionKey: "63",
};

gameDefenition["66"] = {
  type: "question",
  duration: 9.42 + clockTime + questionOffset,
  correct_answer: 4,
  phaseProp: {
    key: "66",
    question: "מי שקונה סמים לא יכול לדעת",
    answers: [
      "היכן יוצרו",
      "מה הם מכילים",
      "כיצד ישפיעו על גופנו",
      "כל התשובות נכונות",
    ],
    time: clockTime,
  },
};

//inserted bars no audio
gameDefenition["67"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "67",
  },
  questionKey: "66",
};

TODO: "add movie 6";
// Movie 6 (phases 68)
gameDefenition["68"] = {
  type: "video",
  duration: videosDict[6].duration + videoOffset,
  phaseProp: {
    key: "65",
    videoUrl: videosDict[6].link,
  },
};

// Top 3
gameDefenition["69"] = {
  type: "top3",
  duration: 26,
  phaseProp: {
    key: "69",
  },
};

//in script it's 69
// Generic
gameDefenition["70"] = {
  type: "generic",
  duration: 10.12,
  phaseProp: {
    key: "70",
    paragraph:
      "שימו לב שהמיקום בטבלה הוא ביטוי למספר התשובות הנכונות שכל אחת ואחד מכם ענה והמהירות בה התשובה ניתנה. המהיר יותר מקבל כפל נקודות",
  },
};

// Groups
gameDefenition["71"] = {
  type: "groups",
  duration: 10,
  phaseProp: {
    key: "71",
    term: "ובאשר לקבוצות הקבוצה המובילה היא",
  },
};

// Movie 7 (phases 70-98)
gameDefenition["72"] = {
  type: "video",
  duration: videosDict[7].duration + videoOffset,
  phaseProp: {
    key: "72",
    videoUrl: videosDict[7].link,
  },
};

gameDefenition["99"] = {
  type: "question",
  duration: 11.75 + clockTime + questionOffset,
  correct_answer: 1,
  phaseProp: {
    key: "99",
    question: "מי שהשתמש בקנאביס לפני מבחן, עלול להצליח פחות כי:",
    answers: [
      "הזיכרון שלו לטווח קצר ייפגע",
      "הוא יהיה מרוכז מידי",
      "הוא יהיה צמא",
      "היד שלו תרעד",
    ],
    time: clockTime,
  },
};

//inserted bars no audio
gameDefenition["100"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "100",
  },
  questionKey: "99",
};

TODO: "fix";
// Movie 8 (phases 101)
gameDefenition["101"] = {
  type: "video",
  duration: videosDict[8].duration + videoOffset,
  phaseProp: {
    key: "101",
    videoUrl: videosDict[8].link,
  },
};

gameDefenition["102"] = {
  type: "question",
  duration: 17.18 + clockTime + questionOffset,
  correct_answer: 2,
  phaseProp: {
    key: "102",
    question:
      'האם הקנאביס (המכונה גם מריחואנה, גראס, וויד ועוד) מייצר רק הרגשת "סוטול" קלה?',
    answers: [
      "חוזרים להרגיש רגיל כעבור שעה",
      "אי אפשר לדעת, לפעמים ההשפעה עוברת לאט ולפעמים מהר",
      "תלוי אם משתמשים בבוקר או בערב",
      "כל התשובות נכונות",
    ],
    time: clockTime,
  },
};

gameDefenition["104"] = {
  type: "bars",
  duration: 17.9 + barsOffset,
  phaseProp: {
    key: "104",
  },
  questionKey: "102",
};

TODO: "fix";
//changed 104 -> 105
// Movie 9 (phases 104 - 110)
gameDefenition["105"] = {
  type: "video",
  duration: videosDict[9].duration + videoOffset,
  phaseProp: {
    key: "105",
    videoUrl: videosDict[9].link,
  },
};

gameDefenition["111"] = {
  type: "question",
  duration: 7.43 + clockTime + questionOffset,
  correct_answer: 2,
  phaseProp: {
    key: "111",
    question: "סמים שמיוצרים מגידולי טבע ולא מכימקלים במעבדה הם בריאים ובטוחים",
    answers: ["אמת", "פייק"],
    time: clockTime,
  },
};

gameDefenition["113"] = {
  type: "bars",
  duration: 10.04 + barsOffset,
  phaseProp: {
    key: "113",
  },
  questionKey: "111",
};

gameDefenition["114"] = {
  type: "question",
  duration: 5.23 + clockTime + questionOffset,
  correct_answer: 2,
  phaseProp: {
    key: "114",
    question: "עישון ג'ינט מזיק באותה מידה כמו עישון סיגריה רגילה",
    answers: ["אמת", "פייק"],
    time: clockTime,
  },
};

//inserted bars no audio
gameDefenition["115"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "115",
  },
  questionKey: "114",
};

// Movie 10 (phases 116)
gameDefenition["116"] = {
  type: "video",
  duration: videosDict[10].duration + videoOffset,
  phaseProp: {
    key: "116",
    videoUrl: videosDict[10].link,
  },
};

gameDefenition["117"] = {
  type: "question",
  duration: 13.65 + clockTime + questionOffset,
  correct_answer: 2,
  phaseProp: {
    key: "117",
    question:
      "סם הקנאביס (המכונה גם מריחואנה, גראס, וויד ועוד) אינו ממכר ולכן אינו באמת מזיק",
    answers: ["אמת", "פייק"],
    time: clockTime,
  },
};

//inserted bars no audio
gameDefenition["118"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "118",
  },
  questionKey: "117",
};

// Movie 11 (phases 119)
gameDefenition["119"] = {
  type: "video",
  duration: videosDict[11].duration + videoOffset,
  phaseProp: {
    key: "119",
    videoUrl: videosDict[11].link,
  },
};

gameDefenition["120"] = {
  type: "question",
  duration: 6.44 + clockTime + questionOffset,
  correct_answer: 1,
  phaseProp: {
    key: "120",
    question: "שימוש בקנאביס עלול לפגוע בתפקוד המיני והפוריות של בני הנוער",
    answers: ["אמת", "פייק"],
    time: clockTime,
  },
};

gameDefenition["121"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "121",
  },
  questionKey: "120",
};

gameDefenition["123"] = {
  type: "question",
  duration: 6.44 + clockTime + questionOffset,
  correct_answer: 1,
  phaseProp: {
    key: "123",
    question: "השפעת הקנאביס על מבוגרים אינה זהה להשפעה על בני נוער",
    answers: ["אמת", "פייק"],
    time: clockTime,
  },
};

gameDefenition["125"] = {
  type: "bars",
  duration: 7,
  phaseProp: {
    key: "125",
  },
  questionKey: "123",
};

// Movie 12 (phases 126 - 153)
gameDefenition["126"] = {
  type: "video",
  duration: videosDict[12].duration + videoOffset,
  phaseProp: {
    key: "126",
    videoUrl: videosDict[12].link,
  },
};

// Top 3
gameDefenition["153"] = {
  type: "top3",
  duration: 26,
  phaseProp: {
    key: "top3_1",
  },
};

// Generic
gameDefenition["154"] = {
  type: "generic",
  duration: 5.8 + genericOffset,
  phaseProp: {
    key: "154",
    paragraph:
      'אבל אל תתייאשו, כמו שאומרים "זה לא נגמר עד שזה נגמר". והנה מקבץ השאלות הבא',
  },
};

gameDefenition["155"] = {
  type: "question",
  duration: 17.79 + clockTime + questionOffset,
  correct_answer: 4,
  phaseProp: {
    key: "155",
    question: "שימוש בגז הקצפות גורם בטווח הארוך ל:",
    answers: [
      "ריח רע מהפה והזעה מוגברת",
      "פגיעה במערכת העצבים ובמערכת החיסונית, נזק מוחי והתפתחות מחלות פסיכוטיות",
      "פגיעה ביכולת לפתור בעיות",
      "תשובות 2 ו-3 נכונות",
    ],
    time: clockTime,
  },
};

//inserted bars no audio
gameDefenition["156"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "156",
  },
  questionKey: "155",
};

// Movie 13 (phase 157)
gameDefenition["157"] = {
  type: "video",
  duration: videosDict[13].duration + videoOffset,
  phaseProp: {
    key: "157",
    videoUrl: videosDict[13].link,
  },
};

gameDefenition["158"] = {
  type: "question",
  duration: 14.27 + clockTime + questionOffset,
  correct_answer: 4,
  phaseProp: {
    key: "158",
    question: "מה קורה שצורכים סם בקביעות",
    answers: [
      "הגוף והמוח מתרגלים ומשתוקקים אליו",
      "המוח מתרחב וזה מסוכן",
      "השפעתו קטנה ולכן משתמש מגדיל את המנה",
      "תשובות 1 ו-3 נכונות",
    ],
    time: clockTime,
  },
};

gameDefenition["159"] = {
  type: "bars",
  duration: 2.2 + barsOffset,
  phaseProp: {
    key: "159",
  },
  questionKey: "158",
};

gameDefenition["161"] = {
  type: "question",
  duration: 12.8 + clockTime + questionOffset,
  correct_answer: 4,
  phaseProp: {
    key: "161",
    question: "השימוש בקנאביס עלול לגרום לנו ל:",
    answers: [
      "ירידה במוטיבציה לבצע משימות",
      "סיכוי להתמכרות לסמים בבגרות",
      "חרדה, דיכאון ומחשבות אובדנות",
      "כל התשובות נכונות",
    ],
    time: clockTime,
  },
};

gameDefenition["163"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "163",
  },
  questionKey: "161",
};

// Movie 15 (phase 164)
gameDefenition["164"] = {
  type: "video",
  duration: videosDict[15].duration + videoOffset,
  phaseProp: {
    key: "164",
    videoUrl: videosDict[15].link,
  },
};

// Generic
gameDefenition["165"] = {
  type: "generic",
  duration: 4.98 + genericOffset,
  phaseProp: {
    key: "165",
    paragraph: "בין 1 ל-4, עד כמה אתה מסכימים או לא מסכימים עם המשפטים האלה",
  },
};

// How much do you agree Questions (without right answer)
// Phases 166 - 172

gameDefenition["166"] = {
  type: "question",
  duration: 7.65 + clockTime + questionOffset,
  phaseProp: {
    key: "166",
    question: "כל סם עלול להיות מסוכן",
    answers: ["לא מסכים בכלל", "לא כל כך מסכים", "די מסכים", "מסכים בהחלט"],
    time: clockTime,
  },
};

gameDefenition["168"] = {
  type: "question",
  duration: 9.7 + clockTime + questionOffset,
  phaseProp: {
    key: "168",
    question: "מי שמשתמש בסמים פוגע רק בעצמו ואינו פוגע באחרים",
    answers: ["לא מסכים בכלל", "לא כל כך מסכים", "די מסכים", "מסכים בהחלט"],
    time: clockTime,
  },
};

gameDefenition["170"] = {
  type: "question",
  duration: 10.11 + clockTime + questionOffset,
  phaseProp: {
    key: "170",
    question: "אני לא אשתמש בסם כלשהו אם אדע שהוא יגרום לי נזק גופני ונפשי",
    answers: ["לא מסכים בכלל", "לא כל כך מסכים", "די מסכים", "מסכים בהחלט"],
    time: clockTime,
  },
};

gameDefenition["172"] = {
  type: "question",
  duration: 8.32 + clockTime + questionOffset,
  phaseProp: {
    key: "172",
    question: "זה  לא ענייני אם חברים שלי משתמשים בסמים",
    answers: ["לא מסכים בכלל", "לא כל כך מסכים", "די מסכים", "מסכים בהחלט"],
    time: clockTime,
  },
};

// Movie 16 (phase 174 - 176)
gameDefenition["174"] = {
  type: "video",
  duration: videosDict[16].duration + videoOffset,
  phaseProp: {
    key: "174",
    videoUrl: videosDict[16].link,
  },
};

gameDefenition["177"] = {
  type: "question",
  duration: 9.23 + clockTime + questionOffset,
  correct_answer: 2,
  phaseProp: {
    key: "177",
    question:
      "מאחר והקנאביס (המכונה מריחואנה, גראס ועוד) ניתן באישור רופא לחולים, סימן שהוא לא מסוכן",
    answers: ["נכון", "לא נכון"],
    time: clockTime,
  },
};

gameDefenition["179"] = {
  type: "bars",
  duration: 3,
  phaseProp: {
    key: "179",
  },
  questionKey: "177",
};

gameDefenition["180"] = {
  type: "question",
  duration: 8.61 + clockTime + questionOffset,
  correct_answer: 1,
  phaseProp: {
    key: "180",
    question:
      "במדינות הבודדות שבהן מתיר החוק שימוש אישי בקנאביס השימוש אסור מתחת לגיל 21",
    answers: ["נכון", "לא נכון"],
    time: clockTime,
  },
};

gameDefenition["182"] = {
  type: "bars",
  duration: 7,
  phaseProp: {
    key: "182",
  },
  questionKey: "180",
};

// Movie 17 (phase 183)
gameDefenition["183"] = {
  type: "video",
  duration: videosDict[17].duration + videoOffset,
  phaseProp: {
    key: "183",
    videoUrl: videosDict[17].link,
  },
};

// Same Questions as start...

gameDefenition["184"] = {
  type: "question",
  duration: 8.46 + clockTime + questionOffset,
  phaseProp: {
    key: "184",
    question: "כמה מסוכן לבני בנות גילכם להשתמש בסמים?",
    answers: ["אין סיכוי", "סיכוי נמוך", "סיכון בינוני", "סיכון גבוה"],
    time: clockTime,
  },
};

gameDefenition["192"] = {
  type: "question",
  duration: 7.7 + clockTime + questionOffset,
  phaseProp: {
    key: "192",
    question: "מה קורה שלוקחים סמים?",
    answers: [
      "נעשים שמחים",
      "כלום",
      "נעשים עצובים",
      "על כל אחד זה משפיע באופן שונה",
    ],
    time: clockTime,
  },
};

gameDefenition["194"] = {
  type: "question",
  duration: 9.69 + clockTime + questionOffset,
  phaseProp: {
    key: "194",
    question: "כמה זמן משפיע סם הקאנביס על גוף האדם?",
    answers: ["פחות מ-8 שעות", "עד ל-24 שעות", "עד 7 ימים", "עד 30 יום"],
    time: clockTime,
  },
};

gameDefenition["196"] = {
  type: "question",
  duration: 4.81 + clockTime + questionOffset,
  phaseProp: {
    key: "196",
    question: "האם בכוונתכם לצרוך קנאביס בעתיד?",
    answers: ["כן", "אולי", "לא"],
    time: clockTime,
  },
};

gameDefenition["198"] = {
  type: "question",
  duration: 10.02 + clockTime + questionOffset,
  phaseProp: {
    key: "198",
    question:
      "אם תדעו שאחיכם או אחותכם משתמשים בקאנביס האם תחששו שזה עלול לפגוע בקשר שלו עם הוריכם?",
    answers: ["לא", "אולי", "בהחלט כן"],
    time: clockTime,
  },
};

gameDefenition["200"] = {
  type: "question",
  duration: 6.87 + clockTime + questionOffset,
  phaseProp: {
    key: "200",
    question: "האם קיבלתם מידע שלא היה ידוע לכם קודם לכן בפעילות זו?",
    answers: ["לא", "מעט", "הרבה"],
    time: clockTime,
  },
};

gameDefenition["202"] = {
  type: "question",
  duration: 9.1 + clockTime + questionOffset,
  phaseProp: {
    key: "202",
    question: "האם יחסכם לסמים השתנה בעקבות פעילות זו ?",
    answers: [
      "לא השתנה",
      "השתנה קצת",
      "ההתנגדות שלי גברה",
      "ההתנגדות שלי גברה מאוד",
    ],
    time: clockTime,
  },
};

gameDefenition["204"] = {
  type: "question",
  duration: 8.86 + clockTime + questionOffset,
  phaseProp: {
    key: "204",
    question:
      "האם אתם חושבים שעיסוק בנושאים משמעותיים לצעירים באמצעות חוויה כמו זו היא מעניינת?",
    answers: ["כן", "קצת", "לא"],
    time: clockTime,
  },
};

// Movie 18 (phase 206)
gameDefenition["206"] = {
  type: "video",
  duration: videosDict[18].duration + videoOffset,
  phaseProp: {
    key: "206",
    videoUrl: videosDict[18].link,
  },
};

// Top 3
gameDefenition["207"] = {
  type: "top3",
  duration: 30,
  phaseProp: {
    key: "207",
  },
};

// Groups
gameDefenition["208"] = {
  type: "groups",
  duration: 10,
  phaseProp: {
    key: "208",
    term: "ולסיום - מי ענו ביחד יותר תשובות נכונות?",
  },
};

// Movie 19 (phase 209)
gameDefenition["209"] = {
  type: "video",
  duration: videosDict[19].duration + videoOffset,
  phaseProp: {
    key: "209",
    videoUrl: videosDict[19].link,
  },
};

// Movie 20 (phase 210 - 215)
gameDefenition["210"] = {
  type: "video",
  duration: videosDict[20].duration + videoOffset,
  phaseProp: {
    key: "210",
    videoUrl: videosDict[20].link,
  },
};

// Goodbye
gameDefenition["goodbye"] = {
  type: "goodBye",
  phaseProp: {
    key: "goodbye",
  },
};
exports.gameDefenition = gameDefenition;
