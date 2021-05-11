export const getImageGoogle = (reqName, reqDate) => {

  return fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAlZixiYNytElBsLXVzSJegofMLZnKixow&cx=a3f526a85ba8cecf2&q=${reqName}&hq=${reqDate}&hq=постер&hq=фильм&lr=lang_ru&imgSize=large&cr=countryRU`, { //:omuauf_lfve
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error("Что-то пошло не так"));
    })
    .then((res) => {
      return res.items[0].pagemap.cse_image[0].src;
    })
};


// export const getMovieApi = () => {
//   console.log('getMovieApi in Api')
//   return fetch(`https://api.themoviedb.org/3/credit/52fe4250c3a36847f80149f7?api_key=764c9eeb42628bd34cd5a7cfb80a10e9`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       //Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjRjOWVlYjQyNjI4YmQzNGNkNWE3Y2ZiODBhMTBlOSIsInN1YiI6IjYwNzZiZmUxZmJlMzZmMDA0Mjg3OTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iDdG3xXCXbPluvFmwBpuRG4J1FXEXM8sBq20byw9H5k`
//     },
//   })
//     .then((res) => {
//       if (res.ok)return res.json();
//       return Promise.reject(new Error("Что-то пошло не так"));
//     })
//     .then((res) => {
//       return res
//     })
// };