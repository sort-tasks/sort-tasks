import { capitalize } from 'lodash';
import { DateTime } from 'luxon';

import * as Types from 'generated-graphql/types';

type TaskActivitiesProps = {
  task: Types.TaskCompletedFragment;
};

export const TaskActivities = ({ task }: TaskActivitiesProps) => {
  const activities = task.activity?.data ?? [];

  return (
    <div className="mt-8">
      <div className="my-4 border-b border-on-background/30 pb-2 font-medium">Activities</div>
      <div className="space-y-8">
        {activities.map((activity) => {
          if (activity.action === 'COMMENT') {
            return null;
          }
          return (
            <div key={activity.id}>
              <h4 className="mb-2  font-medium">
                {!!activity.description && <>{activity.description} - </>}
                <span className="rounded bg-on-surface/50 px-1 text-xs font-medium text-surface">
                  {capitalize(activity.action)}
                </span>{' '}
                at{' '}
                <span title={activity.createdAt}>
                  {DateTime.fromISO(activity.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
                </span>
              </h4>

              <div className="flex space-x-2 text-sm">
                <div>{formatChange(activity.before)}</div>
                <div>{'->'}</div>
                <div>{formatChange(activity.after)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const formatChange = (change?: string | null) => {
  if (!change) {
    return 'None';
  }

  const data = checkIfStringIsObjectIfYesReturnObject(change);

  if (data === null) {
    return 'None';
  }

  const entries = Object.entries(data);

  if (entries.length === 0) {
    return 'Internal Change';
  }

  return (
    <>
      {entries.map(([key, value], index) => {
        if (DateTime.fromISO(value).isValid) {
          return (
            <div key={index}>
              <span className="text-on-background/50">{key}:</span>{' '}
              {DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)}
            </div>
          );
        }
        if (typeof value === 'boolean') {
          return (
            <div key={index}>
              <span className="text-on-background/50">{key}:</span> {value ? 'True' : 'False'}
            </div>
          );
        }
        return (
          <div key={index}>
            <span className="text-on-background/50">{key}:</span> {value ?? 'None'}
          </div>
        );
      })}
    </>
  );
};

const checkIfStringIsObjectIfYesReturnObject = (string: string): object | null => {
  try {
    const data = JSON.parse(string);
    if (typeof data === 'object' && data !== null) {
      return data;
    }

    return null;
  } catch (error) {
    return null;
  }
};
