const express = require('express');
const router = express.Router();
const axios = require('axios');
EPISODES_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/episode'



const infoEpisodio = async (cap) => {
  var personajes = [];
  var actual = await axios.get(cap);
  var respuestapi = actual.data;
  var i=0;
  while(i<=respuestapi.characters.length-1){
    var elem = await infoCharacters(respuestapi.characters[i]);
    personajes.push(elem);
    i++;
  }
  respuestapi['characs'] = personajes;
  return respuestapi
}

const infoCharacters = async (charac) => {
  var actual = await axios.get(charac);
  var result = actual.data;
  return result
}


router.get('/episodio', async (req, res)=> {
  res.render('episodio.html', {resii: await infoEpisodio(req.query.epix)});
});


module.exports= router;
