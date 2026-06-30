import { updateExperience } from '@/actions/experience';
import { Editor } from '@/components/Editor';
import { getExp } from '@/services/db/experience';
import Form from 'next/form';

export default async function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getExp(Number(id));
  const experience = data.find(e => e.id === Number(id));
  return experience ? (
    <div>
      <h2>{experience?.name}</h2>
      <Form action={updateExperience}>
        <input type="hidden" name="id" value={experience?.id} required />
        <input type="hidden" name="name" value={experience?.name} />
        <Editor id="description" data={experience?.description} name="description" />
        <input type="submit" value="Update" />
      </Form>
    </div>
  ) : <div>No experience found</div>;
};