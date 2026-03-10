'use client';
import { ModelContext } from '@/context/model';
import { Model } from '@/types/db/model';
import Link from 'next/link';
import { useContext } from 'react';

const ModelsPage = () => {

  const [models = [], dispatch] = useContext(ModelContext);
  // console.log('ModelsPage: ', models);
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

export default ModelsPage;
