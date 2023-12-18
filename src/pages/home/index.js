import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import NewTaskModal from '../../components/NewTaskModal';
import TaskList from '../../components/Taskslist';
import EditTaskModal from '../../components/EditTaskModal';
import { connect } from 'react-redux';
import { addTask } from '../../actions/taskActions';

const Home = ({ addTask }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false); 
    };

    fetchData();
  }, []);

  const openEditModal = (task) => {
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddTask = (task) => {
    addTask(task);
    setModalVisible(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
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
      )}
      <NewTaskModal visible={modalVisible} onCancel={handleCloseModal} onAddTask={handleAddTask} />
      <EditTaskModal />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
});

export default connect(null, mapDispatchToProps)(Home);
