import { useRouter } from 'next/router';
import Error404 from './404';

export default function Error() {
  const router = useRouter();
  if (!router.isFallback) {
    return <Error404 />;
  }

  return <>{router.isFallback ? <h1>Loading...</h1> : <h1>Ola mundo</h1>}</>;
}
