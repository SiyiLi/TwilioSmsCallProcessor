const Urls = {};

if (process.env.NODE_ENV === 'production') {
  Urls.api = 'http://localhost:5433'; // can be different than Dev if needed
} else if (process.env.NODE_ENV === 'development') {
  Urls.api = 'http://localhost:5433';
}

export default Urls;
