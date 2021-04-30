
export const getImageGoogle = (reqName, reqDate) => {

  // return fetch(`${BASE_URL_PROXY}?q=${request}&apiKey=${API_KEY}&from=${DATE_FROM}&to=${DATE_TO}&pageSize=${PAGE_SIZE}`, {
  // https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
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
