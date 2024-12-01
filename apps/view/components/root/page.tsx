import { Risk } from "../Risk";

export default function Page() {
  return <div className="relative h-screen w-screen flex flex-col justify-center items-center
    overflow-hidden">
    <Risk />
    <div className="h-screen w-screen grid place-items-center">
      <video src="/move_in_silence.webm" autoPlay muted loop
        controls={false}
        className="opacity-20 w-screen h-screen object-cover" />
      <source />
    </div>
  </div>
}