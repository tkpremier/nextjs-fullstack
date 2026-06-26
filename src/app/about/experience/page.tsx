import { Drawer } from '@/components/Drawer';
import { getExp, updateExp } from '@/services/db/experience';
import { Metadata } from 'next';
import Form from 'next/form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experience | TK Premier',
  description: "TK Premier's Experience"
};
export const dynamic = 'force-dynamic';

export default async function Experience() {
  const { data } = await getExp();

  async function updateExperience(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const description = formData.get('description');
    await updateExp([name, description, name]);
  }
  return (
    <>
      <h1 className="title">My Experience &#x1F305;</h1>
      <ul className="root" style={{ maxWidth: '100%' }}>
        {data.map(e => (
          <Drawer closed header={e.name} key={e.id}>
            <div dangerouslySetInnerHTML={{ __html: e.description }} />
            <Link href={`/about/experience/${e.id}`}>
              Update {e.name}
            </Link>
          </Drawer>
        ))}
      </ul>
      <Form action={updateExperience}>
        <h3>TK&rsquo;s Experience</h3>
        <label key="experience-name" htmlFor="experience-name">
          Company
          <input type="text" name="name" required placeholder="Name" id="experience-name" />
        </label>
        {/* <label htmlFor="interview-retro" key="interview-retro">
          Description
          <HTMLEditor data={descState} name="description" onChange={handleDescChange} />
        </label> */}
        <input type="submit" value="Update" />
      </Form>
    </>
  );
}
