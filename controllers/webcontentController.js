
const Notice = require('../models/noticeModel');
exports.getvideos = async(req,res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 2); // Subtract 3 days
    threeDaysAgo.setHours(0, 0, 0, 0); // Set time to 00:00:00
    // Fetch notices from the last 3 days
    const now = new Date();
    const notices = await Notice.find({
      createdAt: { $gte: threeDaysAgo,  $lte: now} // Get data where createdAt is >= threeDaysAgo
    })
    .sort({ createdAt: -1 }) // Sort by latest first
    .populate('createdBy');
 //console.log('this is notices',notices)
 
  res.render('web-content/videos', { user: req.user , notices });
} catch (err) {
  console.error('Error fetching notices:', err);
  res.status(500).send('Internal Server Error');
}
}

exports.postnotice = async (req, res) => {
 // console.log("Request Body:", req.body);
  const notices = await Notice.create({
    notice: req.body.notice,
    createdBy: req.user._id
  })


  //console.log('this is req.user',req.user)
  res.redirect('/content/videos');
};