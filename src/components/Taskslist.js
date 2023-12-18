import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, PictureOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchTasks, deleteTask } from '../actions/taskActions';
import EditTaskModal from './EditTaskModal';

const TaskList = ({ tasks, error, fetchTasks, deleteTask }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewImageModalVisible, setViewImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTaskKey, setSelectedTaskKey] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const dataSource = tasks
    ? tasks.map((task) => ({
        key: task.id,
        task: task.title,
        status: task.completed ? 'Concluído' : 'Pendente',
        image: task.photoPath,
      }))
    : [];

    // console.log("dataSource:", dataSource)
  const columns = [
    {
      title: 'Tarefa',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Concluído' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Imagem',
      key: 'image',
      render: (_, record) => (
        <Button
          icon={<PictureOutlined />}
          onClick={() => handleViewImage(record.image)}
        >
          Ver Imagem
        </Button>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditTask(record.key)}>
            Editar
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
            Excluir
          </Button>
          <Button icon={<CheckOutlined />} onClick={() => handleComplete(record.key)}>
            Concluir
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditTask = (key) => {
    setEditModalVisible(true);
    setSelectedTaskKey(key);
  };

  const handleDelete = async (key) => {
    try {
      await deleteTask(key);
      message.success('Tarefa excluída com sucesso!');
      setTimeout(() => {
        fetchTasks();
      }, 500);
    } catch (error) {
      message.error('Erro ao excluir tarefa.');
    }
  };
  
  const handleComplete = (key) => {
    console.log(`Concluir tarefa com a chave ${key}`);
  };

  const handleViewImage = (imageUrl) => {

    if (imageUrl) {
      setSelectedImage(imageUrl);
      setViewImageModalVisible(true);
    } else {
      message.warning('Não há imagem para exibir. Adicione uma imagem à tarefa.');
    }
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedTaskKey(null);
  };

  const closeViewImageModal = () => {
    setViewImageModalVisible(false);
    setSelectedImage('');
  };

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        title={() => <h2>Lista de Tarefas</h2>}
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
      />
      <Modal
        visible={viewImageModalVisible}
        onCancel={closeViewImageModal}
        footer={null}
        width={800}
      >
        {selectedImage && <img src="http://localhost:3000/e8d001f1-0ca2-4b00-adb4-ebf777331c3e" alt="Imagem da Tarefa" style={{ width: '100%', height: '100%' }} />}
      </Modal>
      <EditTaskModal
        visible={editModalVisible}
        onCancel={closeEditModal}
        taskKey={selectedTaskKey}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  error: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTasks: () => dispatch(fetchTasks()),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
