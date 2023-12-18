import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Tag, Modal, message, Empty } from 'antd';
import { EditOutlined, DeleteOutlined, PictureOutlined, ProfileOutlined, InboxOutlined  } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchTasks, deleteTask, markTaskCompleted } from '../actions/taskActions';
import EditTaskModal from './EditTaskModal';

const TaskList = ({ tasks, error, fetchTasks, deleteTask, markTaskCompleted }) => {
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
          <Button
            onClick={() => handleComplete(record.key, record.status === 'Concluído')}
            style={{
              backgroundColor: record.status === 'Concluído' ? 'green' : null,
              color: record.status === 'Concluído' ? 'white' : null,
            }}
          >
            {record.status === 'Concluído' ? 'Concluído' : 'Concluir'}
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

  const handleComplete = (key, isCompleted) => {
    if (!isCompleted) {
      markTaskCompleted(key);
      setTimeout(() => {
        fetchTasks();
      }, 500);
      message.success('Tarefa marcada como concluída!');
    } else {
      message.warning('Esta tarefa já está concluída.');
    }
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
      {dataSource.length === 0 ? (
      <Empty
        image={<InboxOutlined style={{  marginTop: '33px', fontSize: 60, color: '#000000E0 ' }} />}
        description={<span>Não há tarefas para mostrar.</span>}
      />
    ) : (
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        title={() => <h2 style={{ fontSize: '25px' }}>Lista de Tarefas  <ProfileOutlined/></h2>}
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
      />
    )}
      <Modal
        visible={viewImageModalVisible}
        onCancel={closeViewImageModal}
        footer={null}
        width={800}
      >
        {selectedImage && <img src={selectedImage} alt="Imagem da Tarefa" style={{ width: '100%', height: '100%' }} />}
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
  markTaskCompleted: (taskId) => dispatch(markTaskCompleted(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
