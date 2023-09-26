import { toast } from 'react-toastify';

import { CreateNewTask } from 'components/form/CreateNewTask';
import { Task } from 'components/Task';

import { useFindManyTaskQuery, useTaskCreateMutation } from 'generated-graphql/hooks';

export default function Tasks() {
  const { data, loading, error, refetch } = useFindManyTaskQuery();
  const [createTask] = useTaskCreateMutation();

  const tasks = data?.findManyTask?.data ?? [];

  const handleSubmit = async (input: { name: string; categoryId: string }) => {
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
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </main>
  );
}
