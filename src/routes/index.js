const express = require('express');
const router = express.Router();
const axios = require('axios');
EPISODES_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/episode'



const Episodios = async () => {
  var resultados = [];
  var actual = await axios.get(EPISODES_URL)
  var sgte = actual.data.info.next;
  actual.data.results.forEach(element =>
    {
      resultados.push(element)
    })
  while (sgte!= ""){
    actual = await axios.get(sgte);
    sgte = actual.data.info.next;
    actual.data.results.forEach(element =>
      {
        resultados.push(element)
      })
  }
  return resultados
}

router.get('/', async (req, res)=> {
  res.render('index.html', {resii: await Episodios()});
});


module.exports= router;
