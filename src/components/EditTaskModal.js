import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;


const EditTaskModal = ({ visible, onCancel, onEditTask, taskToEdit }) => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [modalKey, setModalKey] = useState(null);

  useEffect(() => {
    // Atualiza os estados ao receber uma nova tarefa para editar
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setStatus(taskToEdit.completed ? 'Concluído' : 'Pendente');
      setFileList([{ uid: '-1', url: taskToEdit.photoPath }]);
    }
  }, [taskToEdit]);

  const handleEditTask = () => {
    if (!title) {
      message.error('Por favor, insira um título para a tarefa.');
      return;
    }

    // Obtém a URL da imagem a partir do fileList
    const photoPath = fileList.length > 0 ? fileList[0].url : null;

    // Chame a função onEditTask com os dados editados da tarefa
    onEditTask({
      id: taskToEdit.id,
      title: title,
      completed: status === 'Concluído',
      photoPath: photoPath,
    });

    setFileList([]);
    setTitle('');
    setStatus('Pendente');
    setModalKey(null);
    onCancel();
  };

  // Função para lidar com a mudança de arquivo no Upload
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

export default EditTaskModal;
