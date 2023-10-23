import http from '../http-common';

class ClanDataService{

    async getAll(){
        return await http.get('/Korisnik');
    }

    async getByID(šifra){
        return await http.get('/Korisnik/'+ šifra);
    }

    async post(clan){
        const odgovor=await http.post('/Korisnik',korisnik)
        .then(response =>{
            return{ok:true, poruka:' Korisnik uspješno unesen!'};
        })
        .catch(error=>{
            console.log(error.response);
            return{ok:false, poruka:error.response.data};
        });
        return odgovor;
    }

   async put(šifra){
    const odgovor= await http.put('/Korisnik'+ šifra)
    .then(response =>{
        return{ok:true, poruka:'Korisnik je uspješno promijenjen'};
    })
    .catch(error=>{
        console.log(error.response);
        return{ok:false, poruka:error.response.data};
    });
    return odgovor;
   }

   async delete(šifra){
    const odgovor=await http.delete('/Korisnik'+ šifra)
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

export default new ClanDataService();
