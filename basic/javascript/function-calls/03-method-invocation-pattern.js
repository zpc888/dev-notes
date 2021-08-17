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
