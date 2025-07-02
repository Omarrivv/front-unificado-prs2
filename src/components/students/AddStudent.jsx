import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../services';
import institutionService from '../../services/institution.service';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { showConfirmCreate, showConfirmCancel, showSuccess, showError } from '../../utils/alerts';
import './AddStudent.css';

const { Option } = Select;

const AddStudent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState('DNI');
  const [institutions, setInstitutions] = useState([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    try {
      const data = await institutionService.getAllInstitutions();
      setInstitutions(data);
    } catch (error) {
      console.error('Error al cargar instituciones:', error);
      showError('Error al cargar las instituciones');
    } finally {
      setLoadingInstitutions(false);
    }
  };

  const validateNames = (_, value) => {
    if (!value) {
      return Promise.reject('Este campo es requerido');
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      return Promise.reject('Solo se permiten letras y espacios');
    }
    return Promise.resolve();
  };

  const validateDocument = (_, value) => {
    if (!value) {
      return Promise.reject('El número de documento es requerido');
    }
    if (documentType === 'DNI') {
      if (!/^\d{8}$/.test(value)) {
        return Promise.reject('El DNI debe tener 8 dígitos');
      }
    } else if (documentType === 'CE') {
      if (!/^\d{9,12}$/.test(value)) {
        return Promise.reject('El CE debe tener entre 9 y 12 dígitos');
      }
    }
    return Promise.resolve();
  };

  const validatePhone = (_, value) => {
    if (!value) {
      return Promise.reject('El teléfono es requerido');
    }
    if (!/^9\d{8}$/.test(value)) {
      return Promise.reject('El teléfono debe empezar con 9 y tener 9 dígitos');
    }
    return Promise.resolve();
  };

  const showConfirm = () => {
    showConfirmCreate('¿Está seguro de crear este estudiante?').then((result) => {
      if (result.isConfirmed) {
        form.submit();
      }
    });
  };

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      const studentData = {
        ...values,
        birthDate: values.birthDate.format('YYYY-MM-DD'),
        status: 'A',
        nameQr: `${values.firstName}_${values.lastName}_${values.documentNumber}`
      };

      await studentService.createStudent(studentData);
      await showSuccess('Estudiante creado correctamente');
      navigate('/studentlist');
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
      showError('Error al crear el estudiante');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    showConfirmCancel().then((result) => {
      if (result.isConfirmed) {
        navigate('/studentlist');
      }
    });
  };

  if (loadingInstitutions) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando instituciones..." />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Sidebar activeClassName="student-list" />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Agregar Estudiante</h3>
              </div>
            </div>
          </div>

          <Card className="form-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleCreate}
              className="student-form"
            >
              <div className="row">
                <div className="col-md-12">
                  <Form.Item
                    name="institutionId"
                    label="Institución"
                    rules={[{ required: true, message: 'Por favor seleccione una institución' }]}
                  >
                    <Select
                      placeholder="Seleccione una institución"
                      loading={loadingInstitutions}
                    >
                      {institutions.map(institution => (
                        <Option key={institution.id} value={institution.id}>
                          {institution.institutionName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="firstName"
                    label="Nombre"
                    rules={[{ validator: validateNames }]}
                  >
                    <Input placeholder="Ingrese el nombre" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="lastName"
                    label="Apellido"
                    rules={[{ validator: validateNames }]}
                  >
                    <Input placeholder="Ingrese el apellido" />
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="documentType"
                    label="Tipo de Documento"
                    rules={[{ required: true, message: 'El tipo de documento es requerido' }]}
                    initialValue="DNI"
                  >
                    <Select onChange={value => setDocumentType(value)}>
                      <Option value="DNI">DNI</Option>
                      <Option value="CE">Carné de Extranjería</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="documentNumber"
                    label="Número de Documento"
                    rules={[{ validator: validateDocument }]}
                  >
                    <Input 
                      maxLength={documentType === 'DNI' ? 8 : 12}
                      placeholder={documentType === 'DNI' ? 'Ingrese 8 dígitos' : 'Ingrese entre 9 y 12 dígitos'} 
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="gender"
                    label="Género"
                    rules={[{ required: true, message: 'El género es requerido' }]}
                  >
                    <Select placeholder="Seleccione el género">
                      <Option value="M">Masculino</Option>
                      <Option value="F">Femenino</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="birthDate"
                    label="Fecha de Nacimiento"
                    rules={[{ required: true, message: 'La fecha de nacimiento es requerida' }]}
                  >
                    <DatePicker 
                      style={{ width: '100%' }} 
                      format="YYYY-MM-DD"
                      placeholder="Seleccione la fecha" 
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'El email es requerido' },
                      { type: 'email', message: 'Ingrese un email válido' }
                    ]}
                  >
                    <Input placeholder="ejemplo@correo.com" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="phone"
                    label="Teléfono"
                    rules={[{ validator: validatePhone }]}
                  >
                    <Input 
                      maxLength={9}
                      placeholder="Ingrese número que empiece con 9" 
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Form.Item
                    name="address"
                    label="Dirección"
                    rules={[{ required: true, message: 'La dirección es requerida' }]}
                  >
                    <Input placeholder="Ingrese la dirección completa" />
                  </Form.Item>
                </div>
              </div>

              <div className="form-actions">
                <Button type="primary" onClick={showConfirm} loading={loading}>
                  Guardar
                </Button>
                <Button className="cancel-button" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddStudent; 