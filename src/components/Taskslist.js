import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Tag, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, PictureOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/taskActions';

const TaskList = ({ tasks, error, fetchTasks }) => {
  console.log('Tasks from Redux:', tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const dataSource = tasks ? tasks.map((task) => ({
    key: task.id,
    task: task.title,
    status: task.completed ? 'Concluído' : 'Pendente',
    image: task.photoPath,
  })) : [];
  
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
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record.key)}>
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

  const handleEdit = (key) => {
    console.log(`Editar tarefa com a chave ${key}`);
  };

  const handleDelete = (key) => {
    console.log(`Excluir tarefa com a chave ${key}`);
  };

  const handleComplete = (key) => {
    console.log(`Concluir tarefa com a chave ${key}`);
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
      >
        {selectedImage && <img src={selectedImage} alt="Imagem da Tarefa" style={{ width: '100%', height: '100%' }} />}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  error: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTasks: () => dispatch(fetchTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);