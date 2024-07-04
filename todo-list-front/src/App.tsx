import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';
import socketIO from "./socket/SocketIoClient";
import { IReduxState } from './stores/store';
import { ITask, setListTask } from './stores/taskSlice';
import { apiClient } from './utils/apiClient';
import { BASE_URL } from './utils/constants';

function App() {

  // Redux
  const dispatch = useDispatch();
  const { listTask } = useSelector((state: IReduxState) => state.task);

  //Hooks
  const [previousFocusEl, setPreviousFocusEl] = useState<any>(null);
  const [editedTask, setEditedTask] = useState<ITask>({ idTask: 0, libTask: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Fonctions
  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl && previousFocusEl.focus();
  }

  const enterEditMode = (task: ITask) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  // Fonction asynchrone
  const addTaskB = async (libTask: string) => {
    try {
      const res = await apiClient.post(`/addTask`, { libTask });
      if (res.status) {
        // dispatch(addTask(res.data))
      }
    } catch (error) {
      console.log("🚀 ~ file: App.jsx:31 ~ addTask ~ error:", error)
    }
  }

  const deleteTaskB = async (idTask: number) => {
    try {
      const res = await apiClient.post(`/deleteTask`, { idTask });
      if (res.status) {
        // dispatch(deleteTask(res.data))
      }
    } catch (error) {
      console.log("🚀 ~ file: App.jsx:42 ~ deleteTask ~ error:", error)
    }
  }

  const updateTaskB = async (task: ITask) => {
    try {
      const res = await apiClient.post(`/updateTask`, { ...task });
      if (res.status) {
        // dispatch(updateTask(res.data))
      }
    } catch (error) {
      console.log("🚀 ~ file: App.jsx:60 ~ updateTask ~ error:", error)
    }
    closeEditMode();
  }

  const getAllTask = async () => {
    try {
      const res = await apiClient.get(`/allTask`);
      if (res.status) {
        dispatch(setListTask(res.data));
      }
    } catch (error) {
    } finally {
    }
  }

  // useEffect
  useEffect(() => {
    if (BASE_URL.length > 0) {
      socketIO.initialize();
    }
  }, [BASE_URL]);

  useEffect(() => {
    getAllTask()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Mes listes de tâche</h1>
      </header>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTaskB}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm addTask={addTaskB} />
      {TaskList.length && (
        <TaskList
          tasks={listTask}
          deleteTask={deleteTaskB}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  )
}

export default App
