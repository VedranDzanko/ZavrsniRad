import http from '../http-common';

class ToDoDataService{

    async getAll(){
        return await http.get('/ToDoCntroller');
    }

    async getBySifra(sifra){
        return await http.get('/ToDoCntroller'+ sifra);
    }

    async post(ToDo){
        const odgovor=await http.post('/ToDoCntroller',)
        .then(response =>{
            return{ok:true, poruka:' Uspješno uneseno!'};
        })
        .catch(error=>{
            console.log(error.response);
            return{ok:false, poruka:error.response.data};
        });
        return odgovor;
    }

   async put(sifra){
    const odgovor= await http.put('/ToDoCntroller'+ sifra)
    .then(response =>{
        return{ok:true, poruka:'Uspješno promijenjeno'};
    })
    .catch(error=>{
        console.log(error.response);
        return{ok:false, poruka:error.response.data};
    });
    return odgovor;
   }

   async delete(sifra){
    const odgovor=await http.delete('/ToDoCntroller?Sifra='+ sifra)
    .then(response=>{
        return{ok:true, poruka:'Uspješno obrisano'};
    })
    .catch(error=>{
        console.log(error);
        return{ok:false,poruka:error.response.data};
    });
    return odgovor;
   }

}

export default new ToDoDataService();
