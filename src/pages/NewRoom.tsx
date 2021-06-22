import IllustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import "../styles/auth.scss";

export function NewRoom() {
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
        <form>
          <input type="text" placeholder="Name room" />
          <Button type="submit">Create Room</Button>
        </form>
        <p>
          Do you want to join an existing room? <a href="#">Click Here</a>
        </p>
      </div>
    </main>
  </div>
  );
};