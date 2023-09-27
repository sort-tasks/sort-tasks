import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { IconCheckSquare, IconPencilSquare, IconSquare } from 'components/icons';
import { useTaskUpdateMutation } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';
import { durationToNow } from 'utils/duration';

type TaskProps = {
  index: number;
  task: Types.TaskFragment;
  onSelect: (task: Types.TaskFragment) => void;
};

export const Task = ({ index, task, onSelect }: TaskProps) => {
  const [updateTask] = useTaskUpdateMutation();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleButtonClicked = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    try {
      await updateTask({
        variables: {
          taskId: task.id,
          input: {
            title: task.title,
            categoryId: task.categoryId,
            isCompleted: !task.isCompleted,
          },
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('something went wrong');
        return;
      }

      toast.error(error.message);
    }
  };

  const handleCardClicked = () => {
    onSelect(task);
  };

  return (
    <div
      className={clsx(
        'flex  items-center space-x-2 border-y p-2 pl-2 pr-4  hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10 sm:rounded-md sm:border-x',
        {
          'border-gray-700 bg-gray-400 bg-opacity-10': !task.isCompleted,
          'border-gray-800 bg-gray-400 bg-opacity-5 text-opacity-50': task.isCompleted,
        },
      )}
      role="button"
      onClick={handleCardClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={handleToggleButtonClicked}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10"
      >
        {task.isCompleted ? <IconCheckSquare /> : <IconSquare />}
      </button>
      <div className="flex w-10 justify-center border-x border-stone-700 text-2xl  text-white text-opacity-50">
        {index}
      </div>
      <div className="flex-grow">
        <h3
          className={clsx('w-full text-base text-white', {
            'text-opacity-50': task.isCompleted,
          })}
        >
          {task.title}
        </h3>
        <p
          className={clsx('space-x-1 text-sm text-white text-opacity-50', {
            'text-opacity-50': !task.isCompleted,
            'text-opacity-30': task.isCompleted,
          })}
        >
          <span>{task.category.data?.name}</span>
          {task.dueAt && (
            <>
              <span className="text-white text-opacity-20">-</span>
              <span
                className="text-white text-opacity-30"
                title={DateTime.fromISO(task.dueAt).toLocaleString(DateTime.DATETIME_SHORT)}
              >
                {durationToNow(task.dueAt)} late
              </span>
            </>
          )}
        </p>
      </div>
      <div
        className={clsx({
          'opacity-0': !isHovered,
          'opacity-100': isHovered,
        })}
      >
        <IconPencilSquare />
      </div>
    </div>
  );
};
