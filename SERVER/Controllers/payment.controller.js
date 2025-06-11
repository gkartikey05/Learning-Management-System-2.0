export const buySubscription = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("Unauthorized, please login"));
  } else if (user.role === "ADMIN") {
    return next(new AppError("Admin cannot purchase a subscription", 400));
  }

  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  res.status(200).json({
    success: true,
    message: "subscribed successfully",
    subscription_id: subscription.id,
  });
};

export const verifySubscription = (req, res, next) => {};

export const cancelSubscription = (req, res, next) => {};

export const getRazorpayApiKey = (req, res, next) => {};

export const allPayments = (req, res, next) => {};
