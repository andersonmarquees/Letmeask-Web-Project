import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomsId = params.id;
  const { questions, title } = useRoom(roomsId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must be logger in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomsId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <RoomCode code={roomsId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} questions</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="What is your question"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Send a question, <button>login</button>{" "}
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Send your question
            </Button>
          </div>
        </form>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
