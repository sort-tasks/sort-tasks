import MDEditor from '@uiw/react-md-editor';
import { DateTime } from 'luxon';
import rehypeSanitize from 'rehype-sanitize';

import { CommentForm } from 'components/form/CommentForm';
import * as Types from 'generated-graphql/types';

type CommentsProps = {
  task: Types.TaskCompletedFragment;
  onSave?: () => void;
};

export const Comments = ({ task, onSave }: CommentsProps) => {
  const activities = task.activity?.data ?? [];
  const comments = activities.filter((activity) => activity.action === 'COMMENT');

  return (
    <div className="mt-8">
      <div className="my-4 font-medium">Comments</div>
      <div className="space-y-8">
        <div className="space-y-4">
          {comments.map((activity) => {
            return (
              <div key={activity.id}>
                <h4 className="mb-2 text-xs font-medium">
                  <span title={activity.createdAt}>
                    {DateTime.fromISO(activity.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
                  </span>
                </h4>
                <div className="text-base">
                  <MDEditor.Markdown
                    source={activity.description ?? ''}
                    className="bg-background  whitespace-pre-wrap rounded border-0 bg-transparent "
                    rehypePlugins={[rehypeSanitize]}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <CommentForm taskId={task.id} onSave={onSave} />
      </div>
    </div>
  );
};
