import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

import { Button } from 'components/form/Button';

import './react-md-editor.css';

type DescriptionEditProps = {
  value: string;
  editModeByDefault?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export const DescriptionEdit = ({ value, onChange, onBlur, editModeByDefault = false }: DescriptionEditProps) => {
  const [editMode, setEditMode] = useState(editModeByDefault);
  const [previewVisibility, setPreviewVisibility] = useState(false);

  const handleMDChange = (newValue: string | undefined) => {
    onChange(newValue ?? '');
  };

  const handleOnSave = () => {
    setEditMode(false);
    setPreviewVisibility(false);
    onBlur?.();
  };

  if (!editMode) {
    return (
      <div className="space-y-4">
        <MDEditor.Markdown
          source={value}
          className="bg-background min-h-[200px] whitespace-pre-wrap rounded border-0 bg-transparent "
          rehypePlugins={[rehypeSanitize]}
        />

        <Button type="button" onClick={() => setEditMode(true)} outline>
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative z-20 translate-y-[1px] pl-1">
        <Tab
          type="button"
          onClick={() => setPreviewVisibility(false)}
          className={clsx({
            'border-b-[#5A575A] bg-[#454346]': previewVisibility,
            ' border-b-[#322F32] bg-[#322F32]': !previewVisibility,
          })}
        >
          Write
        </Tab>
        <Tab
          type="button"
          onClick={() => setPreviewVisibility(true)}
          className={clsx({
            'border-b-[#5A575A] bg-[#454346]': !previewVisibility,
            ' border-b-transparent bg-[#322F32]': previewVisibility,
          })}
        >
          Preview
        </Tab>
      </div>

      {previewVisibility ? (
        <div onClick={() => setPreviewVisibility(false)}>
          <MDEditor.Markdown
            source={value}
            className="bg-background min-h-[200px] whitespace-pre-wrap rounded border border-on-background/50  bg-on-background/10 p-4"
            rehypePlugins={[rehypeSanitize]}
          />
        </div>
      ) : (
        <MDEditor
          value={value}
          onChange={handleMDChange}
          preview="edit"
          autoFocus
          className="relative z-10 border border-on-background/30 bg-transparent shadow-none"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}

      {!editModeByDefault && (
        <div className="flex justify-end space-x-2 py-4">
          <Button type="button" outline onClick={() => setEditMode(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleOnSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export const Tab = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={clsx(
      'w-20 border  border-[#5A575A]  px-2 py-2 text-sm text-on-background first-of-type:rounded-tl first-of-type:border-r-0 last-of-type:rounded-tr',
      className,
    )}
  />
);
