import Calendar from "./Components/Calendar";
import { ITask } from "./Interfaces/ITask";
import { useEffect, useState } from "react";
import { createTask, fetchTasks } from "./Services";
import styles from "./App.module.css";
import BlurredModal from "./Components/BlurredModal";
import CreateTaskForm from "./Components/CreateTaskForm";
import TaskList from "./Components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();

      tasksFromServer.forEach((task) => {
        if (!task.end) {
          task.end = new Date();
        }
      });

      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateTask = async (task: string, description: string) => {
    try {
      const newTask = await createTask(task, description);
      setTasks([...tasks, newTask]);

      handleCloseModal();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <Calendar tasks={tasks} />
      </div>
      <TaskList
        tasks={tasks}
        onCreateTaskClick={handleShowModal}
        setTasks={setTasks}
      />
      {showModal && (
        <BlurredModal handleClose={handleCloseModal} title={"Create Task"}>
          <CreateTaskForm
            onSubmit={(task) => handleCreateTask(task.title, task.description)}
          />
        </BlurredModal>
      )}
    </div>
  );
};

export default App;
