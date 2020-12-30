const connection = require('../config/mysql')

module.exports = {
  postCouponModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO coupon SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            coupon_id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getCouponByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM coupon WHERE coupon_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCouponModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM coupon', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  deleteCouponModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM coupon WHERE coupon_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchCouponModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE coupon SET ? WHERE coupon_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
