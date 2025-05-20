'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PostLoginRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user?.role === 'admin') {
      router.replace('/admin');
    } else {
      router.replace('/');
    }
  }, [session, status, router]);

  return <div style={{textAlign:'center',marginTop:'3rem'}}>Redirecting...</div>;
} 