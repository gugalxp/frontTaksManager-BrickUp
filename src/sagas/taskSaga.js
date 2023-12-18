import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  addTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../actions/taskActions';

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
    return data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

const updateTaskToApi = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating task:', error);
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
    console.error('Error deleting task:', error);
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
    console.log("newTask: ", newTask)
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

function* taskSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasksSaga);
  yield takeLatest(ADD_TASK, addTaskSaga);
  yield takeLatest(UPDATE_TASK, updateTaskSaga);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
}

export default taskSaga;
