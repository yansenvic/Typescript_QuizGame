import { CreateQuestionList } from "./component/QuestionList";

const React = (function createUseReact() {
  let values: any[] = [];
  let index = 0;
  return {
    useState: function <T>(defaultValue: T): [T, (newValue: T) => void] {
      const useStateIndex = index;
      values[useStateIndex] = values[useStateIndex] ?? defaultValue;
      function setValue(newValue: T) {
        values[useStateIndex] = newValue;
        index = 0;
        render();
      }
      index++;
      return [values[useStateIndex], setValue];
    },
  };
})();

export type Question = {
  id: number;
  title: string;
  option: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
};

export type Answer = {
  id: number;
  title: string;
};

function HomeScreen() {
  const [questions, setQuestions] = React.useState([
    {
      id: 1,
      title: "Siapkah aku ?",
      option: { a: "Aku", b: "Dia", c: "Kamu", d: "Mereka" },
    },
    {
      id: 2,
      title: "Siapkah aku ?",
      option: { a: "Aku", b: "Dia", c: "Kamu", d: "Mereka" },
    },
    {
      id: 3,
      title: "Siapkah aku ?",
      option: { a: "Aku", b: "Dia", c: "Kamu", d: "Mereka" },
    },
    {
      id: 4,
      title: "Siapkah aku ?",
      option: { a: "Aku", b: "Dia", c: "Kamu", d: "Mereka" },
    },
    {
      id: 5,
      title: "Siapkah aku ?",
      option: { a: "Aku", b: "Dia", c: "Kamu", d: "Mereka" },
    },
  ]);
  const [answers, setAnswers] = React.useState([{ id: 0, title: "" }]);
  console.log(answers);
  const QuestionsList = CreateQuestionList({ questions, answers, setAnswers });
  return QuestionsList;
}

function render() {
  const root = document.getElementById("root");
  const homeScreen = HomeScreen();
  if (root) {
    root.innerHTML = "";
    root.append(homeScreen);
  }
}

render();
