import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { IconCheckSquare, IconPencilSquare, IconSquare } from 'components/icons';
import { useTaskUpdateMutation } from 'generated-graphql/hooks';
import { TaskFragment } from 'generated-graphql/types';
import { durationToNow } from 'utils/duration';

type TaskProps = {
  index: number;
  task: TaskFragment;
};

export const Task = ({ index, task }: TaskProps) => {
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
    // alert('card clicked');
  };

  return (
    <div
      className={clsx(
        'border-y  pl-2 pr-4 p-2 flex space-x-2 items-center  hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10 sm:rounded-md sm:border-x',
        {
          'bg-gray-400 bg-opacity-10 border-gray-700': !task.isCompleted,
          'bg-gray-400 bg-opacity-5 border-gray-800 text-opacity-50': task.isCompleted,
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
        className="rounded-full w-10 h-10 inline-flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10"
      >
        {task.isCompleted ? <IconCheckSquare /> : <IconSquare />}
      </button>
      <div className="text-opacity-50 text-white text-2xl w-10 flex justify-center  border-x border-stone-700">
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
          className={clsx('text-sm text-opacity-50 text-white space-x-1', {
            'text-opacity-50': !task.isCompleted,
            'text-opacity-30': task.isCompleted,
          })}
        >
          <span>{task.category.data?.name}</span>
          <span className="text-white text-opacity-20">-</span>
          <span
            className="text-white text-opacity-30"
            title={DateTime.fromISO(task.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
          >
            {durationToNow(task.createdAt)}
          </span>
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
