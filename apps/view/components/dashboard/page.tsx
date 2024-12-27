const fetchProjects = async (fetch: any) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/projects"
  const projects = await fetch(url)
    .then((data: any) => data.json())
    .then((res: any) => res)

  return projects
}

export default async function Page() {
  let projects: any = {};
  try {
    projects = await fetchProjects(fetch)
  } catch (err) { console.error(err) }

  if (!projects?.success || !projects?.projects) {
    return <div className="relative h-fit w-screen flex flex-col justify-start items-center
    overflow-y-scroll gap-24 py-28">
      <h1>Error while loading projects</h1>
    </div >
  }

  return <div className="relative h-fit w-screen flex flex-col justify-start items-center
    overflow-y-scroll gap-24 py-28">
    <h1>Projects</h1>
    {
      projects?.projects.map((project: any) => {
        const key = JSON.stringify(project)
        return <div key={key}>{JSON.stringify(project)}</div>
      })
    }
  </div >
}