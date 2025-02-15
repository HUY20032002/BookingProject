// function
import db from '../models/index';

let getHomepage = async (req, res) => {

  try {
    let data = await db.User.findAll();
    // xuat file html dong va lay du lieu
    return res.render("homepage.ejs", {
      data: JSON.stringify(data)
    });
  } catch (e) {
    console.log(e);
  }

};
// lam thi phai xuat
module.exports = {
  getHomepage: getHomepage,

};
