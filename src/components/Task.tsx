import { IconSquare, IconPencilSquare } from 'components/icons';
import { TaskFragment } from 'generated-graphql/types';

type TaskProps = {
  task: TaskFragment;
};

export const Task = ({ task }: TaskProps) => {
  console.log(task);
  const handleToggleButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    alert('toggle clicked');
  };

  const handleCardClicked = () => {
    // alert('card clicked');
  };

  return (
    <div
      className="border-y border-gray-700 pl-2 pr-4 p-2 flex space-x-2 items-center bg-gray-400  hover:bg-gray-100 bg-opacity-10 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10 sm:rounded-md sm:border-x"
      role="button"
      onClick={handleCardClicked}
    >
      <button
        type="button"
        onClick={handleToggleButtonClicked}
        className="rounded-full w-10 h-10 inline-flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 active:bg-gray-500 active:bg-opacity-10"
      >
        <IconSquare />
      </button>
      <div className="flex-grow">
        <h3 className="w-full text-base">{task.name}</h3>
        <p className="text-sm text-opacity-50 text-white">{task.category.data?.name}</p>
      </div>
      <div>
        <IconPencilSquare />
      </div>
    </div>
  );
};
