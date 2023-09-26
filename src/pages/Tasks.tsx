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
    <main className="max-w-screen-sm mx-auto">
      {error?.message && <p className="text-red-500">{error.message}</p>}

      <CreateNewTask onSubmit={handleSubmit} />
      <div className="border-y border-dashed border-gray-700 py-2 mb-2 flex justify-end px-2">
        <label className="text-sm text-white text-opacity-50 space-x-1 inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 border border-gray-300 rounded"
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
