# Front Unificado PRS02

Sistema de gestión académica desarrollado con React.

## Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos (imágenes, fuentes, etc.)
├── components/       # Componentes reutilizables de la aplicación
├── config/          # Configuraciones de la aplicación
├── pages/           # Páginas y vistas principales
│   ├── common/      # Componentes comunes entre páginas
│   ├── enrollments/ # Módulo de matrículas
│   └── students/    # Módulo de estudiantes
├── services/        # Servicios y llamadas a API
├── styles/          # Estilos globales y temas
└── types/          # Definiciones de tipos y interfaces

```

### Descripción de Carpetas

#### 📁 pages/
Contiene las páginas principales de la aplicación organizadas por módulos:

- **common/**: Componentes compartidos entre páginas
  - `CustomAlert.jsx`: Componente de alertas personalizado

- **enrollments/**: Gestión de matrículas
  - `EnrollmentList.jsx`: Lista y gestión de matrículas
  - `AddEnrollment.jsx`: Formulario para crear matrículas
  - `EditEnrollment.jsx`: Formulario para editar matrículas

- **students/**: Gestión de estudiantes
  - `StudentList.jsx`: Lista y gestión de estudiantes
  - `AddStudent.jsx`: Formulario para crear estudiantes
  - `EditStudent.jsx`: Formulario para editar estudiantes
  - `StudentProfile.jsx`: Vista de perfil de estudiante

#### 📁 services/
Servicios para la comunicación con el backend:

- `enrollmentService.js`: Servicios para matrículas
- `studentService.js`: Servicios para estudiantes
- `classroomService.js`: Servicios para aulas
- `institution.service.js`: Servicios para instituciones

#### 📁 types/
Definiciones de tipos y interfaces:

- `student.types.js`: Tipos para el módulo de estudiantes
- `classroom-student.types.js`: Tipos para la relación aula-estudiante
- `institution.js`: Tipos para instituciones

## Características Principales

- Gestión completa de estudiantes (CRUD)
- Gestión de matrículas
- Sistema de filtros avanzados
- Interfaz responsiva
- Validaciones de formularios
- Alertas y notificaciones personalizadas

## Tecnologías Utilizadas

- React
- React Bootstrap
- Ant Design
- Moment.js
- React Router DOM
