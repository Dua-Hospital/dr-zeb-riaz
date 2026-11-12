import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: '96px 0', textAlign: 'center' }}>
      <p className="overline">404</p>
      <h1 style={{ margin: '12px 0' }}>Page not found</h1>
      <p className="ur" lang="ur">
        صفحہ نہیں ملا
      </p>
      <div className="h-ctas" style={{ justifyContent: 'center', marginTop: 24 }}>
        <Link href="/" className="btn btn-pri">
          English home
        </Link>
        <Link href="/ur/" className="btn btn-ghost" lang="ur" dir="rtl">
          اردو صفحہ
        </Link>
      </div>
    </main>
  );
}
