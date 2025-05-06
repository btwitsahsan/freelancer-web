import React from 'react';
import Collapsible from './Collapsible';
import TaskRow from './TaskRow';

interface RecentTask {
  id: number;
  title: string;
  project: string;
}

const recentsData: RecentTask[] = [
  { id: 1, title: 'The Freelancer Website Task 1', project: 'The Freelancer Website' },
  { id: 2, title: 'The Freelancer Website Task 1', project: 'The Freelancer Website' },
  { id: 3, title: 'The Freelancer Website Task 1', project: 'The Freelancer Website' },
  { id: 4, title: 'The Freelancer Website Task 1', project: 'The Freelancer Website' },
  { id: 5, title: 'The Freelancer Website Task 1', project: 'The Freelancer Website' },
  { id: 6, title: 'The Freelancer Website Task 1', project: 'The Freelancer Website' },
];

const Recents: React.FC = () => {
  return (
    <Collapsible title="Recents">
      <div className="pl-4 pr-2 flex flex-col gap-1">
        {recentsData.map((task) => (
          <TaskRow key={task.id} title={task.title} project={task.project} />
        ))}
      </div>
    </Collapsible>
  );
};

export default Recents;
