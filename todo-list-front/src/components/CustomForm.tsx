import { useState } from 'react';

// library imports
import { PlusIcon } from '@heroicons/react/24/solid';

interface CustomFormProps {
  addTask: (x: string) => void;
}
const CustomForm: React.FC<CustomFormProps> = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleFormSubmit = (e:any) => {
    e.preventDefault();
    addTask(task)
    setTask("")
  }

  return (
    <form
      className="todo"
      onSubmit={handleFormSubmit}
      >
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task}
          onInput={(e:any) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Entrer la tâche"
        />
        <label
          htmlFor="task"
          className="label"
        >Entrer la tâche</label>
      </div>
      <button
        className="btn"
        aria-label="Add Task"
        type="submit"
        >
        <PlusIcon />
      </button>
    </form>
  )
}
export default CustomForm