  import React, { useState } from 'react';
  import { Table, Space, Button, Tag, Modal, message, Empty } from 'antd';
  import { EditOutlined, DeleteOutlined, PictureOutlined, ProfileOutlined, InboxOutlined } from '@ant-design/icons';
  import { connect } from 'react-redux';
  import { fetchTasks, deleteTask, markTaskCompleted, fetchTasksWithOutLoading } from '../actions/taskActions';
  import EditTaskModal from './EditTaskModal';

  const TaskList = ({ fetchTasksWithOutLoading, loading, tasks, error, fetchTasks, deleteTask, markTaskCompleted }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [viewImageModalVisible, setViewImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

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
        render: (text) => <div style={{ minWidth: '150px' }}>{text}</div>, 
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
        render: (_, data) => (
          <Button
            icon={<PictureOutlined />}
            onClick={() => handleViewImage(data.image)}
          >
            Ver Imagem
          </Button>
        ),
      },
      {
        title: 'Ações',
        key: 'actions',
        render: (_, data) => (
          <Space size="middle">
            <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditTask(data)}>
              Editar
            </Button>
            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(data.key)}>
              Excluir
            </Button>
            <Button
              onClick={() => handleComplete(data.key, data.status === 'Concluído')}
              style={{
                backgroundColor: data.status === 'Concluído' ? 'green' : null,
                color: data.status === 'Concluído' ? 'white' : null,
              }}
            >
              {data.status === 'Concluído' ? 'Concluído' : 'Concluir'}
            </Button>
          </Space>
        ),
      },
    ];

    const handleEditTask = (data) => {
      setEditModalVisible(true);
      setSelectedTask(data);
    };

    const handleDelete = async (key) => {
      try {
        await deleteTask(key);
        message.success('Tarefa excluída com sucesso!');
        setTimeout(() => {
          fetchTasksWithOutLoading();
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
      setSelectedTask(null);
    };

    const closeViewImageModal = () => {
      setViewImageModalVisible(false);
      setSelectedImage('');
    };

    return (
      <>
        {dataSource.length === 0 && !loading ? (
          <Empty
            image={<InboxOutlined style={{ marginTop: '33px', fontSize: 60, color: '#000000E0 ' }} />}
            description={<span>Não há tarefas para mostrar.</span>}
          />
        ) : (
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            title={() => <h2 style={{ fontSize: '25px' }}>Lista de Tarefas  <ProfileOutlined /></h2>}
            pagination={{ pageSize: 5 }}
            style={{ backgroundColor: '#fff', borderRadius: '8px' }}
            scroll={{ x: true }}
          />
        )}
        <Modal
          open={viewImageModalVisible}
          onCancel={closeViewImageModal}
          footer={null}
          width={800}
        >
          {selectedImage && <img src={`data:image/png;base64,${selectedImage}`} alt="Imagem da Tarefa" style={{ width: '100%', height: '100%' }} />}
        </Modal>
        <EditTaskModal
          visible={editModalVisible}
          onCancel={closeEditModal}
          data={selectedTask}
        />
      </>
    );
  };

  const mapStateToProps = (state) => ({
    tasks: state.tasks,
    error: state.tasks,
    loading: state.loading
  });

  const mapDispatchToProps = (dispatch) => ({
    fetchTasks: () => dispatch(fetchTasks()),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    markTaskCompleted: (taskId) => dispatch(markTaskCompleted(taskId)),
    fetchTasksWithoutLoading: () => dispatch(fetchTasksWithOutLoading())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
