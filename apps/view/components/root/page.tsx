import RevealText from "../RevealText";
import { Risk } from "../Risk";
import Link from "next/link";

export default function Page() {
  return <div className="relative h-full w-full flex flex-col justify-center items-center
    overflow-hidden">
    <div className="absolute top-2/4 left-1/2 flex flex-col 
      justify-center items-center h-24 w-20
      translate-x-[-50%]">
      <Risk />
    </div>
    <div className="h-full w-full md:border-solid md:border-[#242424] md:border-[1px] rounded-lg">
      <div className="absolute top-44 left-1/2 translate-x-[-50%]  w-fit h-fit z-30 opacity-0 animate-appearFull
      text-center md:text-left md:translate-x-0 md:top-5 md:left-5">
        20, software engineer
        <br />
        building <span className="bg-[#00000081] px-2 text-white"><a href="https://selfvm.run" target="_blank" className="hover:underline">self-vm</a></span>
        <br />
        and cool stuff at <span className="bg-[#00000081] px-2 text-white"><a href="https://github.com/protofy-xyz" target="_blank" className="hover:underline">protofy.xyz</a></span>
      </div>
      <RevealText
        className="absolute w-[350px] h-fit top-5 right-1/2 translate-x-[50%] z-30 opacity-0 animate-appearFull delay-1000 text-center
        md:left-1/ md:text-right md:right-5 md:translate-x-0"
        text={"the work defines the artist as much as the artist defines the work. i only build things that define how i see the universe, and i see the universe through the things i build."}
        delay={2000}
        duration={2100}
        interval={54}
      />

      <div className="absolute bottom-12 left-1/2 flex flex-row
      justify-center items-center h-fit w-fit
      translate-x-[-50%] gap-10 opacity-0 animate-appearFull z-10">
        <a
          href="https://github.com/noreplydev"
          target="_blank"
          className="hover:underline"
        >GITHUB</a>
        <a
          href="https://linkedin.com/in/asteriskdev"
          target="_blank"
          className="hover:underline"
        >LINKEDIN</a>
        <Link
          href="https://youtube.com/playlist?list=PL5-7ELXIW3PNkmfUtVA-5oFZP4N6gM-dU&si=HvpQ-F5xR8314vi7"
          target="_blank"
          className="hover:underline"
        >TALKS</Link>
      </div>
      <div className="h-full w-full grid place-items-center opacity-0 animate-appear">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="opacity-100 w-screen h-screen object-cover brightness-[0.5]"
        >
          <source src="/move_in_silence.webm" type="video/webm" />
          <source src="/move_in_silence.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
}