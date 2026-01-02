import { Drawer } from '@/components/Drawer';
import { getExp } from '@/services/db';
import { Metadata } from 'next';
import { AddForm } from './AddForm';

export const metadata: Metadata = {
  title: 'Experience | TK Premier',
  description: "TK Premier's Experience"
};
export const dynamic = 'force-dynamic';

export default async function Experience() {
  const { data } = await getExp();
  return (
    <>
      <h1 className="title">My Experience &#x1F305;</h1>
      <blockquote className="description">
        <figure>
          Tell me about your journey into tech.
          <ul>
            <li>How did you get interested in coding?</li>
            <li>Why was web development a good fit for you?</li>
            <li>How is that applicable to our role or company goals?</li>
          </ul>
        </figure>
      </blockquote>
      {data.length > 0 ? (
        <ul className="root" style={{ maxWidth: '100%' }}>
          {data.map(e => (
            <Drawer closed header={e.name} key={e.id}>
              <div dangerouslySetInnerHTML={{ __html: e.description }} />
            </Drawer>
          ))}
        </ul>
      ) : null}
      <AddForm />
    </>
  );
}
