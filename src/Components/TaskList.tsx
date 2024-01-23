import { ListGroup, Button } from "react-bootstrap";
import { ITask } from "../Interfaces/ITask";
import { removeTask, setTaskStatus } from "../Services";
import BlurredModal from "./BlurredModal";
import { TaskStatusEnum } from "../Interfaces/task-status.enum";
import { useState } from "react";

interface ITaskListProps {
  tasks: ITask[];
  onCreateTaskClick: () => void;
  setTasks: (tasks: ITask[]) => void;
}

const TaskList: React.FC<ITaskListProps> = ({
  tasks,
  onCreateTaskClick,
  setTasks,
}) => {
  const [status, setStatus] = useState<TaskStatusEnum>(TaskStatusEnum.DONE);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (taskId: string) => {
    const sure = window.confirm("Are you sure you want to delete this task?");
    if (sure) {
      const removeResult = await removeTask(taskId);
      if (removeResult) {
        alert("Task was deleted successfully");

        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleSetStatus = async (taskId: string) => {
    console.log(taskId, status);

    const sure = window.confirm("Are you sure you want to update status?");
    if (!sure) {
      return;
    }

    const updateResult = await setTaskStatus(taskId, status);
    if (updateResult) {
      alert("Task status was updated successfully");

      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            task.status = status;
          }
          return task;
        })
      );

      setShowModal(false);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <ListGroup
        style={{
          width: "50%",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <Button onClick={onCreateTaskClick}>Create Task</Button>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Статус: {task.status}</p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(task.id)}
              >
                Remove
              </Button>
              <Button
                variant="primary"
                size="sm"
                // onClick={() => handleChange(task.id)}
              >
                Change
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
              >
                Set status
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {showModal && (
        <BlurredModal
          handleClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          title={"Set task status"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <select
              key={status}
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value as TaskStatusEnum)}
            >
              {Object.values(TaskStatusEnum).map((stat) => (
                <option>{stat}</option>
              ))}
            </select>
            <Button
              variant="primary"
              onClick={() => handleSetStatus(selectedTask!.id)}
            >
              Save
            </Button>
          </div>
        </BlurredModal>
      )}
    </>
  );
};

export default TaskList;
