const url = "https://weatherbit-v1-mashape.p.rapidapi.com/";
const url2 ='https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lat=38.5&lon=-78.5&hours=48'

export const fetch2 = async (api) => {
  console.log("api: ", api);
  const res = await fetch(url + api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-RapidAPI-Key": "528748bebfmsh1545ce59fa1ce05p1bee0djsn0836cea243bf",
      "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  });
  return await res.json();
};
