import { useHistory } from "react-router-dom";

import IllustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {    
    if(!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
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
        <form>
          <input type="text" placeholder="Code room" />
          <Button type="submit">Join Us</Button>
        </form>
      </div>
    </main>
  </div>
  );
};