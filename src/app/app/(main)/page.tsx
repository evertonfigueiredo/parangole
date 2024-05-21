import { getRedirect } from './action'
import { redirect } from 'next/navigation'

export default async function Page() {
  const result = await getRedirect()
  redirect(result)
}
