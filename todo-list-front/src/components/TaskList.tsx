// component import
import { ITask } from '../stores/taskSlice';
import TaskItem from './TaskItem';

// styles
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: ITask[];
  enterEditMode: (x: ITask) => void;
  deleteTask: (x: number) => void;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, enterEditMode }) => {
  return (
    <ul className={styles.tasks}>
      {tasks.map(task => (
        <TaskItem
          key={task.idTask}
          task={task}
          deleteTask={deleteTask}
          enterEditMode={enterEditMode}
        />
      ))
      }
    </ul>
  )
}
export default TaskList