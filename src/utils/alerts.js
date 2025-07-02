import Swal from 'sweetalert2';

export const showConfirmCreate = (message) => {
  return Swal.fire({
    title: '¿Está seguro?',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, crear',
    cancelButtonText: 'Cancelar'
  });
};

export const showConfirmEdit = (title = '¿Está seguro de editar este registro?') => {
  return Swal.fire({
    title,
    text: 'Esta acción modificará los datos existentes',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar'
  });
};

export const showConfirmDelete = (title = '¿Está seguro de eliminar este registro?') => {
  return Swal.fire({
    title,
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
};

export const showConfirmRestore = (title = '¿Está seguro de restaurar este registro?') => {
  return Swal.fire({
    title,
    text: 'Esta acción reactivará el registro',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, restaurar',
    cancelButtonText: 'Cancelar'
  });
};

export const showConfirmCancel = () => {
  return Swal.fire({
    title: '¿Está seguro?',
    text: 'Los cambios no guardados se perderán',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'No, continuar editando'
  });
};

export const showSuccess = async (message) => {
  return Swal.fire({
    title: '¡Éxito!',
    text: message,
    icon: 'success',
    confirmButtonColor: '#3085d6'
  });
};

export const showError = (message) => {
  return Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonColor: '#3085d6'
  });
};

export const showInfo = (title, message) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'info'
  });
}; 