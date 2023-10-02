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
          className={clsx('w-24 rounded-tl-md border  border-b-0 border-[#30363d] bg-gray-800 px-4 py-2 text-white', {
            'bg-[#0d1117]': previewVisibility,
          })}
        >
          Preview
        </button>
        <button
          onClick={() => setPreviewVisibility(false)}
          className={clsx(
            'w-24 rounded-tr-md border border-b-0 border-l-0 border-[#30363d] bg-gray-800 px-4 py-2  text-white',
            {
              'bg-[#0d1117]': !previewVisibility,
            },
          )}
        >
          Edit
        </button>
      </div>

      {previewVisibility ? (
        <MDEditor.Markdown
          source={value}
          className="min-h-[150px] whitespace-pre-wrap rounded border border-[#30363d] p-4"
          rehypePlugins={[rehypeSanitize]}
        />
      ) : (
        <MDEditor
          value={value}
          onChange={handleMDChange}
          preview="edit"
          onBlur={onBlur}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}
    </div>
  );
};
