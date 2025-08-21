var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');

const userModel = require('./users')
const postModel = require('./post')
const passport = require('passport');
const localStrategy = require("passport-local");
const upload = require('./multer')
passport.use(new localStrategy(userModel.authenticate()));

dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* GET home page. i.e log-in and register page */
router.get('/', function (req, res, next) {
  console.log(req.flash("error"));
  res.render('index', { error: req.flash("error") });
});
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user =
    await userModel
      .findOne({ username: req.session.passport.user })
      .populate("posts")
  // console.log(user)
  res.render('profile', { user });
});

router.get('/edit', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render('edit', { user });
});

router.post('/update', isLoggedIn, upload.single("postimage"), async function (req, res, next) {
  const user = await userModel.findOneAndUpdate({ username: req.session.passport.user },
    {
      fullname: req.body.fullname,
      address: req.body.address,
      contact: req.body.contact,
    },
    { new: true }
  );
  await user.save()
  res.redirect("/profile");
});


router.get('/car', isLoggedIn, function (req, res, next) {
  res.render('car');
});
router.get('/cab', isLoggedIn, function (req, res, next) {
  res.render('cab');
});
router.get('/cab-cart', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts")
  res.render('cab-cart', { user });
});
router.get('/booking-form', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render('booking-form', { user });
});
router.post('/final', isLoggedIn, upload.single("postimage"), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    user: user._id,
    name: req.body.bname,
    email: req.body.bemail,
    phone: req.body.bphone,

    paddress: req.body.paddress,
    daddress: req.body.daddress,
    btime: req.body.btime,
    bdate: req.body.inputdate,

    carname: req.body.cname,
    carmodel: req.body.cmodel,
    carprice: req.body.cprice,
    passenger: req.body.cpassenger,
    luggage: req.body.cluggage,

    tdistance: req.body.distance
  });
  user.posts.push(post._id)
  await user.save()
  res.redirect("/cab-cart");
});

// router.post('/finalsubmit', isLoggedIn, upload.single("postimage"), async function (req, res, next) {
//   const user = await userModel.findOne({ username: req.session.passport.user });
//   const post = await postModel.findOneAndUpdate({ user: user._id },
//     {
//       totalprice:req.body.tprice,
//     },
//     { new: true }
//   );
//   await post.save()
//   res.redirect("/profile");
// })

router.get('/show/bookings', isLoggedIn, async function (req, res, next) {
  const user =
    await userModel
      .findOne({ username: req.session.passport.user })
      .populate("posts")
  // console.log(user)
  res.render('bookings', { user });
});

router.get('/cancle', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render('cancle', { user });
});

router.post('/confirm', isLoggedIn, upload.single("postimage"), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post1 = await userModel.findOne({ user: user.posts });
  const post = await postModel.findOneAndUpdate({ post1 },
    // const post1 = await postModel.findOneAndUpdate({ id:_id },
    {
      cancle: req.body.canc
    },
    { new: true }
  );
  await post.save()
  console.log(user.posts)
  console.log(post1)
  res.redirect("/profile");
});


router.post('/fileupload', isLoggedIn, upload.single('image'), async function (req, res, next) {
  // res.send('uploaded')
  const user = await userModel.findOne({ username: req.session.passport.user })
  user.profileImage = req.file.filename
  await user.save()
  res.redirect("/profile")
});

//register user
router.post('/register', function (req, res) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.femail,
    password: req.body.password,
  });
  userModel.register(data, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/profile');
      })
    })
});
//log-in 
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true
}),
  function (req, res, next) {
  });
//log-out
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
//logged in middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

router.get('/otp', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render('otp', { user });
});

// Send OTP Route
router.post('/send-otp',isLoggedIn, async (req, res) => {
  // const { email } = req.body;

  // const user = await userModel.findOne({ username: req.session.passport.user })

  try {
    const user = await userModel.findOne({ username: req.session.passport.user })

    if (!user) {
      return res.status(400).send('User not found');
    }
    //  Math.floor(100000 + Math.random() * 900000).toString()
    const otp = crypto.randomBytes(3).toString('hex');
    const otpExpiry = Date.now() + 3600000; // OTP valid for 1 hour

    console.log(otp)
    console.log(otpExpiry)

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    res.status(200).send('OTP sent. Please check your email.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Verify OTP Route
router.post('/verify-otp',isLoggedIn, async (req, res) => {
  // const otp = req.body.otp;
  // password: req.body.password,
  // const { email, otp } = req.body;


  // console.log(otp)

  try {
    const user = await userModel.findOne({ username: req.session.passport.user })
    const otp = req.body.otp;
    console.log(otp)


    if (!user) {
      return res.status(400).send('User not found');
    }

    if ( user.otp !== otp   ) {
      return res.status(400).send('Invalid OTP');
    }

    if( user.otpExpiry < Date.now()){
      return res.status(400).send('Expired OTP');
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).send('User verified successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
