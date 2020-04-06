const express = require('express');
const router = express.Router();
const axios = require('axios');
EPISODES_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/episode'
CHARACTER_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/character'
LOCATION_URL = 'https://integracion-rick-morty-api.herokuapp.com/api/location'



const resEpisodes = async (busq) => {
  var resultados = [];
  var actual = await axios.get(EPISODES_URL)
  var sgte = actual.data.info.next;
  actual.data.results.forEach(element =>
    {
      if(element.name == busq){
        resultados.push(element)
      }
    })
  while (sgte!= ""){
    actual = await axios.get(sgte);
    sgte = actual.data.info.next;
    actual.data.results.forEach(element =>
      {
        if(element.name == busq){
          resultados.push(element)
        }
      })
  }
  return resultados
}

const resCharacters = async (busq) => {
  var resultados = [];
  var actual = await axios.get(CHARACTER_URL)
  var sgte = actual.data.info.next;
  actual.data.results.forEach(element =>
    {
      if(element.name == busq){
        resultados.push(element)
      }
    })
  while (sgte!= ""){
    actual = await axios.get(sgte);
    sgte = actual.data.info.next;
    actual.data.results.forEach(element =>
      {
        if(element.name == busq){
          resultados.push(element)
        }
      })
  }
  return resultados
}

const resLocations = async (busq) => {
  var resultados = [];
  var actual = await axios.get(LOCATION_URL)
  var sgte = actual.data.info.next;
  actual.data.results.forEach(element =>
    {
      if(element.name == busq){
        resultados.push(element)
      }
    })
  while (sgte!= ""){
    actual = await axios.get(sgte);
    sgte = actual.data.info.next;
    actual.data.results.forEach(element =>
      {
        if(element.name == busq){
          resultados.push(element)
        }
      })
  }
  return resultados
}

const resBusqueda = async (busq) => {
  var respuestabus = [];
  var capis = await resEpisodes(busq);
  respuestabus.push(capis);
  var persjs = await resCharacters(busq);
  respuestabus.push(persjs);
  var locs = await resLocations(busq);
  respuestabus.push(locs);
  return respuestabus
}

router.get('/busqueda', async (req, res)=> {
  res.render('busqueda.html', {resii: await resBusqueda(req.query.busco)});
});


module.exports= router;
