import { redirect } from 'next/navigation';
import { updateUser } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  console.log(JSON.stringify(req));
  await updateUser(req);
  //redirect('/')
  return new Response(redirect('/'));
}
