import React, { useState } from 'react';
import { Modal, Button, Input, Upload, message as antdMessage, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateTask, fetchTasks } from '../actions/taskActions';

const { Option } = Select;

const EditTaskModal = ({ taskKey, visible, onCancel, updateTask, fetchTasks }) => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [modalKey, setModalKey] = useState(null);

  const handleEditTask = async () => {
    if (!title) {
      antdMessage.error('Por favor, insira um título para a tarefa.');
      return;
    }

    if (title.length > 40) {
      antdMessage.error('O título não pode ter mais de 40 caracteres.');
      return;
    }

    if (!fileList.length) {
      antdMessage.error('Por favor, inclua uma imagem.');
      return;
    }

    const file = fileList[0].originFileObj;

    const taskData = {
      id: taskKey,
      title: title,
      completed: status,
      photoPath: file,
    };

    try {
      await updateTask(taskData);
      antdMessage.success('Tarefa editada com sucesso!');
      setFileList([]);
      setTitle('');
      setStatus(status);
      setModalKey(null);
      onCancel();

      setTimeout(() => {
        fetchTasks();
      }, 500);
    } catch (error) {
      console.error('Erro ao editar a tarefa:', error.message);
      antdMessage.error('Erro ao editar a tarefa. Por favor, tente novamente.');
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        antdMessage.error('Por favor, faça upload apenas de imagens!');
      }
      return isImage;
    },
    fileList,
    onChange: handleUploadChange,
  };

  return (
    <Modal
      title="Editar Tarefa"
      visible={visible}
      onCancel={onCancel}
      key={modalKey}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="edit" type="primary" onClick={handleEditTask}>
          Editar Tarefa
        </Button>,
      ]}
    >
      {/* Campos de formulário */}
      <Input
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      {/* Campo Status */}
      <Select
        value={status ? 'Concluído' : 'Pendente'}
        onChange={(value) => setStatus(value === "Concluído")}
        style={{ marginBottom: '10px', width: '100%' }}
      >
        <Option value="Pendente">Pendente</Option>
        <Option value="Concluído">Concluído</Option>
      </Select>

      {/* Upload de Imagem */}
      <Upload
        maxCount={1}
        listType="picture"
        accept="image/*"
        {...uploadProps}
      >
        <Button icon={<UploadOutlined />}>Carregar Imagem</Button>
      </Upload>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (taskData) => dispatch(updateTask(taskData)),
  fetchTasks: () => dispatch(fetchTasks()),
});

export default connect(null, mapDispatchToProps)(EditTaskModal);
