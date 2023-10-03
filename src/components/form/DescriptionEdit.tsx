import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

type DescriptionEditProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export const DescriptionEdit = ({ value, onChange, onBlur }: DescriptionEditProps) => {
  const [previewVisibility, setPreviewVisibility] = useState(true);

  const handleMDChange = (newValue: string | undefined) => {
    onChange(newValue ?? '');
  };

  return (
    <div>
      <div className="pl-1">
        <button
          onClick={() => setPreviewVisibility(true)}
          className={clsx(
            'w-24 rounded-tl-md border  border-b-0 border-on-background/30 bg-on-background/10 px-4 py-2 text-on-background',
            {
              'bg-on-background/20': previewVisibility,
            },
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setPreviewVisibility(false)}
          className={clsx(
            'w-24 rounded-tr-md border border-b-0 border-l-0 border-on-background/30 bg-on-background/10 px-4 py-2  text-on-background',
            {
              'bg-on-background/20': !previewVisibility,
            },
          )}
        >
          Edit
        </button>
      </div>

      {previewVisibility ? (
        <MDEditor.Markdown
          source={value}
          className="bg-background min-h-[200px] whitespace-pre-wrap rounded border border-on-background/50 p-4"
          rehypePlugins={[rehypeSanitize]}
        />
      ) : (
        <MDEditor
          value={value}
          onChange={handleMDChange}
          preview="edit"
          onBlur={onBlur}
          className="border border-on-background/30 bg-on-background/10"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}
    </div>
  );
};
