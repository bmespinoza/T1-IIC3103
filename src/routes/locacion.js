const express = require('express');
const router = express.Router();
const axios = require('axios');
LOCATION_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/location'



const infoLocacion = async (place) => {
  var personajes = [];
  var actual = await axios.get(place);
  var respuestapi = actual.data;
  var i=0;
  while(i<=respuestapi.residents.length-1){
    var elem = await infoResidente(respuestapi.residents[i]);
    personajes.push(elem);
    i++;
  }
  respuestapi['residentes'] = personajes;
  return respuestapi
}

const infoResidente = async (res) => {
  var actual = await axios.get(res);
  var result = actual.data;
  return result
}


router.get('/locacion', async (req, res)=> {
  res.render('locacion.html', {resii: await infoLocacion(req.query.loc)});
});


module.exports= router;
