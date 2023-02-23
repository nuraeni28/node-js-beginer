const { nanoid } = require('nanoid');
const fs = require('fs');


const addMahasiswa = (request, h) => {
    const { nama, JK, jurusan, prodi } = request.payload;
   
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
   
    const newMahasiswa = {
      nama, JK, jurusan, prodi, id, createdAt, updatedAt,
    };
    fs.readFile('./mahasiswa.json', async (err, data) => {
      if (err) {
        return resolve('error');
      }
      const json = JSON.parse(data);
    
     json.push(newMahasiswa)
        fs.writeFileSync('./mahasiswa.json', JSON.stringify(json, null, 2));
     
      })
    
    console.log(newMahasiswa);
   
   
   
    // const isSuccess = .filter((DataMahasiswa) => DataMahasiswa.id === id).length > 0;
 
      const response = h.response({
        status: 'success',
        message: 'Data Mahasiswa berhasil ditambahkan',
        data: {
          mahasiswaID: id,
        },
      });
      response.code(201);
      return response;
    
    // const response = h.response({
    //   status: 'fail',
    //   message: 'Data Mahasiswa gagal ditambahkan',
    // });
    // response.code(500);
  
  };
  const getAllMahasiswa = (request, h) => {
   const dataMahasiwa = fs.readFileSync('./mahasiswa.json', 'utf-8', (err, data) => {
    return data;
   })
   console.log(dataMahasiwa)
   const result = JSON.parse(dataMahasiwa);
    const response = h.response({
      status: 'success',
     result
    });
    response.code(200);
    return response;
  };

  const getIdMahasiswa = (request, h) => {
    const { id } = request.params;
    const dataMahasiwa = fs.readFileSync('./mahasiswa.json', 'utf-8', (err, data) => {
      return data;
     });
     const result = JSON.parse(dataMahasiwa);
    const DataMahasiswa = result.filter((n) => n.id === id)[0];
   
   if (DataMahasiswa !== undefined) {
      return {
        status: 'success',
        data: {
          DataMahasiswa,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Mahasiswa tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  const editMahasiswa = (request, h) => {
    const { id } = request.params;
   
    const { nama, JK, jurusan, prodi } = request.payload;
    const updatedAt = new Date().toISOString();
    const dataMahasiwa = fs.readFileSync('./mahasiswa.json', 'utf-8', (err, data) => {
      return data;
     });
     const result = JSON.parse(dataMahasiwa);
    const index = result.findIndex((DataMahasiswa) => DataMahasiswa.id === id);
    // console.log(index);
    if (index !== -1) {
      result[index] = {
        ...result[index],
        nama,
        JK,
        jurusan,
        prodi,
        updatedAt,
      };
      // console.log(result[index]);
      // const json = JSON.parse(result[index]);
      // result.push(result[index]);
      fs.writeFileSync('./mahasiswa.json', JSON.stringify(result, null, 2));
      const response = h.response({
        status: 'success',
        message: 'Data Mahasiswa berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui Data Mahasiswa. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  const deleteMahasiswa = (request, h) => {
    const { id } = request.params;
   
    const dataMahasiwa = fs.readFileSync('./mahasiswa.json', 'utf-8', (err, data) => {
      return data;
     });
     const result = JSON.parse(dataMahasiwa);
    const index = result.findIndex((DataMahasiswa) => DataMahasiswa.id === id);
   console.log(index);
    if (index !== -1) {
      data = result.splice(index, 1);
      // console.log(result);
      fs.writeFileSync('./mahasiswa.json', JSON.stringify(result, null, 2));
      const response = h.response({
        status: 'success',
        message: 'Data berhasil dihapus',
      });
      response.code(200);
      return response;
    }};
module.exports = { addMahasiswa , getAllMahasiswa, getIdMahasiswa, editMahasiswa, deleteMahasiswa};
