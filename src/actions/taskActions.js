export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const MARK_TASK_COMPLETED = 'MARK_TASK_COMPLETED';
export const MARK_TASK_COMPLETED_SUCCESS = 'MARK_TASK_COMPLETED_SUCCESS';
export const MARK_TASK_COMPLETED_FAILURE = 'MARK_TASK_COMPLETED_FAILURE';

export const fetchTasks = () => ({ type: FETCH_TASKS });
export const fetchTasksSuccess = (tasks) => ({ type: FETCH_TASKS_SUCCESS, payload: tasks });
export const fetchTasksFailure = (error) => ({ type: FETCH_TASKS_FAILURE, payload: error });
export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const addTaskSuccess = (task) => ({ type: ADD_TASK_SUCCESS, payload: task });
export const addTaskFailure = (error) => ({ type: ADD_TASK_FAILURE, payload: error });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, payload: taskId });
export const deleteTaskSuccess = (taskId) => ({ type: DELETE_TASK_SUCCESS, payload: taskId }); // Added action for deletion success
export const deleteTaskFailure = (error) => ({ type: DELETE_TASK_FAILURE, payload: error }); // Added action for deletion failure
export const updateTask = (task) => ({ type: 'UPDATE_TASK', payload: task });
export const updateTaskSuccess = (task) => ({ type: 'UPDATE_TASK_SUCCESS', payload: task });
export const updateTaskFailure = (error) => ({ type: 'UPDATE_TASK_FAILURE', payload: error });
export const markTaskCompleted = (taskId) => ({ type: MARK_TASK_COMPLETED, payload: taskId });
export const markTaskCompletedSuccess = (taskId) => ({ type: MARK_TASK_COMPLETED_SUCCESS, payload: taskId });
export const markTaskCompletedFailure = (error) => ({ type: MARK_TASK_COMPLETED_FAILURE, payload: error });