import Cookies from 'cookies'


// API handler for Login functionality
export default async function handler(req, res) {
  
  if (req.method == "POST"){
    const username = req.body['username']
    const password = req.body['password']
    const jsonreq = JSON.stringify({
              username : username,
              password : password
          })
    console.log("username "+username)
    
    try {
      const data = await sendRequestToPythonAPI('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              username : username,
              password : password
          })
      });
      console.log("data = " + data) 
      if (data.success) {
          const cookies = new Cookies(req, res);
          cookies.set('username', data.username);
          const url = '/' + data.username;
          res.redirect(url);
      } else {
          res.redirect('/?msg=' + encodeURIComponent(data.message));
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.redirect('/?msg=An error occurred');
  }
} else {
  res.redirect('/');
}



async function sendRequestToPythonAPI(url, options) {
  try {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

  catch (error) {
    console.error('Error during API request:', error);
    throw error; // Rethrow the error to be handled higher up the call stack
}
}
}