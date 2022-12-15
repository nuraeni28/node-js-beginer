const { addMahasiswa, getAllMahasiswa, getIdMahasiswa, editMahasiswa, deleteMahasiswa } = require('./handler');
const routes = [
    {
      method: 'POST',
      path: '/mahasiswa',
      handler: addMahasiswa,
    },
    {
      method: 'GET',
      path: '/mahasiswa',
      handler: getAllMahasiswa,
    },
    {
      method: 'GET',
      path: '/mahasiswa/{id}',
      handler: getIdMahasiswa,
    },
    {
      method: 'PUT',
      path: '/mahasiswa/{id}',
      handler: editMahasiswa,
    },
    {
      method: 'DELETE',
      path: '/mahasiswa/{id}',
      handler: deleteMahasiswa,
   },
  ];
module.exports = routes;  