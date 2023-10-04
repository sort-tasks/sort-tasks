import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { DateTimePicker } from 'components/DateTimePicker';
import { Button } from 'components/form/Button';
import { CategorySelect } from 'components/form/CategorySelect';
import { DescriptionEdit } from 'components/form/fields/DescriptionEdit';
import { IconCheckSquare, IconSquare } from 'components/icons';
import { Comments } from 'components/modals/Comments';
import { TaskActivities } from 'components/modals/TaskActivities';
import { useFindUniqueTaskQuery, useTaskUpdateMutation } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';

import { ModalWrapper } from './ModalWrapper';

type ViewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdate?: () => void;
  task: Types.TaskFragment;
};

type TaskFormProps = {
  task: Types.TaskCompletedFragment;
  onTaskUpdate?: () => void;
  onClose?: () => void;
};

const TaskForm = ({ task, onTaskUpdate, onClose }: TaskFormProps) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description ?? '',
    categoryId: task.categoryId,
    isCompleted: task.isCompleted,
    dueAt: task.dueAt ?? '',
  });

  const [updateTask, { loading }] = useTaskUpdateMutation();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleFieldChange = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const requestUpdateTask = async (input: Partial<Types.TaskUpdateInput>) => {
    try {
      await updateTask({
        variables: {
          taskId: task.id,
          input: {
            title: form.title,
            categoryId: form.categoryId,
            description: form.description,
            isCompleted: form.isCompleted,
            dueAt: form.dueAt ? form.dueAt : null,
            ...input,
          },
        },
      });
      if (onTaskUpdate) {
        onTaskUpdate();
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('something went wrong');
        return;
      }

      toast.error(error.message);
    }
  };

  const handleTaskUpdate = async () => {
    await requestUpdateTask({});
  };

  const handleToggleCompleteTaskUpdate = async () => {
    const isCompleted = !form.isCompleted;
    setForm({
      ...form,
      isCompleted,
    });
    await requestUpdateTask({
      isCompleted,
    });
  };

  const handleChangeCategory = async (categoryId: string) => {
    if (categoryId) {
      setForm({
        ...form,
        categoryId,
      });

      await requestUpdateTask({
        categoryId: categoryId,
      });
    }
  };

  const handleDueDateTime = async (date: Date | null) => {
    setForm({
      ...form,
      dueAt: date ? date.toISOString() : '',
    });

    await requestUpdateTask({
      dueAt: date ? date.toISOString() : null,
    });
  };

  const inputClassName = clsx(
    'inline-flex rounded  border border-transparent bg-transparent py-3 text-on-background  outline-none hover:border-on-background/20 hover:bg-on-background/5 focus:border-on-background/20 focus:bg-on-background/10 focus:px-4',
  );

  const handleSaveComment = () => {
    onTaskUpdate?.();
  };

  // const completedAt = taskData?.findUniqueTask?.data?.completedAt;

  return (
    <div className="min-h-[400px]">
      <div className="flex justify-between px-4 py-4">
        <span className="text-xs">id: {task.id}</span>

        <Button type="button" onClick={onClose} disabled={loading}>
          close
        </Button>
      </div>
      <div className="mb-8 flex flex-col space-y-4 divide-y divide-on-background/30 px-4 py-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:divide-x sm:divide-y-0 ">
        <div className="grow">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            onBlur={handleTaskUpdate}
            placeholder="title here"
            disabled={loading}
            className={clsx('w-full text-2xl font-bold', inputClassName)}
          />

          <div>
            <h3 className="mb-2 mt-4 border-b border-on-background/30 py-2 font-medium ">Details</h3>
            <DescriptionEdit
              value={form.description}
              onChange={handleFieldChange('description')}
              onBlur={handleTaskUpdate}
            />
            <Comments task={task} onSave={handleSaveComment} />
            <TaskActivities task={task} />
          </div>
        </div>
        <div className="flex flex-col pt-4 sm:w-72 sm:pl-4 sm:pt-0">
          <div className="mb-4 border-b border-dashed border-on-background/30 pb-4">
            <Button type="button" className="space-x-2" disabled={loading} onClick={handleToggleCompleteTaskUpdate}>
              {form.isCompleted ? (
                <>
                  <IconCheckSquare />
                  <span>completed</span>
                </>
              ) : (
                <>
                  <IconSquare />
                  <span>not completed</span>
                </>
              )}
            </Button>
          </div>
          <div className="mb-2 ">
            <p className="mb-2 cursor-help text-on-background/70 underline" title={task.dueAt ? task.dueAt : undefined}>
              due at:
            </p>
            <DateTimePicker
              value={form.dueAt ? new Date(form.dueAt) : null}
              onChange={handleDueDateTime}
              disabled={loading}
            />
          </div>
          <div className="mb-2">
            <p className="mb-2 text-on-background/70">category:</p>

            <CategorySelect categoryId={task.categoryId} onChange={handleChangeCategory} disabled={loading} />
          </div>
          <p className="mb-2 inline-flex space-x-2">
            <span className="text-on-background/70">Category ordering:</span>
            <span className="font-bold">{task.category?.data?.ordering}</span>
          </p>

          <p className="mb-2 inline-flex space-x-2">
            <span className="text-on-background/70">created at:</span>

            <span className="cursor-help font-bold underline" title={task.createdAt ? task.createdAt : undefined}>
              {DateTime.fromISO(task.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
            </span>
          </p>
          <p className="mb-2 inline-flex space-x-2">
            <span className="text-on-background/70">updated at:</span>

            <span className="cursor-help font-bold underline" title={task.updatedAt ? task.updatedAt : undefined}>
              {DateTime.fromISO(task.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}
            </span>
          </p>
          <p className="mb-2 inline-flex space-x-2">
            <span className="text-on-background/70">completed at:</span>

            <span className="cursor-help font-bold underline" title={task.completedAt ? task.completedAt : undefined}>
              {task.completedAt ? DateTime.fromISO(task.completedAt).toLocaleString(DateTime.DATETIME_SHORT) : 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

type LoadingTaskWrapperProps = {
  task: Types.TaskFragment;
  onTaskUpdate?: () => void;
  onClose?: () => void;
};

const LoadingTaskWrapper = ({ task, onTaskUpdate, onClose }: LoadingTaskWrapperProps) => {
  const {
    data: taskData,
    loading,
    error,
    refetch,
  } = useFindUniqueTaskQuery({
    variables: {
      taskId: task.id,
    },
  });

  if (loading) {
    return (
      <div className="flex h-64 flex-grow items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-on-background"></div>
      </div>
    );
  }

  if (error || !taskData?.findUniqueTask?.data) {
    return (
      <div className="flex h-64 flex-grow items-center justify-center p-10">
        <div className="bg-error rounded px-6 py-4 text-on-error">{error?.message ?? 'no task found'}</div>
      </div>
    );
  }

  const handleOnTaskUpdate = () => {
    refetch();
    onTaskUpdate?.();
  };

  return <TaskForm task={taskData.findUniqueTask.data} onTaskUpdate={handleOnTaskUpdate} onClose={onClose} />;
};

export const ViewTaskModal = ({ isOpen, onClose, onTaskUpdate, task }: ViewTaskModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onClose}>
      <LoadingTaskWrapper task={task} onTaskUpdate={onTaskUpdate} onClose={onClose} />
    </ModalWrapper>
  );
};
