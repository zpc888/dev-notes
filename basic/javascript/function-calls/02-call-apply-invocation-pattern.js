const error = {
  status: 404,
  message: 'Not found',
  log() {
    console.log('My this ', this);
    console.log(this.message);
  }
};

error.log();
// My this  { status: 404, message: 'Not found', log: [Function: log] }
// Not found

const logger = error.log
logger.call( {status: 500, message: 'Server error'} )
// My this  { status: 500, message: 'Server error' }
// Server error

const logging = function() {
    console.log('My this ', this);
    console.log(this.message);
}
const errorCtx = { status: 404, message: 'Not found' }
logging.call(errorCtx);
// My this  { status: 404, message: 'Not found' }
// Not found
