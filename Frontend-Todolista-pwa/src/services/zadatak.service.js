import http from '../http-common';

class ZadatakDataService{

    async getAll(){
        return await http.get('/Zadatak');
    }

    async getByID(šifra){
        return await http.get('/Zadatak'+ šifra);
    }

    async post(Zadatak){
        const odgovor=await http.post('/Zadatak',)
        .then(response =>{
            return{ok:true, poruka:' Zadatak uspješno unesen!'};
        })
        .catch(error=>{
            console.log(error.response);
            return{ok:false, poruka:error.response.data};
        });
        return odgovor;
    }

   async put(šifra){
    const odgovor= await http.put('/Zadatak/'+ šifra)
    .then(response =>{
        return{ok:true, poruka:'Zadatak uspješno promijenjen!'};
    })
    .catch(error=>{
        console.log(error.response);
        return{ok:false, poruka:error.response.data};
    });
    return odgovor;
   }

   async delete(šifra){
    const odgovor=await http.delete('/Zadatak/'+ šifra)
    .then(response=>{
        return{ok:true, poruka:'Zadatak uspješno obrisan!'};
    })
    .catch(error=>{
        console.log(error);
        return{ok:false,poruka:error.response.data};
    });
    return odgovor;
   }

}

export default new ZadatakDataService();
