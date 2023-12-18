import React, { useState } from 'react';
import { Modal, Button, Input, Upload, message as antdMessage, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateTask } from '../actions/taskActions';

const { Option } = Select;

const EditTaskModal = ({ taskKey, visible, onCancel, updateTask }) => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [modalKey, setModalKey] = useState(null);

  const handleEditTask = () => {
    if (!title) {
      antdMessage.error('Por favor, insira um título para a tarefa.');
      return;
    }

    if (title.length > 30) {
      antdMessage.error('O título não pode ter mais de 30 caracteres.');
      return;
    }

    const photoPath = fileList.length > 0 ? fileList[0].url : null;

    // Usando taskKey como o identificador na ação updateTask
    updateTask({
      id: taskKey,
      title: title,
      completed: status === 'Concluído',
      photoPath: photoPath,
    });

    // Mostra a mensagem de sucesso ao editar a tarefa
    antdMessage.success('Tarefa editada com sucesso!');

    setFileList([]);
    setTitle('');
    setStatus('Pendente');
    setModalKey(null);
    onCancel();
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
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
        value={status}
        onChange={(value) => setStatus(value)}
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
        onChange={handleUploadChange}
      >
        <Button icon={<UploadOutlined />}>Carregar Imagem</Button>
      </Upload>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (task) => dispatch(updateTask(task)),
});

export default connect(null, mapDispatchToProps)(EditTaskModal);
