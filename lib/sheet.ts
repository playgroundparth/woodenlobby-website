export function toGoogleCSVUrl(input: string): string {
  try {
    const u = new URL(input)

    // Already a CSV export link
    if (u.searchParams.get("output") === "csv" || u.pathname.includes("/export")) {
      return input
    }

    // Handle standard sheets link: /spreadsheets/d/{id}/...
    if (u.hostname.includes("docs.google.com") && u.pathname.includes("/spreadsheets/")) {
      const match = u.pathname.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
      const id = match?.[1]
      if (id) {
        const gid = u.searchParams.get("gid")
        const base = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`
        return gid ? `${base}&gid=${encodeURIComponent(gid)}` : base
      }
    }

    // Handle open?id={id} style
    if (u.hostname.includes("docs.google.com") && u.pathname.includes("/open") && u.searchParams.get("id")) {
      const id = u.searchParams.get("id")!
      const gid = u.searchParams.get("gid")
      const base = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`
      return gid ? `${base}&gid=${encodeURIComponent(gid)}` : base
    }

    return input
  } catch {
    return input
  }
}
