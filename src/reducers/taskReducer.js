import {
  ADD_TASK,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_LOADING,
  MARK_TASK_COMPLETED_SUCCESS,
} from '../actions/taskActions';

const initialState = {
  tasks: [],
  loading: false,
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
      return state;
      case FETCH_TASKS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_TASKS_SUCCESS:
    return {
        ...state,
        tasks: action.payload,
        loading: false,
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
