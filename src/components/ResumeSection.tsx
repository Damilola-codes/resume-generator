import type { ReactNode } from 'react';


export default function ResumeSection({ title, children }: { title: string;  children: ReactNode}) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold border-b pb-1 mb-3">{title}</h2>
      {children}
    </section>
  );
}
