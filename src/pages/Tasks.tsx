import { toast } from 'react-toastify';

import { Task } from 'components/Task';
import { CreateNewTask } from 'components/form/CreateNewTask';
import { useOrderedTasksByCategoryQuery, useTaskCreateMutation } from 'generated-graphql/hooks';

export default function Tasks() {
  const { data, loading, error, refetch } = useOrderedTasksByCategoryQuery();
  const [createTask] = useTaskCreateMutation();

  const tasks = data?.orderedTasksByCategory?.data ?? [];

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

  return (
    <main className="max-w-screen-sm mx-auto">
      {error?.message && <p className="text-red-500">{error.message}</p>}

      <CreateNewTask onSubmit={handleSubmit} />

      {loading && <p>Loading...</p>}
      {!loading && tasks.length === 0 && <p>No tasks found.</p>}
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <Task task={task} index={index + 1} key={task.id} />
        ))}
      </div>
    </main>
  );
}
