import React, { useState } from 'react';
import { Modal, Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const NewTaskModal = ({ visible, onCancel, onAddTask }) => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState('');
  const [modalKey, setModalKey] = useState(null); // Adicione o estado para a chave única

  const handleAddTask = () => {
    if (!title) {
      message.error('Por favor, insira uma descrição para a tarefa.');
      return;
    }

    // Chame a função onAddTask com os dados da nova tarefa
    onAddTask({
      title: title,
      status: 'Pendente',
      image: fileList[0]?.url,
    });

    setFileList([]);
    setTitle('');
    setModalKey(null); // Limpe a chave única
    onCancel();
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadProps = {
    beforeUpload: file => {
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
      key={modalKey} // Use a chave única para o componente Modal
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="add" type="primary" onClick={handleAddTask}>
          Adicionar Tarefa
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
      
      {/* Campo Status Pendente (não editável) */}
      <Input value="Pendente" disabled style={{ marginBottom: '10px' }} />

      {/* Upload de Imagem */}
      <Upload {...uploadProps} maxCount={1} listType="picture" accept="image/*">
        <Button icon={<UploadOutlined />}>Carregar Imagem</Button>
      </Upload>
    </Modal>
  );
};

export default NewTaskModal;
