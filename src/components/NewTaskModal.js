import React, { useState } from 'react';
import { Modal, Button, Input, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const NewTaskModal = ({ visible, onCancel, onAddTask }) => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false); // Estado para o status da tarefa
  const [modalKey, setModalKey] = useState(null);

  const handleAddTask = () => {
    if (!title) {
      message.error('Por favor, insira uma descrição para a tarefa.');
      return;
    }

    if (title.length > 30) {
      message.error('O título não pode ter mais de 30 caracteres.');
      return;
    }

    // Chame a função onAddTask com os dados da nova tarefa
    onAddTask({
      title: title,
      status: status,
      completed: status,
      photoPath: fileList[0]?.url,
    });

    setFileList([]);
    setTitle('');
    setModalKey(null);
    onCancel();
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleStatusChange = (value) => {
    if (value === "Concluído") setStatus(true);  
    
    
    if (value === "Pendente") setStatus(false)
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // Validar o tipo de arquivo, tamanho, etc.
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
        value={status ? "Concluído" :  "Pendente"}
        onChange={handleStatusChange}  
        style={{ marginBottom: '10px', width: '100%' }}
      >
        <Option value="Pendente">Pendente</Option>
        <Option value="Concluído">Concluído</Option>
        {/* Adicione mais opções conforme necessário */}
      </Select>

      {/* Upload de Imagem */}
      <Upload {...uploadProps} maxCount={1} listType="picture" accept="image/*">
        <Button icon={<UploadOutlined />}>Carregar Imagem</Button>
      </Upload>
    </Modal>
  );
};

export default NewTaskModal;
