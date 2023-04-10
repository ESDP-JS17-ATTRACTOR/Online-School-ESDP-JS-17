import Link from "next/link";
import {useEffect} from "react";
import {useRouter} from "next/router";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }, [router]);

  return (
    <>
      <h1>Oops...</h1>
      <h2>Page not found!</h2>
      <p>redirect to <Link href='/'>main page</Link> after 2 seconds.</p>
    </>
  )
}

export default NotFoundPage;