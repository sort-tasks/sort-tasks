import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { DateTimePicker } from 'components/DateTimePicker';
import { Button } from 'components/form/Button';
import { CategorySelect } from 'components/form/CategorySelect';
import { IconCheckSquare, IconSquare } from 'components/icons';
import { useTaskUpdateMutation } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';

Modal.setAppElement('#root');

type ViewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdate?: () => void;
  task: Types.TaskFragment;
};

export const ViewTaskModal = ({ isOpen, onClose, onTaskUpdate, task }: ViewTaskModalProps) => {
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
      completedAt: isCompleted ? DateTime.now().toISO() : null,
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
    'inline-flex rounded  border border-transparent bg-transparent px-2 py-1  text-white outline-none hover:border-gray-800 hover:bg-gray-800 focus:border-gray-600 focus:bg-gray-700',
  );

  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onClose}>
      <div className="min-h-[400px]">
        <div className="flex justify-between px-4 py-4">
          <span className="text-xs">id: {task.id}</span>

          <Button type="button" onClick={onClose} disabled={loading}>
            close
          </Button>
        </div>
        <div className="mb-8 flex flex-col space-y-4 divide-y px-4  py-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:divide-x sm:divide-y-0 ">
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
              <h3 className="ml-2 mt-4 py-2">Details</h3>
              <textarea
                className={clsx('w-full text-base ', inputClassName)}
                name="description"
                onChange={handleFormChange}
                onBlur={handleTaskUpdate}
                disabled={loading}
                placeholder="description here"
              >
                {task.description}
              </textarea>
            </div>
          </div>
          <div className="flex flex-col pt-4 sm:w-72 sm:pl-4 sm:pt-0">
            <div className="mb-4 border-b border-dashed border-gray-500 pb-4">
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
            <div className="mb-2 text-black">
              <p className="mb-2 cursor-help text-gray-400 underline" title={task.dueAt ? task.dueAt : undefined}>
                due at:
              </p>
              <DateTimePicker
                value={form.dueAt ? new Date(form.dueAt) : null}
                onChange={handleDueDateTime}
                disabled={loading}
              />
            </div>
            <div className="mb-2">
              <p className="mb-2 text-gray-400">category:</p>

              <CategorySelect categoryId={task.categoryId} onChange={handleChangeCategory} disabled={loading} />
            </div>
            <p className="mb-2 inline-flex space-x-2">
              <span className="text-gray-400">Category ordering:</span>
              <span className="font-bold">{task.category?.data?.ordering}</span>
            </p>

            <p className="mb-2 inline-flex space-x-2">
              <span className="text-gray-400">created at:</span>

              <span className="cursor-help font-bold underline" title={task.createdAt ? task.createdAt : undefined}>
                {DateTime.fromISO(task.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
              </span>
            </p>
            <p className="mb-2 inline-flex space-x-2">
              <span className="text-gray-400">updated at:</span>

              <span className="cursor-help font-bold underline" title={task.updatedAt ? task.updatedAt : undefined}>
                {DateTime.fromISO(task.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}
              </span>
            </p>
            <p className="mb-2 inline-flex space-x-2">
              <span className="text-gray-400">completed at:</span>

              <span className="cursor-help font-bold underline" title={task.completedAt ? task.completedAt : undefined}>
                {task.completedAt ? DateTime.fromISO(task.completedAt).toLocaleString(DateTime.DATETIME_SHORT) : 'N/A'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

type ModalWrapperProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose?: () => void;
};

export const ModalWrapper = ({ children, isOpen, onRequestClose }: ModalWrapperProps) => {
  const overlayClassName = clsx('fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40');
  const contentClassName = clsx(
    'mt-20 w-full max-w-screen-lg border-y  border-gray-700 bg-gray-900 md:mx-4 md:rounded-2xl md:border-x',
  );
  return (
    <Modal
      isOpen={isOpen}
      className={contentClassName}
      overlayClassName={overlayClassName}
      shouldCloseOnOverlayClick
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  );
};

//
