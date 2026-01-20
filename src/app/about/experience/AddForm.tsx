'use client';
import { Drawer } from '@/components/Drawer';
import { HTMLEditor } from '@/components/drive/Update';
import { Form } from '@/components/Form';
import { ExperienceDB } from '@/types/db/experience';
import { useUser } from '@auth0/nextjs-auth0';
import { Editor as CKEditor } from 'ckeditor5';
import serialize from 'form-serialize';
import { FormEvent, useCallback, useState } from 'react';

const isAdmin = (email: string) => process.env.NEXT_PUBLIC_ADMIN_EMAILS.includes(email);

const AddForm = ({ name, description }: Omit<ExperienceDB, 'id'>) => {
  const { user } = useUser();
  const [descState, updateDesc] = useState(description);
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const experience = serialize(form, { hash: true }) as unknown;
      console.log('experience: ', experience);
    },
    []
  );
  const handleDescChange = (_: unknown, editor: CKEditor) => updateDesc(() => editor.getData());
  return user && isAdmin(user.email) ? (
    <Form onSubmit={handleSubmit}>
      <h3>TK&rsquo;s Experience</h3>
      <label key="interview-company" htmlFor="interview-company">
        Company
        <input type="text" name="name" required placeholder="Name" id="exp-company" defaultValue={name} />
      </label>
      <label htmlFor="interview-retro" key="interview-retro">
        Description
        <HTMLEditor data={descState} name="description" onChange={handleDescChange} />
      </label>
      <input type="submit" value="Update" />
    </Form>
  ) : null;
};

const defaultProps = { id: 0, name: '', description: '' } as ExperienceDB;

export const Experiences = ({ data }: { data: ExperienceDB[] }) => {
  const [updatedExp, updateExp] = useState<ExperienceDB>(defaultProps);
  const handleUpdate = (e: React.PointerEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.value, 10);
    if (id === (updatedExp.id, 10)) {
      return;
    }
    const selected = data.find(i => i.id === id);
    if (selected) {
      updateExp({ ...selected });
    }
  };
  return (
    <>
      <ul className="root" style={{ maxWidth: '100%' }}>
        {data.map(e => (
          <Drawer closed header={e.name} key={e.id}>
            <div dangerouslySetInnerHTML={{ __html: e.description }} />
            <button aria-label={`Update ${e.name}`} onClick={handleUpdate} value={e.id}>
              Update {e.name}
            </button>
          </Drawer>
        ))}
      </ul>
      <AddForm {...updatedExp} />
    </>
  );
};
