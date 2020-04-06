const express = require('express');
const router = express.Router();
const axios = require('axios');
CHARACTER_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/character'



const infoCharacter = async (per) => {
  var capitulos = [];
  var actual = await axios.get(per);
  var respuestapi = actual.data;
  var i=0;
  while(i<=respuestapi.episode.length-1){
    var elem = await infoEpisodes(respuestapi.episode[i]);
    capitulos.push(elem);
    i++;
  }
  respuestapi['caps'] = capitulos;
  return respuestapi
}

const infoEpisodes = async (epi) => {
  var actual = await axios.get(epi);
  var result = actual.data;
  return result
}


router.get('/personaje', async (req, res)=> {
  res.render('personaje.html', {resii: await infoCharacter(req.query.pers)});
});


module.exports= router;
