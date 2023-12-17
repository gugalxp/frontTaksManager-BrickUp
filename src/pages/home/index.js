import React, { useState } from 'react';
import { Button } from 'antd';
import NewTaskModal from '../../components/NewTaskModal';
import TaskList from '../../components/Taskslist';
import EditTaskModal from '../../components/EditTaskModal';
import { connect } from 'react-redux';
import { addTask } from '../../actions/taskActions'; // Importe sua ação de adição de tarefa

const Home = ({ addTask }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const openEditModal = (task) => {
    setTaskToEdit(task);
    handleOpenModal(); // Abre o modal quando a tarefa é editada
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddTask = (task) => {
    console.log("ADDTASK: ", task)
    // Dispara a ação addTask com os dados da nova tarefa
    addTask(task);
    setModalVisible(false); // Fecha o modal após adicionar a tarefa
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{
        minWidth: '50%',
        maxWidth: '80%',
        minHeight: '50vh',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Button
            type="primary"
            onClick={handleOpenModal}
          >
            Adicionar Tarefa
          </Button>
        </div>
        <TaskList onEditTask={openEditModal} />
      </div>
      <NewTaskModal visible={modalVisible} onCancel={handleCloseModal} onAddTask={handleAddTask} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
});

export default connect(null, mapDispatchToProps)(Home);
