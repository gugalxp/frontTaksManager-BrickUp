// reducers/taskReducer.js
import {
  ADD_TASK,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  MARK_TASK_COMPLETED_SUCCESS, // Adicionada ação para marcar tarefa como concluída
} from '../actions/taskActions'; // Verifique se o caminho está correto

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK_SUCCESS:
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case DELETE_TASK_FAILURE:
      // Handle failure, you may want to log an error or show a notification
      return state;
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    case MARK_TASK_COMPLETED_SUCCESS:
      const markedCompletedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: true } : task
      );
      return {
        ...state,
        tasks: markedCompletedTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;
