const https = require("https");

exports.handler = async function () {

  const cloudName = "dtbxzd7ux";
  const tag = "tour";

  const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;

  return new Promise((resolve) => {

    https.get(url, (res) => {

      let data = "";

      res.on("data", chunk => data += chunk);

      res.on("end", () => {
        try {
          const json = JSON.parse(data);

          const images = (json.resources || []).map(img => ({
            url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${img.public_id}`
          }));

          resolve({
            statusCode: 200,
            body: JSON.stringify(images)
          });

        } catch (e) {
          resolve({
            statusCode: 500,
            body: "error parsing"
          });
        }
      });

    }).on("error", () => {
      resolve({ statusCode: 500, body: "error" });
    });

  });
};