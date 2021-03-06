import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import logoImg from "../assets/images/logo.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
// import { useAuth } from "../hooks/useAuth";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import deleteImg from "../assets/images/delete.svg";
import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomsId = params.id;
  const { questions, title } = useRoom(roomsId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomsId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Your sure about delete this question ?")) {
      await database.ref(`rooms/${roomsId}/questions/${questionId}`).remove();
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomsId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleCheckedQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomsId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomsId} />
            <Button isOutlined onClick={handleEndRoom}>
              Close Room
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} questions</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleCheckedQuestionAsAnswered(question.id)
                      }
                    >
                      <img src={checkImg} alt="checked question" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="highlight question" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="delete question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
