const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "demoforintern",
  api_key: "576242853342375",
  api_secret: "Prme_pz_KPKsu_wtFFHIJ2FHp08",
});

module.exports = { cloudinary };
