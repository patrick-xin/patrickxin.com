export async function fetcher<T>(url: string): Promise<T> {
  const res: Response = await fetch(url);
  return res.json();
}
