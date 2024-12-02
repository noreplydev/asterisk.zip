import { Risk } from "../Risk";
import { Cover } from "./ProjectCover";

export default function Page() {
  const projects = [
    {
      src: "/covers/draws.png"
    },
    {
      src: "/covers/ego.png"
    }, {

      src: "/covers/speak.png"
    }
  ]

  return <div className="relative h-screen w-screen flex flex-row justify-center items-center
    gap-5 overflow-hidden">
    {
      projects.map((project) => {
        return <div
          key={project.src}
          className="h-72 w-72"
        >
          <Cover
            src={project.src}
            alt={project.alt}
          />
        </div>
      })
    }
  </div>
}