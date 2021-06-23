import { FormEvent } from "react";
import { useHistory } from "react-router-dom";

import IllustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Rooms does not exists");
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo google" />
            Create your room with google
          </button>
          <div className="separator">or join another room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Code room"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Join Us</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
