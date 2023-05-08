import { Answer, Question } from "..";

export function CreateQuestionList(props: {
  questions: Question[];
  answers: Answer[];
  setAnswers: (newValue: Answer[]) => void;
}) {
  const ol = document.createElement("ol");
  props.questions.map((question) => {
    const li = document.createElement("li");
    li.textContent = question.title;
    const div = document.createElement("div");
    for (const [key, value] of Object.entries(question.option)) {
      const inputItem = document.createElement("input");
      const label = document.createElement("label");
      let statusQuestion: boolean = false;
      if (statusAnswer(props.answers, question)) {
        statusQuestion = props.answers.some((answer) => {
          return answer.title === key && answer.id === question.id;
        });
      } else {
        statusQuestion = false;
      }
      inputItem.type = "radio";
      inputItem.id = question.id.toString();
      inputItem.name = question.id.toString();
      inputItem.value = key;
      inputItem.checked = statusQuestion;
      label.htmlFor = question.id.toString();
      label.innerText = key + " : " + value;
      div.append(inputItem, label);
      inputItem.onclick = () => {
        const result = statusAnswer(props.answers, question);
        if (result) {
          props.answers.map((answer, index) => {
            if (answer.id === question.id) {
              const newAnswers = [...props.answers];
              newAnswers[index].title = key;
              props.setAnswers([...newAnswers]);
            }
          });
        } else {
          props.setAnswers([...props.answers, { id: question.id, title: key }]);
        }
      };
    }
    li.append(div);
    ol.append(li);
  });
  const button = document.createElement("input");
  button.type = "button";
  button.value = "Submit";
  button.onclick = function cetakHasil(event) {
    event.preventDefault();
  };
  ol.append(button);
  return ol;
}

function statusAnswer(answers: Answer[], question: Question) {
  const checkStatusAnswer = answers.some((answer) => {
    return answer.id === question.id;
  });
  return checkStatusAnswer;
}
