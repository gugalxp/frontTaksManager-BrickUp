// sagas/taskSaga.js
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_TASKS,
  ADD_TASK,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  addTaskFailure,
} from '../actions/taskActions';

// Utilize o endpoint correto do seu serviço Java
const API_BASE_URL = 'http://localhost:8080';

const fetchTasksFromApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

const addTaskToApi = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    console.log("fetchTasksSaga:", data)
    return data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

function* fetchTasksSaga() {
  try {
    const tasks = yield call(fetchTasksFromApi);
    yield put(fetchTasksSuccess(tasks));
  } catch (error) {
    yield put(fetchTasksFailure(error.message || 'Erro ao obter tarefas.'));
  }
}

function* addTaskSaga(action) {
  try {
    const newTask = yield call(addTaskToApi, action.payload);
    yield put(addTaskSuccess(newTask));
  } catch (error) {
    yield put(addTaskFailure(error.message || 'Erro ao adicionar tarefa.'));
  }
}

function* taskSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasksSaga);
  yield takeLatest(ADD_TASK, addTaskSaga);
}

export default taskSaga;
