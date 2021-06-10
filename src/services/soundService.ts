import { Service } from "typedi";

@Service()
export default class Sound {
  private sound;
  constructor(src: string) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    // in the js code unmute the audio once the event happened
    this.sound.muted = false;
    document.body.appendChild(this.sound);
  }

 

  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}