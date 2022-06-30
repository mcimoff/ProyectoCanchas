const { check, validationResult } = require('express-validator')
const data = require('./../data/users');


   const validateEmail = [check('email')
  
       
      //Validar si existe mail o no
        .custom(async (email, password) => {
            const existingUser = 
                await data.findByCredentials( email , password);
                  
            if (existingUser) {
                throw new Error('Email already in use')
            }
        })
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
    }
  
    next();
  };

  module.exports={ validateEmail, handleValidationErrors}