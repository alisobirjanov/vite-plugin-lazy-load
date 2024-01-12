export const requestQuerySplitRE = /\?(?!.*[/|}])/

export function parseRequest(id: string): Record<string, any> | null {
  const [origin, search] = id.split(requestQuerySplitRE, 2)
  if (!search) 
    return null
  
  return {
    origin,
    query: Object.fromEntries(new URLSearchParams(search))
  }
}