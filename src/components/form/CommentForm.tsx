import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from 'components/form/Button';
import { DescriptionEdit } from 'components/form/fields/DescriptionEdit';
import { useTaskActivityCreateMutation } from 'generated-graphql/hooks';

type CommentFormProps = {
  taskId: string;
  onSave?: () => void;
};

export const CommentForm = ({ taskId, onSave }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [createTaskActivity] = useTaskActivityCreateMutation();

  const handleChange = (value: string) => {
    setComment(value);
  };

  const handleSave = async () => {
    try {
      await createTaskActivity({
        variables: {
          input: {
            taskId,
            action: 'COMMENT',
            description: comment,
          },
        },
      });
      setComment('');
      setShowForm(false);
      if (onSave) {
        onSave();
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('something went wrong');
        return;
      }

      toast.error(error.message);
    }
  };

  return (
    <div>
      <form>
        {showForm ? (
          <>
            <DescriptionEdit value={comment} onChange={handleChange} editModeByDefault />
            <div className="flex justify-end space-x-2 py-4">
              <Button type="button" outline onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
            </div>
          </>
        ) : (
          <button
            className="w-full cursor-pointer rounded border-0 bg-on-background bg-opacity-30 px-6 py-4 text-left hover:bg-opacity-40"
            type="button"
            onClick={() => setShowForm(true)}
          >
            Add a comment
          </button>
        )}
      </form>
    </div>
  );
};
