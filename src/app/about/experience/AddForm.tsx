'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

const isAdmin = (email: string) => process.env.NEXT_PUBLIC_ADMIN_EMAILS.includes(email);
export const AddForm = () => {
  const { user } = useUser();
  return user && isAdmin(user.email) ? (
    <form>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="description" placeholder="Description" />
      <button type="submit">Add</button>
    </form>
  ) : null;
};
