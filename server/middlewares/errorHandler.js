const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error',
        details: err.message 
      });
    }
  
    // Mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate Field Value',
        details: 'This value already exists in our system' 
      });
    }
  
    // Default server error
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
  module.exports = errorHandler;