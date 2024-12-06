import { Cover } from "./ProjectCover";

export default function Page() {
  const projects = [
    {
      src: "/covers/draws.png"
    },
    {
      src: "/covers/ego.png"
    }
  ]

  return <div className="relative h-fit w-screen flex flex-col justify-start items-center
    overflow-y-scroll gap-5">
    {
      projects.map((project, index) => {
        return <div
          key={project.src}
          className={" w-1/3 transition-all ease-in-out bg-red-500 overflow-hidden"
          }
        >
          <Cover
            className="h-full w-full"
            src={project.src}
            alt={project.alt}
          />
        </div>
      })
    }
  </div >
}