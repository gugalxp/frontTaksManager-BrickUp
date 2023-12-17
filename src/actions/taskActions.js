// actions/taskActions.js
export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const UPDATE_TASK = 'UPDATE_TASK'; // Adicionada a action para atualização
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'; // Adicionada a action para atualização
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE'; // Adicionada a action para atualização
export const DELETE_TASK = 'DELETE_TASK';

export const fetchTasks = () => ({ type: FETCH_TASKS });
export const fetchTasksSuccess = (tasks) => ({ type: FETCH_TASKS_SUCCESS, payload: tasks });
export const fetchTasksFailure = (error) => ({ type: FETCH_TASKS_FAILURE, payload: error });
export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const addTaskSuccess = (task) => ({ type: ADD_TASK_SUCCESS, payload: task });
export const addTaskFailure = (error) => ({ type: ADD_TASK_FAILURE, payload: error });
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task }); // Adicionada a action para atualização
export const updateTaskSuccess = (task) => ({ type: UPDATE_TASK_SUCCESS, payload: task }); // Adicionada a action para atualização
export const updateTaskFailure = (error) => ({ type: UPDATE_TASK_FAILURE, payload: error }); // Adicionada a action para atualização
export const deleteTask = (taskId) => ({ type: DELETE_TASK, payload: taskId });
