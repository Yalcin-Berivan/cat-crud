const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CatModel = require('./kedi.schema');
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/my-db");

  //KEDİLERİ GETİR
  app.get("/cats", async (req, res) => {
    const cats = await CatModel.find();
    res.send(cats);
  });

  //İD'Sİ VERİLEN KEDİYİ GETİR:
  app.get("/cats/:id", async (req, res) => {
    const id = req.params.id;
    const cats = await CatModel.findById(id);
    res.send(cats);
  });
  // KEDİ OLUŞTURMA:
  app.post("/cats", async (req, res) => {
    const body = req.body;
    await CatModel.create(body);
    res.send(body);
  });

  //KEDİ GÜNCELLEME:
  app.put("/cats/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    await CatModel.findOneAndUptade({ _id: id }, body);
    res.send("Kayıt güncellendi");
  });

  //KEDİ SİLME:
  app.delete('/cats/:id',async(req,res)=>{
    const id=req.params.id;
    await CatModel.deleteOne({_id:id})
    res.send("Kayıt silindi")
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda baslatildi`);
  });
}
