const fetchProjects = async (fetch: any) => {
  const projects = await fetch("http://localhost:5544/v1/projects")
    .then((data: any) => data.json())
    .then((res: any) => res)

  return projects
}

export default async function Page() {
  let projects = await fetchProjects(fetch)

  if (!projects.success || !projects.projects) {
    return <div className="relative h-fit w-screen flex flex-col justify-start items-center
    overflow-y-scroll gap-24 py-28">
      <h1>Error while loading projects</h1>
    </div >
  }

  return <div className="relative h-fit w-screen flex flex-col justify-start items-center
    overflow-y-scroll gap-24 py-28">
    <h1>Projects</h1>
    {
      projects.projects.map((project: any) => {
        const key = JSON.stringify(project)
        return <div key={key}>{JSON.stringify(project)}</div>
      })
    }
  </div >
}