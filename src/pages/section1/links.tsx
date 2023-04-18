import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Link 사용

export default function Links() {
  return (
    <main>
      <h1>Links</h1>

      <Link href="/section1/getStaticProps">/getStaticProps</Link>
    </main>
  );
}

// router 사용

// export default function Links() {
//   const router = useRouter();
//   useEffect(() => {
//     router.prefetch('/section1/getStaticProps');
//   }, [router]);

//   return (
//     <main>
//       <h1>Links</h1>
//       <button
//         onClick={() => {
//           router.push('/section1/getStaticProps');
//         }}
//       >
//         /getStaticProps
//       </button>
//     </main>
//   );
// }
