import { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import IllustrationImg from "../assets/images/illustration.svg";
import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";
import { useState } from "react";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="illustration ask and answer" />
        <strong>Create room @&amp;A live</strong>
        <p>ask questions in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Name room"
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Create Room</Button>
          </form>
          <p>
            Do you want to join an existing room? <Link to="/">Click Here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
