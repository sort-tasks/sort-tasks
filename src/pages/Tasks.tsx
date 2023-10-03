import { useState } from 'react';
import { toast } from 'react-toastify';

import { Task } from 'components/Task';
import { CreateNewTask } from 'components/form/CreateNewTask';
import { ViewTaskModal } from 'components/modals/ViewTaskModal';
import { useOrderedTasksByCategoryQuery, useTaskCreateMutation } from 'generated-graphql/hooks';
import * as Types from 'generated-graphql/types';

export default function Tasks() {
  const { data, loading, error, refetch } = useOrderedTasksByCategoryQuery();
  const [createTask] = useTaskCreateMutation();
  const [completedVisibility, setCompletedVisibility] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskSelected, setTaskSelected] = useState<Types.TaskFragment | null>(null);

  const tasks = data?.orderedTasksByCategory?.data ?? [];
  const tasksFiltered = tasks.filter((task) => completedVisibility || !task.isCompleted);

  const handleSubmit = async (input: { title: string; categoryId: string }) => {
    try {
      await createTask({
        variables: {
          input,
        },
      });
      refetch();
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error('something went wrong');
        return;
      }

      toast.error(error.message);
    }
  };

  const handleTaskUpdate = async () => {
    await refetch();
  };

  const handleCheckbox = () => {
    setCompletedVisibility(!completedVisibility);
  };

  const handleTaskSelected = (task: Types.TaskFragment) => {
    setIsModalOpen(true);
    setTaskSelected(task);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskSelected(null);
  };

  return (
    <main className="mx-auto max-w-screen-sm pb-8">
      {error?.message && <p className="text-red-500">{error.message}</p>}

      <CreateNewTask onSubmit={handleSubmit} />
      <div className="mb-2 flex justify-end border-y border-dashed border-on-background/30 px-2 py-2">
        <label className="inline-flex cursor-pointer items-center space-x-1 text-sm  text-opacity-50">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border border-gray-300"
            checked={completedVisibility}
            onChange={handleCheckbox}
          />
          <span>show completed tasks</span>
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && tasksFiltered.length === 0 && <p>No tasks found.</p>}
      <div className="space-y-2">
        {tasksFiltered.map((task, index) => (
          <Task task={task} index={index + 1} key={task.id} onSelect={handleTaskSelected} />
        ))}
      </div>
      {taskSelected && (
        <ViewTaskModal
          isOpen={isModalOpen}
          task={taskSelected}
          onClose={handleCloseModal}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </main>
  );
}
