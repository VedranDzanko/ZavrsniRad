import http from '../http-common';

class ToDoDataService{

    async getAll(){
        return await http.get('/ToDoCntroller');
    }

    async getByID(šifra){
        return await http.get('/ToDoCntroller'+ šifra);
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

   async put(šifra){
    const odgovor= await http.put('/ToDoCntroller'+ šifra)
    .then(response =>{
        return{ok:true, poruka:'Uspješno promijenjeno'};
    })
    .catch(error=>{
        console.log(error.response);
        return{ok:false, poruka:error.response.data};
    });
    return odgovor;
   }

   async delete(šifra){
    const odgovor=await http.delete('/ToDoCntroller?Sifra='+ šifra)
    .then(response=>{
        return{ok:true, poruka:'Obrisano uspješno'};
    })
    .catch(error=>{
        console.log(error);
        return{ok:false,poruka:error.response.data};
    });
    return odgovor;
   }

}

export default new ToDoDataService();
