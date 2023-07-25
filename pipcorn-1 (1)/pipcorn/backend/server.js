
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const app = express()
app.use(cors());
app.use(express.json());


main()


async function main() {
  await mongoose.connect("mongodb+srv://akhilasam:jnq9aZC27qgwLfG0@cluster0.bdglajr.mongodb.net/?retryWrites=true&w=majority")




  const jwtSecretKey = "iamnoob";

  const ProductSchema = new mongoose.Schema({
    pid: Number,
    name: String,
    price: Number,
    image: String,
    description: String
  })


  const User = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      validate(value) {

      },
    },
    password: {
      type: String,
      required: true,
    },
  });
  const Product = mongoose.model('Product', ProductSchema);
  const details = await Product.find()

    .then(console.log('connected to db'))
    .catch(error => console.log(error));

  app.get('/api/products', (req, res) => {


    
    const changed = details

  
    res.send(details);

  })

  app.get('/api/products/token', (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token found, authorization denied" });
    }

    try {
      const decodedToken = jwt.verify(token, jwtSecretKey);
      
      console.log(decodedToken);

      const changed = details

      
      res.send(details);
    } catch (err) {
   
      console.error("Error verifying token:", err);
      return res.status(401).json({ message: "Token is not valid" });
    }
  });


  app.get('/api/products/:_id', async (req, res) => {
    try {
      const productId = req.params._id;


      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }


      res.json(product);
    } catch (error) {

      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/", cors(), (req, res) => {

  })


  const newSchema = new mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,

    },
    password: {
      type: String,

    },
    profilepic: {
      type: String
    }
  })

  const collection = mongoose.model("collection", newSchema)

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const check = await collection.findOne({ email: email });

      if (!check) {
        return res.json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, check.password);

      if (!isMatch) {
        return res.json({ message: "Invalid credentials" });
      }

      
      const payload = {
        user: {
          id: check._id, 
          email: check.email,
        },
      };

    
      jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          console.error("Error creating JWT token:", err);
          return res.status(500).json({ message: "Server error" });
        }

        res.json({ message: "exist", userData: check.email, token: token });
      });
    } catch (e) {
      console.error("Error during login:", e);
      res.status(500).json({ message: "Server error" });
    }
  });




  // app.post("/register",async(req,res)=>{
  //     const{name,email,password}=req.body

  //     const data={
  //       name:name,
  //         email:email,
  //         password:await bcrypt.hash(password , 8),
  //         jwt

  //     }

  //     try{
  //         const check=await collection.findOne({email:email})
  //         console.log('ok',check)
  //         if(check){
  //           console.log("block")
  //             res.json("exist")
  //         }
  //         else{
  //             // res.json("notexist")
  //             // await collection.insertMany([data])
  //             console.log('Inside else part')
  //             await User.create(data)
  //             res.json("Not exist")
  //         }

  //     }
  //     catch(e){
  //         // res.json("fail")
  //         console.log(e)
  //         res.json("Not exist")
  //     }

  // })
  const user = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      validate(value) {

      },
    },
    password: {
      type: String,
      required: true,
    },
  });
  const collections = mongoose.model("user", user)
  app.post('/editprofile', async (req, res) => {
    const { email, profilepic } = req.body;
    const check = await collection.findOne({ email: email })
      .then(async savedUser => {
        if (savedUser) {
          savedUser.profilepic = profilepic;
          savedUser.save()
            .then(user => {
              res.json({ message: "Updated Successfully" });
            })
            .catch(err => {
              return res.status(422).json({ error: "Server Error" });
            })
        }
        else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
  })

  app.post('/userdata', async (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    let cleanedToken = token.slice(1, -1);

    if (!cleanedToken) {
      return res.status(401).json({ message: "No token found, authorization denied" });
    }

    try {
      const decodedToken = jwt.verify(cleanedToken, jwtSecretKey);
      
      console.log(decodedToken);

      const { email } = req.body;
      let cleanedEmail = email.slice(1, -1);
      await collection.findOne({ email: cleanedEmail }).then(userdata => {
      
        res.status(200).send({
          message: "User Found",
          user: userdata
        });
      });
    } catch (err) {
      // Token verification failed
      console.error("Error verifying token:", err);
      return res.status(401).json({ message: "Token is not valid" });
    }

  });

  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const check = await collection.findOne({ email: email });
      console.log(check)

      if (check) {
        res.json("exist");
      } else {

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new collection({
          name: name,
          email: email,
          password: hashedPassword,
        });


        await newUser.save();

        res.json("Not exist");
      }
    } catch (e) {
      console.log(e);
      res.json("Not exist");
    }
  });

}







const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))

    // cb(null, Date.now() + '-' + file.originalname);
  },

});


//   if (!req.file) {
//     return res.status(400).json({ error: 'No image uploaded' });
//   }

//   res.json({ imageUrl: req.file.path });
// });




app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

