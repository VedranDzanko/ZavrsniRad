import http from '../http-common';

class KategorijaDataService {
  async getAll() {
    return await http.get('/');
  }

  async getBySifra(sifra) {
    return await http.get('/Kategorija/'+ sifra);
  }

 

  async post(kategorija){
    //console.log(smjer);
    const odgovor = await http.post('/Kategorija',kategorija)
       .then(response => {
         return {ok:true, poruka: 'Kategorija unesena'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

  async put(sifra,kategorija){
    const odgovor = await http.put('/Kategorija/'+sifra,kategorija)
       .then(response => {
         return {ok:true, poruka: 'Kategorija promjenjena'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(sifra){
    
    const odgovor = await http.delete('/Kategorija/'+ sifra)
       .then(response => {
         return {ok:true, poruka: 'Kategorija obrisana'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     
     
 
}

export default new KategorijaDataService();
