import express from 'express';
import multer from 'multer';
import User from '../models/userModel.js';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images/"); // اطمینان حاصل کنید که مسیر مقصد وجود دارد
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// ------------------------------------------
router.post('/create', upload.single('image'), async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    image: req.file ? req.file.filename : '', // مدیریت حالتی که فایلی آپلود نشده باشد
  });
  try {
    await newUser.save();
    res.json({ status: "ok", data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ status: "error", message: error.message });
  }
});
// --------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const sort = req.query.sort || 'name'; // مرتب‌سازی پیش‌فرض بر اساس نام
    const skip = (page - 1) * limit;

    let usersQuery = User.find();
    if (searchQuery) {
      usersQuery = usersQuery.where({ name: new RegExp(searchQuery, 'i') });
    }
    
    const users = await usersQuery
      .skip(skip)
      .limit(limit)
      .sort(sort);

    res.json({ data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
});
// -----------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: error.message });
  }
});

// -----------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: err.message });
  }
});
// --------------------------------------------
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.file) {
      user.image = req.file.filename; // به‌روزرسانی تصویر فقط در صورت آپلود فایل جدید
    }

    await user.save();
    res.json({ status: "ok", data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
