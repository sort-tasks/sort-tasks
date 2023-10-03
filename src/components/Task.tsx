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

  const isDueAtExistsAndAtPassed = !!task.dueAt && DateTime.fromISO(task.dueAt) < DateTime.now();

  const isLate = checkIsLate(task.dueAt);

  let state: 'pending' | 'completed' | 'late' = 'pending';

  if (task.isCompleted) {
    state = 'completed';
  } else if (isLate) {
    state = 'late';
  }

  return (
    <div
      className={clsx(
        'flex items-stretch space-x-2 border-y p-2 pl-2 pr-4 text-opacity-50 shadow-on-background hover:shadow active:bg-opacity-30 sm:rounded-md sm:border-x',
        {
          'border-on-background/10 bg-on-background/5 hover:bg-on-background/10': state === 'pending',
          'border-red-700/10 bg-red-500/20 hover:bg-red-500/30': state === 'late',
          'border-green-700/10 bg-green-500/20 hover:bg-green-500/30': state === 'completed',
        },
      )}
      role="button"
      onClick={handleCardClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleToggleButtonClicked}
          className="inline-flex h-10 w-10 shrink-0 basis-10 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10"
        >
          {task.isCompleted ? <IconCheckSquare /> : <IconSquare />}
        </button>
      </div>

      <div className="flex w-10 shrink-0 items-center justify-center  border-x  border-on-background/10 text-2xl  text-on-background/50">
        {index}
      </div>
      <div className="shrink">
        <h3
          className={clsx('text-base font-medium text-on-background', {
            'text-opacity-50': task.isCompleted,
          })}
        >
          {task.title}
        </h3>
        <p
          className={clsx('text-sm text-on-background text-opacity-60', {
            'text-opacity-50': !task.isCompleted,
            'text-opacity-30': task.isCompleted,
          })}
        >
          <span className="mr-1">{task.category.data?.name}</span>
          {!!task.dueAt && !task.isCompleted && (
            <>
              <span className="mr-1 text-on-background text-opacity-20">-</span>
              <span
                className={clsx('whitespace-nowrap rounded bg-opacity-40 px-2 text-xs text-on-surface', {
                  'bg-orange-500': isDueAtExistsAndAtPassed,
                  'bg-blue-500': !isDueAtExistsAndAtPassed,
                })}
                title={DateTime.fromISO(task.dueAt).toLocaleString(DateTime.DATETIME_SHORT)}
              >
                {durationToNow(task.dueAt)}
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

const checkIsLate = (dueAt?: string | null) => {
  return !!dueAt && DateTime.fromISO(dueAt) < DateTime.now();
};
