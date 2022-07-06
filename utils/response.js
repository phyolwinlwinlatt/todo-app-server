
module.exports.response = (res, status, message, data = null) => {

  let success = (status >= 200 && status < 400) ? true : false
  return res.status(status || 200).json({
    message,
    success,
    data
  })
}