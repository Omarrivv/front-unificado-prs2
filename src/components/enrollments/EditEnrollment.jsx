import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { enrollmentService } from '../../services/enrollmentService';
import { classroomService } from '../../services/classroomService';
import { studentService } from '../../services/studentService';
import moment from 'moment';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';

const EditEnrollment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    classroomId: '',
    studentId: '',
    enrollmentDate: '',
    status: '',
    enrollmentYear: '',
    enrollmentPeriod: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error('ID de matrícula no proporcionado');
        }

        const [classroomsData, studentsData, enrollmentData] = await Promise.all([
          classroomService.getAllClassrooms(),
          studentService.getAllStudents(),
          enrollmentService.getEnrollmentById(id)
        ]);
        
        if (!enrollmentData) {
          throw new Error('No se encontró la matrícula');
        }

        setClassrooms(classroomsData || []);
        setStudents(studentsData || []);
        setFormData({
          classroomId: enrollmentData.classroomId || '',
          studentId: enrollmentData.studentId || '',
          enrollmentDate: enrollmentData.enrollmentDate ? moment(enrollmentData.enrollmentDate).format('YYYY-MM-DD') : '',
          status: enrollmentData.status || 'A',
          enrollmentYear: enrollmentData.enrollmentYear || '',
          enrollmentPeriod: enrollmentData.enrollmentPeriod || ''
        });
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError(error.message || 'Error al cargar los datos');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Error al cargar los datos. Por favor, intente nuevamente.'
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      if (!formData.classroomId || !formData.studentId || !formData.enrollmentDate || 
          !formData.enrollmentYear || !formData.enrollmentPeriod) {
        throw new Error('Todos los campos son obligatorios');
      }

      await enrollmentService.updateEnrollment(id, formData);
      
      await Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Matrícula actualizada correctamente'
      });
      
      navigate('/enrollmentlist');
    } catch (error) {
      console.error('Error al actualizar matrícula:', error);
      setError(error.message || 'Error al actualizar la matrícula');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al actualizar la matrícula'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <Header />
        <Sidebar activeClassName="enrollment-list" />
        <div className="content container-fluid">
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <Header />
        <Sidebar activeClassName="enrollment-list" />
        <div className="content container-fluid">
          <div className="alert alert-danger" role="alert">
            {error}
            <div className="mt-3">
              <Button variant="primary" onClick={() => navigate('/enrollmentlist')}>
                Volver al listado
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <Sidebar activeClassName="enrollment-list" />
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Editar Matrícula</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Aula</Form.Label>
                        <Form.Select
                          name="classroomId"
                          value={formData.classroomId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione un aula</option>
                          {classrooms.map(classroom => (
                            <option key={classroom.id} value={classroom.id}>
                              {classroom.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Estudiante</Form.Label>
                        <Form.Select
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione un estudiante</option>
                          {students.map(student => (
                            <option key={student.id} value={student.id}>
                              {`${student.firstName} ${student.lastName}`}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Matrícula</Form.Label>
                        <Form.Control
                          type="date"
                          name="enrollmentDate"
                          value={formData.enrollmentDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Año</Form.Label>
                        <Form.Control
                          type="text"
                          name="enrollmentYear"
                          value={formData.enrollmentYear}
                          onChange={handleChange}
                          required
                          pattern="\d{4}"
                          title="Ingrese un año válido (4 dígitos)"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Periodo</Form.Label>
                        <Form.Control
                          type="text"
                          name="enrollmentPeriod"
                          value={formData.enrollmentPeriod}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="A">Activo</option>
                      <option value="I">Inactivo</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="form-group text-end">
                    <Button variant="primary" type="submit" className="me-2">
                      Guardar
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => navigate('/enrollmentlist')}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEnrollment; 