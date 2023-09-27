import { useState } from 'react';
import { toast } from 'react-toastify';

import { Task } from 'components/Task';
import { CreateNewTask } from 'components/form/CreateNewTask';
import { useOrderedTasksByCategoryQuery, useTaskCreateMutation } from 'generated-graphql/hooks';

export default function Tasks() {
  const { data, loading, error, refetch } = useOrderedTasksByCategoryQuery();
  const [createTask] = useTaskCreateMutation();
  const [completedVisibility, setCompletedVisibility] = useState(false);

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

  const handleCheckbox = () => {
    setCompletedVisibility(!completedVisibility);
  };

  return (
    <main className="mx-auto max-w-screen-sm">
      {error?.message && <p className="text-red-500">{error.message}</p>}

      <CreateNewTask onSubmit={handleSubmit} />
      <div className="mb-2 flex justify-end border-y border-dashed border-gray-700 px-2 py-2">
        <label className="inline-flex cursor-pointer items-center space-x-1 text-sm text-white text-opacity-50">
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
          <Task task={task} index={index + 1} key={task.id} />
        ))}
      </div>
    </main>
  );
}
