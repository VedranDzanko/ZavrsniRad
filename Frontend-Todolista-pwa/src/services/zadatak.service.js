import http from '../http-common';

class ZadatakDataService{

    async getAll(){
        return await http.get('/Zadatak');
    }

    async getBySifa(sifra){
        return await http.get('/Zadatak'+ sifra);
    }

    async post(zadatak){
        const odgovor=await http.post('/Zadatak',zadatak)
        .then(response =>{
            return{ok:true, poruka:' Zadatak unesen!'};
        })
        .catch(error=>{
            console.log(error.response);
            return{ok:false, poruka:error.response.data};
        });
        return odgovor;
    }

   async put(sifra){
    const odgovor= await http.put('/Zadatak/'+ sifra)
    .then(response =>{
        return{ok:true, poruka:'Zadatak promijenjen!'};
    })
    .catch(error=>{
        console.log(error.response);
        return{ok:false, poruka:error.response.data};
    });
    return odgovor;
   }

   async delete(sifra){
    const odgovor=await http.delete('/Zadatak/'+ sifra)
    .then(response=>{
        return{ok:true, poruka:'Zadatak obrisan!'};
    })
    .catch(error=>{
        console.log(error);
        return{ok:false,poruka:error.response.data};
    });
    return odgovor;
   }

}

export default new ZadatakDataService();
