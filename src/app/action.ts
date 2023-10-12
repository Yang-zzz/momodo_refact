'use server';

import { cookies } from 'next/dist/client/components/headers';

interface CookieItem {
  key: string;
  value: string;
}
export const setCookie = async (arr: CookieItem[]) => {
  const cookieStore = cookies();

  return arr.forEach(({ key, value }) => {
    cookieStore.set({
      name: key,
      value: value,
      /* @ts-expect-error Server Component */
      httpOnly: true,
    });
  });
};

export const getCookie = async (key: string): Promise<string | undefined> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key);
  return cookie?.value;
};
