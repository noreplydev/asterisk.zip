import { Risk } from "../Risk";
import Link from "next/link";

export default function Page() {
  return <div className="relative h-screen w-screen flex flex-col justify-center items-center
    overflow-hidden">
    <div className="absolute top-2/4 left-1/2 flex flex-col 
      justify-center items-center h-24 w-20
      translate-x-[-50%]">
      <Risk />
    </div>
    <div className="absolute bottom-12 left-1/2 flex flex-row
      justify-center items-center h-fit w-fit
      translate-x-[-50%] gap-10 opacity-0 animate-appearFull z-10">
      <a
        href="https://github.com/noreplydev"
        className="hover:underline"
      >GITHUB</a>
      {/* <Link
        href="projects"
        className="hover:underline"
      >PROJECTS</Link> */}
      <a
        href="https://linkedin.com/in/asteriskdev"
        className="hover:underline"
      >LINKEDIN</a>
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
      <video
        autoPlay
        muted
        loop
        playsInline
        className="opacity-70 w-screen h-screen object-cover"
      >
        <source src="/move_in_silence.webm" type="video/webm" />
        <source src="/move_in_silence.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
}