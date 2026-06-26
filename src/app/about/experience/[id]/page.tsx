import { Editor } from '@/components/Editor';
import { getExp } from '@/services/db/experience';

export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getExp(Number(id));
  const experience = data.find(e => e.id === Number(id));
  return experience ? (
    <div>
      <h2>{experience?.name}</h2>
      <Editor data={experience?.description} name="description" />
    </div>
  ) : <div>No experience found</div>;
};