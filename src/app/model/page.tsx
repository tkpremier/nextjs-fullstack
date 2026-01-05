import { getAllModels } from '@/services/db/model';
import { Model } from '@/types/db/model';
import Link from 'next/link';

export default async () => {
  const { data: models } = await getAllModels();
  return (
    <div>
      <h1>Models</h1>
      <ul>
        {models.map((model: Model) => (
          <li key={model.id}>
            <Link href={`/model/${model.id}`}>{model.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
