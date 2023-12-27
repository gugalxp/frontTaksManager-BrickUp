import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  MARK_TASK_COMPLETED,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  addTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
  markTaskCompletedSuccess,
  markTaskCompletedFailure,
  FETCH_TASKS_LOADING,
} from '../actions/taskActions';

const API_BASE_URL = 'http://localhost:8080';

const fetchTasksFromApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const addTaskToApi = async (task) => {

  try {
    const formData = new FormData();

    formData.append('title', task.title);
    formData.append('completed', task.completed);
    formData.append('photoPath', task.photoPath);

    const response = await fetch(`${API_BASE_URL}/tasks/tasks`, {
      method: 'POST',
      body: formData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const updateTaskToApi = async (task) => {

  try {
    const formData = new FormData();

    formData.append('title', task.title);
    formData.append('completed', task.completed);
    formData.append('photoPath', task.photoPath);

    const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: 'PUT',
      body: formData,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const deleteTaskFromApi = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const markTaskCompletedInApi = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/modifyStatus/${taskId}`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

function* fetchTasksSaga() {
  try {

    yield put({ type: FETCH_TASKS_LOADING, payload: true });
    const tasks = yield call(fetchTasksFromApi);
    yield put({ type: FETCH_TASKS_LOADING, payload: false });
    yield put(fetchTasksSuccess(tasks));

  } catch (error) {
    yield put({ type: FETCH_TASKS_LOADING, payload: false });
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

function* updateTaskSaga(action) {
  try {
    const updatedTask = yield call(updateTaskToApi, action.payload);
    yield put(updateTaskSuccess(updatedTask));
  } catch (error) {
    yield put(updateTaskFailure(error.message || 'Erro ao atualizar tarefa.'));
  }
}

function* deleteTaskSaga(action) {
  try {
    const deletedTaskId = yield call(deleteTaskFromApi, action.payload);
    yield put(deleteTaskSuccess(deletedTaskId));
  } catch (error) {
    yield put(deleteTaskFailure(error.message || 'Erro ao excluir tarefa.'));
  }
}

function* markTaskCompletedSaga(action) {
  try {
    const markedTaskId = yield call(markTaskCompletedInApi, action.payload);
    yield put(markTaskCompletedSuccess(markedTaskId));
  } catch (error) {
    yield put(markTaskCompletedFailure(error.message || 'Erro ao marcar tarefa como concluída.'));
  }
}

function* taskSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasksSaga);
  yield takeLatest(ADD_TASK, addTaskSaga);
  yield takeLatest(UPDATE_TASK, updateTaskSaga);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
  yield takeLatest(MARK_TASK_COMPLETED, markTaskCompletedSaga);
}

export default taskSaga;
