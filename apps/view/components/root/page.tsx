import { Risk } from "../Risk";

export default function Page() {
  return <div className="relative h-screen w-screen flex flex-col justify-center items-center
    overflow-hidden">
    <div className="absolute top-3/4 left-1/2 grid place-items-center h-24 w-20
      translate-x-[-50%]">
      <Risk />
    </div>
    <div className="h-screen w-screen grid place-items-center opacity-0 animate-appear">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-full w-full">
        <filter id="noise" x="0" y="0">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="5" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 1" />
            <feFuncG type="table" tableValues="0 1" />
            <feFuncB type="table" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
        <rect className="h-full w-full" filter="url(#noise)" opacity="0.8" />
      </svg>
      <video src="/move_in_silence.webm" autoPlay muted loop
        controls={false}
        className="opacity-50 w-screen h-screen object-cover" />
      <source />
    </div>
  </div>
}