import React, { useState } from 'react';
import { Modal, Button, Input, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addTask, fetchTasks } from '../actions/taskActions';

const { Option } = Select;

const NewTaskModal = ({ visible, onCancel, addTask, fetchTasks }) => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [modalKey, setModalKey] = useState(null);

  const handleAddTask = async () => {
    if (!title) {
      message.error('Por favor, insira uma descrição para a tarefa.');
      return;
    }

    if (title.length > 40) {
      message.error('O título não pode ter mais de 40 caracteres.');
      return;
    }

    if (!fileList.length) {
      message.error('Por favor, inclua uma imagem.');
      return;
    }

    const file = fileList[0].originFileObj;

    const taskData = {
      title: title,
      completed: status,
      photoPath: file,
    };

    try {
      await addTask(taskData);
      setTimeout(() => {
        fetchTasks();
      }, 500);

      setFileList([]);
      setTitle('');
      setModalKey(null);
      onCancel();
    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error.message);
      message.error('Erro ao adicionar a tarefa. Por favor, tente novamente.');
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleStatusChange = (value) => {
    setStatus(value === 'Concluído');
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Por favor, faça upload apenas de imagens!');
      }
      return isImage;
    },
    fileList,
    onChange: handleUploadChange,
  };

  return (
    <Modal
      title="Adicionar Nova Tarefa"
      visible={visible}
      onCancel={onCancel}
      key={modalKey}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="add" type="primary" onClick={handleAddTask}>
          Adicionar Tarefa
        </Button>,
      ]}
    >
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <Select
        value={status ? 'Concluído' : 'Pendente'}
        onChange={handleStatusChange}
        style={{ marginBottom: '10px', width: '100%' }}
      >
        <Option value="Pendente">Pendente</Option>
        <Option value="Concluído">Concluído</Option>
      </Select>

      <Upload {...uploadProps} maxCount={1} listType="picture" accept="image/*">
        <Button icon={<UploadOutlined />}>Carregar Imagem</Button>
      </Upload>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTask: (formData) => dispatch(addTask(formData)),
  fetchTasks: () => dispatch(fetchTasks()),
});

export default connect(null, mapDispatchToProps)(NewTaskModal);