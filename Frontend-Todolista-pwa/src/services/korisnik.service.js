import http from '../http-common';

class KorisnikDataService{

    async get(){
        return await http.get('/Korisnik');
    }

    async getBySifra(sifra){
        return await http.get('/Korisnik/'+ sifra);
    }

    async post(korisnik){
        const odgovor=await http.post('/Korisnik',korisnik)
        .then(response =>{
            return{ok:true, poruka:' Korisnik unesen!'};
        })
        .catch(error=>{
            console.log(error.response);
            return{ok:false, poruka:error.response.data};
        });
        return odgovor;
    }

   async put(sifra){
    const odgovor= await http.put('/Korisnik/'+ sifra)
    .then(response =>{
        return{ok:true, poruka:'Korisnik promijenjen'};
    })
    .catch(error=>{
        console.log(error.response);
        return{ok:false, poruka:error.response.data};
    });
    return odgovor;
   }

   async delete(sifra){
    const odgovor=await http.delete('/Korisnik/'+ sifra)
    .then(response=>{
        return{ok:true, poruka:'Korisnik obrisan'};
    })
    .catch(error=>{
        console.log(error);
        return{ok:false,poruka:error.response.data};
    });
    return odgovor;
   }

}

export default new KorisnikDataService();
